import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles/NotFound.css'
const NotFound = () => {
  const shapesRef = useRef([]);

  useEffect(() => {
    const shapes = shapesRef.current;

    // Set initial positions for shapes
    shapes.forEach((shape, i) => {
      gsap.set(shape, {
        x: i * (window.innerWidth / 5), // Spread shapes across the screen
        y: Math.random() * (window.innerHeight - 100) + 50, // Random vertical position
      });
    });

    // Animate shapes from left to right in a loop
    shapes.forEach((shape) => {
      gsap.to(shape, {
        x: window.innerWidth + 100, // Move to the right edge
        duration: 10 + Math.random() * 5, // Random duration for variety
        ease: 'none',
        repeat: -1, // Infinite loop
        onRepeat: () => {
          gsap.set(shape, { x: -100 }); // Reset to left side
          gsap.set(shape, { y: Math.random() * (window.innerHeight - 100) + 50 }); // Randomize y position
        },
      });
    });

    // Handle window resize
    const handleResize = () => {
      shapes.forEach((shape) => {
        gsap.to(shape, { x: window.innerWidth + 100, duration: 0 }); // Adjust animation for new width
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Array of shapes with red and gold gradient fills
  const shapes = Array(20).fill().map((_, i) => {
    const type = i % 4; // Cycle through different shapes
    const fill = i % 2 === 0 ? 'url(#redGradient)' : 'url(#goldGradient)';
    let shapeElement;
    switch (type) {
      case 0: // Circle
        shapeElement = (
          <circle cx="50" cy="50" r="40" fill={fill} />
        );
        break;
      case 1: // Star
        shapeElement = (
          <polygon
            points="50,10 60,40 90,40 65,60 75,90 50,70 25,90 35,60 10,40 40,40"
            fill={fill}
          />
        );
        break;
      case 2: // Square with rotation
        shapeElement = (
          <rect x="10" y="10" width="80" height="80" transform="rotate(45 50 50)" fill={fill} />
        );
        break;
      case 3: // Abstract shape
        shapeElement = (
          <path d="M30,20 Q50,80 70,20 Q90,40 70,60 Q50,80 30,60 Q10,40 30,20" fill={fill} />
        );
        break;
      default:
        shapeElement = <circle cx="50" cy="50" r="40" fill={fill} />;
    }
    
    return (
      <svg
        key={i}
        ref={(el) => (shapesRef.current[i] = el)}
        width="100"
        height="100"
        style={{ position: 'absolute', zIndex: 1 }}
      >
        {shapeElement}
      </svg>
    );
  });

  return (
    <main className="main-container">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#B91C1C', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#EF4444', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FDE68A', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FACC15', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      {shapes}
      <div className="content">
        <h1 className="title">404</h1>
        <p className="message">Page Not Found</p>
        <a href="/" className="home-link">
          Back to Home
        </a>
      </div>
     
    </main>
  );
};

export default NotFound;