"use client";
import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about Charles', link: '/#about' },
  { label: 'Gallery', ariaLabel: 'View cars and lifestyle', link: '/#gallery' },
  { label: 'Stats', ariaLabel: 'View racing stats', link: '/#stats' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/#contact' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com/charles_leclerc' },
  { label: 'Twitter', link: 'https://twitter.com/charles_leclerc' },
  { label: 'Ferrari', link: 'https://www.ferrari.com' }
];

export default function Navbar() {
  const [hideAtFooter, setHideAtFooter] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // When scrolled near bottom (footer area), hide floating top navbar
      if (docHeight - scrollPosition < 850) {
        setHideAtFooter(true);
      } else {
        setHideAtFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 100,
        opacity: hideAtFooter ? 0 : 1,
        pointerEvents: hideAtFooter ? 'none' : 'auto',
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#000"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#8B0000', '#E10600']}
        accentColor="#E10600"
        storeLink="https://landonorris.com/"
        isFixed={false}
      />
    </div>
  );
}
