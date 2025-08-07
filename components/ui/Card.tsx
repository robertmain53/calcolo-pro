'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  ClockIcon, 
  DocumentTextIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface CalculatorCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
  difficulty?: 'Facile' | 'Medio' | 'Avanzato';
  estimatedTime?: string;
  icon?: React.ComponentType<any>;
  gradient?: string;
}

const difficultyColors = {
  'Facile': 'bg-green-100 text-green-800 border-green-200',
  'Medio': 'bg-yellow-100 text-yellow-800 border-yellow-200', 
  'Avanzato': 'bg-red-100 text-red-800 border-red-200'
};

export default function CalculatorCard({ 
  title, 
  description, 
  href, 
  category = "Generale",
  difficulty = "Medio",
  estimatedTime = "2-5 min",
  icon: Icon = ChartBarIcon,
  gradient = "from-blue-500 to-cyan-500"
}: CalculatorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={href} className="block">
        <article className="relative h-full rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:ring-blue-300 overflow-hidden">
          {/* Header con gradiente */}
          <div className={`h-2 bg-gradient-to-r ${gradient}`} />
          
          <div className="p-6">
            {/* Top section con icona e categoria */}
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
                {category}
              </span>
            </div>

            {/* Titolo e descrizione */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {description}
              </p>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DocumentTextIcon className="h-4 w-4" />
                  <span>PDF Export</span>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>

            {/* Call to Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                Inizia il calcolo
              </span>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>

          {/* Overlay con effetto hover */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/5 group-hover:ring-blue-600/20 transition-colors duration-300" />
        </article>
      </Link>
    </motion.div>
  );
}

// Esempio di utilizzo con griglia
export function CalculatorGrid({ calculators }: { calculators: any[] }) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {calculators.map((calc, index) => (
          <motion.div
            key={calc.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CalculatorCard
              title={calc.name}
              description={`Calcolo professionale per ${calc.name.toLowerCase()}`}
              href={calc.href}
              category={calc.category}
              difficulty={calc.difficulty}
              estimatedTime={calc.estimatedTime}
              gradient={calc.gradient}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}