import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Restaurants() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">PHOTOGRAPHIE CULINAIRE</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des images qui donnent faim
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            De belles photos de vos plats et de votre ambiance augmentent vos réservations et donnent confiance à vos clients. 
            Je vous accompagne de la carte aux réseaux sociaux.
          </p>
          <div className="flex space-x-4">
            <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Découvrir les packs
            </Link>
            <Link href="#offres" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Voir les offres
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF3687.jpg"
              alt="Photographie culinaire"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF3898.jpg"
              alt="Plats stylisés"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF6573.jpg"
              alt="Ambiance restaurant"
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Nos formules - Three Column Cards */}
      <section id="offres" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Nos formules</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: MENU Starter */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">MENU Starter</h3>
            <p className="text-lg text-gray-700 mb-4">390 CHF (-2 h)</p>
            <p className="text-gray-600 mb-6">Jusqu'à 10 plats stylisés + 5 visuels du lieu/équipe, 30-40 images web.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 2: CARTE Complète */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">CARTE Complète</h3>
            <p className="text-lg text-gray-700 mb-4">690 CHF (½ journée)</p>
            <p className="text-gray-600 mb-6">20-30 plats + ambiance + portraits d'équipe, 60-80 images, set optimisé pour UberEats/Smood.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 3: JOURNÉE Brand */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">JOURNÉE Brand</h3>
            <p className="text-lg text-gray-700 mb-4">1090 CHF (journée)</p>
            <p className="text-gray-600 mb-6">Storytelling cuisine + salle + détails + portraits, 100-140 images harmonisées.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Formule Social « Miam » - Two Column with List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Formule Social « Miam »</h2>
          <p className="text-lg text-gray-700 mb-6">Un accompagnement mensuel pour alimenter vos réseaux avec régularité.</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>1 session photo mensuelle de 2 h</li>
            <li>10 photos retouchées</li>
            <li>2 micro-reels 6-10 s (vertical)</li>
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">390 CHF / mois</p>
          <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            S'abonner
          </Link>
        </div>
        <div className="md:w-1/2 h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/_DSC5340.jpg"
            alt="Photographie culinaire professionnelle"
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Brief</h3>
            <p className="text-gray-600">On échange sur vos plats phares et votre identité.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Shooting</h3>
            <p className="text-gray-600">Je me déplace avec studio mobile et lumière adaptée.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Livraison</h3>
            <p className="text-gray-600">Galerie privée + fichiers optimisés web & apps.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parlons de votre restaurant</h2>
          <p className="text-lg mb-8">Envoyez-moi vos besoins — je vous réponds sous 24 h.</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder="Décrivez votre restaurant, vos plats phares, vos besoins..."
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              Envoyer
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

