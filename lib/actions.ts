'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { uploadImage } from './cloudinary'

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const projectUrl = formData.get('projectUrl') as string
  const published = formData.get('published') === 'true'
  const thumbnail = formData.get('thumbnail') as File | null

  if (!title || !description || !projectUrl) {
    return { error: 'Missing required fields' }
  }

  let thumbnailUrl = ''

  if (thumbnail && thumbnail.size > 0) {
    try {
      // Check if Cloudinary is configured
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        // Upload to Cloudinary
        thumbnailUrl = await uploadImage(thumbnail)
      } else {
        // Fallback to local filesystem (for local development)
        const isVercel = process.env.VERCEL === '1'
        
        if (isVercel) {
          // On Vercel without Cloudinary, use placeholder
          thumbnailUrl = 'https://via.placeholder.com/800x450?text=Configure+Cloudinary+for+Image+Uploads&bg=6366f1&color=fff'
          console.warn('Cloudinary not configured. Using placeholder image.')
        } else {
          // Local development - write to filesystem
          const bytes = await thumbnail.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          const uploadsDir = join(process.cwd(), 'public', 'uploads')
          if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true })
          }

          const filename = `${Date.now()}-${thumbnail.name.replace(/\s/g, '-')}`
          const filepath = join(uploadsDir, filename)

          await writeFile(filepath, buffer)
          thumbnailUrl = `/uploads/${filename}`
        }
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      // Continue without thumbnail - use placeholder
      thumbnailUrl = 'https://via.placeholder.com/800x450?text=Upload+Failed&bg=ef4444&color=fff'
    }
  }

  const categoryId = formData.get('categoryId') as string | null

  try {
    await prisma.project.create({
      data: {
        title,
        description,
        projectUrl,
        thumbnailUrl: thumbnailUrl || 'https://via.placeholder.com/800x450?text=No+Image&bg=6366f1&color=fff',
        published,
        categoryId: categoryId || null,
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error creating project:', error)
    return { error: 'Failed to create project' }
  }
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const projectUrl = formData.get('projectUrl') as string
  const published = formData.get('published') === 'true'
  const thumbnail = formData.get('thumbnail') as File | null

  if (!id || !title || !description || !projectUrl) {
    return { error: 'Missing required fields' }
  }

  const existingProject = await prisma.project.findUnique({
    where: { id },
  })

  if (!existingProject) {
    return { error: 'Project not found' }
  }

  let thumbnailUrl = existingProject.thumbnailUrl

  if (thumbnail && thumbnail.size > 0) {
    try {
      // Check if Cloudinary is configured
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        // Upload to Cloudinary
        thumbnailUrl = await uploadImage(thumbnail)
      } else {
        // Fallback to local filesystem (for local development)
        const isVercel = process.env.VERCEL === '1'
        
        if (isVercel) {
          // On Vercel without Cloudinary, keep existing thumbnail
          console.warn('Cloudinary not configured. Keeping existing thumbnail.')
          // Keep existing thumbnailUrl
        } else {
          // Local development - write to filesystem
          const bytes = await thumbnail.arrayBuffer()
          const buffer = Buffer.from(bytes)
          
          const uploadsDir = join(process.cwd(), 'public', 'uploads')
          if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true })
          }

          const filename = `${Date.now()}-${thumbnail.name.replace(/\s/g, '-')}`
          const filepath = join(uploadsDir, filename)

          await writeFile(filepath, buffer)
          thumbnailUrl = `/uploads/${filename}`
        }
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      // Keep existing thumbnail on error
    }
  }

  const categoryId = formData.get('categoryId') as string | null

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        projectUrl,
        thumbnailUrl,
        published,
        categoryId: categoryId || null,
      },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return { error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error: 'Failed to delete project' }
  }
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  if (!name) {
    return { error: 'Category name is required' }
  }

  try {
    await prisma.category.create({
      data: {
        name,
        description: description || null,
      },
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error creating category:', error)
    return { error: 'Failed to create category' }
  }
}

export async function updateCategory(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string | null

  if (!id || !name) {
    return { error: 'Missing required fields' }
  }

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        description: description || null,
      },
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error updating category:', error)
    return { error: 'Failed to update category' }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { error: 'Failed to delete category' }
  }
}

