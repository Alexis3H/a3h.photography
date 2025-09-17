'use client';

import { useState, useEffect } from 'react';
import ServiceCard from '../../../components/ServiceCard';
import ImageEditor from '../../../components/ImageEditor';
import FlexibleImageContainer from '../../../components/FlexibleImageContainer';
import ImageInput from '../../../components/ImageInput';
import { updateMenuCache } from '../../lib/menuManager';

export default function Admin() {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [activePage, setActivePage] = useState('homepage');
  const [isEditing, setIsEditing] = useState(false);

  // Helper function to get available sections for the current page
  const getAvailableSections = (page: string) => {
    const sectionMap: { [key: string]: Array<{id: string, name: string}> } = {
      'homepage': [
        { id: '#services', name: 'Services section' },
        { id: '#social', name: 'Social media section' },
        { id: '#process', name: 'Process section' },
        { id: '#contact', name: 'Contact section' }
      ],
      'contact': [
        { id: '#form', name: 'Contact form' },
        { id: '#info', name: 'Contact information' },
        { id: '#zones', name: 'Service zones' },
        { id: '#faq', name: 'FAQ section' }
      ],
      'headshots': [
        { id: '#packages', name: 'Packages section' },
        { id: '#gallery', name: 'Gallery section' },
        { id: '#booking', name: 'Booking section' }
      ],
      'restaurants': [
        { id: '#menu', name: 'Menu section' },
        { id: '#gallery', name: 'Gallery section' },
        { id: '#booking', name: 'Booking section' }
      ],
      'evenements': [
        { id: '#packages', name: 'Packages section' },
        { id: '#gallery', name: 'Gallery section' },
        { id: '#booking', name: 'Booking section' }
      ]
    };
    return sectionMap[page] || [];
  };
  const [pages, setPages] = useState([
    { id: 'homepage', name: 'Accueil', path: '/' },
    { id: 'headshots', name: 'Headshots', path: '/headshots' },
    { id: 'restaurants', name: 'Restaurants', path: '/restaurants' },
    { id: 'evenements', name: 'Événements', path: '/evenements' },
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
    const pageIds = ['homepage', 'headshots', 'restaurants', 'evenements', 'contact'];
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

  const updateField = (path: string, value: string | number | boolean | string[]) => {
    if (!content) return; // Prevent updates if content is not loaded
    
    const newContent = { ...content };
    const keys = path.split('.');
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
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
                {content.sections && Object.keys(content.sections)
                  .filter(section => {
                    // For contact page, only show hero, info, and contactForm sections
                    if (activePage === 'contact') {
                      return ['hero', 'info', 'contactForm'].includes(section);
                    }
                    // For other pages, show all sections
                    return true;
                  })
                  .map(section => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`px-4 py-2 rounded-md ${
                        activeSection === section
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {section === 'contactForm' ? 'Contact Form' : section.charAt(0).toUpperCase() + section.slice(1)}
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
                        {/* Primary Button Configuration */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Primary Button</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                              <input
                                type="text"
                                value={content.sections?.hero?.primaryButton?.text || ''}
                                onChange={(e) => updateField('sections.hero.primaryButton.text', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                placeholder="Button text"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Button Type</label>
                              <select
                                value={content.sections?.hero?.primaryButton?.type || 'link'}
                                onChange={(e) => updateField('sections.hero.primaryButton.type', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                              >
                                <option value="link">External Link</option>
                                <option value="section">Page Section</option>
                                <option value="phone">Phone Call</option>
                                <option value="email">Email</option>
                              </select>
                            </div>
                            {content.sections?.hero?.primaryButton?.type === 'link' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                                <input
                                  type="text"
                                  value={content.sections?.hero?.primaryButton?.href || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.href', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="https://example.com or /page"
                                />
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'section' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Section ID</label>
                                <input
                                  type="text"
                                  value={content.sections?.hero?.primaryButton?.sectionId || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.sectionId', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="#section-id"
                                />
                                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                                  <p className="text-sm font-medium text-blue-900 mb-2">Available sections on this page:</p>
                                  <div className="text-xs text-blue-700 space-y-1">
                                    {getAvailableSections(activePage).map((section, index) => (
                                      <div key={index}>• <code className="bg-blue-100 px-1 rounded">{section.id}</code> - {section.name}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'phone' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                  type="tel"
                                  value={content.sections?.hero?.primaryButton?.phone || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.phone', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="+41791234567"
                                />
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'email' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                  type="email"
                                  value={content.sections?.hero?.primaryButton?.email || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.email', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="contact@example.com"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Secondary Button Configuration */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Secondary Button</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                              <input
                                type="text"
                                value={content.sections?.hero?.secondaryButton?.text || ''}
                                onChange={(e) => updateField('sections.hero.secondaryButton.text', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                placeholder="Button text"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Button Type</label>
                              <select
                                value={content.sections?.hero?.secondaryButton?.type || 'link'}
                                onChange={(e) => updateField('sections.hero.secondaryButton.type', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                              >
                                <option value="link">External Link</option>
                                <option value="section">Page Section</option>
                                <option value="phone">Phone Call</option>
                                <option value="email">Email</option>
                              </select>
                            </div>
                            {content.sections?.hero?.secondaryButton?.type === 'link' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                                <input
                                  type="text"
                                  value={content.sections?.hero?.secondaryButton?.href || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.href', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="https://example.com or /page"
                                />
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'section' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Section ID</label>
                                <input
                                  type="text"
                                  value={content.sections?.hero?.secondaryButton?.sectionId || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.sectionId', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="#section-id"
                                />
                                <div className="mt-2 p-3 bg-blue-50 rounded-md">
                                  <p className="text-sm font-medium text-blue-900 mb-2">Available sections on this page:</p>
                                  <div className="text-xs text-blue-700 space-y-1">
                                    {getAvailableSections(activePage).map((section, index) => (
                                      <div key={index}>• <code className="bg-blue-100 px-1 rounded">{section.id}</code> - {section.name}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'phone' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                  type="tel"
                                  value={content.sections?.hero?.secondaryButton?.phone || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.phone', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="+41791234567"
                                />
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'email' && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                  type="email"
                                  value={content.sections?.hero?.secondaryButton?.email || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.email', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                                  placeholder="contact@example.com"
                                />
                              </div>
                            )}
                          </div>
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
                      {content.sections.hero.images.map((image: Record<string, any>, index: number) => (
                        <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Image {index + 1}</h4>
                          
                          {/* Image Path */}
                          <div className="mb-3">
                            <ImageInput
                              value={image.src}
                              onChange={(value) => updateField(`sections.hero.images.${index}.src`, value)}
                              placeholder="/path/to/image.jpg"
                              label="Image Path"
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
                    {content.sections.services.cards.map((card: Record<string, any>, index: number) => (
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
                          <ImageInput
                            value={card.image.src}
                            onChange={(value) => updateField(`sections.services.cards.${index}.image.src`, value)}
                            placeholder="Image path"
                            label="Image Path"
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
                        value={content.sections?.social?.button?.text || ''}
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
                      <ImageInput
                        value={content.sections.social.image.src}
                        onChange={(value) => updateField('sections.social.image.src', value)}
                        placeholder="/image.jpg"
                        label="Image Source"
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
                    {content.sections.process.steps.map((step: Record<string, any>, index: number) => (
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
                
                    {/* Contact Hero Section */}
                    {activeSection === 'hero' && content.sections.hero && (
                      <>
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
                          {content.sections.hero.images.map((image: Record<string, any>, index: number) => (
                            <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Image {index + 1}</h4>

                              {/* Image Path */}
                              <div className="mb-3">
                                <ImageInput
                                  value={image.src}
                                  onChange={(value) => updateField(`sections.hero.images.${index}.src`, value)}
                                  placeholder="/path/to/image.jpg"
                                  label="Image Path"
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

                    {/* Contact Form Section */}
                    {activeSection === 'contactForm' && content.sections.contactForm && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={content.sections.contactForm.title}
                            onChange={(e) => updateField('sections.contactForm.title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={content.sections.contactForm.description}
                            onChange={(e) => updateField('sections.contactForm.description', e.target.value)}
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
                                value={content.sections?.contactForm?.form?.name?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.name.label', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Nom - Placeholder</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.name?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.name.placeholder', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email - Label</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.email?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.email.label', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email - Placeholder</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.email?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.email.placeholder', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone - Label</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.phone?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.phone.label', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone - Placeholder</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.phone?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.phone.placeholder', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Message - Label</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.message?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.message.label', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Message - Placeholder</label>
                              <input
                                type="text"
                                value={content.sections?.contactForm?.form?.message?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.message.placeholder', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                          <input
                            type="text"
                            value={content.sections?.contactForm?.form?.button?.text || ''}
                            onChange={(e) => updateField('sections.contactForm.form.button.text', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Legal Text</label>
                          <textarea
                            value={content.sections?.contactForm?.form?.legal || ''}
                            onChange={(e) => updateField('sections.contactForm.form.legal', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            rows={2}
                          />
                        </div>
                      </>
                    )}

                    {/* Contact Info Section */}
                    {activeSection === 'info' && content.sections.info && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            value={content.sections.info.title}
                            onChange={(e) => updateField('sections.info.title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Items (one per line)</label>
                          <textarea
                            value={content.sections.info.items.map((item: Record<string, any>) => `${item.title}: ${item.description}`).join('\n')}
                            onChange={(e) => {
                              const lines = e.target.value.split('\n');
                              const items = lines.map(line => {
                                const [title, ...descriptionParts] = line.split(': ');
                                return {
                                  title: title || '',
                                  description: descriptionParts.join(': ') || ''
                                };
                              });
                              updateField('sections.info.items', items);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900"
                            rows={6}
                            placeholder="Zone de service: Morges – Nyon – Lausanne et environs"
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
                          {content.sections?.hero?.primaryButton?.text || 'Primary Button'}
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
                          {content.sections?.hero?.secondaryButton?.text || 'Secondary Button'}
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <div>Primary: {content.sections?.hero?.primaryButton?.type || 'link'} - {content.sections?.hero?.primaryButton?.href || content.sections?.hero?.primaryButton?.sectionId || content.sections?.hero?.primaryButton?.phone || content.sections?.hero?.primaryButton?.email || 'No target'}</div>
                        <div>Secondary: {content.sections?.hero?.secondaryButton?.type || 'link'} - {content.sections?.hero?.secondaryButton?.href || content.sections?.hero?.secondaryButton?.sectionId || content.sections?.hero?.secondaryButton?.phone || content.sections?.hero?.secondaryButton?.email || 'No target'}</div>
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
                    {content.sections.services.cards && content.sections.services.cards.map((card: Record<string, any>, index: number) => (
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
                      {content.sections?.social?.button?.text || 'Button'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Process Preview */}
              {activeSection === 'process' && content.sections.process && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.process.title}</h2>
                  <div className="space-y-3">
                    {content.sections.process.steps.map((step: Record<string, any>, index: number) => (
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
              
                  {/* Contact Hero Preview */}
                  {activeSection === 'hero' && content.sections.hero && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">{content.sections.hero.title}</h2>
                      <p className="text-gray-700">{content.sections.hero.description}</p>
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

                  {/* Contact Form Preview */}
                  {activeSection === 'contactForm' && content.sections.contactForm && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">{content.sections.contactForm.title}</h2>
                      <p className="text-gray-700">{content.sections.contactForm.description}</p>
                      <div className="border border-gray-300 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder={content.sections?.contactForm?.form?.name?.placeholder || 'Nom'}
                              className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                              disabled
                            />
                            <input
                              type="email"
                              placeholder={content.sections?.contactForm?.form?.email?.placeholder || 'Email'}
                              className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                              disabled
                            />
                          </div>
                          <input
                            type="tel"
                            placeholder={content.sections?.contactForm?.form?.phone?.placeholder || 'Téléphone'}
                            className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                            disabled
                          />
                          <textarea
                            placeholder={content.sections?.contactForm?.form?.message?.placeholder || 'Message'}
                            className="w-full p-2 border border-gray-200 rounded-md text-gray-900"
                            rows={4}
                            disabled
                          />
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                            {content.sections?.contactForm?.form?.button?.text || 'Button'}
                          </button>
                          <p className="text-xs text-gray-500">{content.sections?.contactForm?.form?.legal || ''}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Info Preview */}
                  {activeSection === 'info' && content.sections.info && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">{content.sections.info.title}</h2>
                      <div className="space-y-3">
                        {content.sections.info.items.map((item: Record<string, any>, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        ))}
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



