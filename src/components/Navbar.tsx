'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import styles from './Navbar.module.css';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const pathname = usePathname();
  const { language, setLanguage, t, availableLanguages, isLanguageLoading } = useLanguage();
  const loadingText = language === 'hi' ? 'अनुवाद हो रहा है...' : 'Translating...';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === '/' && window.location.hash === '#features') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleDocClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.languageWrapper}`)) {
        setLanguageOpen(false);
        setLanguageSearch('');
      }
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const isDashboard = pathname?.startsWith('/dashboard');
  const filteredLanguages = availableLanguages.filter((option) => {
    const query = languageSearch.trim().toLowerCase();
    if (!query) return true;
    return (
      option.englishName.toLowerCase().includes(query) ||
      option.nativeName.toLowerCase().includes(query) ||
      option.code.toLowerCase().includes(query)
    );
  });

  if (isDashboard) return null;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/first_attached_logo.png" 
            alt="ShieldHer Logo" 
            width={56} 
            height={56} 
            className={styles.logoImage}
            priority
          />
          <span className={styles.logoText}>ShieldHer</span>
        </Link>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link
            href="/"
            className={styles.link}
            onClick={(e) => {
              setMenuOpen(false);
              window.dispatchEvent(new Event('features-nav-click'));
              if (pathname === '/') {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
              }
            }}
          >
            {t.navbar.features}
          </Link>
          <Link href="/#how-it-works" className={styles.link} onClick={() => setMenuOpen(false)}>
            {t.navbar.howItWorks}
          </Link>
          <div className={styles.languageWrapper}>
            <button
              type="button"
              className={styles.silhouetteIcon}
              aria-label={t.navbar.language}
              onClick={() => {
                setLanguageOpen((prev) => {
                  const next = !prev;
                  if (!next) setLanguageSearch('');
                  return next;
                });
              }}
            >
              <Image
                src="/woman-silhouette.png"
                alt={t.navbar.language}
                width={24}
                height={28}
                className={styles.silhouetteImage}
              />
              <span className={styles.tooltip}>{t.navbar.language}</span>
            </button>
            {languageOpen && (
              <div className={styles.languageMenu}>
                <input
                  type="text"
                  className={styles.languageSearch}
                  placeholder={`${t.navbar.language}...`}
                  value={languageSearch}
                  onChange={(e) => setLanguageSearch(e.target.value)}
                />
                <div className={styles.languageList}>
                  {filteredLanguages.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      className={`${styles.languageOption} ${language === option.code ? styles.languageOptionActive : ''}`}
                      onClick={() => {
                        setLanguage(option.code);
                        setLanguageOpen(false);
                        setLanguageSearch('');
                      }}
                    >
                      <span className={styles.languageNative}>{option.nativeName}</span>
                      <span className={styles.languageEnglish}>{option.englishName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ThemeToggle
            className={styles.themeToggle}
            switchToDark={t.navbar.switchToDark}
            switchToLight={t.navbar.switchToLight}
          />
          <Link href="/auth" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
            {t.navbar.getStarted}
          </Link>
        </div>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isLanguageLoading && (
        <div className={styles.languageLoadingBadge} role="status" aria-live="polite">
          <span className={styles.languageLoadingDot} />
          <span>{loadingText}</span>
        </div>
      )}
    </nav>
  );
}
