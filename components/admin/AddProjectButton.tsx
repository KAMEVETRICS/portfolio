'use client'

import { useState } from 'react'
import ProjectModal from './ProjectModal'

interface Category {
  id: string
  name: string
}

interface AddProjectButtonProps {
  categories?: Category[]
}

export default function AddProjectButton({ categories = [] }: AddProjectButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        + Add Project
      </button>

      {isModalOpen && (
        <ProjectModal categories={categories} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}

