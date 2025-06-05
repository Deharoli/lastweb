import { Component } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';


interface DownloadButtonProps {
  platform: string;
  icon: string;
  label: string;
  sublabel: string;
  isWebApp?: boolean;
}

const DownloadButton: Component<DownloadButtonProps> = (props) => {
  return (
    <a 
      href={'/pages/auth'}
      class={`flex items-center px-6 py-4 rounded-full shadow-md transition-transform hover:-translate-y-1 ${
        props.isWebApp 
          ? 'bg-gradient-to-r from-[#FF5F76] to-[#FF914D] text-white' 
          : 'bg-[#232a34] text-white'
      }`}
    >
      <i class={`${props.icon} text-2xl mr-3`}></i>
      <div class="flex flex-col items-start">
        <span class="text-sm opacity-80">{props.sublabel}</span>
        <span class="font-semibold">{props.label}</span>
      </div>
    </a>
  );
};

const Download: Component = () => {
  return (
    <section class="py-24 bg-[#f5f5f7]" id="download">
      <div class="max-w-screen-xl mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">
          Ready to join the <span class="bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">beta</span>?
        </h2>
        <p class="text-xl opacity-80 max-w-2xl mx-auto mb-12">
          Download the app or use the web version to start sharing your authentic moments today.
        </p>
        
        <div class="flex flex-wrap justify-center gap-6">
          <DownloadButton
            platform="android"
            icon="fab fa-android"
            sublabel="Download on"
            label="Google Play"
          />
          
          <DownloadButton
            platform="ios"
            icon="fab fa-apple"
            sublabel="Download on"
            label="App Store"
          />
        
          <DownloadButton
            platform="webapp"
            icon="fas fa-globe"
            sublabel="Use"
            label="Web App"
            isWebApp={true}
          />
          
        </div>
      </div>
    </section>
  );
};

export default Download;