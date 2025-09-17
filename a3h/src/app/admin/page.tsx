'use client';

import { useState, useEffect } from 'react';
import ImageGrid from '../../../components/ImageGrid';
import ServiceCard from '../../../components/ServiceCard';
import FeatureImage from '../../../components/FeatureImage';
import ImageEditor from '../../../components/ImageEditor';
import FlexibleImageContainer from '../../../components/FlexibleImageContainer';
import { updateMenuCache } from '../../lib/menuManager';

export default function Admin() {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [activePage, setActivePage] = useState('homepage');
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([
    { id: 'homepage', name: 'Accueil', path: '/' },
    { id: 'headshots', name: 'Headshots', path: '/headshots' },
    { id: 'restaurants', name: 'Restaurants', path: '/restaurants' },
    { id: 'evenements', name: 'Événements', path: '/evenements' },
    { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
    { id: 'about', name: 'À Propos', path: '/about' },
    { id: 'contact', name: 'Contact', path: '/contact' }
  ]);

  useEffect(() => {
    loadPageContent(activePage);
    loadAllPageTitles();
  }, [activePage]);

  const loadPageContent = (page: string) => {
    fetch(`/api/content/${page}`)
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setActiveSection('pageSettings'); // Start with page settings
      })
      .catch(err => console.error('Error loading content:', err));
  };

  const loadAllPageTitles = async () => {
    const pageIds = ['homepage', 'headshots', 'restaurants', 'evenements', 'portfolio', 'about', 'contact'];
    const updatedPages = await Promise.all(
      pageIds.map(async (pageId) => {
        try {
          const response = await fetch(`/api/content/${pageId}`);
          const content = await response.json();
          return {
            id: pageId,
            name: content.menuTitle || pages.find(p => p.id === pageId)?.name || pageId,
            path: pages.find(p => p.id === pageId)?.path || `/${pageId}`
          };
        } catch (error) {
          console.error(`Error loading menu title for ${pageId}:`, error);
          return pages.find(p => p.id === pageId) || { id: pageId, name: pageId, path: `/${pageId}` };
        }
      })
    );
    setPages(updatedPages);
    return updatedPages;
  };

  const updateMenuCacheAdmin = async () => {
    // Reload page titles to update dropdown
    const updatedPages = await loadAllPageTitles();
    // Update menu cache using the manager
    updateMenuCache(updatedPages);
  };

  const saveContent = () => {
    // Save content back to JSON file
    fetch(`/api/content/${activePage}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then(async () => {
      setIsEditing(false);
      // Update menu cache
      await updateMenuCacheAdmin();
      
      alert('Content saved successfully!');
    })
    .catch(err => console.error('Error saving content:', err));
  };

  const updateField = (path: string, value: any) => {
    const newContent = { ...content };
    const keys = path.split('.');
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (!content) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-md ${isEditing ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}
              >
                {isEditing ? 'Preview' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={saveContent}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
          
          {/* Page Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page à éditer</label>
            <select
              value={activePage}
              onChange={(e) => setActivePage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white"
            >
              {pages.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </select>
          </div>


          {/* Section Navigation */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveSection('pageSettings')}
              className={`px-4 py-2 rounded-md ${
                activeSection === 'pageSettings' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Paramètres
            </button>
            {content.sections && Object.keys(content.sections).map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-md ${
                  activeSection === section 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            
            {isEditing ? (
              <div className="space-y-4">
                {/* Page Settings Section */}
                {activeSection === 'pageSettings' && (
                  <>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de la page</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Titre du menu</label>
                          <input
                            type="text"
                            value={content.menuTitle || ''}
                            onChange={(e) => updateField('menuTitle', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Titre affiché dans le menu"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Titre SEO</label>
                          <input
                            type="text"
                            value={content.seoTitle || ''}
                            onChange={(e) => updateField('seoTitle', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Titre pour les moteurs de recherche"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description SEO</label>
                          <textarea
                            value={content.seoDescription || ''}
                            onChange={(e) => updateField('seoDescription', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            rows={3}
                            placeholder="Description pour les moteurs de recherche"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeSection === 'hero' && content.sections.hero && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                      <input
                        type="text"
                        value={content.sections.hero.label}
                        onChange={(e) => updateField('sections.hero.label', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        style={{ color: '#111827' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={content.sections.hero.title}
                        onChange={(e) => updateField('sections.hero.title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={content.sections.hero.description}
                        onChange={(e) => updateField('sections.hero.description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                      <input
                        type="text"
                        value={content.sections.hero.primaryButton.text}
                        onChange={(e) => updateField('sections.hero.primaryButton.text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                      <input
                        type="text"
                        value={content.sections.hero.secondaryButton.text}
                        onChange={(e) => updateField('sections.hero.secondaryButton.text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Layout</label>
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Layout Type</label>
                        <select
                          value={content.sections.hero.layoutType || 'single'}
                          onChange={(e) => updateField('sections.hero.layoutType', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900"
                        >
                          <option value="single">Single Image</option>
                          <option value="collage">Collage (Multiple Images)</option>
                        </select>
                      </div>
                      
                      {content.sections.hero.layoutType === 'single' && (
                        <div className="mb-4">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Image Orientation</label>
                          <select
                            value={content.sections.hero.singleOrientation || 'landscape'}
                            onChange={(e) => updateField('sections.hero.singleOrientation', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900"
                          >
                            <option value="portrait">Portrait (2:3)</option>
                            <option value="landscape">Landscape (3:2)</option>
                            <option value="square">Square (1:1)</option>
                          </select>
                        </div>
                      )}
                      
                      {content.sections.hero.layoutType === 'collage' && (
                        <div className="mb-4">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Collage Layout</label>
                          <select
                            value={content.sections.hero.collageLayout || 'layout1'}
                            onChange={(e) => updateField('sections.hero.collageLayout', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900"
                          >
                            <option value="layout1">Layout 1: 2 Side-by-Side Landscape (3:2 container)</option>
                            <option value="layout2">Layout 2: 2 Stacked Vertical Landscape (3:2 container)</option>
                            <option value="layout3">Layout 3: 1 Portrait + 2 Landscape (3:2 container)</option>
                            <option value="layout4">Layout 4: 3 Side-by-Side Portrait (3:2 container)</option>
                          </select>
                        </div>
                      )}
                      
                      <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                      {content.sections.hero.images.map((image: any, index: number) => (
                        <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Image {index + 1}</h4>
                          
                          {/* Image Path */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Image Path</label>
                            <input
                              type="text"
                              value={image.src}
                              onChange={(e) => updateField(`sections.hero.images.${index}.src`, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900"
                              placeholder="/path/to/image.jpg"
                            />
                          </div>
                          
                          {/* Alt Text */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
                            <input
                              type="text"
                              value={image.alt}
                              onChange={(e) => updateField(`sections.hero.images.${index}.alt`, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900"
                              placeholder="Description for accessibility"
                            />
                          </div>
                          
                          {/* Visual Image Editor */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Image Editor</label>
                            <ImageEditor
                              src={image.src}
                              alt={image.alt}
                              initialFocusPoint={image.focusPoint || 'center'}
                              initialZoom={image.zoom || 1}
                              onFocusPointChange={(focusPoint) => updateField(`sections.hero.images.${index}.focusPoint`, focusPoint)}
                              onZoomChange={(zoom) => updateField(`sections.hero.images.${index}.zoom`, zoom)}
                              width={300}
                              height={200}
                            />
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {activeSection === 'services' && content.sections.services && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={content.sections.services.title}
                        onChange={(e) => updateField('sections.services.title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    {content.sections.services.cards.map((card: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-bold mb-2">Card {index + 1}</h3>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateField(`sections.services.cards.${index}.title`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Card title"
                          />
                          <input
                            type="text"
                            value={card.price}
                            onChange={(e) => updateField(`sections.services.cards.${index}.price`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Price"
                          />
                          <textarea
                            value={card.description}
                            onChange={(e) => updateField(`sections.services.cards.${index}.description`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            rows={2}
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            value={card.image.src}
                            onChange={(e) => updateField(`sections.services.cards.${index}.image.src`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-1 text-gray-900 !text-gray-900"
                            placeholder="Image path"
                          />
                          <input
                            type="text"
                            value={card.image.alt}
                            onChange={(e) => updateField(`sections.services.cards.${index}.image.alt`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-1 text-gray-900 !text-gray-900"
                            placeholder="Alt text"
                          />
                          
                          {/* Visual Image Editor */}
                          <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-600 mb-2">Image Editor</label>
                            <ImageEditor
                              src={card.image.src}
                              alt={card.image.alt}
                              initialFocusPoint={card.image.focusPoint || 'center'}
                              initialZoom={card.image.zoom || 1}
                              onFocusPointChange={(focusPoint) => updateField(`sections.services.cards.${index}.image.focusPoint`, focusPoint)}
                              onZoomChange={(zoom) => updateField(`sections.services.cards.${index}.image.zoom`, zoom)}
                              width={250}
                              height={150}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Social Section */}
                {activeSection === 'social' && content.sections.social && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={content.sections.social.title}
                        onChange={(e) => updateField('sections.social.title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={content.sections.social.description}
                        onChange={(e) => updateField('sections.social.description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <input
                        type="text"
                        value={content.sections.social.price}
                        onChange={(e) => updateField('sections.social.price', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={content.sections.social.button.text}
                        onChange={(e) => updateField('sections.social.button.text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features (one per line)</label>
                      <textarea
                        value={content.sections.social.features.join('\n')}
                        onChange={(e) => updateField('sections.social.features', e.target.value.split('\n'))}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Source</label>
                      <input
                        type="text"
                        value={content.sections.social.image.src}
                        onChange={(e) => updateField('sections.social.image.src', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        placeholder="/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Alt Text</label>
                      <input
                        type="text"
                        value={content.sections.social.image.alt}
                        onChange={(e) => updateField('sections.social.image.alt', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        placeholder="Description de l'image"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image Editor</label>
                      <ImageEditor
                        src={content.sections.social.image.src}
                        alt={content.sections.social.image.alt}
                        initialFocusPoint={content.sections.social.image.focusPoint || 'center'}
                        initialZoom={content.sections.social.image.zoom || 1}
                        onFocusPointChange={(focusPoint) => updateField('sections.social.image.focusPoint', focusPoint)}
                        onZoomChange={(zoom) => updateField('sections.social.image.zoom', zoom)}
                        width={300}
                        height={200}
                      />
                    </div>
                  </>
                )}
                
                {/* Process Section */}
                {activeSection === 'process' && content.sections.process && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                      <input
                        type="text"
                        value={content.sections.process.title}
                        onChange={(e) => updateField('sections.process.title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    {content.sections.process.steps.map((step: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-bold mb-2">Step {index + 1}</h3>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => updateField(`sections.process.steps.${index}.title`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Step title"
                          />
                          <textarea
                            value={step.description}
                            onChange={(e) => updateField(`sections.process.steps.${index}.description`, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            placeholder="Step description"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Contact Section */}
                {activeSection === 'contact' && content.sections.contact && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={content.sections.contact.title}
                        onChange={(e) => updateField('sections.contact.title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={content.sections.contact.description}
                        onChange={(e) => updateField('sections.contact.description', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        rows={3}
                      />
                    </div>
                    
                    {/* Form Fields */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Champs du formulaire</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom - Label</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.nom.label}
                            onChange={(e) => updateField('sections.contact.form.nom.label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom - Placeholder</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.nom.placeholder}
                            onChange={(e) => updateField('sections.contact.form.nom.placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom - Label</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.prenom.label}
                            onChange={(e) => updateField('sections.contact.form.prenom.label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom - Placeholder</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.prenom.placeholder}
                            onChange={(e) => updateField('sections.contact.form.prenom.placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email - Label</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.email.label}
                            onChange={(e) => updateField('sections.contact.form.email.label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email - Placeholder</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.email.placeholder}
                            onChange={(e) => updateField('sections.contact.form.email.placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone - Label</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.telephone.label}
                            onChange={(e) => updateField('sections.contact.form.telephone.label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone - Placeholder</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.telephone.placeholder}
                            onChange={(e) => updateField('sections.contact.form.telephone.placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message - Label</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.message.label}
                            onChange={(e) => updateField('sections.contact.form.message.label', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Message - Placeholder</label>
                          <input
                            type="text"
                            value={content.sections.contact.form.message.placeholder}
                            onChange={(e) => updateField('sections.contact.form.message.placeholder', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <input
                        type="text"
                        value={content.sections.contact.button.text}
                        onChange={(e) => updateField('sections.contact.button.text', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Legal Text</label>
                      <textarea
                        value={content.sections.contact.legal}
                        onChange={(e) => updateField('sections.contact.legal', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                        rows={2}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-gray-900">
                Click "Edit" to modify content
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              {/* Page Settings Preview */}
              {activeSection === 'pageSettings' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">Aperçu des paramètres</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre du menu</label>
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{content.menuTitle || 'Non défini'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre SEO</label>
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{content.seoTitle || 'Non défini'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description SEO</label>
                      <p className="text-gray-900 bg-gray-100 p-2 rounded">{content.seoDescription || 'Non définie'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'hero' && content.sections.hero && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 uppercase font-semibold">{content.sections.hero.label}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{content.sections.hero.title}</h1>
                  <p className="text-gray-700">{content.sections.hero.description}</p>
                  <div className="flex space-x-4">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
                      {content.sections.hero.primaryButton.text}
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
                      {content.sections.hero.secondaryButton.text}
                    </button>
                  </div>
                  <div className="mt-4">
                    <FlexibleImageContainer
                      images={content.sections.hero.images}
                      layoutType={content.sections.hero.layoutType || 'single'}
                      singleOrientation={content.sections.hero.singleOrientation || 'landscape'}
                      collageLayout={content.sections.hero.collageLayout || 'layout1'}
                    />
                  </div>
                </div>
              )}
              
              {activeSection === 'services' && content.sections.services && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.services.title}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {content.sections.services.cards && content.sections.services.cards.map((card: any, index: number) => (
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
                </div>
              )}
              
              {/* Social Preview */}
              {activeSection === 'social' && content.sections.social && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.social.title}</h2>
                  <p className="text-gray-700">{content.sections.social.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {content.sections.social.features.map((feature: string, index: number) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{content.sections.social.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                      {content.sections.social.button.text}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Process Preview */}
              {activeSection === 'process' && content.sections.process && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.process.title}</h2>
                  <div className="space-y-3">
                    {content.sections.process.steps.map((step: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact Preview */}
              {activeSection === 'contact' && content.sections.contact && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.contact.title}</h2>
                  <p className="text-gray-700">{content.sections.contact.description}</p>
                  <div className="border border-gray-300 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder={content.sections.contact.form.nom.placeholder}
                          className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                          disabled
                        />
                        <input
                          type="text"
                          placeholder={content.sections.contact.form.prenom.placeholder}
                          className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                          disabled
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="email"
                          placeholder={content.sections.contact.form.email.placeholder}
                          className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                          disabled
                        />
                        <input
                          type="tel"
                          placeholder={content.sections.contact.form.telephone.placeholder}
                          className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                          disabled
                        />
                      </div>
                      <textarea
                        placeholder={content.sections.contact.form.message.placeholder}
                        className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                        rows={4}
                        disabled
                      />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                        {content.sections.contact.button.text}
                      </button>
                      <p className="text-xs text-gray-500">{content.sections.contact.legal}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

