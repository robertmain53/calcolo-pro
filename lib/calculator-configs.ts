// lib/calculator-configs.ts
export interface CalculatorConfig {
  difficulty?: 'Facile' | 'Medio' | 'Avanzato';
  estimatedTime?: string;
  relatedTools?: Array<{ name: string; href: string }>;
  disclaimer?: string;
  category?: string;
  description?: string;
}

export interface CategoryConfig {
  name: string;
  path: string;
  contentPath: string;
  componentPath: string;
  calculators: Record<string, CalculatorConfig>;
}

// 🎧 ACUSTICA E TERMOTECNICA
export const acusticaTermotecnica: CategoryConfig = {
  name: "Acustica e Termotecnica",
  path: "acustica-e-termotecnica",
  contentPath: "acustica-e-termotecnica",
  componentPath: "calculators",
  calculators: {
    'trasmittanza-termica-infissi-uw': {
      difficulty: 'Medio',
      estimatedTime: '3-5 min',
      relatedTools: [
        { name: 'Trasmittanza Pareti e Coperture', href: '/acustica-e-termotecnica/trasmittanza-termica-pareti-coperture' },
        { name: 'Verifica Condensa Glaser', href: '/acustica-e-termotecnica/verifica-condensa-glaser' }
      ],
      disclaimer: 'I calcoli sono conformi alla norma UNI EN ISO 10077. Per progetti critici consultare un esperto.'
    },
    'isolamento-acustico-facciata': {
      difficulty: 'Avanzato',
      estimatedTime: '5-10 min',
      relatedTools: [
        { name: 'Potere Fonoisolante Rw', href: '/acustica-e-termotecnica/potere-fonoisolante-rw' },
        { name: 'Rumore Calpestio Lnw', href: '/acustica-e-termotecnica/rumore-calpestio-lnw' }
      ],
      disclaimer: 'Calcolo secondo norma UNI EN ISO 12354-3. I risultati sono validi per condizioni standard.'
    },
    'tempo-riverberazione': {
      difficulty: 'Medio',
      estimatedTime: '2-4 min',
      relatedTools: [
        { name: 'Correzione Acustica Ambienti', href: '/acustica-e-termotecnica/correzione-acustica-ambienti' }
      ]
    },
    'potere-fonoisolante-rw': {
      difficulty: 'Avanzato',
      estimatedTime: '5-8 min',
      relatedTools: [
        { name: 'Isolamento Acustico Facciata', href: '/acustica-e-termotecnica/isolamento-acustico-facciata' }
      ]
    },
    'rumore-calpestio-lnw': {
      difficulty: 'Avanzato', 
      estimatedTime: '4-7 min',
      relatedTools: [
        { name: 'Potere Fonoisolante Rw', href: '/acustica-e-termotecnica/potere-fonoisolante-rw' }
      ]
    },
    'correzione-acustica-ambienti': {
      difficulty: 'Medio',
      estimatedTime: '3-6 min',
      relatedTools: [
        { name: 'Tempo Riverberazione', href: '/acustica-e-termotecnica/tempo-riverberazione' }
      ]
    },
    'verifica-condensa-glaser': {
      difficulty: 'Medio',
      estimatedTime: '4-6 min',
      relatedTools: [
        { name: 'Trasmittanza Termica Infissi', href: '/acustica-e-termotecnica/trasmittanza-termica-infissi-uw' }
      ],
      disclaimer: 'Metodo di Glaser secondo UNI EN ISO 13788. Per analisi precise utilizzare software specializzati.'
    },
    'trasmittanza-termica-pareti-coperture': {
      difficulty: 'Medio',
      estimatedTime: '4-7 min',
      relatedTools: [
        { name: 'Trasmittanza Termica Infissi', href: '/acustica-e-termotecnica/trasmittanza-termica-infissi-uw' }
      ]
    }
  }
};

// 🏗️ COMPUTO SICUREZZA E CANTIERE
export const computoSicurezza: CategoryConfig = {
  name: "Computo, Sicurezza e Cantiere",
  path: "computo-sicurezza-e-cantiere-10-calcolatori",
  contentPath: "computo-sicurezza-e-cantiere-10-calcolatori",
  componentPath: "calculators",
  calculators: {
    'calcolo-compensi-pubblici': {
      difficulty: 'Facile',
      estimatedTime: '1-2 min',
      relatedTools: [
        { name: 'Parcella Privati', href: '/computo-sicurezza-e-cantiere-10-calcolatori/calcolo-parcella-privati' }
      ],
      disclaimer: 'Calcolo basato su D.M. 17/06/2016. Verificare sempre le tariffe aggiornate.'
    },
    'verifica-ancoraggi-linee-vita': {
      difficulty: 'Avanzato',
      estimatedTime: '5-8 min',
      relatedTools: [
        { name: 'Stabilità Ponteggi', href: '/computo-sicurezza-e-cantiere-10-calcolatori/verifica-stabilita-ponteggi' }
      ],
      disclaimer: 'Calcolo secondo UNI 11578 ed EN 795. Per installazioni reali consultare un tecnico abilitato.'
    },
    'calcolo-scavi-rinterri': {
      difficulty: 'Medio',
      estimatedTime: '3-5 min',
      relatedTools: [
        { name: 'Computo Materiali', href: '/computo-sicurezza-e-cantiere-10-calcolatori/computo-materiali-costruzione' }
      ]
    },
    'calcolo-parcella-privati': {
      difficulty: 'Facile',
      estimatedTime: '1-2 min',
      relatedTools: [
        { name: 'Compensi Pubblici', href: '/computo-sicurezza-e-cantiere-10-calcolatori/calcolo-compensi-pubblici' }
      ]
    },
    'computo-materiali-costruzione': {
      difficulty: 'Medio',
      estimatedTime: '3-6 min',
      relatedTools: [
        { name: 'Calcolo Scavi', href: '/computo-sicurezza-e-cantiere-10-calcolatori/calcolo-scavi-rinterri' }
      ]
    },
    'verifica-stabilita-ponteggi': {
      difficulty: 'Avanzato',
      estimatedTime: '7-10 min',
      relatedTools: [
        { name: 'Ancoraggi Linee Vita', href: '/computo-sicurezza-e-cantiere-10-calcolatori/verifica-ancoraggi-linee-vita' }
      ],
      disclaimer: 'Verifica preliminare. Per progetti reali eseguire calcoli strutturali completi.'
    }
  }
};

// 🔄 CONVERTITORI TECNICI AVANZATI
export const convertitoriTecnici: CategoryConfig = {
  name: "Convertitori Tecnici Avanzati",
  path: "convertitori-tecnici-avanzati",
  contentPath: "convertitori-tecnici-avanzati",
  componentPath: "calculators",
  calculators: {
    'convertitore-energia': {
      difficulty: 'Facile',
      estimatedTime: '1 min',
      relatedTools: [
        { name: 'Convertitore Forza', href: '/convertitori-tecnici-avanzati/convertitore-forza' },
        { name: 'Convertitore Pressione', href: '/convertitori-tecnici-avanzati/convertitore-pressione' }
      ]
    },
    'convertitore-classi-acciaio': {
      difficulty: 'Medio',
      estimatedTime: '2-3 min',
      relatedTools: [
        { name: 'Classi Calcestruzzo', href: '/convertitori-tecnici-avanzati/convertitore-classi-calcestruzzo' },
        { name: 'Durezza Materiali', href: '/convertitori-tecnici-avanzati/convertitore-durezza-materiali' }
      ],
      disclaimer: 'Le conversioni sono basate su normative europee. Verificare sempre le specifiche locali.'
    },
    'convertitore-misure-anglosassoni': {
      difficulty: 'Facile',
      estimatedTime: '1 min',
      relatedTools: [
        { name: 'Convertitore Pressione', href: '/convertitori-tecnici-avanzati/convertitore-pressione' }
      ]
    },
    'convertitore-forza': {
      difficulty: 'Facile',
      estimatedTime: '1 min',
      relatedTools: [
        { name: 'Convertitore Energia', href: '/convertitori-tecnici-avanzati/convertitore-energia' }
      ]
    },
    'convertitore-pressione': {
      difficulty: 'Facile',
      estimatedTime: '1 min',
      relatedTools: [
        { name: 'Convertitore Forza', href: '/convertitori-tecnici-avanzati/convertitore-forza' }
      ]
    },
    'convertitore-classi-calcestruzzo': {
      difficulty: 'Medio',
      estimatedTime: '2-3 min',
      relatedTools: [
        { name: 'Classi Acciaio', href: '/convertitori-tecnici-avanzati/convertitore-classi-acciaio' }
      ]
    },
    'convertitore-durezza-materiali': {
      difficulty: 'Medio',
      estimatedTime: '2-3 min',
      relatedTools: [
        { name: 'Classi Acciaio', href: '/convertitori-tecnici-avanzati/convertitore-classi-acciaio' }
      ]
    }
  }
};

// 🏢 INGEGNERIA STRUTTURALE (esempio - aggiungi le tue configurazioni)
export const ingegneriaStrutturale: CategoryConfig = {
  name: "Ingegneria Strutturale",
  path: "ingegneria-strutturale", 
  contentPath: "elettrotecnica-ed-elettricita", // 👈 Nota: nel tuo codice usi questo path
  componentPath: "calculators",
  calculators: {
    'analisi-spettro-risposta-sismico': {
      difficulty: 'Avanzato',
      estimatedTime: '10-15 min',
      relatedTools: [],
      disclaimer: 'Calcolo semplificato secondo NTC 2018. Per progetti reali eseguire analisi complete con software certificati.'
    }
    // 👆 Aggiungi altri calcolatori strutturali qui
  }
};

// 💧 INGEGNERIA IDRAULICA (template - personalizza)
export const ingegneriaIdraulica: CategoryConfig = {
  name: "Ingegneria Idraulica",
  path: "ingegneria-idraulica",
  contentPath: "ingegneria-idraulica", 
  componentPath: "calculators",
  calculators: {
    // 👆 Aggiungi i tuoi calcolatori idraulici qui
  }
};



// 💧 ELETTROTECNICA ED ELETTRICITA (template - personalizza)
export const elettrotecnicaedElettricita: CategoryConfig = {
  name: "Elettrotecnica ed Elettricità",
  path: "elettrotecnica-ed-elettricita",
  contentPath: "elettrotecnica-ed-elettricita", 
  componentPath: "calculators",

  calculators: {
 'btu-watt-conversione': {
      difficulty: 'Facile',
      estimatedTime: '1 min',
      relatedTools: [
        { name: 'Watt In Ampere', href: '/elettrotecnica-ed-elettricita/watt-in-ampere' }
      ]
    }
  }
};



// 💧 TOPOGRAFIAEMATEMATICADIBASE (template - personalizza)
export const topografiaeMatematicadibase: CategoryConfig = {
  name: "Topografia e Matematica di Base",
  path: "topografia-e-matematica-di-base",
  contentPath: "topografia-e-matematica-di-base", 
  componentPath: "calculators",
  calculators: {
    // 👆 Aggiungi i tuoi calcolatori idraulici qui
  }
};


// 🌍 INGEGNERIA GEOTECNICA (template - personalizza)
export const ingegneriaGeotecnica: CategoryConfig = {
  name: "Ingegneria Geotecnica",
  path: "ingegneria-geotecnica",
  contentPath: "ingegneria-geotecnica",
  componentPath: "calculators", 
  calculators: {
    // 👆 Aggiungi i tuoi calcolatori geotecnici qui
  }
};

// 💼 FINANZA E BUSINESS (template - personalizza)
export const finanzaBusiness: CategoryConfig = {
  name: "Finanza e Business",
  path: "finanza-e-business",
  contentPath: "finanza-e-business",
  componentPath: "calculators",
  calculators: {
    // 👆 Aggiungi i tuoi calcolatori finanziari qui
  }
};

// 🔧 STRUMENTI QUOTIDIANI (template - personalizza)  
export const strumentiQuotidiani: CategoryConfig = {
  name: "Strumenti Quotidiani",
  path: "strumenti-quotidiani", 
  contentPath: "strumenti-quotidiani",
  componentPath: "calculators",
  calculators: {
    // 👆 Aggiungi i tuoi strumenti quotidiani qui
  }
};

// 🏗️ EXPORT DI TUTTE LE CONFIGURAZIONI
export const allCategories = {
  'acustica-e-termotecnica': acusticaTermotecnica,
  'computo-sicurezza-e-cantiere-10-calcolatori': computoSicurezza,
  'convertitori-tecnici-avanzati': convertitoriTecnici,
  'ingegneria-strutturale': ingegneriaStrutturale,
  'ingegneria-idraulica': ingegneriaIdraulica,
  'ingegneria-geotecnica': ingegneriaGeotecnica,
  'finanza-e-business': finanzaBusiness,
  'strumenti-quotidiani': strumentiQuotidiani,
  'topografia-e-matematica-di-base': topografiaeMatematicadibase,
  'elettrotecnica-ed-elettricita': elettrotecnicaedElettricita,
};

// 🔧 HELPER FUNCTIONS
export function getCategoryConfig(categorySlug: string): CategoryConfig | null {
  return allCategories[categorySlug as keyof typeof allCategories] || null;
}

export function getCalculatorConfig(categorySlug: string, calculatorSlug: string): CalculatorConfig | null {
  const category = getCategoryConfig(categorySlug);
  return category?.calculators[calculatorSlug] || null;
}