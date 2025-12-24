import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ProjectCard'

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  const categories = await prisma.category.findMany({
    include: {
      projects: {
        where: { published: true },
        include: { category: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  // Group projects by category
  const projectsByCategory = categories.reduce((acc, category) => {
    if (category.projects.length > 0) {
      acc[category.id] = {
        category,
        projects: category.projects,
      }
    }
    return acc
  }, {} as Record<string, { category: typeof categories[0]; projects: typeof projects }>)

  // Get uncategorized projects
  const uncategorizedProjects = projects.filter((p) => !p.categoryId)

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <img
              src="/dp2.png"
              alt="Display Picture"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Portfolio
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A collection of vibecoded projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No projects published yet.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Projects organized by folders */}
            {Object.values(projectsByCategory).map(({ category, projects: categoryProjects }) => (
              <div key={category.id} className="space-y-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}

            {/* Uncategorized projects */}
            {uncategorizedProjects.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Other Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {uncategorizedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

