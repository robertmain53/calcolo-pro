// app/page.tsx
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata = {
  title: 'Home • MySite',
  description: 'Benvenuto!',
};

export default function Home() {
      const crumbs = [{ name: "Home", path: "/" }];

 return (
    <div className="space-y-8">
      <Breadcrumb crumbs={crumbs} />
      
      {/* Hero Category */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl text-center">
        <h1 className="text-4xl font-bold mb-4"> </h1>
        <p className="text-xl opacity-90">Una cassetta degli attrezzi digitale per il professionista tecnico in Italia. </p>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
      </div>
    </div>
  );

}