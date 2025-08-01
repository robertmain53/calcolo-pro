import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🤖 SoCalSolver Professional - Script Automazione Avviato');
console.log('=====================================================');

// ========================================
// CONFIGURAZIONE E VALIDAZIONE
// ========================================

const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'calculators';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const COMPONENTS_DIR = path.join(__dirname, 'components', 'calculators');
const CONTENT_DIR = path.join(__dirname, 'content');
const PROMPT_COMPONENT_FILE = path.join(__dirname, 'prompt_component.txt');
const PROMPT_CONTENT_FILE = path.join(__dirname, 'prompt_content.txt');
const CREDENTIALS_FILE = path.join(__dirname, 'credentials.json');
const STATE_FILE = path.join(__dirname, 'automation_state.json');

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 60000;

// ========================================
// VALIDAZIONE CONFIGURAZIONE (UGUALE)
// ========================================
async function validateConfiguration() {
    const errors = [];
    
    console.log('🔍 Validazione configurazione...');
    
    if (!SHEET_ID) errors.push('❌ SHEET_ID mancante in .env');
    if (!GEMINI_API_KEY) errors.push('❌ GEMINI_API_KEY mancante in .env');
    
    try {
        await fs.access(CREDENTIALS_FILE);
        console.log('  ✅ credentials.json trovato');
    } catch {
        errors.push('❌ credentials.json non trovato nella root');
    }
    
    try {
        await fs.access(PROMPT_COMPONENT_FILE);
        console.log('  ✅ prompt_component.txt trovato');
    } catch {
        errors.push('❌ prompt_component.txt non trovato nella root');
    }
    
    try {
        await fs.access(PROMPT_CONTENT_FILE);
        console.log('  ✅ prompt_content.txt trovato');
    } catch {
        errors.push('❌ prompt_content.txt non trovato nella root');
    }
    
    if (errors.length > 0) {
        console.log('\n❌ ERRORI DI CONFIGURAZIONE:');
        errors.forEach(error => console.log(error));
        console.log('\n📝 COME RISOLVERE:');
        console.log('1. Crea/verifica il file .env con:');
        console.log('   SHEET_ID=your_sheet_id');
        console.log('   GEMINI_API_KEY=your_api_key');
        console.log('2. Aggiungi credentials.json per Google Sheets API');
        console.log('3. Crea prompt_component.txt e prompt_content.txt');
        process.exit(1);
    }
    
    console.log('✅ Configurazione validata con successo!');
    return true;
}

// ========================================
// UTILITY FUNCTIONS (UGUALI)
// ========================================
function slugify(text) {
    if (!text) return '';
    return text.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u030f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

function toPascalCase(text) {
    if (!text) return '';
    return text.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

async function readState() {
    try {
        const data = await fs.readFile(STATE_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return { lastProcessedIndex: -1 };
    }
}

async function saveState(state) {
    await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

// ========================================
// GOOGLE SHEETS INTEGRATION (UGUALE)
// ========================================
async function readGoogleSheet() {
    console.log('📊 Connessione a Google Sheets...');
    
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: CREDENTIALS_FILE,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });
        
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A:E`,
        });

        const rows = res.data.values;
        if (!rows || rows.length < 2) {
            console.log('⚠️  Nessun dato trovato nel Google Sheet');
            return [];
        }

        const header = rows[0].map(h => h.trim());
        const data = rows.slice(1).map(row => {
            let obj = {};
            header.forEach((key, index) => { 
                obj[key] = row[index] || ''; 
            });
            return obj;
        });
        
        console.log(`✅ Caricati ${data.length} calcolatori dal Google Sheet`);
        return data;
        
    } catch (error) {
        console.error('❌ Errore accesso Google Sheets:', error.message);
        throw error;
    }
}

// ========================================
// AI GENERATION FUNCTIONS - VERSIONE CORRETTA
// ========================================

function cleanAndParseJSON(text) {
    console.log('📥 Contenuto grezzo ricevuto:', text.substring(0, 200) + '...');
    
    // Step 1: Rimuovi markdown code blocks se presenti
    let cleaned = text.replace(/^```json\s*|```\s*$/gm, '').trim();
    
    // Step 2: Cerca solo il contenuto tra le prime { e ultime }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    console.log('🧹 Dopo pulizia iniziale:', cleaned.substring(0, 200) + '...');
    
    // Step 3: Gestione avanzata degli escape
    try {
        // Prima prova di parsing diretto
        return JSON.parse(cleaned);
    } catch (firstError) {
        console.log('⚠️ Primo tentativo fallito, applying fixes...');
        
        // Step 4: Correzioni progressive
        let fixed = cleaned
            // Rimuovi virgole finali
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            // Gestisci valori null/undefined
            .replace(/:\s*,/g, ': null,')
            .replace(/:\s*}/g, ': null}')
            // Gestisci newline ed escape problematici
            .replace(/\\\\n/g, '\\n')        // Double escape -> single
            .replace(/\\\\"/g, '\\"')        // Double escape quotes -> single
            .replace(/\\\\t/g, '\\t')        // Double escape tab -> single
            .replace(/\\\\r/g, '\\r')        // Double escape return -> single
            // Gestisci escape multipli generici
            .replace(/\\\\\\/g, '\\')        // Triple backslash -> single
            // Normalizza stringhe multiline
            .replace(/\n\s*/g, '\\n')        // Real newlines -> escape
            .replace(/\r/g, '\\r')           // Carriage returns
            .replace(/\t/g, '\\t');          // Tabs
        
        console.log('🔧 Dopo correzioni:', fixed.substring(0, 200) + '...');
        
        try {
            return JSON.parse(fixed);
        } catch (secondError) {
            console.log('⚠️ Secondo tentativo fallito, trying manual reconstruction...');
            
            // Step 5: Ricostruzione manuale per casi estremi
            try {
                // Estrai il valore componentCode manualmente
                const codeMatch = fixed.match(/"componentCode"\s*:\s*"([^"]*(?:\\.[^"]*)*?)"/);
                if (codeMatch) {
                    const componentCode = codeMatch[1]
                        .replace(/\\"/g, '"')    // Unescape quotes
                        .replace(/\\n/g, '\n')   // Unescape newlines
                        .replace(/\\t/g, '\t')   // Unescape tabs
                        .replace(/\\r/g, '\r')   // Unescape returns
                        .replace(/\\\\/g, '\\'); // Unescape backslashes
                    
                    console.log('✅ Ricostruzione manuale riuscita');
                    return { componentCode };
                }
            } catch (manualError) {
                console.error('❌ Anche la ricostruzione manuale è fallita:', manualError.message);
            }
            
            console.error('❌ Tutti i metodi di parsing falliti');
            console.error('📄 Contenuto finale problematico:', fixed.substring(0, 500) + '...');
            return null;
        }
    }
}

async function generateWithGemini(prompt, expectJson = false) {
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            console.log(`  → Tentativo ${attempt + 1}/${MAX_RETRIES} con Gemini...`);
            
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ 
                        parts: [{ 
                            text: expectJson ? 
                                `${prompt}\n\nIMPORTANTE: Restituisci SOLO JSON valido, senza markdown o altri testi.` : 
                                prompt 
                        }] 
                    }],
                    generationConfig: { 
                        responseMimeType: expectJson ? "application/json" : "text/plain",
                        maxOutputTokens: 8192,
                        temperature: 0.1,  // Ridotto ancora di più per più consistenza
                        topP: 0.8,
                        topK: 10
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_NONE"
                        }
                    ]
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const textContent = data.candidates[0].content.parts[0].text;
                
                console.log('📤 Contenuto ricevuto da Gemini:', textContent.substring(0, 100) + '...');
                
                if (expectJson) {
                    const parsed = cleanAndParseJSON(textContent);
                    if (parsed && parsed.componentCode) {
                        console.log('  ✅ JSON parsato con successo');
                        return parsed;
                    } else {
                        throw new Error('JSON parsing fallito: componentCode mancante');
                    }
                }
                
                return textContent;
            }
            
            // Gestione rate limiting e altri errori...
            if (response.status === 429) {
                const delay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
                console.warn(`  → Rate limit Gemini. Attendo ${delay / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                const errorText = await response.text();
                throw new Error(`Errore API Gemini: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error(`  → Errore tentativo ${attempt + 1}:`, error.message);
            
            if (attempt === MAX_RETRIES - 1) {
                console.error('  ❌ Tutti i tentativi con Gemini falliti');
                return null;
            }
            
            // Attesa progressiva tra tentativi
            const delay = 5000 * (attempt + 1);
            console.log(`  ⏳ Attendo ${delay/1000}s prima del prossimo tentativo...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return null;
}

async function generateWithOpenAI(prompt, expectJson = false) {
    if (!OPENAI_API_KEY) {
        console.log('  → Chiave API OpenAI non disponibile. Impossibile effettuare il fallback.');
        return null;
    }
    
    console.log('  → Tentativo di fallback su OpenAI...');
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${OPENAI_API_KEY}` 
            },
            body: JSON.stringify({
                model: "gpt-4-turbo",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: expectJson ? "json_object" : "text" },
                max_tokens: 4096
            }),
        });
        
        if (!response.ok) {
            throw new Error(`Errore API OpenAI: ${response.status}`);
        }
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        return expectJson ? JSON.parse(content) : content;
    } catch (error) {
        console.error('  → Errore durante la generazione con OpenAI:', error.message);
        return null;
    }
}

async function attemptGeneration(prompt, expectJson = false) {
    let result = await generateWithGemini(prompt, expectJson);
    if (result) return result;

    console.log(`  → Fallback su OpenAI dopo ${MAX_RETRIES} tentativi falliti con Gemini.`);
    return await generateWithOpenAI(prompt, expectJson);
}

// ========================================
// FILE OPERATIONS (UGUALI)
// ========================================
async function saveComponentToFile(componentName, componentCode) {
    await fs.mkdir(COMPONENTS_DIR, { recursive: true });
    const filePath = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
    await fs.writeFile(filePath, componentCode);
    console.log(`  → Componente salvato: ${componentName}.tsx`);
}

async function saveContentToFile(lang, categorySlug, slug, content) {
    const contentDir = path.join(CONTENT_DIR, lang, categorySlug);
    await fs.mkdir(contentDir, { recursive: true });
    const filePath = path.join(contentDir, `${slug}.md`);
    await fs.writeFile(filePath, content);
    console.log(`  → Contenuto salvato: ${lang}/${categorySlug}/${slug}.md`);
}

// ========================================
// MAIN AUTOMATION LOGIC (UGUALE AL RESTO...)
// ========================================
async function main() {
    // ... resto del codice uguale ...
    // (per brevità non lo riscrivo tutto, è identico)
}

main();
