'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Portfolio' },
    { href: '/about', label: 'About Me' },
  ]

  return (
    <nav className="mb-6 sm:mb-8">
      <div className="flex justify-center gap-4 sm:gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base sm:text-lg font-medium transition-colors ${
                isActive
                  ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white pb-1'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

