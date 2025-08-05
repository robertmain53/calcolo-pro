#!/bin/bash

# Script per creare le categorie del progetto replicando la struttura di elettrotecnica-ed-elettricita

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Creazione struttura categorie per Calcolo.online${NC}"
echo "=================================================="

# Array associativo per le categorie (nome_categoria:slug)
declare -A categories=(
    ["Ingegneria Geotecnica"]="ingegneria-geotecnica"
    ["Ingegneria Idraulica"]="ingegneria-idraulica"
    ["Acustica e Termotecnica"]="acustica-e-termotecnica"
    ["Computo, Sicurezza e Cantiere (10 Calcolatori)"]="computo-sicurezza-e-cantiere-10-calcolatori"
    ["Convertitori Tecnici Avanzati"]="convertitori-tecnici-avanzati"
    ["Strumenti quotidiani"]="strumenti-quotidiani"
)

# Directory base
APP_DIR="app"
CONTENT_DIR="content"
SOURCE_CATEGORY_SLUG="elettrotecnica-ed-elettricita"
SOURCE_CATEGORY_NAME="Elettrotecnica ed Elettricità"

# Controlla se la directory sorgente esiste
if [ ! -d "$APP_DIR/$SOURCE_CATEGORY_SLUG" ]; then
    echo -e "${RED}❌ Errore: Directory sorgente $APP_DIR/$SOURCE_CATEGORY_SLUG non trovata${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Directory sorgente trovata: $APP_DIR/$SOURCE_CATEGORY_SLUG${NC}"
echo ""

# Funzione per creare una singola categoria
create_category() {
    local category_name="$1"
    local category_slug="$2"
    
    echo -e "${BLUE}📂 Creando categoria: ${category_name} (${category_slug})${NC}"
    
    # Crea la directory principale della categoria
    local main_dir="$APP_DIR/$category_slug"
    if [ ! -d "$main_dir" ]; then
        mkdir -p "$main_dir"
        echo -e "${GREEN}  ✅ Creata directory: $main_dir${NC}"
    else
        echo -e "${YELLOW}  ⚠️  Directory già esistente: $main_dir${NC}"
    fi
    
    # Crea la directory [slug]
    local slug_dir="$main_dir/[slug]"
    if [ ! -d "$slug_dir" ]; then
        mkdir -p "$slug_dir"
        echo -e "${GREEN}  ✅ Creata directory: $slug_dir${NC}"
    else
        echo -e "${YELLOW}  ⚠️  Directory già esistente: $slug_dir${NC}"
    fi
    
    # Crea il page.tsx principale
    local main_page="$main_dir/page.tsx"
    if [ ! -f "$main_page" ]; then
        # Copia e modifica il file page.tsx principale
        cp "$APP_DIR/$SOURCE_CATEGORY_SLUG/page.tsx" "$main_page"
        
        # Sostituzioni nel file principale
        sed -i.bak \
            -e "s|content', '$SOURCE_CATEGORY_SLUG'|content', '$category_slug'|g" \
            -e "s|$SOURCE_CATEGORY_NAME|$category_name|g" \
            -e "s|$SOURCE_CATEGORY_SLUG|$category_slug|g" \
            "$main_page"
        
        # Rimuovi il file di backup
        rm "$main_page.bak" 2>/dev/null
        
        echo -e "${GREEN}  ✅ Creato: $main_page${NC}"
    else
        echo -e "${YELLOW}  ⚠️  File già esistente: $main_page${NC}"
    fi
    
    # Crea il page.tsx per [slug]
    local slug_page="$slug_dir/page.tsx"
    if [ ! -f "$slug_page" ]; then
        # Copia e modifica il file page.tsx per [slug]
        cp "$APP_DIR/$SOURCE_CATEGORY_SLUG/[slug]/page.tsx" "$slug_page"
        
        # Sostituzioni nel file [slug]
        sed -i.bak \
            -e "s|content', '$SOURCE_CATEGORY_SLUG'|content', '$category_slug'|g" \
            -e "s|$SOURCE_CATEGORY_NAME|$category_name|g" \
            -e "s|$SOURCE_CATEGORY_SLUG|$category_slug|g" \
            "$slug_page"
        
        # Rimuovi il file di backup
        rm "$slug_page.bak" 2>/dev/null
        
        echo -e "${GREEN}  ✅ Creato: $slug_page${NC}"
    else
        echo -e "${YELLOW}  ⚠️  File già esistente: $slug_page${NC}"
    fi
    
    # Controlla se esiste la directory di contenuto corrispondente
    local content_dir="$CONTENT_DIR/$category_slug"
    if [ -d "$content_dir" ]; then
        echo -e "${GREEN}  ✅ Directory contenuto esistente: $content_dir${NC}"
    else
        echo -e "${YELLOW}  ⚠️  Directory contenuto non trovata: $content_dir${NC}"
        echo -e "${YELLOW}     Assicurati di creare la directory e i file .md corrispondenti${NC}"
    fi
    
    echo ""
}

# Crea tutte le categorie
echo -e "${BLUE}🔄 Inizio creazione categorie...${NC}"
echo ""

for category_name in "${!categories[@]}"; do
    category_slug="${categories[$category_name]}"
    create_category "$category_name" "$category_slug"
done

echo -e "${GREEN}🎉 Creazione categorie completata!${NC}"
echo ""
echo -e "${BLUE}📋 Riepilogo operazioni:${NC}"
echo -e "${YELLOW}   • Cartelle create in: $APP_DIR/[category-slug]${NC}"
echo -e "${YELLOW}   • Sottocartelle [slug] create per ogni categoria${NC}"
echo -e "${YELLOW}   • File page.tsx copiati e modificati${NC}"
echo ""
echo -e "${BLUE}🔍 Prossimi passi:${NC}"
echo -e "${YELLOW}   1. Verifica che le directory di contenuto esistano in: $CONTENT_DIR/[category-slug]${NC}"
echo -e "${YELLOW}   2. Assicurati che i file .md esistano nelle directory di contenuto${NC}"
echo -e "${YELLOW}   3. Verifica che i componenti React per i calcolatori esistano in: components/calculators/${NC}"
echo -e "${YELLOW}   4. Testa le nuove route nel browser${NC}"
echo ""
echo -e "${GREEN}✨ Script completato con successo!${NC}"
