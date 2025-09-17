import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ImageGrid from '../../components/ImageGrid';
import ServiceCard from '../../components/ServiceCard';
import FeatureImage from '../../components/FeatureImage';
import { loadHomepageContent } from '../../lib/content';

export default function Home() {
  const content = loadHomepageContent();
  
  if (!content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">{content.sections.hero.label}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.sections.hero.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {content.sections.hero.description}
          </p>
          <div className="flex space-x-4">
            <Link href={content.sections.hero.primaryButton.href} className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
              {content.sections.hero.primaryButton.text}
            </Link>
            <Link href={content.sections.hero.secondaryButton.href} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors">
              {content.sections.hero.secondaryButton.text}
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <ImageGrid 
            layoutType={content.sections.hero.layout as any}
            images={content.sections.hero.images}
          />
        </div>
      </section>

      {/* Section 2: Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">{content.sections.services.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.sections.services.cards.map((card, index) => (
            <ServiceCard
              key={index}
              title={card.title}
              price={card.price}
              description={card.description}
              image={card.image}
              button={card.button}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Formule Social « Miam » */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{content.sections.social.title}</h2>
          <p className="text-lg text-gray-700 mb-6">{content.sections.social.description}</p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            {content.sections.social.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className="text-xl font-bold text-gray-900 mb-6">{content.sections.social.price}</p>
          <Link href={content.sections.social.button.href} className="bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors">
            {content.sections.social.button.text}
          </Link>
        </div>
        <div className="md:w-1/2">
          <FeatureImage 
            src={content.sections.social.image.src}
            alt={content.sections.social.image.alt}
          />
        </div>
      </section>

      {/* Section 4: Comment ça marche ? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">{content.sections.process.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.sections.process.steps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Parlons de votre restaurant (Contact Form) */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.sections.contact.title}</h2>
          <p className="text-lg mb-8">{content.sections.contact.description}</p>
          <div className="flex flex-col items-center gap-4">
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder={content.sections.contact.placeholder}
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              {content.sections.contact.button.text}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            {content.sections.contact.legal}
          </p>
        </div>
      </section>
    </div>
  );
}