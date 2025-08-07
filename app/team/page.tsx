// app/team/page.tsx
import React from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Il Nostro Team | Calcolo.online - Conosci chi lavora per te',
  description:
    'Incontra il team di professionisti dietro Calcolo.online: sviluppatori, matematici, consulenti fiscali e esperti di marketing che rendono possibile il nostro servizio.',
};

const teamMembers = [
  {
    id: 1,
    name: 'Ing. Candido, MBA',
    role: 'CEO & Founder',
    department: 'Leadership',
    bio: "Imprenditore con oltre 15 anni di esperienza nel settore fintech. Ha fondato Calcolo.online con la visione di democratizzare l'accesso agli strumenti di calcolo professionali.",
    image: '👨‍💼',
    specialties: ['Strategia Aziendale', 'Fintech', 'Product Management', 'Ingegneria'],
    education: 'MBA MIB, Laurea in Ingegneria Gestionale',
    experience: '15+ anni',
    achievements: [
      'Founder',
      'Head of Project Management',
    ],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'info@yeahup.net',
    },
  },
  {
    id: 2,
    name: 'Melita Roiatti',
    role: 'CTO & Co-Founder',
    department: 'Technology',
    bio: "Sviluppatrice senior con passione per l'architettura web scalabile e l'user experience. Ex Lead Developer presso Google Zurich, specialista in React, Node.js e cloud computing.",
    image: '👩‍💻',
    specialties: ['Full Stack Development', 'Cloud Architecture', 'UX/UI Design', 'DevOps'],
    education: 'MS Computer Science - Politecnico Milano',
    experience: '12+ anni',
    achievements: [
      'Architetto di sistemi per 10M+ utenti',
      'Contributor open source con 50K+ stars',
      'Google Developer Expert',
    ],
    social: {
      linkedin: '#',
      github: '#',
      email: 'info@yeahup.net',
    },
  },
  {
    id: 3,
    name: 'Robert Main',
    role: 'Head of Mathematics',
    department: 'Quality Assurance',
    bio: "Matematico e consulente fiscale con dottorato in Matematica Finanziaria. Supervisiona la precisione di tutti i nostri algoritmi di calcolo e si occupa dell'aggiornamento normativo continuo.",
    image: '👨‍🔬',
    specialties: ['Matematica Finanziaria', 'Consulenza Fiscale', 'Algoritmi', 'Compliance'],
    education: 'PhD Matematica - Università Statale Milano',
    experience: '10+ anni',
    achievements: [
      'Autore di 15 pubblicazioni scientifiche',
      'Consulente per Agenzia delle Entrate',
      'Certificato ordine dei Dottori Commercialisti',
    ],
    social: {
      linkedin: '#',
      researchgate: '#',
      email: 'info@yeahup.net',
    },
  },
  {
    id: 4,
    name: 'Giulia Neri',
    role: 'Marketing Director',
    department: 'Growth',
    bio: 'Esperta in digital marketing e SEO con track record comprovato nella crescita di piattaforme online. Ex Marketing Manager presso Rocket Internet, specialista in growth hacking e content strategy.',
    image: '👩‍📊',
    specialties: ['Digital Marketing', 'SEO/SEM', 'Growth Hacking', 'Content Strategy'],
    education: 'Master Digital Marketing - SDA Bocconi',
    experience: '8+ anni',
    achievements: [
      'Crescita 500% utenti in 2 anni',
      'Top 1 Google per 100+ keywords',
      'Certificata Google Ads & Analytics',
    ],
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'info@yeahup.net',
    },
  },
   
];

const departments = [
  {
    name: 'Leadership',
    description: 'Guida strategica e visione aziendale',
    icon: '🎯',
    color: 'blue',
    count: 1,
  },
  {
    name: 'Technology',
    description: 'Sviluppo e infrastruttura tecnica',
    icon: '💻',
    color: 'green',
    count: 1,
  },
  {
    name: 'Quality Assurance',
    description: 'Precisione matematica e compliance',
    icon: '🔬',
    color: 'purple',
    count: 1,
  },
  {
    name: 'Growth',
    description: 'Marketing e crescita del business',
    icon: '📈',
    color: 'orange',
    count: 1,
  },
  {
    name: 'Design',
    description: 'User experience e design system',
    icon: '🎨',
    color: 'pink',
    count: 1,
  },
  {
    name: 'Support',
    description: 'Supporto clienti e success',
    icon: '🤝',
    color: 'teal',
    count: 1,
  },
];

const values = [
  {
    title: 'Eccellenza',
    description: 'Puntiamo sempre alla qualità massima in tutto ciò che facciamo',
    icon: StarIcon,
    color: 'yellow',
  },
  {
    title: 'Innovazione',
    description: 'Cerchiamo costantemente nuove soluzioni e tecnologie',
    icon: LightBulbIcon,
    color: 'blue',
  },
  {
    title: 'Collaborazione',
    description: 'Lavoriamo insieme come un team unito verso obiettivi comuni',
    icon: UserGroupIcon,
    color: 'green',
  },
  {
    title: 'Inclusività',
    description: 'Rispettiamo la diversità e creiamo un ambiente accogliente per tutti',
    icon: HeartIcon,
    color: 'red',
  },
  {
    title: 'Impact Globale',
    description: 'Vogliamo fare la differenza nella vita dei nostri utenti in tutto il mondo',
    icon: GlobeAltIcon,
    color: 'purple',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm breadcrumbs">
          <ul className="flex space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">Team</li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <UserGroupIcon className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Il Nostro Team
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Incontra le persone straordinarie che ogni giorno lavorano per rendere{' '}
          <strong>Calcolo.online</strong> la piattaforma di calcolatori più
          affidabile e innovativa d'Italia.
        </p>
        <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <AcademicCapIcon className="w-5 h-5 mr-2" />
            <span>6 Esperti</span>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            <span>60+ Anni di Esperienza</span>
          </div>
          <div className="flex items-center">
            <GlobeAltIcon className="w-5 h-5 mr-2" />
            <span>4 Continenti</span>
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          I Nostri Dipartimenti
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-2">{dept.icon}</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                {dept.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{dept.description}</p>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {dept.count} persona{dept.count > 1 ? 'e' : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="text-6xl">{member.image}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {member.role}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-1" />
                        {member.experience}
                      </span>
                      <span className="flex items-center">
                        <AcademicCapIcon className="w-4 h-4 mr-1" />
                        {member.education.split(' - ')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Specialità:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Risultati Principali:
                  </h4>
                  <ul className="space-y-1">
                    {member.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-center"
                      >
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Education & Department */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Formazione
                    </h4>
                    <p className="text-gray-700 text-sm">{member.education}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      Dipartimento
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {member.department}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title={`${member.name} su ${platform}`}
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50">
                          {platform === 'email' && '✉️'}
                          {platform === 'linkedin' && '💼'}
                          {platform === 'twitter' && '🐦'}
                          {platform === 'github' && '💻'}
                          {platform === 'behance' && '🎨'}
                          {platform === 'researchgate' && '🔬'}
                        </div>
                      </a>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Contatta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            I Nostri Valori
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Questi principi guidano ogni nostra decisione e ci aiutano a creare
            un ambiente di lavoro stimolante e prodotti di qualità eccezionale.
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      value.color === 'yellow'
                        ? 'bg-yellow-100'
                        : value.color === 'blue'
                        ? 'bg-blue-100'
                        : value.color === 'green'
                        ? 'bg-green-100'
                        : value.color === 'red'
                        ? 'bg-red-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${
                        value.color === 'yellow'
                          ? 'text-yellow-600'
                          : value.color === 'blue'
                          ? 'text-blue-600'
                          : value.color === 'green'
                          ? 'text-green-600'
                          : value.color === 'red'
                          ? 'text-red-600'
                          : 'text-purple-600'
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vuoi Unirti al Nostro Team?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Siamo sempre alla ricerca di talenti straordinari che condividano la
            nostra passione per l'innovazione e l'eccellenza.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Crescita Rapida</h3>
              <p className="text-blue-100 text-sm">
                Opportunità di crescita professionale in un ambiente dinamico e
                stimolante
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-bold mb-2">Progetti Innovativi</h3>
              <p className="text-blue-100 text-sm">
                Lavora su tecnologie all'avanguardia e prodotti che impattano
                milioni di utenti
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Team Inclusivo</h3>
              <p className="text-blue-100 text-sm">
                Un ambiente di lavoro che valorizza la diversità e promuove il
                benessere
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Posizioni Aperte
            </Link>
            <Link
              href="/contatti"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Candidatura Spontanea
            </Link>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Qualche Curiosità Sul Team
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl mb-2">☕</div>
            <div className="text-2xl font-bold text-gray-900">847</div>
            <div className="text-sm text-gray-600">
              Caffè bevuti questa settimana
            </div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-2xl font-bold text-gray-900">6</div>
            <div className="text-sm text-gray-600">
              Città diverse in cui viviamo
            </div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl mb-2">🌍</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">
              Lingue parlate nel team
            </div>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-gray-900">99.9%</div>
            <div className="text-sm text-gray-600">
              Uptime del nostro servizio
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
