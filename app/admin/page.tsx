import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ProjectList from '@/components/admin/ProjectList'
import CategoryList from '@/components/admin/CategoryList'
import AddProjectButton from '@/components/admin/AddProjectButton'
import AddFolderButton from '@/components/admin/AddFolderButton'
import LogoutButton from '@/components/admin/LogoutButton'

export default async function AdminPage() {
  // Double-check auth (middleware should have handled this, but good for safety)
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }
  
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { projects: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your portfolio projects
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LogoutButton />
            <AddFolderButton />
            <AddProjectButton categories={categories} />
          </div>
        </div>

        <CategoryList categories={categories} />
        <ProjectList projects={projects} categories={categories} />
      </div>
    </div>
  )
}

