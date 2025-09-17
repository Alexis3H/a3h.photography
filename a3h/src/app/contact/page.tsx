import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import FlexibleImageContainer from '../../../components/FlexibleImageContainer';
import { loadContactContent } from '../../lib/content';

export default function Contact() {
  const content = loadContactContent();
  
  if (!content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Section 1: Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 uppercase font-semibold mb-2">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {content.sections.hero.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {content.sections.hero.description}
          </p>
          <div className="flex space-x-4">
            <Button
              text="Envoyer un message"
              type="section"
              sectionId="#form"
              variant="primary"
            />
            <Button
              text="Appeler maintenant"
              type="phone"
              phone="+41791234567"
              variant="secondary"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <FlexibleImageContainer
            images={content.sections.hero.images}
            layoutType={content.sections.hero.layoutType || 'single'}
            singleOrientation={content.sections.hero.singleOrientation || 'landscape'}
            collageLayout={content.sections.hero.collageLayout || 'layout1'}
          />
        </div>
      </section>

      {/* Section 2: Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">{content.sections.info.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.sections.info.items.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Contact Form */}
      <section id="form" className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.sections.contactForm.title}</h2>
          <p className="text-lg mb-8">{content.sections.contactForm.description}</p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={content.sections.contactForm.form.name.placeholder}
                className="p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder={content.sections.contactForm.form.email.placeholder}
                className="p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <input
              type="tel"
              placeholder={content.sections.contactForm.form.phone.placeholder}
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={5}
              placeholder={content.sections.contactForm.form.message.placeholder}
            ></textarea>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto">
              {content.sections.contactForm.form.button.text}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            {content.sections.contactForm.form.legal}
          </p>
        </div>
      </section>
    </div>
  );
}

