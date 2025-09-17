import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">À PROPOS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alexis, photographe à Morges
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Passionné par l'authenticité et les moments vrais, je vous accompagne avec bienveillance 
            pour capturer l'essence de votre personnalité, de votre cuisine ou de vos événements.
          </p>
          <div className="flex space-x-4">
            <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Travaillons ensemble
            </Link>
            <Link href="/portfolio" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Voir mon travail
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC7960.jpg"
              alt="Alexis photographe"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC8477.jpg"
              alt="En action"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSF0778.jpg"
              alt="Studio mobile"
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Mon approche - Three Column Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Mon approche</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Authenticité */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Authenticité</h3>
            <p className="text-gray-600 mb-6">Je privilégie les moments vrais et naturels, sans artifice ni pose forcée.</p>
          </div>
          {/* Card 2: Bienveillance */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bienveillance</h3>
            <p className="text-gray-600 mb-6">Un accompagnement chaleureux pour vous mettre à l'aise et révéler votre personnalité.</p>
          </div>
          {/* Card 3: Professionnalisme */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Professionnalisme</h3>
            <p className="text-gray-600 mb-6">Équipement professionnel, retouches soignées et livraison dans les délais.</p>
          </div>
        </div>
      </section>

      {/* Section 3: Mon parcours - Two Column with List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Mon parcours</h2>
          <p className="text-lg text-gray-700 mb-6">De la passion à la profession, une évolution naturelle vers la photographie.</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Formation en photographie professionnelle</li>
            <li>Spécialisation portraits et photographie culinaire</li>
            <li>Plus de 5 ans d'expérience</li>
            <li>Studio mobile pour plus de flexibilité</li>
            <li>Collaboration avec restaurants et entreprises</li>
            <li>Approche personnalisée pour chaque client</li>
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">Basé à Morges</p>
          <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            Prenons contact
          </Link>
        </div>
        <div className="md:w-1/2 h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/_DSF0855.jpg"
            alt="Alexis en action"
            width={400}
            height={384}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 4: Zones de service - Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Zones de service</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Morges</h3>
            <p className="text-gray-600">Studio principal et zone de service privilégiée.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nyon</h3>
            <p className="text-gray-600">Zone de service avec déplacement inclus.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lausanne</h3>
            <p className="text-gray-600">Zone de service avec déplacement inclus.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parlons de votre projet</h2>
          <p className="text-lg mb-8">Vous avez une idée ? Discutons-en — je vous réponds sous 24h.</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder="Décrivez votre projet, vos besoins et vos attentes..."
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              Envoyer mon message
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            En soumettant, vous acceptez les CGV et la politique de confidentialité.
          </p>
        </div>
      </section>
    </div>
  );
}

