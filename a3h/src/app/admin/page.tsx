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
    return <div className=&quot;p-8&quot;>Loading...</div>;
  }

  return (
    <div className=&quot;min-h-screen bg-gray-50&quot;>
      <div className=&quot;max-w-7xl mx-auto p-8&quot;>
        <div className=&quot;bg-white rounded-lg shadow-sm p-6 mb-6&quot;>
          <div className=&quot;flex justify-between items-center mb-4&quot;>
            <h1 className=&quot;text-2xl font-bold text-gray-900&quot;>Content Management</h1>
            <div className=&quot;flex space-x-4&quot;>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-md ${isEditing ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}
              >
                {isEditing ? 'Preview' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={saveContent}
                  className=&quot;bg-green-600 text-white px-4 py-2 rounded-md&quot;
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
          
          {/* Page Selector */}
          <div className=&quot;mb-6&quot;>
            <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Page à éditer</label>
            <select
              value={activePage}
              onChange={(e) => setActivePage(e.target.value)}
              className=&quot;w-full p-3 border border-gray-300 rounded-md text-sm text-gray-900 bg-white&quot;
            >
              {pages.map(page => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </select>
          </div>


              {/* Section Navigation */}
              <div className=&quot;flex space-x-2 mb-6&quot;>
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
        <div className=&quot;grid grid-cols-1 lg:grid-cols-2 gap-8&quot;>
          {/* Editor Panel */}
          <div className=&quot;bg-white rounded-lg shadow-sm p-6&quot;>
            <h2 className=&quot;text-xl font-bold text-gray-900 mb-4&quot;>
              Edit {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            
            {isEditing ? (
              <div className=&quot;space-y-4&quot;>
                {/* Page Settings Section */}
                {activeSection === 'pageSettings' && (
                  <>
                    <div className=&quot;border border-gray-200 rounded-lg p-4 bg-gray-50&quot;>
                      <h3 className=&quot;text-lg font-semibold text-gray-900 mb-4&quot;>Paramètres de la page</h3>
                      <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-4&quot;>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Titre du menu</label>
                          <input
                            type=&quot;text&quot;
                            value={content.menuTitle || ''}
                            onChange={(e) => updateField('menuTitle', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Titre affiché dans le menu&quot;
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Titre SEO</label>
                          <input
                            type=&quot;text&quot;
                            value={content.seoTitle || ''}
                            onChange={(e) => updateField('seoTitle', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Titre pour les moteurs de recherche&quot;
                          />
                        </div>
                        <div className=&quot;md:col-span-2&quot;>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Description SEO</label>
                          <textarea
                            value={content.seoDescription || ''}
                            onChange={(e) => updateField('seoDescription', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={3}
                            placeholder=&quot;Description pour les moteurs de recherche&quot;
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeSection === 'hero' && content.sections.hero && (
                  <>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Label</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.hero.label}
                        onChange={(e) => updateField('sections.hero.label', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                        style={{ color: '#111827' }}
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Title</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.hero.title}
                        onChange={(e) => updateField('sections.hero.title', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Description</label>
                      <textarea
                        value={content.sections.hero.description}
                        onChange={(e) => updateField('sections.hero.description', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                        rows={3}
                      />
                    </div>
                        {/* Primary Button Configuration */}
                        <div className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                          <h4 className=&quot;font-semibold text-gray-900 mb-3&quot;>Primary Button</h4>
                          <div className=&quot;space-y-3&quot;>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Text</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.hero?.primaryButton?.text || ''}
                                onChange={(e) => updateField('sections.hero.primaryButton.text', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                placeholder=&quot;Button text&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Type</label>
                              <select
                                value={content.sections?.hero?.primaryButton?.type || 'link'}
                                onChange={(e) => updateField('sections.hero.primaryButton.type', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900&quot;
                              >
                                <option value=&quot;link&quot;>External Link</option>
                                <option value=&quot;section&quot;>Page Section</option>
                                <option value=&quot;phone&quot;>Phone Call</option>
                                <option value=&quot;email&quot;>Email</option>
                              </select>
                            </div>
                            {content.sections?.hero?.primaryButton?.type === 'link' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Link URL</label>
                                <input
                                  type=&quot;text&quot;
                                  value={content.sections?.hero?.primaryButton?.href || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.href', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;https://example.com or /page&quot;
                                />
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'section' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Section ID</label>
                                <input
                                  type=&quot;text&quot;
                                  value={content.sections?.hero?.primaryButton?.sectionId || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.sectionId', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;#section-id&quot;
                                />
                                <div className=&quot;mt-2 p-3 bg-blue-50 rounded-md&quot;>
                                  <p className=&quot;text-sm font-medium text-blue-900 mb-2&quot;>Available sections on this page:</p>
                                  <div className=&quot;text-xs text-blue-700 space-y-1&quot;>
                                    {getAvailableSections(activePage).map((section, index) => (
                                      <div key={index}>• <code className=&quot;bg-blue-100 px-1 rounded&quot;>{section.id}</code> - {section.name}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'phone' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Phone Number</label>
                                <input
                                  type=&quot;tel&quot;
                                  value={content.sections?.hero?.primaryButton?.phone || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.phone', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;+41791234567&quot;
                                />
                              </div>
                            )}
                            {content.sections?.hero?.primaryButton?.type === 'email' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Email Address</label>
                                <input
                                  type=&quot;email&quot;
                                  value={content.sections?.hero?.primaryButton?.email || ''}
                                  onChange={(e) => updateField('sections.hero.primaryButton.email', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;contact@example.com&quot;
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Secondary Button Configuration */}
                        <div className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                          <h4 className=&quot;font-semibold text-gray-900 mb-3&quot;>Secondary Button</h4>
                          <div className=&quot;space-y-3&quot;>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Text</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.hero?.secondaryButton?.text || ''}
                                onChange={(e) => updateField('sections.hero.secondaryButton.text', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                placeholder=&quot;Button text&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Type</label>
                              <select
                                value={content.sections?.hero?.secondaryButton?.type || 'link'}
                                onChange={(e) => updateField('sections.hero.secondaryButton.type', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900&quot;
                              >
                                <option value=&quot;link&quot;>External Link</option>
                                <option value=&quot;section&quot;>Page Section</option>
                                <option value=&quot;phone&quot;>Phone Call</option>
                                <option value=&quot;email&quot;>Email</option>
                              </select>
                            </div>
                            {content.sections?.hero?.secondaryButton?.type === 'link' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Link URL</label>
                                <input
                                  type=&quot;text&quot;
                                  value={content.sections?.hero?.secondaryButton?.href || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.href', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;https://example.com or /page&quot;
                                />
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'section' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Section ID</label>
                                <input
                                  type=&quot;text&quot;
                                  value={content.sections?.hero?.secondaryButton?.sectionId || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.sectionId', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;#section-id&quot;
                                />
                                <div className=&quot;mt-2 p-3 bg-blue-50 rounded-md&quot;>
                                  <p className=&quot;text-sm font-medium text-blue-900 mb-2&quot;>Available sections on this page:</p>
                                  <div className=&quot;text-xs text-blue-700 space-y-1&quot;>
                                    {getAvailableSections(activePage).map((section, index) => (
                                      <div key={index}>• <code className=&quot;bg-blue-100 px-1 rounded&quot;>{section.id}</code> - {section.name}</div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'phone' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Phone Number</label>
                                <input
                                  type=&quot;tel&quot;
                                  value={content.sections?.hero?.secondaryButton?.phone || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.phone', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;+41791234567&quot;
                                />
                              </div>
                            )}
                            {content.sections?.hero?.secondaryButton?.type === 'email' && (
                              <div>
                                <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Email Address</label>
                                <input
                                  type=&quot;email&quot;
                                  value={content.sections?.hero?.secondaryButton?.email || ''}
                                  onChange={(e) => updateField('sections.hero.secondaryButton.email', e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                                  placeholder=&quot;contact@example.com&quot;
                                />
                              </div>
                            )}
                          </div>
                        </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Image Layout</label>
                      <div className=&quot;mb-4&quot;>
                        <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Layout Type</label>
                        <select
                          value={content.sections.hero.layoutType || 'single'}
                          onChange={(e) => updateField('sections.hero.layoutType', e.target.value)}
                          className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                        >
                          <option value=&quot;single&quot;>Single Image</option>
                          <option value=&quot;collage&quot;>Collage (Multiple Images)</option>
                        </select>
                      </div>
                      
                      {content.sections.hero.layoutType === 'single' && (
                        <div className=&quot;mb-4&quot;>
                          <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Image Orientation</label>
                          <select
                            value={content.sections.hero.singleOrientation || 'landscape'}
                            onChange={(e) => updateField('sections.hero.singleOrientation', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                          >
                            <option value=&quot;portrait&quot;>Portrait (2:3)</option>
                            <option value=&quot;landscape&quot;>Landscape (3:2)</option>
                            <option value=&quot;square&quot;>Square (1:1)</option>
                          </select>
                        </div>
                      )}
                      
                      {content.sections.hero.layoutType === 'collage' && (
                        <div className=&quot;mb-4&quot;>
                          <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Collage Layout</label>
                          <select
                            value={content.sections.hero.collageLayout || 'layout1'}
                            onChange={(e) => updateField('sections.hero.collageLayout', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                          >
                            <option value=&quot;layout1&quot;>Layout 1: 2 Side-by-Side Landscape (3:2 container)</option>
                            <option value=&quot;layout2&quot;>Layout 2: 2 Stacked Vertical Landscape (3:2 container)</option>
                            <option value=&quot;layout3&quot;>Layout 3: 1 Portrait + 2 Landscape (3:2 container)</option>
                            <option value=&quot;layout4&quot;>Layout 4: 3 Side-by-Side Portrait (3:2 container)</option>
                          </select>
                        </div>
                      )}
                      
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Images</label>
                      {content.sections.hero.images.map((image: Record<string, any>, index: number) => (
                        <div key={index} className=&quot;mb-4 border border-gray-200 rounded-lg p-4&quot;>
                          <h4 className=&quot;font-semibold text-gray-900 mb-2&quot;>Image {index + 1}</h4>
                          
                          {/* Image Path */}
                          <div className=&quot;mb-3&quot;>
                            <ImageInput
                              value={image.src}
                              onChange={(value) => updateField(`sections.hero.images.${index}.src`, value)}
                              placeholder=&quot;/path/to/image.jpg&quot;
                              label=&quot;Image Path&quot;
                            />
                          </div>
                          
                          {/* Alt Text */}
                          <div className=&quot;mb-3&quot;>
                            <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Alt Text</label>
                            <input
                              type=&quot;text&quot;
                              value={image.alt}
                              onChange={(e) => updateField(`sections.hero.images.${index}.alt`, e.target.value)}
                              className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                              placeholder=&quot;Description for accessibility&quot;
                            />
                          </div>
                          
                          {/* Visual Image Editor */}
                          <div className=&quot;mb-3&quot;>
                            <label className=&quot;block text-xs font-medium text-gray-600 mb-2&quot;>Image Editor</label>
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
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Section Title</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.services.title}
                        onChange={(e) => updateField('sections.services.title', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    {content.sections.services.cards.map((card: Record<string, any>, index: number) => (
                      <div key={index} className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                        <h3 className=&quot;font-bold mb-2&quot;>Card {index + 1}</h3>
                        <div className=&quot;space-y-2&quot;>
                          <input
                            type=&quot;text&quot;
                            value={card.title}
                            onChange={(e) => updateField(`sections.services.cards.${index}.title`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Card title&quot;
                          />
                          <input
                            type=&quot;text&quot;
                            value={card.price}
                            onChange={(e) => updateField(`sections.services.cards.${index}.price`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Price&quot;
                          />
                          <textarea
                            value={card.description}
                            onChange={(e) => updateField(`sections.services.cards.${index}.description`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={2}
                            placeholder=&quot;Description&quot;
                          />
                          <ImageInput
                            value={card.image.src}
                            onChange={(value) => updateField(`sections.services.cards.${index}.image.src`, value)}
                            placeholder=&quot;Image path&quot;
                            label=&quot;Image Path&quot;
                          />
                          <input
                            type=&quot;text&quot;
                            value={card.image.alt}
                            onChange={(e) => updateField(`sections.services.cards.${index}.image.alt`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md mb-1 text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Alt text&quot;
                          />
                          
                          {/* Visual Image Editor */}
                          <div className=&quot;mb-3&quot;>
                            <label className=&quot;block text-xs font-medium text-gray-600 mb-2&quot;>Image Editor</label>
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
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Title</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.social.title}
                        onChange={(e) => updateField('sections.social.title', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Description</label>
                      <textarea
                        value={content.sections.social.description}
                        onChange={(e) => updateField('sections.social.description', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Price</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.social.price}
                        onChange={(e) => updateField('sections.social.price', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Text</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections?.social?.button?.text || ''}
                        onChange={(e) => updateField('sections.social.button.text', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Features (one per line)</label>
                      <textarea
                        value={content.sections.social.features.join('\n')}
                        onChange={(e) => updateField('sections.social.features', e.target.value.split('\n'))}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                        rows={4}
                      />
                    </div>
                    <div>
                      <ImageInput
                        value={content.sections.social.image.src}
                        onChange={(value) => updateField('sections.social.image.src', value)}
                        placeholder=&quot;/image.jpg&quot;
                        label=&quot;Image Source&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Image Alt Text</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.social.image.alt}
                        onChange={(e) => updateField('sections.social.image.alt', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                        placeholder=&quot;Description de l'image&quot;
                      />
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Image Editor</label>
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
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Section Title</label>
                      <input
                        type=&quot;text&quot;
                        value={content.sections.process.title}
                        onChange={(e) => updateField('sections.process.title', e.target.value)}
                        className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                      />
                    </div>
                    {content.sections.process.steps.map((step: Record<string, any>, index: number) => (
                      <div key={index} className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                        <h3 className=&quot;font-bold mb-2&quot;>Step {index + 1}</h3>
                        <div className=&quot;space-y-2&quot;>
                          <input
                            type=&quot;text&quot;
                            value={step.title}
                            onChange={(e) => updateField(`sections.process.steps.${index}.title`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Step title&quot;
                          />
                          <textarea
                            value={step.description}
                            onChange={(e) => updateField(`sections.process.steps.${index}.description`, e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            placeholder=&quot;Step description&quot;
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
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Title</label>
                          <input
                            type=&quot;text&quot;
                            value={content.sections.hero.title}
                            onChange={(e) => updateField('sections.hero.title', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Description</label>
                          <textarea
                            value={content.sections.hero.description}
                            onChange={(e) => updateField('sections.hero.description', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Image Layout</label>
                          <div className=&quot;mb-4&quot;>
                            <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Layout Type</label>
                            <select
                              value={content.sections.hero.layoutType || 'single'}
                              onChange={(e) => updateField('sections.hero.layoutType', e.target.value)}
                              className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                            >
                              <option value=&quot;single&quot;>Single Image</option>
                              <option value=&quot;collage&quot;>Collage (Multiple Images)</option>
                            </select>
                          </div>

                          {content.sections.hero.layoutType === 'single' && (
                            <div className=&quot;mb-4&quot;>
                              <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Image Orientation</label>
                              <select
                                value={content.sections.hero.singleOrientation || 'landscape'}
                                onChange={(e) => updateField('sections.hero.singleOrientation', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                              >
                                <option value=&quot;portrait&quot;>Portrait (2:3)</option>
                                <option value=&quot;landscape&quot;>Landscape (3:2)</option>
                                <option value=&quot;square&quot;>Square (1:1)</option>
                              </select>
                            </div>
                          )}

                          {content.sections.hero.layoutType === 'collage' && (
                            <div className=&quot;mb-4&quot;>
                              <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Collage Layout</label>
                              <select
                                value={content.sections.hero.collageLayout || 'layout1'}
                                onChange={(e) => updateField('sections.hero.collageLayout', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                              >
                                <option value=&quot;layout1&quot;>Layout 1: 2 Side-by-Side Landscape (3:2 container)</option>
                                <option value=&quot;layout2&quot;>Layout 2: 2 Stacked Vertical Landscape (3:2 container)</option>
                                <option value=&quot;layout3&quot;>Layout 3: 1 Portrait + 2 Landscape (3:2 container)</option>
                                <option value=&quot;layout4&quot;>Layout 4: 3 Side-by-Side Portrait (3:2 container)</option>
                              </select>
                            </div>
                          )}

                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Images</label>
                          {content.sections.hero.images.map((image: Record<string, any>, index: number) => (
                            <div key={index} className=&quot;mb-4 border border-gray-200 rounded-lg p-4&quot;>
                              <h4 className=&quot;font-semibold text-gray-900 mb-2&quot;>Image {index + 1}</h4>

                              {/* Image Path */}
                              <div className=&quot;mb-3&quot;>
                                <ImageInput
                                  value={image.src}
                                  onChange={(value) => updateField(`sections.hero.images.${index}.src`, value)}
                                  placeholder=&quot;/path/to/image.jpg&quot;
                                  label=&quot;Image Path&quot;
                                />
                              </div>

                              {/* Alt Text */}
                              <div className=&quot;mb-3&quot;>
                                <label className=&quot;block text-xs font-medium text-gray-600 mb-1&quot;>Alt Text</label>
                                <input
                                  type=&quot;text&quot;
                                  value={image.alt}
                                  onChange={(e) => updateField(`sections.hero.images.${index}.alt`, e.target.value)}
                                  className=&quot;w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900&quot;
                                  placeholder=&quot;Description for accessibility&quot;
                                />
                              </div>

                              {/* Visual Image Editor */}
                              <div className=&quot;mb-3&quot;>
                                <label className=&quot;block text-xs font-medium text-gray-600 mb-2&quot;>Image Editor</label>
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
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Title</label>
                          <input
                            type=&quot;text&quot;
                            value={content.sections.contactForm.title}
                            onChange={(e) => updateField('sections.contactForm.title', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Description</label>
                          <textarea
                            value={content.sections.contactForm.description}
                            onChange={(e) => updateField('sections.contactForm.description', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={3}
                          />
                        </div>

                        {/* Form Fields */}
                        <div className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                          <h4 className=&quot;font-semibold text-gray-900 mb-3&quot;>Champs du formulaire</h4>
                          <div className=&quot;space-y-3&quot;>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Nom - Label</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.name?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.name.label', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Nom - Placeholder</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.name?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.name.placeholder', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Email - Label</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.email?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.email.label', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Email - Placeholder</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.email?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.email.placeholder', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Téléphone - Label</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.phone?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.phone.label', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Téléphone - Placeholder</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.phone?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.phone.placeholder', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Message - Label</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.message?.label || ''}
                                onChange={(e) => updateField('sections.contactForm.form.message.label', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                            <div>
                              <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Message - Placeholder</label>
                              <input
                                type=&quot;text&quot;
                                value={content.sections?.contactForm?.form?.message?.placeholder || ''}
                                onChange={(e) => updateField('sections.contactForm.form.message.placeholder', e.target.value)}
                                className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Button Text</label>
                          <input
                            type=&quot;text&quot;
                            value={content.sections?.contactForm?.form?.button?.text || ''}
                            onChange={(e) => updateField('sections.contactForm.form.button.text', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Legal Text</label>
                          <textarea
                            value={content.sections?.contactForm?.form?.legal || ''}
                            onChange={(e) => updateField('sections.contactForm.form.legal', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={2}
                          />
                        </div>
                      </>
                    )}

                    {/* Contact Info Section */}
                    {activeSection === 'info' && content.sections.info && (
                      <>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Title</label>
                          <input
                            type=&quot;text&quot;
                            value={content.sections.info.title}
                            onChange={(e) => updateField('sections.info.title', e.target.value)}
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                          />
                        </div>
                        <div>
                          <label className=&quot;block text-sm font-medium text-gray-700 mb-2&quot;>Items (one per line)</label>
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
                            className=&quot;w-full p-2 border border-gray-300 rounded-md text-gray-900 !text-gray-900&quot;
                            rows={6}
                            placeholder=&quot;Zone de service: Morges – Nyon – Lausanne et environs&quot;
                          />
                        </div>
                      </>
                    )}
              </div>
            ) : (
              <div className=&quot;text-gray-900&quot;>
                Click &quot;Edit&quot; to modify content
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className=&quot;bg-white rounded-lg shadow-sm p-6&quot;>
            <h2 className=&quot;text-xl font-bold text-gray-900 mb-4&quot;>Preview</h2>
            <div className=&quot;border border-gray-200 rounded-lg p-4&quot;>
              {/* Page Settings Preview */}
              {activeSection === 'pageSettings' && (
                <div className=&quot;space-y-4&quot;>
                  <h2 className=&quot;text-xl font-bold text-gray-900&quot;>Aperçu des paramètres</h2>
                  <div className=&quot;space-y-3&quot;>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Titre du menu</label>
                      <p className=&quot;text-gray-900 bg-gray-100 p-2 rounded&quot;>{content.menuTitle || 'Non défini'}</p>
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Titre SEO</label>
                      <p className=&quot;text-gray-900 bg-gray-100 p-2 rounded&quot;>{content.seoTitle || 'Non défini'}</p>
                    </div>
                    <div>
                      <label className=&quot;block text-sm font-medium text-gray-700 mb-1&quot;>Description SEO</label>
                      <p className=&quot;text-gray-900 bg-gray-100 p-2 rounded&quot;>{content.seoDescription || 'Non définie'}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'hero' && content.sections.hero && (
                <div className=&quot;space-y-4&quot;>
                  <p className=&quot;text-sm text-gray-500 uppercase font-semibold&quot;>{content.sections.hero.label}</p>
                  <h1 className=&quot;text-2xl font-bold text-gray-900&quot;>{content.sections.hero.title}</h1>
                  <p className=&quot;text-gray-700&quot;>{content.sections.hero.description}</p>
                      <div className=&quot;flex space-x-4&quot;>
                        <button className=&quot;bg-gray-900 text-white px-4 py-2 rounded-md text-sm&quot;>
                          {content.sections?.hero?.primaryButton?.text || 'Primary Button'}
                        </button>
                        <button className=&quot;border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm&quot;>
                          {content.sections?.hero?.secondaryButton?.text || 'Secondary Button'}
                        </button>
                      </div>
                      <div className=&quot;mt-2 text-xs text-gray-500&quot;>
                        <div>Primary: {content.sections?.hero?.primaryButton?.type || 'link'} - {content.sections?.hero?.primaryButton?.href || content.sections?.hero?.primaryButton?.sectionId || content.sections?.hero?.primaryButton?.phone || content.sections?.hero?.primaryButton?.email || 'No target'}</div>
                        <div>Secondary: {content.sections?.hero?.secondaryButton?.type || 'link'} - {content.sections?.hero?.secondaryButton?.href || content.sections?.hero?.secondaryButton?.sectionId || content.sections?.hero?.secondaryButton?.phone || content.sections?.hero?.secondaryButton?.email || 'No target'}</div>
                      </div>
                  <div className=&quot;mt-4&quot;>
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
                <div className=&quot;space-y-4&quot;>
                  <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.services.title}</h2>
                  <div className=&quot;grid grid-cols-1 gap-4&quot;>
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
                <div className=&quot;space-y-4&quot;>
                  <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.social.title}</h2>
                  <p className=&quot;text-gray-700&quot;>{content.sections.social.description}</p>
                  <ul className=&quot;list-disc list-inside space-y-1&quot;>
                    {content.sections.social.features.map((feature: string, index: number) => (
                      <li key={index} className=&quot;text-gray-600&quot;>{feature}</li>
                    ))}
                  </ul>
                  <div className=&quot;flex items-center justify-between&quot;>
                    <span className=&quot;text-lg font-semibold text-gray-900&quot;>{content.sections.social.price}</span>
                    <button className=&quot;bg-blue-600 text-white px-4 py-2 rounded-md text-sm&quot;>
                      {content.sections?.social?.button?.text || 'Button'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Process Preview */}
              {activeSection === 'process' && content.sections.process && (
                <div className=&quot;space-y-4&quot;>
                  <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.process.title}</h2>
                  <div className=&quot;space-y-3&quot;>
                    {content.sections.process.steps.map((step: Record<string, any>, index: number) => (
                      <div key={index} className=&quot;flex items-start space-x-3&quot;>
                        <div className=&quot;flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold&quot;>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className=&quot;font-semibold text-gray-900&quot;>{step.title}</h3>
                          <p className=&quot;text-gray-600&quot;>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
                  {/* Contact Hero Preview */}
                  {activeSection === 'hero' && content.sections.hero && (
                    <div className=&quot;space-y-4&quot;>
                      <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.hero.title}</h2>
                      <p className=&quot;text-gray-700&quot;>{content.sections.hero.description}</p>
                      <div className=&quot;mt-4&quot;>
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
                    <div className=&quot;space-y-4&quot;>
                      <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.contactForm.title}</h2>
                      <p className=&quot;text-gray-700&quot;>{content.sections.contactForm.description}</p>
                      <div className=&quot;border border-gray-300 rounded-lg p-4&quot;>
                        <div className=&quot;space-y-3&quot;>
                          <div className=&quot;grid grid-cols-2 gap-3&quot;>
                            <input
                              type=&quot;text&quot;
                              placeholder={content.sections?.contactForm?.form?.name?.placeholder || 'Nom'}
                              className=&quot;w-full p-2 border border-gray-200 rounded-md text-gray-900&quot;
                              disabled
                            />
                            <input
                              type=&quot;email&quot;
                              placeholder={content.sections?.contactForm?.form?.email?.placeholder || 'Email'}
                              className=&quot;w-full p-2 border border-gray-200 rounded-md text-gray-900&quot;
                              disabled
                            />
                          </div>
                          <input
                            type=&quot;tel&quot;
                            placeholder={content.sections?.contactForm?.form?.phone?.placeholder || 'Téléphone'}
                            className=&quot;w-full p-2 border border-gray-200 rounded-md text-gray-900&quot;
                            disabled
                          />
                          <textarea
                            placeholder={content.sections?.contactForm?.form?.message?.placeholder || 'Message'}
                            className=&quot;w-full p-2 border border-gray-200 rounded-md text-gray-900&quot;
                            rows={4}
                            disabled
                          />
                        </div>
                        <div className=&quot;mt-3 flex justify-between items-center&quot;>
                          <button className=&quot;bg-blue-600 text-white px-4 py-2 rounded-md text-sm&quot;>
                            {content.sections?.contactForm?.form?.button?.text || 'Button'}
                          </button>
                          <p className=&quot;text-xs text-gray-500&quot;>{content.sections?.contactForm?.form?.legal || ''}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Info Preview */}
                  {activeSection === 'info' && content.sections.info && (
                    <div className=&quot;space-y-4&quot;>
                      <h2 className=&quot;text-xl font-bold text-gray-900&quot;>{content.sections.info.title}</h2>
                      <div className=&quot;space-y-3&quot;>
                        {content.sections.info.items.map((item: Record<string, any>, index: number) => (
                          <div key={index} className=&quot;border border-gray-200 rounded-lg p-4&quot;>
                            <h3 className=&quot;font-semibold text-gray-900&quot;>{item.title}</h3>
                            <p className=&quot;text-gray-600&quot;>{item.description}</p>
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



