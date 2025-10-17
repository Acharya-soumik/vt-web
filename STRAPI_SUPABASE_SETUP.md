# Strapi CMS with Supabase Integration - Setup Complete

## Overview
Your Strapi CMS is now fully configured to use Supabase as both the database and media storage backend. All blog content is managed through Strapi and stored in Supabase PostgreSQL, with images stored in Supabase Storage.

## Current Setup

### ✅ Completed Configuration

#### 1. Database Connection
- **Database**: Supabase PostgreSQL
- **Schema**: `strapi` (isolated from public schema)
- **Connection**: SSL-enabled secure connection
- **Location**: `db.xmawmworhpksnusoyfaq.supabase.co`

#### 2. Content Types Created
The following content types are available in Strapi:

**Blog Posts** (`blog-posts`)
- Title, Slug, Content (Markdown/Rich text)
- Excerpt, Featured Image, Gallery
- Category, Tags, Series relationships
- Author relationship
- SEO fields (meta title, description, keywords)
- Social media fields
- Publishing controls (draft/publish, scheduling)
- View count, Reading time
- Multi-language support (English, Hindi)

**Blog Categories** (`blog-categories`)
- Name, Slug, Description
- Color coding, Sort order
- Parent/Child category support
- SEO fields

**Blog Tags** (`blog-tags`)
- Name, Slug, Description
- Usage tracking

**Authors** (`authors`)
- Name, Slug, Email, Bio
- Job title, Expertise areas
- Avatar, Social links
- Post count tracking

**Blog Series** (`blog-series`)
- Title, Slug, Description
- Status, Estimated posts

#### 3. Supabase Storage Configuration
- **Bucket**: `strapi-uploads`
- **Directory**: `media`
- **Provider**: `strapi-provider-upload-supabase`
- **Allowed formats**: JPEG, PNG, GIF, WebP, MP4, PDF
- **Max file size**: 10MB
- **Public access**: Enabled

#### 4. Frontend Integration
Your frontend at `/frontend/src/app/docs/` is already configured to use the Strapi API:

**Service**: `/frontend/src/services/blog-service.ts`
- Complete BlogService class with all CRUD operations
- Fetches posts, categories, featured posts, related posts
- Search functionality
- Category filtering
- View count tracking

**API Endpoint**: `http://localhost:1337/api`
- `GET /api/blog-posts` - List all posts
- `GET /api/blog-posts?filters[slug][$eq]=<slug>` - Get post by slug
- `GET /api/blog-categories` - List all categories
- All endpoints support population, filtering, sorting, pagination

#### 5. Current Data
**Blog Posts** (5 total, 2 featured):
1. "How to Draft an NDA" (Featured)
2. "How to Send a Legal Notice"
3. "Understanding Consumer Rights"
4. "Partnership Deed: Complete Guide" (Featured)
5. "Rental Agreement Format"

**Categories** (3 total):
1. Corporate Law
2. Consumer Rights
3. Legal Advice

## Configuration Files

### Strapi Configuration

**Database**: `strapi-cms/config/database.js`
```javascript
postgres: {
  connection: {
    host: env('DATABASE_HOST'),
    port: env.int('DATABASE_PORT', 5432),
    database: env('DATABASE_NAME'),
    user: env('DATABASE_USERNAME'),
    password: env('DATABASE_PASSWORD'),
    ssl: { rejectUnauthorized: false },
    schema: env('DATABASE_SCHEMA', 'strapi'),
  },
}
```

**Plugins**: `strapi-cms/config/plugins.js`
```javascript
upload: {
  config: {
    provider: 'strapi-provider-upload-supabase',
    providerOptions: {
      apiUrl: env('SUPABASE_API_URL'),
      apiKey: env('SUPABASE_API_KEY'),
      bucket: env('SUPABASE_BUCKET'),
      directory: env('SUPABASE_DIRECTORY'),
    },
  },
}
```

**Middlewares**: `strapi-cms/config/middlewares.js`
- Content Security Policy configured for Supabase URLs
- CORS enabled for frontend (localhost:3000, vakiltech.in)

### Environment Variables

**Strapi** (`strapi-cms/.env`):
```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=db.xmawmworhpksnusoyfaq.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=***
DATABASE_SSL=true
DATABASE_SCHEMA=strapi

# Supabase Storage
SUPABASE_API_URL=https://xmawmworhpksnusoyfaq.supabase.co
SUPABASE_API_KEY=*** (service_role key)
SUPABASE_BUCKET=strapi-uploads
SUPABASE_DIRECTORY=media
```

**Frontend** (`frontend/.env`):
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## How to Use

### Managing Content

1. **Access Strapi Admin Panel**
   ```bash
   # Strapi is running at:
   http://localhost:1337/admin
   ```

2. **Create/Edit Blog Posts**
   - Go to Content Manager → Blog Posts
   - Create new or edit existing posts
   - Add featured images (uploads to Supabase Storage)
   - Assign categories, tags, author
   - Set as featured, add SEO fields
   - Publish when ready

3. **Manage Categories**
   - Go to Content Manager → Blog Categories
   - Create categories with color coding
   - Organize with parent/child relationships

### Frontend Access

Your frontend automatically fetches content from Strapi:

```typescript
// Get all posts
const posts = await blogService.getAllPublishedPosts();

// Get single post
const post = await blogService.getPostBySlug('understanding-consumer-rights');

// Get posts by category
const posts = await blogService.getPostsByCategory('consumer-rights');

// Search posts
const results = await blogService.searchPosts('legal notice');
```

### Running the Services

**Start Strapi**:
```bash
cd strapi-cms
npm run develop
```

**Start Frontend**:
```bash
cd frontend
npm run dev
```

## API Examples

### Get All Posts with Categories
```bash
curl "http://localhost:1337/api/blog-posts?populate=category&sort=publishedAt:desc"
```

### Get Single Post
```bash
curl "http://localhost:1337/api/blog-posts?filters[slug][$eq]=understanding-consumer-rights&populate=category"
```

### Get All Categories
```bash
curl "http://localhost:1337/api/blog-categories?sort=name:asc"
```

### Search Posts
```bash
curl "http://localhost:1337/api/blog-posts?filters[\$or][0][title][\$containsi]=notice&populate=category"
```

## Supabase Integration Details

### Database Tables (in `strapi` schema)
- `blog_posts` - Main blog post data
- `blog_categories` - Category data
- `blog_tags` - Tag data
- `authors` - Author data
- `blog_series` - Series data
- `files` - Media file metadata
- Plus all Strapi system tables

### Storage Structure
```
strapi-uploads/
  └── media/
      ├── image1.jpg
      ├── image2.png
      └── ...
```

### Public Access
- Storage bucket `strapi-uploads` is publicly accessible
- Images can be accessed at:
  ```
  https://xmawmworhpksnusoyfaq.supabase.co/storage/v1/object/public/strapi-uploads/media/[filename]
  ```

## Permissions

### Strapi Permissions
Public access is enabled for:
- Find/FindOne blog posts
- Find/FindOne blog categories
- Find blog tags
- Find authors

Authenticated users (admin) can:
- Create, Update, Delete all content types
- Manage media uploads

### Supabase Permissions
- Database: RLS disabled for `strapi` schema (Strapi manages access)
- Storage: Public bucket with read access for all

## Next Steps

### Recommended Actions

1. **Add More Content**
   - Create more blog posts in Strapi admin
   - Upload featured images for existing posts
   - Add more categories and tags

2. **Customize Blog Design**
   - Update `/frontend/src/app/docs/blog-page-client.tsx` for main blog page
   - Update `/frontend/src/app/docs/[slug]/blog-post-client.tsx` for post pages
   - Customize category pages

3. **SEO Optimization**
   - Fill in SEO fields for all posts
   - Add meta descriptions
   - Upload Open Graph images

4. **Production Deployment**
   - Update `NEXT_PUBLIC_STRAPI_URL` in frontend env
   - Configure production Strapi URL
   - Set up proper CORS origins in Strapi
   - Consider adding CDN for images

### Optional Enhancements

- **Search**: Implement full-text search with Supabase
- **Comments**: Add comment system to blog posts
- **Newsletter**: Integrate email collection
- **Analytics**: Track post views and popular content
- **RSS Feed**: Generate RSS feed from Strapi content
- **Sitemap**: Auto-generate sitemap from published posts

## Troubleshooting

### Issue: Strapi won't start
```bash
# Kill any process on port 1337
lsof -ti:1337 | xargs kill -9

# Start fresh
cd strapi-cms
npm run develop
```

### Issue: Frontend can't fetch posts
- Check Strapi is running on port 1337
- Verify `NEXT_PUBLIC_STRAPI_URL` in frontend/.env
- Check Strapi permissions for public role

### Issue: Images not uploading
- Verify Supabase storage bucket exists
- Check `SUPABASE_API_KEY` is service_role key (not anon key)
- Ensure bucket has public access enabled

### Issue: Database connection errors
- Verify DATABASE_PASSWORD in .env
- Check Supabase project is active
- Ensure DATABASE_SCHEMA=strapi

## Resources

- **Strapi Docs**: https://docs.strapi.io
- **Supabase Docs**: https://supabase.com/docs
- **Strapi Admin**: http://localhost:1337/admin
- **Frontend Blog**: http://localhost:3000/docs
- **Supabase Dashboard**: https://supabase.com/dashboard

## Summary

✅ **Database**: Supabase PostgreSQL with `strapi` schema
✅ **Storage**: Supabase Storage bucket `strapi-uploads`
✅ **CMS**: Strapi 5.24.1 with full blog content types
✅ **Frontend**: Next.js with BlogService integration
✅ **API**: RESTful API with filtering, search, pagination
✅ **Content**: 5 blog posts, 3 categories ready to use

Everything is configured and working! You can now:
1. Manage content through Strapi admin at http://localhost:1337/admin
2. View blog posts on frontend at http://localhost:3000/docs
3. All data is stored in Supabase (database + storage)
4. Frontend automatically fetches from Strapi API (no direct Supabase calls)
