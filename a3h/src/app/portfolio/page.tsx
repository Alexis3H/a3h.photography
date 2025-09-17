import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">PORTFOLIO</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mes réalisations
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Découvrez une sélection de mes travaux récents : portraits professionnels, 
            photographie culinaire et événements privés. Chaque image raconte une histoire.
          </p>
          <div className="flex space-x-4">
            <Link href="#headshots" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Voir les portraits
            </Link>
            <Link href="#restaurants" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Voir la cuisine
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF0475-2.jpg"
              alt="Portrait professionnel"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF3687.jpg"
              alt="Photographie culinaire"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P6270284.jpg"
              alt="Événement privé"
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Headshots Gallery */}
      <section id="headshots" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Portraits Professionnels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF0475-2.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/NDS_0040-2.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC3983.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC4541.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC4547.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC4658.jpg"
              alt="Portrait professionnel"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Restaurants Gallery */}
      <section id="restaurants" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Photographie Culinaire</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF3687.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF3898.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/DSCF6573.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC5340.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC5345.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC5487.jpg"
              alt="Photographie culinaire"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Events Gallery */}
      <section id="events" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Événements Privés</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P6270284.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P6270398.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P3010061.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P3010418.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P3080017.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/P4290413.jpg"
              alt="Événement privé"
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vous aimez mon travail ?</h2>
          <p className="text-lg mb-8">Parlons de votre projet — je vous réponds sous 24h.</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder="Décrivez votre projet et vos besoins..."
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              Demander un devis
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

