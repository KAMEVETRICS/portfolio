import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Simple security: check for a secret token in query params
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  
  // Use a secret token - change this to something secure
  const SECRET_TOKEN = process.env.INIT_ADMIN_TOKEN || 'change-this-secret-token'
  
  if (token !== SECRET_TOKEN) {
    return NextResponse.json(
      { error: 'Unauthorized. Provide ?token=YOUR_SECRET_TOKEN' },
      { status: 401 }
    )
  }

  try {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com'
    const password = process.env.ADMIN_PASSWORD || 'changeme'

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({
        message: 'Admin user already exists',
        email,
      })
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      email: user.email,
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user', details: String(error) },
      { status: 500 }
    )
  }
}

