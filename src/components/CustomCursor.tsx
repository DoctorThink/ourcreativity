
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const clickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        !!target.onclick;
      
      setIsPointer(clickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer cursor ring */}
      <div 
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                  ${isClicking ? 'scale-90' : 'scale-100'}
                  ${isPointer ? 'w-12 h-12' : 'w-8 h-8'}`}
        style={{
          transform: `translate(${position.x - (isPointer ? 24 : 16)}px, ${position.y - (isPointer ? 24 : 16)}px)`,
          border: '2px solid white',
          transition: 'width 0.2s, height 0.2s, transform 0.1s, opacity 0.3s'
        }}
      />
      
      {/* Inner cursor dot */}
      <div 
        className={`fixed pointer-events-none z-50 bg-white rounded-full w-2 h-2
                  ${isVisible ? 'opacity-100' : 'opacity-0'}
                  ${isClicking ? 'scale-150' : 'scale-100'}`}
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          transition: 'transform 0.1s, opacity 0.3s',
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
};

export default CustomCursor;
