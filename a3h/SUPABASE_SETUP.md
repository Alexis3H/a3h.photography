# Supabase Setup Guide for A3H Photography

## Phase 2: Supabase Integration

This guide will help you set up Supabase for persistent content management and client galleries.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `a3h-photography`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your location (Europe for Switzerland)
6. Click "Create new project"

## Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

## Step 3: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the schema

This will create:
- `content` table for website content management
- `galleries` table for client galleries
- `photos` table for gallery photos
- `gallery_access_logs` table for security
- Row Level Security policies
- Initial content data

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual Supabase project URL and anon key.

## Step 5: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name: `gallery-photos`
4. Make it **Public** (required for image display - security is handled by password protection)
5. Click "Create bucket"

**Note**: Making the bucket "Public" is necessary for displaying images in galleries. The actual security comes from password protection at the application level - clients need both the gallery URL and password to access images.

## Step 6: Deploy to Vercel

1. Add environment variables to Vercel:
   - Go to your Vercel project dashboard
   - Go to **Settings** → **Environment Variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy your project

## Step 7: Test the Integration

1. Visit your admin page: `https://your-domain.com/admin`
2. Make a content change and save
3. Check if the change persists after page refresh
4. The admin should now show "Content saved to Supabase database"

## Benefits After Setup

✅ **Persistent Content**: Admin changes are permanently saved  
✅ **Client Galleries**: Ready for password-protected galleries  
✅ **File Storage**: Supabase Storage for gallery photos  
✅ **Security**: Row Level Security policies  
✅ **Scalability**: Can handle growth beyond current needs  

## Cost

- **Supabase Free Tier**: Up to 500MB database, 1GB storage
- **Vercel Pro**: $20/month
- **Total**: $20/month (stays within budget)

## Next Steps

After Supabase is set up, we can implement:
- Client gallery creation and management
- Photo upload and organization
- Password-protected gallery access
- Gallery expiration management

## Troubleshooting

### Common Issues

1. **"Supabase not available"**: Check environment variables are set correctly
2. **Database errors**: Ensure schema was run successfully
3. **Storage errors**: Check bucket permissions and policies

### Getting Help

- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- Vercel Environment Variables: [vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
