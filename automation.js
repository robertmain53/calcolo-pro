import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ========================================
// CONFIGURAZIONE GEMINI PRO OTTIMIZZATA
// ========================================

// Rate limits Gemini Pro (con billing attivato)
const GEMINI_PRO_LIMITS = {
    requestsPerMinute: 360,      // 24x più alto del free
    requestsPerDay: 30000,       // 20x più alto del free
    tokensPerMinute: 4000000,    // 125x più alto del free
    windowSeconds: 60
};

// Rate limiting ottimizzato per Pro (80% dei limiti per sicurezza)
const SAFE_REQUESTS_PER_MINUTE = Math.floor(GEMINI_PRO_LIMITS.requestsPerMinute * 0.8); // 288
const REQUEST_DELAY_MS = Math.ceil(60000 / SAFE_REQUESTS_PER_MINUTE); // ~210ms
const BATCH_DELAY_MS = 1000; // 1 secondo tra batch
const MAX_RETRIES = 3;
const BATCH_SIZE = 5; // Processa 5 calcolatori in parallelo

// ========================================
// SISTEMA DI LOGGING AVANZATO
// ========================================

class Logger {
    constructor() {
        this.startTime = Date.now();
        this.logFile = path.join(__dirname, `automation_log_${new Date().toISOString().substring(0, 10)}.log`);
        this.stats = {
            totalProcessed: 0,
            successful: 0,
            failed: 0,
            skipped: 0,
            apiCalls: 0,
            rateLimitHits: 0,
            costEstimate: 0
        };
    }

    timestamp() {
        return new Date().toISOString().substring(11, 19);
    }

    async log(level, category, message, data = null) {
        const ts = this.timestamp();
        const elapsed = Math.round((Date.now() - this.startTime) / 1000);
        
        const colors = {
            INFO: '\x1b[36m',    // Cyan
            SUCCESS: '\x1b[32m', // Green
            WARNING: '\x1b[33m', // Yellow
            ERROR: '\x1b[31m',   // Red
            DEBUG: '\x1b[35m',   // Magenta
            RESET: '\x1b[0m'     // Reset
        };

        const icons = {
            INIT: '🚀',
            CONFIG: '⚙️',
            SHEETS: '📊',
            AI: '🤖',
            FILE: '📄',
            PROGRESS: '📈',
            STATS: '📊',
            ERROR: '❌',
            SUCCESS: '✅',
            WARNING: '⚠️',
            RATE_LIMIT: '⏰',
            QUOTA: '💎',
            BATCH: '📦',
            COST: '💰'
        };

        const color = colors[level] || colors.INFO;
        const icon = icons[category] || '📝';
        const prefix = `${color}[${ts}|${elapsed}s] ${icon} ${category}${colors.RESET}`;
        
        console.log(`${prefix}: ${message}`);
        
        if (data) {
            if (typeof data === 'object') {
                console.log(`${color}   └─ Data:${colors.RESET}`, JSON.stringify(data, null, 2));
            } else {
                console.log(`${color}   └─ ${data}${colors.RESET}`);
            }
        }

        const logEntry = `[${ts}|${elapsed}s] ${category}: ${message}${data ? ' | Data: ' + JSON.stringify(data) : ''}\n`;
        try {
            await fs.appendFile(this.logFile, logEntry);
        } catch (e) {
            // Ignora errori di scrittura log
        }
    }

    info(category, message, data) { return this.log('INFO', category, message, data); }
    success(category, message, data) { return this.log('SUCCESS', category, message, data); }
    warning(category, message, data) { return this.log('WARNING', category, message, data); }
    error(category, message, data) { return this.log('ERROR', category, message, data); }
    debug(category, message, data) { return this.log('DEBUG', category, message, data); }

    showProgress(current, total, item = '') {
        const percentage = Math.round((current / total) * 100);
        const progressBar = '█'.repeat(Math.round(percentage / 5)) + '░'.repeat(20 - Math.round(percentage / 5));
        const eta = current > 0 ? Math.round(((Date.now() - this.startTime) / current) * (total - current) / 1000) : 0;
        
        console.log(`\x1b[36m📈 PROGRESS\x1b[0m: [${progressBar}] ${percentage}% (${current}/${total}) ETA: ${eta}s ${item ? '| ' + item : ''}`);
        console.log(`\x1b[35m📊 API Stats\x1b[0m: Calls: ${this.stats.apiCalls} | Rate Limits: ${this.stats.rateLimitHits} | Cost: ~$${this.stats.costEstimate.toFixed(3)}`);
    }

    showStats() {
        const elapsed = Math.round((Date.now() - this.startTime) / 1000);
        const minutes = (elapsed / 60).toFixed(1);
        console.log(`\n\x1b[36m📊 STATISTICHE FINALI\x1b[0m:`);
        console.log(`   ⏱️  Tempo trascorso: ${elapsed}s (${minutes}min)`);
        console.log(`   ✅ Completati: ${this.stats.successful}`);
        console.log(`   ❌ Falliti: ${this.stats.failed}`);
        console.log(`   ⏭️  Saltati: ${this.stats.skipped}`);
        console.log(`   📊 Totale processati: ${this.stats.totalProcessed}`);
        console.log(`   🤖 Chiamate API: ${this.stats.apiCalls}`);
        console.log(`   ⏰ Rate limit hits: ${this.stats.rateLimitHits}`);
        console.log(`   💰 Costo stimato: $${this.stats.costEstimate.toFixed(3)}`);
        console.log(`   ⚡ Velocità: ${(this.stats.successful / (elapsed / 60)).toFixed(1)} calcolatori/min`);
    }

    incrementStat(type) {
        this.stats[type]++;
        if (type !== 'apiCalls' && type !== 'rateLimitHits') {
            this.stats.totalProcessed++;
        }
        if (type === 'apiCalls') {
            this.stats.costEstimate += 0.003; // ~$0.003 per chiamata API
        }
    }
}

const logger = new Logger();

// ========================================
// CONFIGURAZIONE
// ========================================

console.log('\x1b[35m');
console.log('╔══════════════════════════════════════════════════╗');
console.log('║        🚀 SoCalSolver Professional v3.0         ║');
console.log('║       Ottimizzato per Gemini Pro + Billing      ║');
console.log('║          ⚡ Ultra-Fast Batch Processing          ║');
console.log('╚══════════════════════════════════════════════════╝');
console.log('\x1b[0m');

await logger.info('INIT', 'Avvio sistema ottimizzato per Gemini Pro...');

// Configurazione Google Sheet specifica
const SHEET_ID = '1n8zmt8-EQ_fWK486pQREh67q8v95yj2L_Rt1vemSY0s';
const SHEET_NAME = 'calculators';
const DEFAULT_LANGUAGE = 'it'; // Lingua di default per il salvataggio dei contenuti

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

const COMPONENTS_DIR = path.join(__dirname, 'components', 'calculators');
const CONTENT_DIR = path.join(__dirname, 'content');
const PROMPT_COMPONENT_FILE = path.join(__dirname, 'prompt_component.txt');
const PROMPT_CONTENT_FILE = path.join(__dirname, 'prompt_content.txt');
const CREDENTIALS_FILE = path.join(__dirname, 'credentials.json');
const STATE_FILE = path.join(__dirname, 'automation_state.json');

// ========================================
// QUOTA TRACKER PER GEMINI PRO
// ========================================

class GeminiProQuotaTracker {
    constructor() {
        this.requestsThisMinute = 0;
        this.requestsToday = 0;
        this.minuteStartTime = Date.now();
        this.dayStartTime = this.getDayStart();
        this.requestTimes = [];
    }

    getDayStart() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.getTime();
    }

    async canMakeRequest() {
        const now = Date.now();
        
        // Reset contatori se necessario
        if (now >= this.dayStartTime + 24 * 60 * 60 * 1000) {
            this.requestsToday = 0;
            this.dayStartTime = this.getDayStart();
            await logger.info('QUOTA', 'Reset quota giornaliera');
        }

        if (now >= this.minuteStartTime + 60000) {
            this.requestsThisMinute = 0;
            this.minuteStartTime = now;
            this.requestTimes = [];
        }

        // Pulisci richieste vecchie
        this.requestTimes = this.requestTimes.filter(time => now - time < 60000);
        this.requestsThisMinute = this.requestTimes.length;

        // Controlla limiti Pro
        if (this.requestsToday >= GEMINI_PRO_LIMITS.requestsPerDay) {
            return { canProceed: false, reason: 'daily_limit' };
        }

        if (this.requestsThisMinute >= SAFE_REQUESTS_PER_MINUTE) {
            const oldestRequest = Math.min(...this.requestTimes);
            const waitTime = 60000 - (now - oldestRequest);
            return { canProceed: false, reason: 'minute_limit', waitTime };
        }

        return { canProceed: true };
    }

    async recordRequest() {
        const now = Date.now();
        this.requestTimes.push(now);
        this.requestsThisMinute++;
        this.requestsToday++;
    }

    getStats() {
        return {
            requestsThisMinute: this.requestsThisMinute,
            requestsToday: this.requestsToday,
            minuteCapacity: SAFE_REQUESTS_PER_MINUTE,
            dailyCapacity: GEMINI_PRO_LIMITS.requestsPerDay,
            minutePercentage: Math.round((this.requestsThisMinute / SAFE_REQUESTS_PER_MINUTE) * 100),
            dailyPercentage: Math.round((this.requestsToday / GEMINI_PRO_LIMITS.requestsPerDay) * 100)
        };
    }
}

const quotaTracker = new GeminiProQuotaTracker();

// ========================================
// UTILITÀ
// ========================================

async function validateConfiguration() {
    await logger.info('CONFIG', 'Inizio validazione configurazione...');
    const errors = [];
    
    if (!GEMINI_API_KEY) {
        errors.push('GEMINI_API_KEY mancante in .env');
        await logger.error('CONFIG', 'GEMINI_API_KEY mancante');
    }
    
    const requiredFiles = [
        { path: CREDENTIALS_FILE, name: 'credentials.json' },
        { path: PROMPT_COMPONENT_FILE, name: 'prompt_component.txt' },
        { path: PROMPT_CONTENT_FILE, name: 'prompt_content.txt' }
    ];
    
    for (const file of requiredFiles) {
        try {
            await fs.access(file.path);
            await logger.success('CONFIG', `${file.name} trovato`);
        } catch {
            errors.push(`${file.name} non trovato`);
            await logger.error('CONFIG', `${file.name} mancante`);
        }
    }
    
    if (errors.length > 0) {
        await logger.error('CONFIG', 'Validazione fallita', { errori: errors });
        process.exit(1);
    }
    
    await logger.success('CONFIG', 'Validazione completata con successo');
    await logger.info('CONFIG', `Google Sheet ID: ${SHEET_ID}`);
    await logger.info('CONFIG', `Sheet Name: ${SHEET_NAME}`);
    await logger.info('CONFIG', `Lingua default: ${DEFAULT_LANGUAGE} (colonna D ignorata)`);
    return true;
}

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
        const state = JSON.parse(data);
        await logger.info('CONFIG', 'Stato precedente caricato', state);
        return state;
    } catch {
        await logger.info('CONFIG', 'Nessuno stato precedente - primo avvio');
        return { lastProcessedIndex: -1 };
    }
}

async function saveState(state) {
    await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
    await logger.debug('FILE', 'Stato salvato', state);
}

function cleanAndParseJSON(text) {
    let cleaned = text.replace(/^```json\s*|```\s*$/gm, '').trim();
    
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    try {
        return JSON.parse(cleaned);
    } catch (firstError) {
        let fixed = cleaned
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            .replace(/:\s*,/g, ': null,')
            .replace(/:\s*}/g, ': null}')
            .replace(/\\\\n/g, '\\n')
            .replace(/\\\\"/g, '\\"')
            .replace(/\\\\t/g, '\\t')
            .replace(/\\\\r/g, '\\r')
            .replace(/\\\\\\/g, '\\')
            .replace(/\n\s*/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
        
        try {
            return JSON.parse(fixed);
        } catch (secondError) {
            // Fallback: estrai componentCode manualmente
            const componentMatch = fixed.match(/"componentCode"\s*:\s*"([^"]*(?:\\.[^"]*)*?)"/);
            const contentMatch = fixed.match(/"content"\s*:\s*"([^"]*(?:\\.[^"]*)*?)"/);
            
            const result = {};
            if (componentMatch) {
                result.componentCode = componentMatch[1]
                    .replace(/\\"/g, '"')
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t')
                    .replace(/\\r/g, '\r')
                    .replace(/\\\\/g, '\\');
            }
            if (contentMatch) {
                result.content = contentMatch[1]
                    .replace(/\\"/g, '"')
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t')
                    .replace(/\\r/g, '\r')
                    .replace(/\\\\/g, '\\');
            }
            
            return Object.keys(result).length > 0 ? result : null;
        }
    }
}

// ========================================
// GENERAZIONE COMBINATA GEMINI PRO
// ========================================

async function generateCombinedContent(calculator, componentPrompt, contentPrompt) {
    // Combina i due prompt in uno solo per ridurre del 50% le chiamate API
    const combinedPrompt = `
GENERAZIONE COMBINATA: COMPONENTE REACT + CONTENUTO MARKDOWN

=== PARTE 1: COMPONENTE REACT ===
${componentPrompt}

=== PARTE 2: CONTENUTO MARKDOWN ===
${contentPrompt}

=== DATI INPUT ===
Titolo: ${calculator.Titolo}
Slug: ${calculator.Slug}
Categoria: ${calculator.Categoria}
Descrizione: ${calculator.Descrizione || ''}

Dati completi:
\`\`\`json
${JSON.stringify(calculator, null, 2)}
\`\`\`

=== FORMATO RISPOSTA RICHIESTO ===
Restituisci un JSON con questa struttura esatta:
\`\`\`json
{
    "componentCode": "// Codice completo del componente React qui...",
    "content": "# Contenuto markdown completo qui..."
}
\`\`\`

IMPORTANTE: 
- Genera ENTRAMBI i contenuti in un'unica risposta
- Usa JSON valido senza escape aggiuntivi
- componentCode deve essere codice React completo e funzionante
- content deve essere markdown SEO-ottimizzato in italiano
- Non fare riferimento alla lingua nei contenuti (usa sempre italiano)
`;

    return await generateWithGemini(combinedPrompt, true, 'combined');
}

async function generateWithGemini(prompt, expectJson = false, requestType = 'unknown') {
    // Controlla quota prima della chiamata
    const quotaCheck = await quotaTracker.canMakeRequest();
    if (!quotaCheck.canProceed) {
        if (quotaCheck.reason === 'daily_limit') {
            await logger.error('QUOTA', 'Quota giornaliera esaurita!');
            throw new Error('QUOTA_EXHAUSTED_DAILY');
        } else if (quotaCheck.reason === 'minute_limit') {
            await logger.warning('QUOTA', `Rate limit raggiunto, attesa ${Math.ceil(quotaCheck.waitTime/1000)}s...`);
            await new Promise(resolve => setTimeout(resolve, quotaCheck.waitTime + 100));
        }
    }

    logger.stats.apiCalls++;
    await quotaTracker.recordRequest();
    
    await logger.debug('AI', `Inizio generazione Gemini Pro (JSON: ${expectJson}, Type: ${requestType})`);
    
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            await logger.info('AI', `Tentativo ${attempt + 1}/${MAX_RETRIES} con Gemini Pro per ${requestType}...`);
            
            // Piccolo delay tra richieste per rispettare rate limits
            if (attempt > 0) {
                await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY_MS * attempt));
            }
            
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ 
                        parts: [{ 
                            text: expectJson ? 
                                `${prompt}\n\nIMPORTANTE: Restituisci SOLO JSON valido, senza markdown o commenti.` : 
                                prompt 
                        }] 
                    }],
                    generationConfig: { 
                        responseMimeType: expectJson ? "application/json" : "text/plain",
                        maxOutputTokens: 8192,
                        temperature: 0.1,
                        topP: 0.8,
                        topK: 10
                    }
                }),
            });

            await logger.debug('AI', `Risposta Gemini Pro per ${requestType}: Status ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                const textContent = data.candidates[0].content.parts[0].text;
                
                if (expectJson) {
                    const parsed = cleanAndParseJSON(textContent);
                    if (parsed && (parsed.componentCode || parsed.content)) {
                        await logger.success('AI', `JSON parsato con successo per ${requestType}`);
                        
                        // Log statistiche quota
                        const stats = quotaTracker.getStats();
                        await logger.debug('QUOTA', `Quota status: ${stats.requestsToday}/${stats.dailyCapacity} giornaliere (${stats.dailyPercentage}%)`);
                        
                        return parsed;
                    } else {
                        throw new Error('JSON parsing fallito: componentCode o content mancante');
                    }
                }
                
                await logger.success('AI', `Generazione completata per ${requestType}`);
                return textContent;
            }
            
            if (response.status === 429) {
                logger.stats.rateLimitHits++;
                await logger.error('AI', `Rate limit hit per ${requestType}! (Non dovrebbe accadere con Pro)`);
                
                // Delay esteso per recupero
                const extendedDelay = 10000 * (attempt + 1);
                await logger.warning('AI', `Attesa estesa di ${extendedDelay/1000}s per recupero...`);
                await new Promise(resolve => setTimeout(resolve, extendedDelay));
                continue;
            } else {
                const errorText = await response.text();
                throw new Error(`Errore API Gemini: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            await logger.error('AI', `Errore tentativo ${attempt + 1} per ${requestType}`, { error: error.message });
            
            if (attempt === MAX_RETRIES - 1) {
                await logger.error('AI', `Tutti i tentativi con Gemini falliti per ${requestType}`);
                return null;
            }
            
            const delay = 2000 * (attempt + 1);
            await logger.warning('AI', `Pausa ${delay/1000}s prima del prossimo tentativo...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    return null;
}

// ========================================
// FILE OPERATIONS
// ========================================

async function readGoogleSheet() {
    await logger.info('SHEETS', 'Connessione a Google Sheets in corso...');
    
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: CREDENTIALS_FILE,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });
        
        // Legge tutte le colonne A:E ma ignorerà la colonna D (lingua) nel processing
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: `${SHEET_NAME}!A:E`,
        });

        const rows = res.data.values;
        
        if (!rows || rows.length < 2) {
            await logger.error('SHEETS', 'Nessun dato trovato nel Google Sheet');
            return [];
        }

        const header = rows[0].map(h => h.trim());
        const dataRows = rows.slice(1);
        
        await logger.success('SHEETS', `Dati caricati con successo`, {
            righe_dati: dataRows.length,
            colonne: header.length,
            note: 'Colonna D (lingua) verrà ignorata'
        });
        
        const data = dataRows.map((row, index) => {
            let obj = { _rowIndex: index };
            header.forEach((key, colIndex) => {
                // Salta la colonna D (indice 3) che corrisponde alla lingua
                if (colIndex === 3) {
                    return; // Ignora la colonna lingua
                }
                obj[key] = row[colIndex] || ''; 
            });
            
            // Aggiungi la lingua di default per compatibilità con il resto del codice
            obj.Lingua = DEFAULT_LANGUAGE;
            
            return obj;
        });
        
        await logger.info('SHEETS', `Configurazione: Lingua impostata automaticamente a "${DEFAULT_LANGUAGE}" per tutti i calcolatori`);
        
        return data;
        
    } catch (error) {
        await logger.error('SHEETS', 'Errore connessione Google Sheets', {
            error: error.message
        });
        throw error;
    }
}

async function saveComponentToFile(componentName, componentCode) {
    await fs.mkdir(COMPONENTS_DIR, { recursive: true });
    const filePath = path.join(COMPONENTS_DIR, `${componentName}.tsx`);
    await fs.writeFile(filePath, componentCode);
    await logger.success('FILE', `Componente salvato: ${componentName}.tsx`);
}

async function saveContentToFile(lang, categorySlug, slug, content) {
    // Usa sempre la lingua di default invece di quella dal foglio
    const contentDir = path.join(CONTENT_DIR, DEFAULT_LANGUAGE, categorySlug);
    await fs.mkdir(contentDir, { recursive: true });
    const filePath = path.join(contentDir, `${slug}.md`);
    await fs.writeFile(filePath, content);
    await logger.success('FILE', `Contenuto salvato: ${DEFAULT_LANGUAGE}/${categorySlug}/${slug}.md`);
}

// ========================================
// BATCH PROCESSING OTTIMIZZATO
// ========================================

async function processBatch(batch, batchIndex, totalBatches, componentPrompt, contentPrompt) {
    await logger.info('BATCH', `Processing batch ${batchIndex + 1}/${totalBatches} (${batch.length} items)`);
    
    const batchPromises = batch.map(async (calculator, index) => {
        // Stagger delle richieste nel batch per evitare spike
        const delay = index * REQUEST_DELAY_MS;
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        try {
            // Validazione: ora richiede solo Titolo, Slug e Categoria (lingua ignorata)
            if (!calculator.Titolo || !calculator.Slug || !calculator.Categoria) {
                logger.incrementStat('skipped');
                await logger.warning('BATCH', `Skipped: dati mancanti per ${calculator.Titolo || 'UNNAMED'}`, {
                    titolo: calculator.Titolo,
                    slug: calculator.Slug,
                    categoria: calculator.Categoria
                });
                return { success: false, reason: 'missing_data', calculator };
            }

            // Generazione combinata (1 chiamata invece di 2)
            const result = await generateCombinedContent(calculator, componentPrompt, contentPrompt);
            
            if (!result) {
                logger.incrementStat('failed');
                return { success: false, reason: 'generation_failed', calculator };
            }

            // Salva componente se presente
            if (result.componentCode) {
                const componentName = `${toPascalCase(calculator.Slug)}Calculator`;
                await saveComponentToFile(componentName, result.componentCode);
            }

            // Salva contenuto se presente (usa sempre DEFAULT_LANGUAGE)
            if (result.content) {
                const categorySlug = slugify(calculator.Categoria);
                await saveContentToFile(DEFAULT_LANGUAGE, categorySlug, calculator.Slug, result.content);
            }

            logger.incrementStat('successful');
            return { success: true, calculator, result };

        } catch (error) {
            await logger.error('BATCH', `Errore processing ${calculator.Titolo}`, { error: error.message });
            logger.incrementStat('failed');
            return { success: false, reason: 'error', calculator, error: error.message };
        }
    });
    
    const batchResults = await Promise.all(batchPromises);
    
    // Log risultati batch
    const successful = batchResults.filter(r => r.success).length;
    const failed = batchResults.filter(r => !r.success).length;
    
    await logger.success('BATCH', `Batch ${batchIndex + 1} completato: ${successful} success, ${failed} failed`);
    
    return batchResults;
}

// ========================================
// MAIN AUTOMATION LOGIC
// ========================================

async function main() {
    try {
        await logger.info('INIT', 'Inizio processo principale ottimizzato per Gemini Pro...');
        
        // Mostra configurazione ottimizzata
        console.log('\n⚡ GEMINI PRO CONFIGURATION');
        console.log('===========================');
        console.log(`🚀 Rate limit: ${SAFE_REQUESTS_PER_MINUTE} req/min`);
        console.log(`⏰ Delay tra chiamate: ${REQUEST_DELAY_MS}ms`);
        console.log(`📦 Batch size: ${BATCH_SIZE} calcolatori`);
        console.log(`💰 Costo stimato: ~$0.003 per calcolatore`);
        console.log(`📊 Google Sheet: ${SHEET_ID}`);
        console.log(`📋 Sheet Name: ${SHEET_NAME}`);
        console.log(`🌍 Lingua: ${DEFAULT_LANGUAGE} (colonna D ignorata)`);
        console.log('');
        
        await validateConfiguration();
        
        const componentPrompt = await fs.readFile(PROMPT_COMPONENT_FILE, 'utf8');
        const contentPrompt = await fs.readFile(PROMPT_CONTENT_FILE, 'utf8');
        await logger.success('CONFIG', 'Prompt caricati');
        
        const calculators = await readGoogleSheet();
        if (calculators.length === 0) {
            await logger.error('SHEETS', 'Nessun calcolatore da processare');
            return;
        }
        
        const state = await readState();
        const startIndex = state.lastProcessedIndex + 1;

        if (startIndex >= calculators.length) {
            await logger.warning('PROGRESS', 'Tutti i calcolatori già processati');
            logger.showStats();
            return;
        }

        const remainingCalculators = calculators.slice(startIndex);
        const totalBatches = Math.ceil(remainingCalculators.length / BATCH_SIZE);
        
        console.log(`\n🚀 PROCESSING OVERVIEW`);
        console.log('======================');
        console.log(`📊 Calcolatori totali: ${calculators.length}`);
        console.log(`🎯 Ripresa da indice: ${startIndex}`);
        console.log(`⏳ Rimanenti: ${remainingCalculators.length}`);
        console.log(`📦 Batch totali: ${totalBatches}`);
        console.log(`💰 Costo stimato: ~$${(remainingCalculators.length * 0.003).toFixed(2)}`);
        console.log(`⏱️  Tempo stimato: ${Math.ceil(remainingCalculators.length / SAFE_REQUESTS_PER_MINUTE)} minuti`);
        console.log(`🗂️  Tutti i contenuti salvati in: content/${DEFAULT_LANGUAGE}/`);
        console.log('');

        // Processing dei batch
        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
            const batchStart = batchIndex * BATCH_SIZE;
            const batchEnd = Math.min(batchStart + BATCH_SIZE, remainingCalculators.length);
            const batch = remainingCalculators.slice(batchStart, batchEnd);
            
            // Mostra progresso generale
            const overallProgress = batchStart + 1;
            const overallTotal = remainingCalculators.length;
            logger.showProgress(overallProgress, overallTotal, `Batch ${batchIndex + 1}/${totalBatches}`);
            
            // Processa il batch
            const batchResults = await processBatch(batch, batchIndex, totalBatches, componentPrompt, contentPrompt);
            
            // Aggiorna stato con l'ultimo indice processato in questo batch
            const lastProcessedInBatch = startIndex + batchEnd - 1;
            await saveState({ lastProcessedIndex: lastProcessedInBatch });
            
            // Delay tra batch (solo se non è l'ultimo)
            if (batchIndex < totalBatches - 1) {
                await logger.info('BATCH', `Pausa ${BATCH_DELAY_MS/1000}s tra batch...`);
                await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
            }
            
            // Mostra statistiche quota
            const quotaStats = quotaTracker.getStats();
            if (quotaStats.dailyPercentage > 80) {
                await logger.warning('QUOTA', `Quota al ${quotaStats.dailyPercentage}% - Rimanenti: ${quotaStats.dailyCapacity - quotaStats.requestsToday}`);
            }
        }

        console.log('\n🎉 GENERAZIONE COMPLETATA!');
        console.log('===========================');
        logger.showStats();
        
        const quotaFinalStats = quotaTracker.getStats();
        await logger.success('COST', `Quota utilizzata: ${quotaFinalStats.requestsToday}/${quotaFinalStats.dailyCapacity} (${quotaFinalStats.dailyPercentage}%)`);
        await logger.success('INIT', 'Processo completato con successo');
        
        console.log(`\n📁 RISULTATI:`);
        console.log(`   🔧 Componenti salvati in: ${COMPONENTS_DIR}`);
        console.log(`   📝 Contenuti salvati in: ${CONTENT_DIR}/${DEFAULT_LANGUAGE}/`);

    } catch (error) {
        await logger.error('INIT', 'ERRORE CRITICO', { 
            error: error.message, 
            stack: error.stack 
        });
        console.error('\n❌ ERRORE CRITICO:', error.message);
        
        if (error.message.includes('QUOTA_EXHAUSTED')) {
            console.log('\n💡 SUGGERIMENTI:');
            console.log('   • La quota giornaliera è stata raggiunta');
            console.log('   • Riprova domani o aumenta i limiti nel tuo account Google Cloud');
            console.log('   • Lo script riprenderà dall\'ultimo calcolatore processato');
        }
        
        process.exit(1);
    }
}

// ========================================
// AVVIO SCRIPT
// ========================================

await logger.info('INIT', `Sistema inizializzato - Gemini Pro Mode attivo`);
await logger.info('CONFIG', `Rate limiting: ${SAFE_REQUESTS_PER_MINUTE} req/min, delay ${REQUEST_DELAY_MS}ms`);
await logger.info('CONFIG', `Google Sheet: ${SHEET_ID} (sheet: ${SHEET_NAME})`);
await logger.info('CONFIG', `Lingua: ${DEFAULT_LANGUAGE} - Colonna D del foglio ignorata`);

main();
