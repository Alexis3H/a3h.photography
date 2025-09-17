import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section - Two Column */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parlons de votre projet
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Vous avez une idée, un besoin, une envie ? Je suis là pour vous accompagner. 
            N'hésitez pas à me contacter pour discuter de votre projet photographique.
          </p>
          <div className="flex space-x-4">
            <Link href="#form" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              Envoyer un message
            </Link>
            <Link href="tel:+41791234567" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              Appeler maintenant
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSC6334.jpg"
              alt="Contact A3H"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSF1983.jpg"
              alt="Studio mobile"
              width={200}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 h-60 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/_DSF2096.jpg"
              alt="Photographe professionnel"
              width={400}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Informations de contact - Three Column Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Informations de contact</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Téléphone */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
            <p className="text-lg text-gray-700 mb-4">+41 79 123 45 67</p>
            <p className="text-gray-600 mb-6">Disponible du lundi au vendredi, 9h-18h</p>
            <Link href="tel:+41791234567" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Appeler
            </Link>
          </div>
          {/* Card 2: Email */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-lg text-gray-700 mb-4">alexis@a3h.photography</p>
            <p className="text-gray-600 mb-6">Réponse sous 24h en moyenne</p>
            <Link href="mailto:alexis@a3h.photography" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Envoyer un email
            </Link>
          </div>
          {/* Card 3: Localisation */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Localisation</h3>
            <p className="text-lg text-gray-700 mb-4">Morges, Suisse</p>
            <p className="text-gray-600 mb-6">Déplacement dans toute la région</p>
            <Link href="https://maps.google.com/?q=Morges,Switzerland" target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto">
              Voir sur la carte
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Zones de service - Two Column with List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Zones de service</h2>
          <p className="text-lg text-gray-700 mb-6">Je me déplace dans toute la région pour vos projets.</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li><strong>Morges</strong> - Studio principal</li>
            <li><strong>Nyon</strong> - Déplacement inclus</li>
            <li><strong>Lausanne</strong> - Déplacement inclus</li>
            <li><strong>Genève</strong> - Sur demande</li>
            <li><strong>Yverdon</strong> - Sur demande</li>
            <li><strong>Autres régions</strong> - Devis sur mesure</li>
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">Studio mobile disponible</p>
          <Link href="#form" className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            Demander un devis
          </Link>
        </div>
        <div className="md:w-1/2 h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="/P5300085-Enhanced-NR.jpg"
            alt="Zone de service A3H"
            width={400}
            height={384}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 4: FAQ - Process Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Questions fréquentes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Délais de livraison ?</h3>
            <p className="text-gray-600">Headshots : J+0/J+1 • Restaurants : J+2 • Événements : J+3</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Studio mobile ?</h3>
            <p className="text-gray-600">Oui, je me déplace avec tout l'équipement nécessaire.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Formats de livraison ?</h3>
            <p className="text-gray-600">Web optimisé, haute résolution, galerie privée sécurisée.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Form - Dark */}
      <section id="form" className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Envoyez-moi un message</h2>
          <p className="text-lg mb-8">Décrivez votre projet — je vous réponds sous 24h.</p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <input
              type="tel"
              placeholder="Votre téléphone (optionnel)"
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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

