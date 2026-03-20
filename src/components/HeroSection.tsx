"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowRight, Sparkles } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgContainer}>
        <Image
          src="/auratein.jpeg"
          alt="Auratein Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.orbA} />
        <div className={styles.orbB} />
        <div className={styles.noise} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <Sparkles size={14} />
              <span>AI-Powered Protection</span>
            </div>

            <h1 className={styles.title}>
              Your digital
              <br />
              <span className={styles.titleAccent}>safety shield.</span>
            </h1>

            <p className={styles.subtitle}>
              Upload chat screenshots and let our AI instantly analyze
              conversations for manipulation, threats, and harmful patterns.
              Stay informed, stay safe.
            </p>

            <div className={styles.actions}>
              <Link
                href="/auth"
                className={`${styles.heroBtn} ${styles.heroBtnPrimary}`}
              >
                Start Analyzing
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#how-it-works"
                className={`${styles.heroBtn} ${styles.heroBtnSecondary}`}
              >
                How It Works
              </Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Screenshots analyzed</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Detection accuracy</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>&lt;30s</span>
                <span className={styles.statLabel}>Avg analysis time</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelChip}>
                  <Shield size={14} />
                  Live Scan
                </div>
                <span className={styles.panelMeta}>Encrypted • Private</span>
              </div>

              <div className={styles.panelContent}>
                <div className={styles.panelScore}>
                  <div className={styles.panelScoreRing} />
                  <div>
                    <div className={styles.panelScoreLabel}>Risk Level</div>
                    <div className={styles.panelScoreValue}>Moderate</div>
                  </div>
                </div>

                <div className={styles.panelList}>
                  <div className={styles.panelItem}>
                    <span>Manipulation cues</span>
                    <strong>Detected</strong>
                  </div>
                  <div className={styles.panelItem}>
                    <span>Coercive language</span>
                    <strong>Elevated</strong>
                  </div>
                  <div className={styles.panelItem}>
                    <span>Threat signals</span>
                    <strong>Low</strong>
                  </div>
                </div>

                <div className={styles.panelFooter}>
                  <span className={styles.panelHint}>
                    AI verdict updates in real time
                  </span>
                  <div className={styles.panelPulse} />
                </div>
              </div>
            </div>

            <div className={styles.floatingCard}>
              <div className={styles.floatingTitle}>Instant Insights</div>
              <p className={styles.floatingText}>
                Highlighting patterns across messages, tone shifts, and legal
                signals in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
