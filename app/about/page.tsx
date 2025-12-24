import Navigation from '@/components/Navigation'

export default function AboutPage() {
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            About Me
          </h2>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
              Welcome to my portfolio! I'm passionate about creating innovative solutions 
              and bringing ideas to life through code.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
              This is where I showcase my projects, experiments, and creative work. 
              Each project represents a journey of learning, problem-solving, and growth.
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Feel free to explore my work and reach out if you'd like to collaborate 
              or discuss any of my projects.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

