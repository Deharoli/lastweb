import { Component } from 'solid-js';

const Footer: Component = () => {
  return (
    <footer class="bg-[#222] text-white py-12">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div class="flex items-center text-2xl font-bold mb-6">
              <svg class="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" fill="white"/>
                <path d="M65 45C65 55 50 75 50 75C50 75 35 55 35 45C35 35 42 30 50 30C58 30 65 35 65 45Z" fill="url(#paint1_linear)"/>
                <defs>
                  <linearGradient id="paint1_linear" x1="35" y1="30" x2="65" y2="75" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#FF5F76"/>
                    <stop offset="1" stop-color="#78c2b7"/>
                  </linearGradient>
                </defs>
              </svg>
              <span class="ml-2 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">Ember</span>
            </div>
            <p class="text-gray-400 max-w-xs">
              Ember transforms every digital interaction into an opportunity for authentic connection.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 class="text-xl font-semibold mb-6">Quick Links</h4>
            <ul class="space-y-3">
              <li><a href="#home" class="text-gray-400 hover:text-[#FF914D] transition">Home</a></li>
              <li><a href="#features" class="text-gray-400 hover:text-[#FF914D] transition">Features</a></li>
              <li><a href="#download" class="text-gray-400 hover:text-[#FF914D] transition">Download</a></li>
              <li><a href="#about" class="text-gray-400 hover:text-[#FF914D] transition">About</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 class="text-xl font-semibold mb-6">Support</h4>
            <ul class="space-y-3">
              <li><a href="#faq" class="text-gray-400 hover:text-[#FF914D] transition">FAQ</a></li>
              <li><a href="#contact" class="text-gray-400 hover:text-[#FF914D] transition">Contact</a></li>
              <li><a href="#terms" class="text-gray-400 hover:text-[#FF914D] transition">Terms of Use</a></li>
              <li><a href="#privacy" class="text-gray-400 hover:text-[#FF914D] transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 class="text-xl font-semibold mb-6">Stay Connected</h4>
            <p class="text-gray-400 mb-4">Receive the latest news and updates from Ember.</p>
            <div class="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                class="px-4 py-2 rounded-l-md focus:outline-none flex-1"
              />
              <button class="bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white px-4 py-2 rounded-r-md">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 mb-4 md:mb-0">&copy; 2025 Ember. All rights reserved.</p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF5F76] hover:text-white transition-all hover:-translate-y-1">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF5F76] hover:text-white transition-all hover:-translate-y-1">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF5F76] hover:text-white transition-all hover:-translate-y-1">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF5F76] hover:text-white transition-all hover:-translate-y-1">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;