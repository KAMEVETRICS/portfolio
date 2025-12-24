import Navigation from '@/components/Navigation'

export default function ContactPage() {
  const profiles = [
    {
      name: 'Email',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: 'mailto:kelechukwuagbo1@gmail.com',
      label: 'kelechukwuagbo1@gmail.com',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800',
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      link: 'https://github.com/KAMEVETRICS',
      label: 'KAMEVETRICS',
      color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
    },
    {
      name: 'Twitter/X',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      link: 'https://x.com/kongclaves',
      label: '@kongclaves',
      color: 'bg-black text-white dark:bg-gray-900 dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-800',
    },
    {
      name: 'Medium',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
      link: 'https://medium.com/@kongclaves',
      label: '@kongclaves',
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800',
    },
    {
      name: 'Dune',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      link: 'https://dune.com/kongclaves',
      label: '@kongclaves',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800',
    },
    {
      name: 'Telegram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.028-1.627 4.476-1.635z" />
        </svg>
      ),
      link: 'https://t.me/Kongclaves',
      label: '@Kongclaves',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800',
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="flex justify-center mb-2 sm:mb-3">
            <img
              src="/dp2.png"
              alt="Display Picture"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            Kongclaves' Portfolio
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-400 px-2">
            A collection of vibecoded projects
          </p>
          <Navigation />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {profiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${profile.color} p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-4 group`}
              >
                <div className="flex-shrink-0">
                  {profile.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-xs sm:text-sm truncate group-hover:underline">
                    {profile.label}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Feel free to reach out through any of these platforms. I'd love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

