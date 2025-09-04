/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app/run/watt-in-ampere',
        destination: '/elettrotecnica-ed-elettricita/watt-in-ampere',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-della-sezione-del-cavo',
        destination: '/elettrotecnica-ed-elettricita/calcolo-della-sezione-del-cavo',
        permanent: true,
      },
      {
        source: '/app/run/scorporo-fattura',
        destination: '/finanza-e-business/scorporo-fattura',
        permanent: true,
      },
      {
        source: '/app/run/ebitda',
        destination: '/finanza-e-business/ebitda',
        permanent: true,
      },
      {
        source: '/app/run/ebit',
        destination: '/finanza-e-business/ebit',
        permanent: true,
      },
      {
        source: '/app/run/calcolatore-percentuale',
        destination: '/topografia-e-matematica-di-base/calcolatore-percentuale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-interessi-composti',
        destination: '/finanza-e-business/calcolo-interessi-composti',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-interesse-semplice',
        destination: '/finanza-e-business/calcolo-interesse-semplice',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-rata-mutuo',
        destination: '/finanza-e-business/calcolo-rata-mutuo',
        permanent: true,
      },
      {
        source: '/app/run/conversione-coordinate-wgs84-utm',
        destination: '/topografia-e-matematica-di-base/conversione-coordinate-wgs84-utm',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-indice-di-forma',
        destination: '/topografia-e-matematica-di-base/calcolo-indice-di-forma',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-area-poligono',
        destination: '/topografia-e-matematica-di-base/calcolo-area-poligono',
        permanent: true,
      },
      {
        source: '/app/run/curvatura-terrestre',
        destination: '/topografia-e-matematica-di-base/curvatura-terrestre',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-pendenza',
        destination: '/topografia-e-matematica-di-base/calcolo-pendenza',
        permanent: true,
      },
      {
        source: '/app/run/analisi-spettro-risposta-sismico',
        destination: '/ingegneria-strutturale/analisi-spettro-risposta-sismico',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-psi-ponte-termico',
        destination: '/edilizia/calcolo-psi-ponte-termico',
        permanent: true,
      },
      {
        source: '/app/run/trasmittanza-termica-infissi',
        destination: '/edilizia/trasmittanza-termica-infissi',
        permanent: true,
      },
      {
        source: '/app/run/verifica-condensa-muro',
        destination: '/edilizia/verifica-condensa-muro',
        permanent: true,
      },
      {
        source: '/app/run/sfasamento-termico-muro',
        destination: '/edilizia/sfasamento-termico-muro',
        permanent: true,
      },
      {
        source: '/app/run/fabbisogno-energetico-semplificato',
        destination: '/edilizia/fabbisogno-energetico-semplificato',
        permanent: true,
      },
      {
        source: '/app/run/dimensionamento-fotovoltaico',
        destination: '/edilizia/dimensionamento-fotovoltaico',
        permanent: true,
      },
      {
        source: '/app/run/dimensionamento-cavi-elettrici',
        destination: '/elettrotecnica-ed-elettricita/dimensionamento-cavi-elettrici',
        permanent: true,
      },
      {
        source: '/app/run/caduta-di-tensione',
        destination: '/elettrotecnica-ed-elettricita/caduta-di-tensione',
        permanent: true,
      },
      {
        source: '/app/run/cortocircuito-impianto',
        destination: '/elettrotecnica-ed-elettricita/cortocircuito-impianto',
        permanent: true,
      },
      {
        source: '/app/run/rifasamento-impianto',
        destination: '/elettrotecnica-ed-elettricita/rifasamento-impianto',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-iva',
        destination: '/finanza-e-business/calcolo-iva',
        permanent: true,
      },
      {
        source: '/app/run/curvatura-terra',
        destination: '/strumenti-quotidiani/curvatura-terra',
        permanent: true,
      },
      {
        source: 'app/run/calcolo-delliva-calcolatore-e-guida-dettagliata',
        destination: '/finanza-e-business/calcolo-delliva-calcolatore-e-guida-dettagliata',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tfr',
        destination: '/finanza-e-business/calcolo-tfr',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-codice-fiscale',
        destination: '/anagrafe/calcolo-codice-fiscale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-permesso-soggiorno',
        destination: '/anagrafe/calcolo-permesso-soggiorno',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tasi',
        destination: '/fisco-e-tasse/calcolo-tasi',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-imu',
        destination: '/fisco-e-tasse/calcolo-imu',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tari',
        destination: '/fisco-e-tasse/calcolo-tari',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-isee',
        destination: '/fisco-e-tasse/calcolo-isee',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-irpef',
        destination: '/fisco-e-tasse/calcolo-irpef',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-bollo-auto',
        destination: '/auto/calcolo-bollo-auto',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-passaggio-proprieta-auto',
        destination: '/auto/calcolo-passaggio-proprieta-auto',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-superbollo',
        destination: '/auto/calcolo-superbollo',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-pneumatici',
        destination: '/auto/calcolo-pneumatici',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-codice-iban',
        destination: '/finanza-e-business/calcolo-codice-iban',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-iban-italia',
        destination: '/finanza-e-business/calcolo-iban-italia',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-bic-swift',
        destination: '/finanza-e-business/calcolo-bic-swift',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tariffa-elettrica',
        destination: '/elettrotecnica-ed-elettricita/calcolo-tariffa-elettrica',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-corrente-assorbita',
        destination: '/elettrotecnica-ed-elettricita/calcolo-corrente-assorbita',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-potenza-termica',
        destination: '/acustica-e-termotecnica/calcolo-potenza-termica',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-potenza-frigorifera',
        destination: '/acustica-e-termotecnica/calcolo-potenza-frigorifera',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-potere-calorifico',
        destination: '/acustica-e-termotecnica/calcolo-potere-calorifico',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-imc',
        destination: '/salute/calcolo-imc',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-indice-massa-grassa',
        destination: '/salute/calcolo-indice-massa-grassa',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-eta-biologica',
        destination: '/salute/calcolo-eta-biologica',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-calorie-giornaliere',
        destination: '/salute/calcolo-calorie-giornaliere',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-metabolismo-basale',
        destination: '/salute/calcolo-metabolismo-basale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-pressione-sanguigna',
        destination: '/salute/calcolo-pressione-sanguigna',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-frequenza-cardiaca',
        destination: '/salute/calcolo-frequenza-cardiaca',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-fabbisogno-idrico',
        destination: '/salute/calcolo-fabbisogno-idrico',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-glicemia',
        destination: '/salute/calcolo-glicemia',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-indice-glicemico',
        destination: '/salute/calcolo-indice-glicemico',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-insulina',
        destination: '/salute/calcolo-insulina',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-peso-ideale',
        destination: '/salute/calcolo-peso-ideale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-rischio-cardiovascolare',
        destination: '/salute/calcolo-rischio-cardiovascolare',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-macronutrienti',
        destination: '/salute/calcolo-macronutrienti',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-microelementi',
        destination: '/salute/calcolo-microelementi',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-vitamine',
        destination: '/salute/calcolo-vitamine',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-altezza',
        destination: '/salute/calcolo-altezza',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-età-ossea',
        destination: '/salute/calcolo-età-ossea',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-colesterolo',
        destination: '/salute/calcolo-colesterolo',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tiroide',
        destination: '/salute/calcolo-tiroide',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-ovulazione',
        destination: '/salute/calcolo-ovulazione',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-fertilitá',
        destination: '/salute/calcolo-fertilita',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-giorni-fertili',
        destination: '/salute/calcolo-giorni-fertili',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-mesi-gravidanza',
        destination: '/salute/calcolo-mesi-gravidanza',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-data-parto',
        destination: '/salute/calcolo-data-parto',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-eta-gestazionale',
        destination: '/salute/calcolo-eta-gestazionale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-indice-di-apgar',
        destination: '/salute/calcolo-indice-di-apgar',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-allattamento',
        destination: '/salute/calcolo-allattamento',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-allattamento-artificiale',
        destination: '/salute/calcolo-allattamento-artificiale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-denti-bambini',
        destination: '/salute/calcolo-denti-bambini',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-peso-bambino',
        destination: '/salute/calcolo-peso-bambino',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-percentili-bambino',
        destination: '/salute/calcolo-percentili-bambino',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-crescita',
        destination: '/salute/calcolo-crescita',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-fabbisogno-energetico-bambino',
        destination: '/salute/calcolo-fabbisogno-energetico-bambino',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-vaccini',
        destination: '/salute/calcolo-vaccini',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-pensione',
        destination: '/finanza-e-business/calcolo-pensione',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-prestito',
        destination: '/finanza-e-business/calcolo-prestito',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-rata-prestito',
        destination: '/finanza-e-business/calcolo-rata-prestito',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-cedolare-secca',
        destination: '/fisco-e-tasse/calcolo-cedolare-secca',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-tassa-rifiuti',
        destination: '/fisco-e-tasse/calcolo-tassa-rifiuti',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-carta-prepagata',
        destination: '/finanza-e-business/calcolo-carta-prepagata',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-estratto-conto',
        destination: '/finanza-e-business/calcolo-estratto-conto',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-piano-ammortamento',
        destination: '/finanza-e-business/calcolo-piano-ammortamento',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-cedolino-paga',
        destination: '/fisco-e-tasse/calcolo-cedolino-paga',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-cassa-integrazione',
        destination: '/fisco-e-tasse/calcolo-cassa-integrazione',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-contributi',
        destination: '/fisco-e-tasse/calcolo-contributi',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-congedo-parentale',
        destination: '/fisco-e-tasse/calcolo-congedo-parentale',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-assegni-familiari',
        destination: '/fisco-e-tasse/calcolo-assegni-familiari',
        permanent: true,
      },
      {
        source: '/app/run/calcolo-irap',
        destination: '/fisco-e-tasse/calcolo-irap',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
