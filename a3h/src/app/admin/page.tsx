'use client';

import { useState, useEffect } from 'react';
import ImageGrid from '../../../components/ImageGrid';
import ServiceCard from '../../../components/ServiceCard';
import FeatureImage from '../../../components/FeatureImage';
import ImageEditor from '../../../components/ImageEditor';
import FlexibleImageContainer from '../../../components/FlexibleImageContainer';

export default function Admin() {
  const [content, setContent] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load content from JSON file
    fetch('/api/content/homepage')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Error loading content:', err));
  }, []);

  const saveContent = () => {
    // Save content back to JSON file
    fetch('/api/content/homepage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then(() => {
      setIsEditing(false);
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

          {/* Section Navigation */}
          <div className="flex space-x-2 mb-6">
            {Object.keys(content.sections).map(section => (
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
                {activeSection === 'hero' && (
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
                
                {activeSection === 'services' && (
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
              {activeSection === 'hero' && (
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
              
              {activeSection === 'services' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">{content.sections.services.title}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {content.sections.services.cards.map((card: any, index: number) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

