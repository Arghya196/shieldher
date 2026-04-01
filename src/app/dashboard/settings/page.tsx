'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User, Mail, Shield, LogOut, Save, Loader, Ghost, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function SettingsPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ghostMode, setGhostMode] = useState(false);
  const [togglingGhost, setTogglingGhost] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setEmail(user.email || '');
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, ghost_mode')
          .eq('id', user.id)
          .single();
          
        if (profile?.full_name) {
          setFullName(profile.full_name);
        }
        if (profile?.ghost_mode !== undefined) {
          setGhostMode(profile.ghost_mode);
        }
      }
      setLoading(false);
    }
    
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    if (updateError) {
      setError(t.settingsPage.profileUpdateFailed);
    } else {
      setMessage(t.settingsPage.profileUpdated);
    }
    
    setSaving(false);
  };

  const handleToggleGhostMode = async () => {
    setTogglingGhost(true);
    const newValue = !ghostMode;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setTogglingGhost(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ ghost_mode: newValue })
      .eq('id', user.id);

    if (updateError) {
      setError(t.settingsPage.ghostUpdateFailed);
    } else {
      setGhostMode(newValue);
      setMessage(newValue ? t.settingsPage.ghostEnabled : t.settingsPage.ghostDisabled);
    }
    
    setTogglingGhost(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className={styles.page}>
         <div className="flex justify-center items-center h-64">
           <Loader className="animate-spin text-accent" size={32} />
           <span style={{ marginLeft: 10 }}>{t.settingsPage.loading}</span>
         </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className={styles.back}>
        <ArrowLeft size={16} />
        {t.settingsPage.backToDashboard}
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{t.settingsPage.title}</h1>
        <p className={styles.subtitle}>{t.settingsPage.subtitle}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrap}>
              <User size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>{t.settingsPage.personalInfo}</h2>
              <p className={styles.cardDesc}>{t.settingsPage.personalDesc}</p>
            </div>
          </div>
          
          <form onSubmit={handleSaveProfile} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fullName">{t.settingsPage.fullName}</label>
              <input
                id="fullName"
                type="text"
                className={styles.input}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t.settingsPage.fullNamePlaceholder}
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">{t.settingsPage.emailAddress}</label>
              <div className={styles.inputWrap}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  className={`${styles.input} ${styles.inputWithIcon} ${styles.disabledInput}`}
                  value={email}
                  disabled
                  readOnly
                />
              </div>
              <p className={styles.helpText}>{t.settingsPage.emailImmutable}</p>
            </div>

            {error && <div className={styles.error}>{error}</div>}
            {message && <div className={styles.success}>{message}</div>}

            <div className={styles.actions}>
              <button 
                type="submit" 
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? (
                  <><Loader size={18} className="animate-spin" /> {t.settingsPage.saving}</>
                ) : (
                  <><Save size={18} /> {t.settingsPage.saveChanges}</>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Ghost Mode Card */}
        <div className={`${styles.card} ${styles.ghostCard}`}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrap} ${styles.ghostIconWrap}`}>
              <Ghost size={24} />
            </div>
            <div className={styles.ghostHeaderGroup}>
              <div>
                <h2 className={styles.cardTitle}>{t.settingsPage.ghostMode}</h2>
                <p className={styles.cardDesc}>{t.settingsPage.ghostDesc}</p>
              </div>
              <span className={`${styles.ghostBadge} ${ghostMode ? styles.ghostBadgeActive : ''}`}>
                {ghostMode ? t.settingsPage.active : t.settingsPage.off}
              </span>
            </div>
          </div>

          <div className={styles.ghostContent}>
            <p className={styles.ghostText}>
              {t.settingsPage.ghostText}
            </p>

            <div className={styles.ghostWarning}>
              <AlertTriangle size={18} className={styles.warningIcon} />
              <p>
                <strong>{t.settingsPage.warningTitle}:</strong> {t.settingsPage.warningText}
              </p>
            </div>

            <div className={styles.ghostToggleRow}>
              <div>
                <span className={styles.ghostToggleLabel}>{t.settingsPage.autoDelete}</span>
                <span className={styles.ghostToggleHint}>
                  {ghostMode ? t.settingsPage.autoDeleteOn : t.settingsPage.autoDeleteOff}
                </span>
              </div>
              <button
                className={`${styles.toggleSwitch} ${ghostMode ? styles.toggleActive : ''}`}
                onClick={handleToggleGhostMode}
                disabled={togglingGhost}
                role="switch"
                aria-checked={ghostMode}
                aria-label={t.settingsPage.toggleGhost}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconWrap} ${styles.dangerIconWrap}`}>
              <Shield size={24} />
            </div>
            <div>
              <h2 className={styles.cardTitle}>{t.settingsPage.securityAccess}</h2>
              <p className={styles.cardDesc}>{t.settingsPage.manageSession}</p>
            </div>
          </div>
          
          <div className={styles.securitySection}>
            <p className={styles.securityText}>
              {t.settingsPage.sessionText}
            </p>
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              <LogOut size={16} />
              {t.settingsPage.signOut}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
