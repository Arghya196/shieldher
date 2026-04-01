'use client';

import Link from 'next/link';
import { ArrowRight, Scale, Shield, UserRound } from 'lucide-react';
import styles from './page.module.css';
import { useLanguage } from '@/components/LanguageProvider';

export default function AuthPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoIcon}>
            <Shield size={24} />
          </div>
          <h1 className={styles.title}>{t.authChoice.title}</h1>
          <p className={styles.subtitle}>
            {t.authChoice.subtitle}
          </p>
        </div>

        <div className={styles.options}>
          <Link href="/auth/signup?role=user" className={styles.optionCard}>
            <div className={styles.optionIcon}>
              <UserRound size={20} />
            </div>
            <div className={styles.optionText}>
              <h2>{t.authChoice.userTitle}</h2>
              <p>{t.authChoice.userDesc}</p>
            </div>
            <ArrowRight size={18} className={styles.optionArrow} />
          </Link>

          <Link href="/auth/signup?role=lawyer" className={styles.optionCard}>
            <div className={styles.optionIcon}>
              <Scale size={20} />
            </div>
            <div className={styles.optionText}>
              <h2>{t.authChoice.lawyerTitle}</h2>
              <p>{t.authChoice.lawyerDesc}</p>
            </div>
            <ArrowRight size={18} className={styles.optionArrow} />
          </Link>
        </div>
      </div>
    </div>
  );
}
