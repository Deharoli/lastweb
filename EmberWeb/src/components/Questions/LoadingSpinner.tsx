import { Component } from "solid-js";

type LoadingSpinnerProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
};

const LoadingSpinner: Component<LoadingSpinnerProps> = (props) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div class="flex flex-col items-center justify-center py-8">
      {/* Logo Ember qui tourne */}
      <div class={`${sizeClasses[props.size || "md"]} mb-4 animate-spin`}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="emberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF5F76"/>
              <stop offset="100%" stop-color="#FF914D"/>
            </linearGradient>
          </defs>
          <path 
            d="M12 2L13.09 8.26L19 7L14.74 12.74L21 15L14.74 11.26L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 11.26L3 9L9.26 12.74L5 7L10.91 8.26L12 2Z" 
            fill="url(#emberGradient)"
          />
        </svg>
      </div>
      
      {/* Texte de chargement */}
      <div class="text-sm text-gray-600 font-medium">
        {props.text || "Chargement..."}
      </div>
      
      {/* Points animés */}
      <div class="flex space-x-1 mt-2">
        <div class="w-1 h-1 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] rounded-full animate-bounce"></div>
        <div class="w-1 h-1 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] rounded-full animate-bounce animation-delay-1000"></div>
        <div class="w-1 h-1 bg-gradient-to-r from-[#FF5F76] to-[#FF914D] rounded-full animate-bounce animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;