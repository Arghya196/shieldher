'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BouncingCube.module.css';

export default function BouncingCube() {
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, land1: 0, land2: 0, bounce1: 0, bounce2: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleFeatureClick = () => {
      // Find the navbar logo position to drop from
      const logo = document.querySelector('[class*="logo"]') as HTMLElement;
      const logoRect = logo?.getBoundingClientRect();

      const startX = logoRect
        ? logoRect.left + logoRect.width / 2
        : 80;
      const startY = logoRect ? logoRect.bottom : 64;

      const vh = window.innerHeight;
      const land1 = vh * 0.85;   // first landing (near bottom)
      const bounce1 = vh * 0.65; // first bounce peak
      const land2 = vh * 0.85;   // second landing
      const bounce2 = vh * 0.75; // second bounce peak (smaller)

      setPos({ x: startX, y: startY, land1, bounce1, land2, bounce2 });
      setActive(false);
      // Let it reset before re-triggering
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setActive(false), 2200);
    };

    // Listen for custom event
    window.addEventListener('features-nav-click', handleFeatureClick);
    return () => window.removeEventListener('features-nav-click', handleFeatureClick);
  }, []);

  if (!active) return null;

  return (
    <div
      className={styles.cube}
      style={{
        '--start-x': `${pos.x}px`,
        '--start-y': `${pos.y}px`,
        '--land1': `${pos.land1}px`,
        '--bounce1': `${pos.bounce1}px`,
        '--land2': `${pos.land2}px`,
        '--bounce2': `${pos.bounce2}px`,
      } as React.CSSProperties}
    />
  );
}
