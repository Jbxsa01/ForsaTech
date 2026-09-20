const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-[700px] mx-auto animate-fade-in-up -mt-8">
      {/* Main Image - No Container */}
      <div className="relative">
        {/* Small Score Circle - Top Left */}
        <div className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-lg border-2 border-[#FF7A00] z-20">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#F4F7F8"
                strokeWidth="4"
              />
              {/* Animated progress circle */}
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#FF7A00"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset="9"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-[#333333]">92</span>
              <span className="text-xs font-bold text-[#FF7A00]">%</span>
            </div>
          </div>
        </div>
        
        {/* Background Image */}
        <img 
          src="/5340018.jpg" 
          alt="Job Matching - Matching Intelligent par IA" 
          className="w-full h-auto object-contain rounded-2xl"
        />
        
        {/* SVG Decorations Around Image */}
        
        {/* Top Right - Checkmark Circle SVG */}
        <div className="absolute -top-6 -right-6 w-20 h-20 animate-float" style={{ animationDelay: "0.3s" }}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FF7A00" opacity="0.9" />
            <path 
              d="M8 12L11 15L16 9" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Bottom Right - Target/Bullseye SVG */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 animate-float" style={{ animationDelay: "0.9s" }}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FF8C42" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="#FF8C42" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="2" fill="#FF8C42" />
          </svg>
        </div>
        
        {/* Left Side - Zigzag Connection SVG */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-12 h-24 animate-float hidden lg:block" style={{ animationDelay: "1.2s" }}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <path 
              d="M4 4L12 12L4 20" 
              stroke="#FF7A00" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              opacity="0.6"
            />
            <circle cx="4" cy="4" r="2" fill="#FF7A00" />
            <circle cx="12" cy="12" r="2" fill="#FF7A00" />
            <circle cx="4" cy="20" r="2" fill="#FF7A00" />
          </svg>
        </div>
        
        {/* Right Side - Connection Dots SVG */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-12 h-24 animate-float hidden lg:block" style={{ animationDelay: "1.5s" }}>
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="3" fill="#FF7A00" />
            <circle cx="12" cy="12" r="3" fill="#FF7A00" />
            <circle cx="12" cy="20" r="3" fill="#FF7A00" />
            <path 
              d="M12 7L12 9M12 15L12 17" 
              stroke="#FF7A00" 
              strokeWidth="2" 
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>
        
        
        {/* Success Badge - Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FF7A00] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full shadow-2xl font-black text-sm md:text-base flex items-center gap-3 z-30 animate-float border-4 border-white">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
          Match trouvé !
        </div>
      </div>
      
      {/* Floating Stats Elements - Around the image */}
      <div className="absolute -bottom-5 -left-5 bg-white border-3 border-[#FF7A00]/35 px-4 py-2.5 md:px-5 md:py-3 rounded-xl shadow-2xl text-xs md:text-sm font-bold text-[#333333] animate-float hidden md:block z-20" style={{ animationDelay: "1s" }}>
        <span className="text-[#FF7A00]">●</span> Analyse en temps réel
      </div>
      
      <div className="absolute top-3/4 -right-8 bg-[#FF9A3C] text-white px-4 py-2.5 rounded-xl shadow-xl font-bold text-xs animate-float hidden lg:block z-20" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Nouveau match</span>
        </div>
      </div>
    </div>
  );
};

export default HeroIllustration;
