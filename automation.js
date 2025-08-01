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
// VALIDAZIONE CONFIGURAZIONE
// ========================================
async function validateConfiguration() {
    const errors = [];
    
    console.log('🔍 Validazione configurazione...');
    
    // Verifica .env variables
    if (!SHEET_ID) errors.push('❌ SHEET_ID mancante in .env');
    if (!GEMINI_API_KEY) errors.push('❌ GEMINI_API_KEY mancante in .env');
    
    // Verifica file necessari
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
// UTILITY FUNCTIONS
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
// GOOGLE SHEETS INTEGRATION
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
// AI GENERATION FUNCTIONS
// ========================================


// ========================================
// MIGLIOR GESTIONE JSON - Sostituisci in automation.js
// ========================================

function cleanAndParseJSON(text) {
    // Step 1: Rimuovi markdown code blocks se presenti
    let cleaned = text.replace(/^```json\s*|```\s*$/g, '').trim();
    
    // Step 2: Cerca solo il contenuto tra le prime { e ultime }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    // Step 3: Correggi errori comuni
    cleaned = cleaned
        .replace(/,\s*}/g, '}')          // Rimuovi virgole finali prima di }
        .replace(/,\s*]/g, ']')          // Rimuovi virgole finali prima di ]
        .replace(/:\s*,/g, ': null,')    // Sostituisci valori vuoti con null
        .replace(/\\n/g, '\\\\n')        // Escapa correttamente i newline
        .replace(/\\"/g, '\\\\"')        // Escapa correttamente le virgolette
        .replace(/\n/g, '\\n')           // Converti newline reali in escape sequences
        .replace(/\r/g, '\\r')           // Converti carriage return
        .replace(/\t/g, '\\t');          // Converti tab
    
    try {
        return JSON.parse(cleaned);
    } catch (parseError) {
        console.error('❌ Errore parsing JSON dopo pulizia:', parseError.message);
        console.error('📄 Contenuto problematico:', cleaned.substring(0, 500) + '...');
        return null;
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
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { 
                        responseMimeType: expectJson ? "application/json" : "text/plain",
                        maxOutputTokens: 8192,
                        temperature: 0.3  // Ridotto per più consistenza
                    }
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const textContent = data.candidates[0].content.parts[0].text;
                
                if (expectJson) {
                    const parsed = cleanAndParseJSON(textContent);
                    if (parsed) {
                        console.log('  ✅ JSON parsato con successo');
                        return parsed;
                    } else {
                        throw new Error('JSON parsing fallito dopo pulizia');
                    }
                }
                
                return textContent;
            }
            
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
// FILE OPERATIONS
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
// MAIN AUTOMATION LOGIC
// ========================================
async function main() {
    try {
        // Validazione configurazione
        await validateConfiguration();
        
        // Carica prompt
        console.log('📝 Caricamento prompt...');
        const componentPrompt = await fs.readFile(PROMPT_COMPONENT_FILE, 'utf8');
        const contentPrompt = await fs.readFile(PROMPT_CONTENT_FILE, 'utf8');
        console.log('  ✅ Prompt caricati');
        
        // Carica dati da Google Sheets
        const calculators = await readGoogleSheet();
        if (calculators.length === 0) {
            console.log('❌ Nessun calcolatore da processare');
            return;
        }
        
        // Carica stato precedente
        const state = await readState();
        const startIndex = state.lastProcessedIndex + 1;

        if (startIndex >= calculators.length) {
            console.log('✅ Tutti i calcolatori sono già stati processati');
            return;
        }

        console.log(`\n🚀 AVVIO GENERAZIONE`);
        console.log(`📊 Calcolatori totali: ${calculators.length}`);
        console.log(`🎯 Ripresa da indice: ${startIndex} (${calculators.length - startIndex} rimanenti)`);
        console.log('');

        // Loop di generazione
        for (let index = startIndex; index < calculators.length; index++) {
            const calculator = calculators[index];
            
            // Validazione dati calcolatore
            if (!calculator.Titolo || !calculator.Slug || !calculator.Categoria || !calculator.Lingua) {
                console.warn(`\n[${index + 1}/${calculators.length}] ⚠️  Saltato - dati mancanti:`, {
                    titolo: calculator.Titolo,
                    slug: calculator.Slug,
                    categoria: calculator.Categoria,
                    lingua: calculator.Lingua
                });
                continue;
            }

            console.log(`\n[${index + 1}/${calculators.length}] 🔧 Generazione: "${calculator.Titolo}"`);
            console.log(`  📂 Categoria: ${calculator.Categoria}`);
            console.log(`  🌍 Lingua: ${calculator.Lingua}`);
            console.log(`  🔗 Slug: ${calculator.Slug}`);

            // Generazione componente
            console.log('  🎨 Generazione componente React...');
            const componentPromptFull = `${componentPrompt}\n\nINPUT STRUTTURATO (JSON):\n\`\`\`json\n${JSON.stringify(calculator, null, 2)}\n\`\`\``;
            const componentResult = await attemptGeneration(componentPromptFull, true);
            
            if (!componentResult || !componentResult.componentCode) {
                console.error('  ❌ Generazione componente fallita - salto');
                continue;
            }

            const componentName = `${toPascalCase(calculator.Slug)}Calculator`;
            await saveComponentToFile(componentName, componentResult.componentCode);

            // Generazione contenuto
            console.log('  📄 Generazione contenuto markdown...');
            const contentPromptFull = `${contentPrompt}\n\nTitolo del Calcolatore: \`${calculator.Titolo}\``;
            const contentResult = await attemptGeneration(contentPromptFull, false);
            
            if (!contentResult) {
                console.error('  ❌ Generazione contenuto fallita - salvo solo componente');
            } else {
                const categorySlug = slugify(calculator.Categoria);
                await saveContentToFile(calculator.Lingua, categorySlug, calculator.Slug, contentResult);
            }

            // Salva stato
            await saveState({ lastProcessedIndex: index });
            console.log(`  ✅ Completato: ${componentName}`);

            // Pausa tra generazioni (evita rate limiting)
            if (index < calculators.length - 1) {
                console.log('  ⏳ Pausa 60 secondi...');
                await new Promise(resolve => setTimeout(resolve, 60000));
            }
        }

        console.log('\n🎉 GENERAZIONE COMPLETATA!');
        console.log(`📊 Totale processati: ${calculators.length}`);
        console.log('');
        console.log('🚀 PROSSIMI PASSI:');
        console.log('1. npm run dev        # Testa i nuovi calcolatori');
        console.log('2. npm run build      # Build di produzione');
        console.log('3. Controlla i file generati in components/calculators/');

    } catch (error) {
        console.error('\n❌ ERRORE CRITICO:', error);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// ========================================
// AVVIO SCRIPT
// ========================================
main();
