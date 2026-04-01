'use client';

import Navbar from "@/components/Navbar";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Shield,
  Brain,
  Eye,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle,
  Scale,
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import { useLanguage } from "@/components/LanguageProvider";

const featureIcons = [Brain, Eye, Shield, Zap, Lock, Scale];

export default function Home() {
  const { t } = useLanguage();

  const features = (t.home.features ?? []).map((feature, index) => {
    const Icon = featureIcons[index] ?? Shield;
    return {
      icon: <Icon size={24} />,
      title: feature.title,
      description: feature.description,
    };
  });
  const steps = t.home.steps ?? [];
  const testimonials = t.home.testimonials ?? [];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Gradient mesh like Stripe */}
        <HeroSection />

        {/* Dark Stats Banner — like Stripe's "backbone of global commerce" */}
        <section className={styles.statsBanner}>
          <div className={styles.statsBannerGlow} />
          <div className={`container ${styles.statsBannerInner}`}>
            <ScrollReveal>
              <h2 className={styles.statsBannerTitle}>
                {t.home.statsBannerTitleLine1}
                <br />
                {t.home.statsBannerTitleLine2}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className={styles.statsBannerGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{t.home.statsBannerStats[0].value}</span>
                  <span className={styles.statName}>
                    {t.home.statsBannerStats[0].label}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{t.home.statsBannerStats[1].value}</span>
                  <span className={styles.statName}>
                    {t.home.statsBannerStats[1].label}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{t.home.statsBannerStats[2].value}</span>
                  <span className={styles.statName}>
                    {t.home.statsBannerStats[2].label}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{t.home.statsBannerStats[3].value}</span>
                  <span className={styles.statName}>
                    {t.home.statsBannerStats[3].label}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Features */}
        <section className={styles.features} id="features">
          <div className="container">
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.home.featuresSection.tag}</span>
                <h2 className={styles.sectionTitle}>
                  {t.home.featuresSection.titlePrefix}{" "}
                  <span className="gradient-text">{t.home.featuresSection.titleAccent}</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  {t.home.featuresSection.subtitle}
                </p>
              </div>
            </ScrollReveal>
            <div className={styles.featureGrid}>
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 80} className={styles.featureReveal}>
                  <FeatureCard {...feature} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks} id="how-it-works">
          <div className="container">
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.home.howItWorksSection.tag}</span>
                <h2 className={styles.sectionTitle}>
                  {t.home.howItWorksSection.titlePrefix}{" "}
                  <span className="gradient-text">{t.home.howItWorksSection.titleAccent}</span>
                </h2>
              </div>
            </ScrollReveal>
            <div className={styles.steps}>
              {steps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 120} className={styles.featureReveal}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>{step.number}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Testimonials */}
        <section className={styles.trust}>
          <div className="container">
            <ScrollReveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.home.trustSection.tag}</span>
                <h2 className={styles.sectionTitle}>
                  {t.home.trustSection.titlePrefix}{" "}
                  <span className="gradient-text">{t.home.trustSection.titleAccent}</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  {t.home.trustSection.subtitle}
                </p>
              </div>
            </ScrollReveal>
            <div className={styles.trustGrid}>
              {testimonials.map((t, i) => (
                <ScrollReveal key={i} delay={i * 100} className={styles.featureReveal}>
                  <div className={styles.trustCard}>
                    <p className={styles.trustQuote}>&ldquo;{t.quote}&rdquo;</p>
                    <div className={styles.trustAuthor}>
                      <div className={styles.trustAvatar}>{t.initial}</div>
                      <div>
                        <div className={styles.trustName}>{t.name}</div>
                        <div className={styles.trustRole}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Gradient like Stripe */}
        <section className={styles.cta}>
          <div className="container">
            <ScrollReveal direction="scale">
              <div className={styles.ctaCard}>
                <div className={styles.ctaContent}>
                  <h2 className={styles.ctaTitle}>{t.home.cta.title}</h2>
                  <p className={styles.ctaSubtitle}>{t.home.cta.subtitle}</p>
                  <div className={styles.ctaChecks}>
                    <div className={styles.ctaCheck}>
                      <CheckCircle size={16} />
                      <span>{t.home.cta.checks[0]}</span>
                    </div>
                    <div className={styles.ctaCheck}>
                      <CheckCircle size={16} />
                      <span>{t.home.cta.checks[1]}</span>
                    </div>
                    <div className={styles.ctaCheck}>
                      <CheckCircle size={16} />
                      <span>{t.home.cta.checks[2]}</span>
                    </div>
                  </div>
                  <Link href="/auth" className={styles.ctaBtnPrimary}>
                    {t.home.cta.button}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerInner}>
              <Link href="/" className={styles.footerLogo} style={{textDecoration: 'none'}}>
                <Image src="/first_attached_logo.png" alt="ShieldHer Logo" width={56} height={56} style={{ objectFit: 'contain' }} />
                <span>ShieldHer</span>
              </Link>
              <p className={styles.footerText}>
                © {new Date().getFullYear()} ShieldHer. {t.home.footer.textSuffix}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
