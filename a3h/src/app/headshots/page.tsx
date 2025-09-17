import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Headshots() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">HEADSHOTS PROFESSIONNELS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portraits qui ouvrent des portes
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Des photos professionnelles qui vous mettent en valeur sur LinkedIn, votre CV et vos réseaux. 
            Coaching bienveillant, lumière flatteuse, retouches naturelles.
          </p>
          <div className="flex space-x-4">
            <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Réserver une séance
            </Link>
            <Link href="#offres" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Voir les offres
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF0475-2.jpg"
              alt="Headshot professionnel"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/NDS_0040-2.jpg"
              alt="Portrait professionnel"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC3983.jpg"
              alt="Séance de portraits"
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Nos offres - Three Column Cards */}
      <section id="offres" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Nos offres</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Express */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Express</h3>
            <p className="text-lg text-gray-700 mb-4">190 CHF (30 min)</p>
            <p className="text-gray-600 mb-6">5 photos retouchées, livraison J+1. Parfait pour LinkedIn.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 2: Standard */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Standard</h3>
            <p className="text-lg text-gray-700 mb-4">290 CHF (1h)</p>
            <p className="text-gray-600 mb-6">10 photos retouchées, plusieurs looks, livraison J+1.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 3: Premium */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
            <p className="text-lg text-gray-700 mb-4">390 CHF (1h30)</p>
            <p className="text-gray-600 mb-6">15 photos retouchées, coaching complet, livraison J+0.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Pourquoi choisir A3H - Two Column with List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pourquoi choisir A3H ?</h2>
          <p className="text-lg text-gray-700 mb-6">Une approche bienveillante et professionnelle pour des portraits authentiques.</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Coaching pose et expression naturelle</li>
            <li>Éclairage professionnel adapté</li>
            <li>Retouches subtiles et naturelles</li>
            <li>Livraison rapide (J+0/J+1)</li>
            <li>Studio mobile ou en extérieur</li>
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">Résultat garanti</p>
          <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            Demander un devis
          </Link>
        </div>
        <div className="md:w-1/2 h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/_DSC4541.jpg"
            alt="Séance de portraits professionnels"
            width={400}
            height={384}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 4: Comment ça marche - Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Comment ça marche ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Réservation</h3>
            <p className="text-gray-600">On planifie votre séance selon vos besoins et disponibilités.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Séance</h3>
            <p className="text-gray-600">Coaching bienveillant, plusieurs looks, ambiance détendue.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Livraison</h3>
            <p className="text-gray-600">Photos retouchées dans votre galerie privée, fichiers optimisés.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Réservez votre séance</h2>
          <p className="text-lg mb-8">Parlons de vos besoins — je vous réponds sous 24h.</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder="Décrivez vos besoins (usage, délai, style souhaité)..."
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              Envoyer ma demande
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

