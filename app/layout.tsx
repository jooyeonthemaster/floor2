import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '보이는 것보다 청아한 - Futuristic Tech Interface',
  description: 'Experience 29 books through advanced 3D visualization, interactive audio narration and cutting-edge tech interface',
  keywords: ['tech', 'futuristic', 'books', 'audio', '3D', 'interactive', 'immersive', 'digital'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="antialiased">
      <body className="min-h-screen bg-white text-black overflow-x-hidden">
        <div className="relative">
          {/* Advanced Tech Background System */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Primary Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Secondary Fine Grid */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            />
            
            {/* Scanning Lines Effect */}
            <div className="absolute inset-0">
              <div 
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-60 animate-scan-vertical"
                style={{
                  animation: 'scanVertical 8s linear infinite'
                }}
              />
              <div 
                className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-40 animate-scan-horizontal"
                style={{
                  animation: 'scanHorizontal 6s linear infinite'
                }}
              />
            </div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-black rounded-full opacity-20 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `floatParticle ${6 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.8}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
      </body>
    </html>
  );
}