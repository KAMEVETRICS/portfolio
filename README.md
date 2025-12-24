# Portfolio Platform

A modern, production-ready portfolio platform built with Next.js, TypeScript, and Prisma. Features a public portfolio site and a private admin dashboard for managing projects.

## 🚀 Features

- **Public Portfolio**: Clean, minimal grid layout showcasing published projects
- **Admin Dashboard**: Protected admin panel for managing projects
- **CRUD Operations**: Create, read, update, and delete projects
- **Image Upload**: Local image upload with automatic optimization
- **Publish/Draft**: Toggle project visibility
- **Authentication**: Secure admin login with NextAuth.js
- **Responsive Design**: Fully responsive with dark mode support

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **SQLite**
- **NextAuth.js** (Authentication)
- **Server Actions** (Mutations)

## 📦 Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="changeme"
```

3. **Initialize the database:**

```bash
npx prisma generate
npx prisma db push
```

4. **Create admin user:**

```bash
npx tsx scripts/init-admin.ts
```

Or manually set the `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file before running the script.

5. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public portfolio.

## 🔐 Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Use the credentials you set in the `.env` file:
   - Email: `ADMIN_EMAIL`
   - Password: `ADMIN_PASSWORD`

After logging in, you'll be redirected to `/admin` where you can manage your projects.

## 📝 Adding New Projects

1. Log in to the admin panel at `/admin`
2. Click the **"+ Add Project"** button
3. Fill in the form:
   - **Title**: Project name
   - **Description**: Brief description
   - **Project URL**: Link to the live project
   - **Thumbnail Image**: Upload a project thumbnail
   - **Publish immediately**: Toggle to publish or save as draft
4. Click **"Create Project"**

The project will appear on the public site immediately if published, or remain as a draft in the admin panel.

## ✏️ Editing Projects

1. In the admin panel, find the project you want to edit
2. Click the **"Edit"** button
3. Modify the fields as needed
4. Click **"Update Project"**

## 🗑️ Deleting Projects

1. In the admin panel, find the project you want to delete
2. Click the **"Delete"** button
3. Confirm the deletion

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes (NextAuth)
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Public portfolio page
├── components/
│   ├── admin/          # Admin components
│   └── ProjectCard.tsx # Public project card
├── lib/
│   ├── actions.ts      # Server actions
│   ├── auth.ts         # Auth configuration
│   ├── middleware.ts   # Auth middleware
│   └── prisma.ts       # Prisma client
├── prisma/
│   └── schema.prisma   # Database schema
├── public/
│   └── uploads/        # Uploaded images (created automatically)
└── scripts/
    └── init-admin.ts   # Admin user initialization
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.ts` to customize the design system.

### Database

To switch from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env` with your PostgreSQL connection string

3. Run `npx prisma db push`

## 🔒 Security Notes

- Change `NEXTAUTH_SECRET` to a secure random string in production
- Use strong passwords for admin accounts
- Consider adding rate limiting for production
- For production, use a cloud storage service (S3, Cloudinary) for images instead of local storage

## 📄 License

MIT

