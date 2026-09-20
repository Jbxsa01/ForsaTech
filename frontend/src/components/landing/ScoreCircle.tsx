import { useEffect, useState, useId } from "react";

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
}

const ScoreCircle = ({ 
  score, 
  size = 200, 
  strokeWidth = 12,
  animated = true 
}: ScoreCircleProps) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const gradId = useId();

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (!animated) return;
    
    const duration = 1800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentScore = Math.round(easeOutQuart * score);
      
      setDisplayScore(currentScore);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score, animated]);

  // Logique de couleur adaptée à la palette vibrant
  const getScoreColor = () => {
    if (displayScore >= 85) return "hsl(325 100% 50%)"; // magenta rose
    if (displayScore >= 70) return "hsl(270 100% 50%)"; // violet
    if (displayScore >= 60) return "hsl(260 100% 50%)"; // bleu électrique
    return "hsl(25 100% 60%)"; // orange support
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${getScoreColor()} 0%, transparent 65%)`
        }}
      />
      
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          {/* Vibrant gradient: Orange -> Rose -> Violet -> Bleu */}
          <linearGradient id={`grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(25 100% 60%)" />
            <stop offset="25%" stopColor="hsl(325 100% 50%)" />
            <stop offset="65%" stopColor="hsl(270 100% 50%)" />
            <stop offset="100%" stopColor="hsl(260 100% 50%)" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle (using gradient) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#grad-${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
          style={{
            filter: displayScore >= 85
              ? `drop-shadow(0 0 14px rgba(255,68,136,0.65))`
              : displayScore >= 70
              ? `drop-shadow(0 0 12px rgba(136,68,255,0.45))`
              : `drop-shadow(0 0 10px rgba(68,68,255,0.35))`,
          }}
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{ color: getScoreColor() }}
        >
          {displayScore}%
        </span>
        <span className="text-xs md:text-sm text-muted-foreground mt-1">Score IA</span>

        {/* Star badge for excellent scores */}
        {displayScore >= 85 && (
          <div className="absolute -top-3 right-2 lux-badge animate-pulse-glow" style={{ transform: 'translate(20%, -10%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF0099]">
              <path d="M12 2l2.9 6.3L21 9.2l-5 3.9L17 21l-5-3.2L7 21l1-7.9-5-3.9 6.1-.9L12 2z" fill="currentColor" />
            </svg>
            <span className="text-[11px]">Excellent</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCircle;
