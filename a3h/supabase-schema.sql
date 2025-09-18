-- A3H Photography Database Schema
-- Run this in your Supabase SQL editor

-- Content table for website content management
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(50) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Galleries table for client galleries
CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Photos table for gallery photos
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery access logs for security
CREATE TABLE IF NOT EXISTS gallery_access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  ip_address INET NOT NULL,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_galleries_expires_at ON galleries(expires_at);
CREATE INDEX IF NOT EXISTS idx_galleries_is_active ON galleries(is_active);
CREATE INDEX IF NOT EXISTS idx_photos_gallery_id ON photos(gallery_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_gallery_id ON gallery_access_logs(gallery_id);

-- Row Level Security Policies
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_access_logs ENABLE ROW LEVEL SECURITY;

-- Content policies (public read, admin write only)
CREATE POLICY "Content is publicly readable" ON content FOR SELECT USING (true);
CREATE POLICY "Content is writable by service role only" ON content FOR ALL USING (auth.role() = 'service_role');

-- Gallery policies (public read for active galleries, admin write)
CREATE POLICY "Active galleries are publicly readable" ON galleries FOR SELECT USING (is_active = true AND expires_at > NOW());
CREATE POLICY "Galleries are writable by authenticated users" ON galleries FOR ALL USING (auth.role() = 'authenticated');

-- Photo policies (public read for active galleries, admin write)
CREATE POLICY "Photos are readable for active galleries" ON photos FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM galleries 
    WHERE galleries.id = photos.gallery_id 
    AND galleries.is_active = true 
    AND galleries.expires_at > NOW()
  )
);
CREATE POLICY "Photos are writable by authenticated users" ON photos FOR ALL USING (auth.role() = 'authenticated');

-- Access log policies (admin only)
CREATE POLICY "Access logs are readable by authenticated users" ON gallery_access_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Access logs are writable by authenticated users" ON gallery_access_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert initial content from JSON files
INSERT INTO content (page, content) VALUES 
('homepage', '{
  "page": "homepage",
  "title": "A3H Photography - Des images qui ouvrent l''appétit",
  "menuTitle": "Photographie",
  "seoTitle": "A3H Photography - Photographe professionnel Morges Nyon Lausanne",
  "seoDescription": "Photographe professionnel spécialisé dans les headshots, la photographie culinaire et les événements privés. Service express J+0/J+1. Région Morges-Nyon-Lausanne.",
  "sections": {
    "hero": {
      "layout": "heroGrid",
      "layoutType": "collage",
      "singleOrientation": "landscape",
      "collageLayout": "layout1",
      "label": "Photographe à Morges et la Côte pour headshots, restaurants et événements",
      "title": "Montrez le meilleur de vous-même — et de votre marque",
      "description": "Headshots et portraits qui ouvrent des portes, photos culinaires qui donnent faim, souvenirs d''événements qui restent. Accompagnement chaleureux, retouches naturelles, livraison rapide.\n\nLivraison J+0/J+1 • Studio mobile • Galeries privées",
      "primaryButton": {
        "text": "Découvrir les packs",
        "type": "section",
        "sectionId": "#services"
      },
      "secondaryButton": {
        "text": "Demander une offre",
        "type": "link",
        "href": "/contact"
      },
      "images": [
        {
          "src": "/uploads/1758133648941_P9140145.jpg",
          "alt": "Photographie culinaire",
          "position": "top-left",
          "colSpan": 1,
          "focusPoint": "44.83333333333333% 42%",
          "size": "large",
          "zoom": 1
        },
        {
          "src": "/uploads/1758133689844__DSC6459.jpg",
          "alt": "Plats stylisés",
          "position": "top-right",
          "colSpan": 1,
          "focusPoint": "center",
          "size": "large",
          "zoom": 1
        },
        {
          "src": "/uploads/P3010418.jpg",
          "alt": "Ambiance restaurant",
          "position": "bottom-full",
          "colSpan": 1,
          "focusPoint": "49.5% 66%",
          "size": "full",
          "zoom": 1.3
        }
      ]
    },
    "services": {
      "title": "Nos formules",
      "cards": [
        {
          "title": "MENU Starter",
          "price": "390 CHF (-2 h)",
          "description": "Jusqu''à 10 plats stylisés + 5 visuels du lieu/équipe, 30-40 images web.",
          "image": {
            "src": "/uploads/DSCF3687.jpg",
            "alt": "Menu Starter",
            "focusPoint": "56.99999999999999% 12%",
            "zoom": 1.1
          },
          "button": {
            "text": "Réserver",
            "href": "/contact"
          }
        },
        {
          "title": "CARTE Complète",
          "price": "690 CHF (½ journée)",
          "description": "20-30 plats + ambiance + portraits d''équipe, 60-80 images, set optimisé pour UberEats/Smood.",
          "image": {
            "src": "/uploads/DSCF3898.jpg",
            "alt": "Carte Complète",
            "focusPoint": "center",
            "zoom": 1
          },
          "button": {
            "text": "Réserver",
            "href": "/contact"
          }
        },
        {
          "title": "JOURNÉE Brand",
          "price": "1090 CHF (journée)",
          "description": "Storytelling cuisine + salle + détails + portraits, 100-140 images harmonisées.",
          "image": {
            "src": "/uploads/DSCF6573.jpg",
            "alt": "Journée Brand",
            "focusPoint": "center",
            "zoom": 1
          },
          "button": {
            "text": "Réserver",
            "href": "/contact"
          }
        }
      ]
    },
    "social": {
      "layout": "featureImage",
      "title": "Formule Social « Miam »",
      "description": "Un accompagnement mensuel pour alimenter vos réseaux avec régularité.",
      "features": [
        "1 session photo mensuelle de 2 h",
        "10 photos retouchées",
        "2 micro-reels 6-10 s (vertical)"
      ],
      "price": "390 CHF / mois",
      "button": {
        "text": "S''abonner",
        "href": "/contact"
      },
      "image": {
        "src": "/uploads/_DSC5340.jpg",
        "alt": "Formule Social Miam",
        "focusPoint": "center",
        "zoom": 1
      }
    },
    "process": {
      "title": "Comment ça marche ?",
      "steps": [
        {
          "title": "Brief",
          "description": "On échange sur vos plats phares et votre identité."
        },
        {
          "title": "Shooting",
          "description": "Je me déplace avec studio mobile et lumière adaptée."
        },
        {
          "title": "Livraison",
          "description": "Galerie privée + fichiers optimisés web & apps."
        }
      ]
    },
    "contact": {
      "title": "Parlons de votre restaurant",
      "description": "Envoyez-moi vos besoins — je vous réponds sous 24 h.",
      "form": {
        "nom": {
          "label": "Nom",
          "placeholder": "Votre nom",
          "required": true
        },
        "prenom": {
          "label": "Prénom",
          "placeholder": "Votre prénom",
          "required": true
        },
        "email": {
          "label": "Email",
          "placeholder": "votre@email.com",
          "required": true
        },
        "telephone": {
          "label": "Téléphone",
          "placeholder": "Votre numéro",
          "required": false
        },
        "message": {
          "label": "Message",
          "placeholder": "Votre message...",
          "required": true
        }
      },
      "button": {
        "text": "Envoyer",
        "href": "#"
      },
      "legal": "En soumettant, vous acceptez les CGV et la politique de confidentialité."
    }
  }
}'::jsonb)
ON CONFLICT (page) DO NOTHING;

-- Insert contact page content
INSERT INTO content (page, content) VALUES 
('contact', '{
  "page": "contact",
  "title": "Contact - A3H Photography",
  "menuTitle": "Contact",
  "seoTitle": "Contact - A3H Photography Morges Nyon Lausanne",
  "seoDescription": "Contactez A3H Photography pour vos besoins en photographie professionnelle. Headshots, restaurants, événements privés. Service express J+0/J+1.",
  "sections": {
    "hero": {
      "layoutType": "single",
      "singleOrientation": "landscape",
      "title": "Parlons de votre projet",
      "description": "Que ce soit pour des headshots professionnels, de la photographie culinaire ou un événement privé, je suis là pour vous accompagner.",
      "images": [
        {
          "src": "/uploads/_DSC3983.jpg",
          "alt": "Contact A3H Photography",
          "focusPoint": "center",
          "zoom": 1
        }
      ]
    },
    "info": {
      "title": "Informations pratiques",
      "items": [
        {
          "title": "Zone de service",
          "description": "Morges – Nyon – Lausanne et environs"
        },
        {
          "title": "Livraison",
          "description": "Express J+0/J+1 pour headshots et portraits"
        },
        {
          "title": "Studio mobile",
          "description": "Déplacement sur site avec équipement professionnel"
        }
      ]
    },
    "contactForm": {
      "title": "Envoyez-moi un message",
      "description": "Décrivez votre projet et vos besoins — je vous réponds sous 24h.",
      "form": {
        "name": {
          "label": "Nom complet",
          "placeholder": "Votre nom complet"
        },
        "email": {
          "label": "Email",
          "placeholder": "votre@email.com"
        },
        "phone": {
          "label": "Téléphone",
          "placeholder": "Votre numéro de téléphone"
        },
        "message": {
          "label": "Message",
          "placeholder": "Décrivez votre projet..."
        },
        "button": {
          "text": "Envoyer le message"
        },
        "legal": "En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous recontacter."
      }
    }
  }
}'::jsonb)
ON CONFLICT (page) DO NOTHING;
