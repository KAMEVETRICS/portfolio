import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-3">
            <img
              src="/dp2.png"
              alt="Display Picture"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Kongclaves' Portfolio
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            A collection of vibecoded projects
          </p>
          <Navigation />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            About Me
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Welcome to my portfolio! I'm passionate about creating innovative solutions 
              and bringing ideas to life through code.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is where I showcase my projects, experiments, and creative work. 
              Each project represents a journey of learning, problem-solving, and growth.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400">
              Feel free to explore my work and reach out if you'd like to collaborate 
              or discuss any of my projects.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

