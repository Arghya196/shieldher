'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type Report } from '@/lib/types';
import RiskBadge from '@/components/RiskBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  FileDown,
  Download,
  Trash2,
  Clock,
  FileText,
  AlertTriangle,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function DownloadsPage() {
  const { t } = useLanguage();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setReports(data);
    setLoading(false);
  }

  const handleDownload = (report: Report) => {
    const link = document.createElement('a');
    link.href = report.file_url;
    link.download = report.file_name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (reportId: string) => {
    if (confirmDeleteId !== reportId) {
      setConfirmDeleteId(reportId);
      return;
    }

    setDeletingId(reportId);
    setConfirmDeleteId(null);

    try {
      const res = await fetch('/api/delete-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      });

      if (!res.ok) {
        throw new Error(t.downloadsPage.failedDelete);
      }

      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error('Delete error:', err);
      alert(t.downloadsPage.failedDeleteAlert);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <LoadingSpinner text={t.downloadsPage.loading} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className={styles.back}>
        <ArrowLeft size={16} />
        {t.downloadsPage.backToDashboard}
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{t.downloadsPage.title}</h1>
        <p className={styles.subtitle}>
          {t.downloadsPage.subtitle}
        </p>
      </div>

      {/* Info banner with glass effect */}
      <div className={styles.infoBanner}>
        <Shield size={24} className={styles.infoBannerIcon} />
        <div>
          <h3 className={styles.infoBannerTitle}>{t.downloadsPage.certifiedEvidence}</h3>
          <p className={styles.infoBannerText}>
            {t.downloadsPage.certifiedText}
          </p>
        </div>
      </div>

      {reports.length > 0 ? (
        <div className={styles.list}>
          {reports.map((report) => (
            <div key={report.id} className={styles.reportCard}>
              <div className={styles.reportMain}>
                <div className={styles.reportIcon}>
                  <FileText size={28} />
                </div>
                <div className={styles.reportInfo}>
                  <div className={styles.reportNameRow}>
                    <span className={styles.reportName}>{report.file_name}</span>
                    <RiskBadge level={report.risk_level} size="sm" />
                  </div>
                  <div className={styles.reportMeta}>
                    <Clock size={14} />
                    <span>
                      {new Date(report.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.reportActions}>
                <button
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(report)}
                  title={t.downloadsPage.downloadTitle}
                >
                  <Download size={16} />
                  <span>{t.downloadsPage.download}</span>
                </button>
                <button
                  className={`${styles.deleteBtn} ${confirmDeleteId === report.id ? styles.deleteBtnConfirm : ''}`}
                  onClick={() => handleDelete(report.id)}
                  disabled={deletingId === report.id}
                  title={confirmDeleteId === report.id ? t.downloadsPage.confirmDeleteTitle : t.downloadsPage.deleteTitle}
                >
                  {deletingId === report.id ? (
                    <span>{t.downloadsPage.deleting}</span>
                  ) : confirmDeleteId === report.id ? (
                    <>
                      <AlertTriangle size={16} />
                      <span>{t.downloadsPage.confirmDelete}</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>{t.downloadsPage.delete}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIconWrap}>
            <FileDown size={40} />
          </div>
          <h3>{t.downloadsPage.noReports}</h3>
          <p>
            {t.downloadsPage.noReportsText}
          </p>
          <Link href="/dashboard/history" className={styles.emptyButton}>
            {t.downloadsPage.browseHistory}
          </Link>
        </div>
      )}
    </div>
  );
}
