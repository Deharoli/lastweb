import { Component } from 'solid-js';

const MainHero: Component = () => {
  return (
    <div class="relative overflow-hidden">
      <section class="w-full max-w-6xl mx-auto px-4 pt-25 pb-8 md:pt-24 md:pb-16">
        <div class="flex flex-col md:flex-row items-center justify-between">
          {/* Hero content */}
          <div class="w-full md:w-1/2 md:pr-12 mb-12 md:mb-0 z-10">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Share your 
              <span class="block text-5xl md:text-6xl bg-gradient-to-r from-[#FF5F76] to-[#f0a5a5] bg-clip-text text-transparent">
                emotional
              </span> 
              <span class="block text-5xl md:text-6xl bg-gradient-to-r from-[#f0a5a5] to-[#78c2b7] bg-clip-text text-transparent">
                journey
              </span>
              <span class="text-[#232a34]">with</span>
              <span class="block text-4xl md:text-5xl text-[#232a34]">those who matter</span>
            </h1>
            
            <p class="text-lg opacity-90 mb-8 leading-relaxed">
              Ember helps you capture and share your most personal moments through weekly video/audio reflections with customizable privacy levels.
            </p>
            
            <div class="flex flex-wrap gap-4">
              <a 
                href="#download" 
                class="px-8 py-4 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white font-semibold rounded-full text-lg shadow-md hover:-translate-y-1 hover:shadow-lg transition duration-300"
              >
                Join Beta
              </a>
              <a 
                href="#learn-more" 
                class="px-8 py-4 border-2 border-[#FF914D] text-[#232a34] font-semibold rounded-full text-lg hover:bg-opacity-5 hover:bg-[#FF5F76] hover:-translate-y-1 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Phone mockup */}
          <div class="w-full md:w-1/2 relative z-10">
            <div class="w-[280px] md:w-[300px] h-[560px] md:h-[600px] bg-[#232a34] rounded-[30px] border-[10px] border-[#232a34] overflow-hidden shadow-2xl mx-auto">
              <div class="h-full w-full bg-[#f5f5f7] flex flex-col">
                {/* Phone header */}
                <div class="flex items-center p-4 border-b border-gray-100 bg-white">
                  <div class="flex items-center">
                    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" fill="white"/>
                      <path d="M65 45C65 55 50 75 50 75C50 75 35 55 35 45C35 35 42 30 50 30C58 30 65 35 65 45Z" fill="url(#paint0_linear)"/>
                      <defs>
                        <linearGradient id="paint0_linear" x1="35" y1="30" x2="65" y2="75" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stop-color="#FF5F76"/>
                          <stop offset="1" stop-color="#78c2b7"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span class="ml-2 text-lg font-bold bg-gradient-to-r from-[#FF5F76] to-[#78c2b7] bg-clip-text text-transparent">Ember</span>
                  </div>
                </div>
                
                {/* Phone main content */}
                <div class="flex-1 overflow-y-auto p-5">
                  {/* App intro */}
                  <div class="mb-6">
                    <h2 class="text-xl font-bold mb-2">
                      Share your 
                      <span class="bg-gradient-to-r from-[#FF5F76] to-[#f0a5a5] bg-clip-text text-transparent">emotional </span> 
                      <span class="bg-gradient-to-r from-[#f0a5a5] to-[#78c2b7] bg-clip-text text-transparent">journey</span>
                    </h2>
                    <p class="text-sm text-gray-600 mb-3">
                      Ember helps you capture and share your most personal moments through weekly video/audio reflections.
                    </p>
                    <div class="inline-block px-6 py-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white rounded-full text-sm font-semibold">
                      Join Beta
                    </div>
                  </div>
                  
                  {/* Post 1 */}
                  <div class="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <div class="flex items-center mb-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] opacity-80 mr-3"></div>
                      <div class="font-semibold text-sm">Sophie</div>
                      <div class="ml-auto text-xs text-gray-500">2h ago</div>
                    </div>
                    <p class="text-sm mb-3">
                      Magic moment at sunset today. Sometimes you just have to stop and appreciate the little things in life...
                    </p>
                    <div class="w-full h-[120px] bg-gradient-to-r from-[#FF5F76] to-[#78c2b7] rounded-lg mb-3 opacity-70"></div>
                    <div class="flex gap-4">
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-heart text-[#FF5F76] mr-1"></i> 24
                      </div>
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-comment text-[#FF5F76] mr-1"></i> 8
                      </div>
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-fire text-[#FF5F76] mr-1"></i> 15
                      </div>
                    </div>
                  </div>
                  
                  {/* Post 2 */}
                  <div class="bg-white rounded-xl p-4 shadow-sm">
                    <div class="flex items-center mb-3">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] opacity-80 mr-3"></div>
                      <div class="font-semibold text-sm">Thomas</div>
                      <div class="ml-auto text-xs text-gray-500">4h ago</div>
                    </div>
                    <p class="text-sm mb-3">
                      First day in the new city. Mixed feelings, but mostly excited for this new chapter.
                    </p>
                    <div class="flex gap-4">
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-heart text-[#FF5F76] mr-1"></i> 18
                      </div>
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-comment text-[#FF5F76] mr-1"></i> 6
                      </div>
                      <div class="flex items-center text-xs text-gray-600">
                        <i class="fas fa-fire text-[#FF5F76] mr-1"></i> 12
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating capsules */}
            <div class="absolute w-[60px] h-[60px] rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] flex items-center justify-center text-white text-2xl shadow-lg top-[100px] right-[-20px] md:right-[20px] animate-float">
              <i class="fas fa-clock"></i>
            </div>
            
            <div class="absolute w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] flex items-center justify-center text-white text-xl shadow-lg bottom-[150px] right-[50px] md:right-[100px] animate-float animation-delay-1000">
              <i class="fas fa-heart"></i>
            </div>
            
            <div class="absolute w-[40px] h-[40px] rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] flex items-center justify-center text-white text-lg shadow-lg top-[250px] right-[100px] md:right-[150px] animate-float animation-delay-2000">
              <i class="fas fa-comment"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHero;