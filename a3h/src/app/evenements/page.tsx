import Link from &apos;next/link&apos;;
import Navigation from &apos;@/components/Navigation&apos;;
import Image from &apos;next/image&apos;;

export default function Evenements() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">ÉVÉNEMENTS PRIVÉS</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Moments vrais, souvenirs qui restent
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Anniversaires, baptêmes, fêtes familiales... Je capture l&apos;authenticité et l&apos;ambiance chaleureuse 
            de vos moments précieux avec discrétion et bienveillance.
          </p>
          <div className="flex space-x-4">
            <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Réserver mon événement
            </Link>
            <Link href="#offres" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Voir les offres
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P6270284.jpg"
              alt="Événement privé"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P6270398.jpg"
              alt="Fête familiale"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P3010061.jpg"
              alt="Moment authentique"
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
          {/* Card 1: Intime */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Intime</h3>
            <p className="text-lg text-gray-700 mb-4">290 CHF (2h)</p>
            <p className="text-gray-600 mb-6">Petits événements familiaux, anniversaires intimes, jusqu&apos;à 15 personnes.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 2: Familial */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Familial</h3>
            <p className="text-lg text-gray-700 mb-4">490 CHF (4h)</p>
            <p className="text-gray-600 mb-6">Baptêmes, communions, fêtes familiales, jusqu&apos;à 30 personnes.</p>
            <Link href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Réserver
            </Link>
          </div>
          {/* Card 3: Prestige */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Prestige</h3>
            <p className="text-lg text-gray-700 mb-4">690 CHF (6h)</p>
            <p className="text-gray-600 mb-6">Grands événements, mariages, fêtes d&apos;entreprise, jusqu&apos;à 50 personnes.</p>
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
          <p className="text-lg text-gray-700 mb-6">Une approche discrète et bienveillante pour capturer l&apos;authenticité de vos moments.</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Photographie discrète et naturelle</li>
            <li>Capturer l&apos;authenticité des moments</li>
            <li>Ambiance chaleureuse et détendue</li>
            <li>Livraison rapide (J+2)</li>
            <li>Galerie privée sécurisée</li>
            <li>Retouches légères et naturelles</li>
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">Souvenirs garantis</p>
          <Link href="/contact" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            Demander un devis
          </Link>
        </div>
        <div className="md:w-1/2 h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/P3010418.jpg"
            alt="Événement familial authentique"
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Échange</h3>
            <p className="text-gray-600">On discute de votre événement, vos attentes et l&apos;ambiance souhaitée.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Événement</h3>
            <p className="text-gray-600">Photographie discrète, moments authentiques, ambiance naturelle.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Souvenirs</h3>
            <p className="text-gray-600">Galerie privée avec vos plus beaux moments, fichiers optimisés.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parlons de votre événement</h2>
          <p className="text-lg mb-8">Décrivez-moi votre projet — je vous réponds sous 24h.</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder="Décrivez votre événement (type, date, nombre d&apos;invités, ambiance souhaitée)..."
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

