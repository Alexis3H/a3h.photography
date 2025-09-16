# A3H Photography Website Rebuild - Project Scope

## Project Overview
Rebuild of a3h.photography from Pixpa to a modern, SEO-optimized platform while preserving core client gallery functionality.

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
- **Homepage**: Hero section, portfolio preview, about section
- **Portfolio**: Organized photo galleries with categories
- **About**: Professional bio and contact information
- **Contact**: Contact form with email integration
- **SEO**: Meta tags, structured data, robots.txt, sitemap

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

### Phase 1: Core Website (Week 1-2)
- Set up Next.js project with Tailwind CSS
- Create homepage, portfolio, about, contact pages
- Implement responsive design
- Set up SEO optimization

### Phase 2: Client Gallery System (Week 3-4)
- Set up Supabase database and storage
- Create gallery creation and management system
- Implement password protection
- Build photo viewing and download functionality

### Phase 3: Admin Panel (Week 5-6)
- Create admin dashboard
- Implement bulk photo upload
- Add gallery management features
- Set up analytics

### Phase 4: Testing & Optimization (Week 7-8)
- Performance optimization
- SEO testing and validation
- Security testing
- User acceptance testing

## Migration Strategy
1. **Content Migration**: Export existing content from Pixpa
2. **Photo Migration**: Download and re-upload photos to Supabase
3. **DNS Update**: Point domain to new Vercel deployment
4. **Testing**: Verify all functionality works correctly

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

