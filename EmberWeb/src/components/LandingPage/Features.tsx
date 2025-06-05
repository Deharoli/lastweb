import { Component } from 'solid-js';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: Component<FeatureCardProps> = (props) => {
  return (
    <div class="bg-white rounded-xl p-8 shadow-md transition-transform hover:-translate-y-2">
      <div class="w-[60px] h-[60px] rounded-full bg-gradient-to-r from-[#FF5F76] to-[#FF914D] flex items-center justify-center mb-5 text-white text-xl">
        <i class={`fas ${props.icon}`}></i>
      </div>
      <h3 class="text-xl font-bold mb-3">{props.title}</h3>
      <p class="text-gray-600 leading-relaxed">{props.description}</p>
    </div>
  );
};

const Features: Component = () => {
  const features = [
    {
      icon: "fa-photo-video",
      title: "Social Feed",
      description: "Share moments in video, audio, or text. Interact with emotional reactions and enjoy personalized filtering for a tailored experience."
    },
    {
      icon: "fa-clock",
      title: "Time Capsules",
      description: "Send delayed messages to yourself or others. Relive your memories exactly when the moment is right."
    },
    {
      icon: "fa-comments",
      title: "Private Messaging",
      description: "Exchange richly and securely with text, voice, and video messages. Use \"Unique View\" mode for ephemeral messages."
    },
    {
      icon: "fa-compass",
      title: "Discovery",
      description: "Meet people who share your values and experiences. Establish authentic connections through automatically generated questions."
    },
    {
      icon: "fa-lock",
      title: "Advanced Privacy",
      description: "Control who can see your posts with granular visibility settings. Enable temporary \"Anonymous\" mode to hide your activity."
    },
    {
      icon: "fa-paint-brush",
      title: "Intuitive Creation",
      description: "Express your emotions with an intuitive interface. Add music, mark intense moments, and schedule future posts."
    }
  ];

  return (
    <section class="py-24 bg-white" id="features">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">
            Key <span class="bg-gradient-to-r from-[#FF5F76] to-[#FF914D] bg-clip-text text-transparent">Features</span>
          </h2>
          <p class="text-xl opacity-80 max-w-2xl mx-auto">
            Discover the tools that make Ember a unique social experience, focused on authenticity and emotions.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;