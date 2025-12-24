'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProjectModal from './ProjectModal'
import { deleteProject } from '@/lib/actions'

interface Category {
  id: string
  name: string
  description: string | null
  _count: {
    projects: number
  }
}

interface Project {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  projectUrl: string
  published: boolean
  categoryId: string | null
  category: {
    id: string
    name: string
  } | null
  createdAt: Date
  updatedAt: Date
}

interface ProjectListProps {
  projects: Project[]
  categories: Category[]
}

export default function ProjectList({ projects, categories }: ProjectListProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  // Filter projects by selected folder
  const getFilteredProjects = () => {
    if (selectedFolder === null) {
      return projects
    }
    if (selectedFolder === 'uncategorized') {
      return uncategorizedProjects
    }
    return projects.filter((p) => p.categoryId === selectedFolder)
  }

  const filteredProjects = getFilteredProjects()

  // Group projects by folder
  const projectsByFolder = categories.reduce((acc, category) => {
    acc[category.id] = projects.filter((p) => p.categoryId === category.id)
    return acc
  }, {} as Record<string, Project[]>)

  const uncategorizedProjects = projects.filter((p) => !p.categoryId)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    setDeletingId(id)
    await deleteProject(id)
    setDeletingId(null)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingProject(null)
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          No projects yet. Create your first project!
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Folder Filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFolder === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Projects ({projects.length})
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFolder(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFolder === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.name} ({category._count.projects})
              </button>
            ))}
            {uncategorizedProjects.length > 0 && (
              <button
                onClick={() => setSelectedFolder('uncategorized')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFolder === 'uncategorized'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Uncategorized ({uncategorizedProjects.length})
              </button>
            )}
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-700">
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    project.published
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
              </div>
              {project.category && (
                <div className="mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    <svg
                      className="w-3 h-3 mr-1"
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
                    {project.category.name}
                  </span>
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {project.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                  className="flex-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                >
                  {deletingId === project.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          categories={categories}
          onClose={handleClose}
        />
      )}
    </>
  )
}

