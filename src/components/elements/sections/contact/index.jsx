import React, { useState, useEffect } from 'react';

const ContactItem = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <a href="https://absheronport.az/az" className='Button' target="_blank" rel="noopener noreferrer">
        <div className='Main-Button Main-text'>
          {isMobile ? 'ALM' : 'ABŞERON LOGİSTİKA MƏRKƏZİ'}
        </div>
      </a>
    </>
  );
};

export default ContactItem;
