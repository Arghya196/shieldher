"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Lock } from "lucide-react";
import styles from "./HeroSection.module.css";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const [riskIndex, setRiskIndex] = useState(0);
  const [scanVisible] = useState(true);
  const [activeItem, setActiveItem] = useState(-1);
  const { t } = useLanguage();

  const scanStatuses = t.hero.scanStatuses;
  const riskRotation = t.hero.riskRotation;
  const trustBadges = [
    { icon: ShieldCheck, text: t.hero.trustBadges[0] },
    { icon: Zap, text: t.hero.trustBadges[1] },
    { icon: Lock, text: t.hero.trustBadges[2] },
  ];

  // Cycle through risk levels
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskIndex((prev) => (prev + 1) % riskRotation.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [riskRotation.length]);

  // Staggered scan items reveal
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => {
        if (prev >= scanStatuses.length - 1) return 0;
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [scanStatuses.length]);

  const currentRisk = riskRotation[riskIndex];

  return (
    <section className={styles.hero}>
      <div className={styles.bgContainer}>
        <Image
          src="/auratein.jpeg"
          alt="Auratein Background"
          fill
          style={{ objectFit: "cover", objectPosition: "left center" }}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.orbA} />
        <div className={styles.orbB} />
        <div className={styles.orbC} />
        <div className={styles.noise} />
        <div className={styles.scanline} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <Sparkles size={14} />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className={styles.title}>
              {t.hero.titleLine1}
              <br />
              <span className={styles.titleAccent}>{t.hero.titleAccent}</span>
            </h1>

            <p className={styles.subtitle}>{t.hero.subtitle}</p>

            <div className={styles.actions}>
              <Link
                href="/auth"
                className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
              >
                <span className={styles.btnShimmer} />
                {t.hero.startAnalyzing}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#how-it-works"
                className={`${styles.heroBtn} ${styles.heroBtnSecondary}`}
              >
                {t.hero.howItWorks}
              </Link>
            </div>

            {/* Trust badges */}
            <div className={styles.trustRow}>
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className={styles.trustBadge} style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                    <Icon size={14} />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{t.hero.stats[0].value}</span>
                <span className={styles.statLabel}>{t.hero.stats[0].label}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{t.hero.stats[1].value}</span>
                <span className={styles.statLabel}>{t.hero.stats[1].label}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>{t.hero.stats[2].value}</span>
                <span className={styles.statLabel}>{t.hero.stats[2].label}</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroPanel}>
              {/* Animated border glow */}
              <div className={styles.panelGlow} />

              <div className={styles.panelHeader}>
                <div className={styles.panelChip}>
                  <Image
                    src="/red-circle-logo.svg"
                    alt="ShieldHer Logo"
                    width={22}
                    height={22}
                    className={styles.chipLogo}
                  />
                  <span className={styles.liveDot} />
                  {t.hero.panel.liveScan}
                </div>
                <span className={styles.panelMeta}>{t.hero.panel.encryptedPrivate}</span>
              </div>

              <div className={styles.panelContent}>
                <div className={styles.panelScore}>
                  <div
                    className={styles.panelScoreRing}
                    style={{
                      background: `conic-gradient(${currentRisk.color} 0 ${currentRisk.percent}%, rgba(255,255,255,0.15) ${currentRisk.percent}% 100%)`,
                    }}
                  >
                    <div className={styles.panelScoreRingInner} />
                  </div>
                  <div>
                    <div className={styles.panelScoreLabel}>{t.hero.panel.riskLevel}</div>
                    <div className={styles.panelScoreValue} key={riskIndex}>
                      {currentRisk.level}
                    </div>
                  </div>
                </div>

                <div className={styles.panelList}>
                  {scanStatuses.map((item, i) => (
                    <div
                      key={i}
                      className={`${styles.panelItem} ${activeItem === i ? styles.panelItemActive : ""
                        } ${scanVisible ? styles.panelItemVisible : ""}`}
                      style={{ animationDelay: `${0.8 + i * 0.15}s` }}
                    >
                      <span>{item.label}</span>
                      <strong
                        className={
                          item.level === "danger"
                            ? styles.valueDanger
                            : item.level === "warn"
                              ? styles.valueWarn
                              : styles.valueSafe
                        }
                      >
                        {item.value}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className={styles.panelFooter}>
                  <span className={styles.panelHint}>
                    {t.hero.panel.hint}
                  </span>
                  <div className={styles.panelPulse} />
                </div>
              </div>
            </div>

            <div className={styles.floatingCard}>
              <div className={styles.floatingIcon}>⚡</div>
              <div>
                <div className={styles.floatingTitle}>{t.hero.floatingCard.title}</div>
                <p className={styles.floatingText}>{t.hero.floatingCard.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
