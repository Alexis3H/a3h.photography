# A3H Photography Website Rebuild - Project Scope

## Project Overview
Rebuild of a3h.photography from Pixpa to a modern, SEO-optimized platform while preserving core client gallery functionality.

## Current Website Analysis (Pixpa Platform)

### Current State Assessment
**Website**: [https://www.a3h.photography/](https://www.a3h.photography/)
**Platform**: Pixpa
**Language**: French (Switzerland-based)
**Location**: Morges – Nyon – Lausanne area

### Current Services & Features
- **Headshots**: Professional portraits for LinkedIn, CV & teams with coaching and natural retouching
- **Restaurants**: Food photography for menus, social media, delivery platforms
- **Private Events**: Birthdays, baptisms, parties with authentic moments and warm ambiance
- **Express Delivery**: J+0/J+1 for headshots and portraits
- **Mobile Studio**: On-location photography capability
- **Private Galleries**: Basic client gallery functionality
- **Contact Form**: Lead generation and client communication

### Current Brand Messaging
- **Tagline**: "Montrez le meilleur de vous-même — et de votre marque" (Show the best of yourself — and your brand)
- **Value Proposition**: Warm accompaniment, natural retouching, fast delivery
- **Differentiators**: Express delivery, mobile studio, private galleries

### Technical Limitations (Pixpa)
- **SEO Control**: Limited control over robots.txt, meta tags, structured data
- **Performance**: Dependent on Pixpa's infrastructure
- **Customization**: Restricted by platform limitations
- **Cost**: Monthly subscription without full control

## Requirements Summary
- **Budget**: $20/month maximum
- **Client Galleries**: ~20 active galleries (1 year duration each)
- **Storage**: ~50MB per gallery (1GB total estimated)
- **Traffic**: ~50 visitors/month
- **E-commerce**: Not required
- **Maintenance**: Hands-off preferred
- **SEO**: Full control over robots.txt, meta tags, structured data

## Tech Stack Selection: Next.js + Supabase + Vercel

### Why This Stack?
- **Cost-Effective**: Fits within $20/month budget
- **SEO-Friendly**: Full control over meta tags, robots.txt, sitemaps
- **Scalable**: Can grow with your business
- **Low Maintenance**: Managed services with automatic updates
- **Performance**: Excellent page load speeds

## Detailed Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI or Headless UI
- **Image Optimization**: Next.js Image component + Cloudinary
- **SEO**: Next-SEO, structured data
- **Internationalization**: French/English bilingual support (i18n)

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Supabase Edge Functions (if needed)

### Hosting & Services
- **Hosting**: Vercel (Pro plan - $20/month)
- **Domain**: Existing domain
- **CDN**: Vercel Edge Network
- **Analytics**: Vercel Analytics (included)

## Core Features

### Public Website
- **Homepage**: Hero section with tagline "Montrez le meilleur de vous-même — et de votre marque", service overview, portfolio preview
- **Services**: 
  - Headshots (LinkedIn, CV, teams with coaching)
  - Restaurants (food photography for menus, social media, delivery)
  - Private Events (birthdays, baptisms, parties)
- **Portfolio**: Organized photo galleries showcasing all three service categories
- **About**: Professional bio highlighting Morges – Nyon – Lausanne location and mobile studio capability
- **Contact**: Contact form with email integration, emphasizing express delivery (J+0/J+1)
- **SEO**: Meta tags, structured data, robots.txt, sitemap with full control

### Client Galleries (Private)
- **Access Control**: Password-protected galleries
- **Photo Viewing**: High-quality image viewing with zoom
- **Download**: Individual photo downloads
- **Gallery Management**: Easy upload and organization
- **Expiration**: Automatic gallery expiration after 1 year

### Admin Panel
- **Gallery Management**: Create, edit, delete galleries
- **Photo Upload**: Bulk upload with automatic optimization
- **Client Management**: Assign galleries to clients
- **Analytics**: Basic visitor statistics

## Database Schema

### Tables
- **galleries**: id, name, password, client_name, created_at, expires_at, is_active
- **photos**: id, gallery_id, filename, original_name, file_size, uploaded_at
- **gallery_access_logs**: id, gallery_id, ip_address, accessed_at

## SEO Features
- **Robots.txt**: Full control over crawler access
- **Meta Tags**: Dynamic meta descriptions and titles
- **Structured Data**: Photo schema markup
- **Sitemap**: Automatic XML sitemap generation
- **Image Alt Tags**: Automatic alt text generation
- **Page Speed**: Optimized images and lazy loading

## Security Features
- **Gallery Passwords**: Secure password protection
- **Rate Limiting**: Prevent brute force attacks
- **HTTPS**: SSL certificates via Vercel
- **Input Validation**: Sanitize all user inputs

## Cost Breakdown (Monthly)
- **Vercel Pro**: $20/month
- **Supabase**: Free tier (up to 500MB database, 1GB storage)
- **Domain**: Existing (no additional cost)
- **Total**: $20/month

## Development Phases

### Phase 1: Core Website ✅ COMPLETED
- ✅ Set up Next.js project with Tailwind CSS
- ✅ Create homepage with hero section, services, social media package, process, and contact sections
- ✅ Create service pages: headshots, restaurants, events, contact
- ✅ Implement responsive design with mobile-first approach
- ✅ Set up SEO optimization with dynamic meta tags and structured data
- ✅ Implement content management system with JSON-based content files
- ✅ Create admin interface for editing all website content
- ✅ Add visual image editing with zoom and focal point controls
- ✅ Implement flexible image layouts (single, collage with multiple layout options)
- ✅ Add image upload and browsing functionality
- ✅ Create dynamic navigation menu system
- ✅ Implement button component with multiple link types (external, section, phone, email)
- ✅ Add comprehensive form field management for contact forms
- ✅ Set up image optimization and management system
- ✅ Remove portfolio and about pages as requested
- ✅ Implement French language support throughout the site

## Phase 1 Technical Achievements

### Content Management System
- **JSON-based Content**: All website content stored in structured JSON files for easy editing
- **Admin Interface**: Complete admin panel at `/admin` for editing all content without code changes
- **Dynamic Menu System**: Navigation menu automatically updates based on content changes
- **Page-level SEO**: Individual SEO titles, descriptions, and menu titles for each page

### Image Management System
- **Visual Image Editor**: Mouse-based zoom and focal point adjustment for precise image positioning
- **Flexible Layouts**: Support for single images and multiple collage layouts (2-4 images)
- **Aspect Ratio Control**: Automatic handling of 3:2, 2:3, 4:3, and 3:4 aspect ratios
- **Image Upload**: Drag-and-drop image upload with automatic optimization
- **Image Browser**: Visual image selection with thumbnails, search, and preview functionality

### Advanced Components
- **Button Component**: Support for external links, page sections, phone calls, and email links
- **FlexibleImageContainer**: Dynamic image rendering based on layout configurations
- **ImageInput**: Visual image selection with upload and browsing capabilities
- **ServiceCard**: Reusable service display components with image and pricing

### Technical Features
- **API Routes**: RESTful APIs for content management, image upload, and image listing
- **File System Integration**: Direct file system access for image management
- **Error Handling**: Comprehensive error handling and debugging capabilities
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance**: Optimized images and lazy loading

### Content Structure
- **Homepage**: Hero section with collage layouts, services grid, social media package, process steps, contact form
- **Service Pages**: Individual pages for headshots, restaurants, events, and contact
- **Contact Management**: Detailed contact form with customizable fields and validation
- **SEO Integration**: Dynamic meta tags, structured data, and search engine optimization

### Phase 2: Client Gallery System
- Set up Supabase database and storage
- Create gallery creation and management system
- Implement password protection
- Build photo viewing and download functionality

### Phase 3: Admin Panel
- Create admin dashboard
- Implement bulk photo upload
- Add gallery management features
- Set up analytics

### Phase 4: Testing & Optimization

- Performance optimization
- SEO testing and validation
- Security testing
- User acceptance testing

## Migration Strategy

### Content Migration from Current Site
1. **Service Pages**: Migrate headshots, restaurants, and events service descriptions
2. **Brand Assets**: Preserve tagline "Montrez le meilleur de vous-même — et de votre marque"
3. **Contact Information**: Maintain Morges – Nyon – Lausanne location details
4. **Portfolio Images**: Export and optimize existing portfolio photos
5. **Value Propositions**: Preserve express delivery (J+0/J+1) and mobile studio messaging

### Technical Migration
1. **Language Support**: Implement French/English bilingual support
2. **SEO Enhancement**: Add full control over robots.txt, meta tags, structured data
3. **Performance Optimization**: Achieve < 3 seconds load time vs. current Pixpa performance
4. **Gallery Upgrade**: Enhance from basic private galleries to password-protected system with expiration
5. **DNS Update**: Point domain to new Vercel deployment
6. **Testing**: Verify all functionality works correctly

### Content Strategy Updates
- **Enhanced SEO**: Add structured data for photography services
- **Improved UX**: Modern responsive design with better navigation
- **Client Portal**: Upgrade gallery system with password protection and expiration
- **Analytics**: Implement proper tracking and performance monitoring

## Success Metrics
- **Page Load Speed**: < 3 seconds
- **SEO Score**: 90+ on Google PageSpeed Insights
- **Uptime**: 99.9% availability
- **Client Satisfaction**: Easy gallery access and downloads

## Maintenance Requirements
- **Automatic Updates**: Vercel and Supabase handle infrastructure updates
- **Content Updates**: Add new galleries and photos as needed
- **Monitoring**: Vercel provides built-in monitoring and alerts
- **Backups**: Supabase provides automatic database backups

## Future Enhancements (Optional)
- **Booking System**: Integration with calendar booking
- **Email Marketing**: Newsletter signup and automation
- **Advanced Analytics**: Detailed visitor tracking
- **Mobile App**: React Native app for gallery access

## Risk Mitigation
- **Data Backup**: Regular exports of gallery data
- **Domain Management**: Keep domain registration current
- **Service Monitoring**: Set up alerts for downtime
- **Cost Monitoring**: Track usage to stay within budget

---

**Project Timeline**: 8 weeks
**Total Cost**: $20/month ongoing
**Maintenance Level**: Minimal (hands-off)

