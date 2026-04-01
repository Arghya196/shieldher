"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type Upload, type AnalysisResult } from "@/lib/types";
import AnalysisCard from "@/components/AnalysisCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import RiskBadge from "@/components/RiskBadge";
import { FileSearch, Clock, ImageIcon, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./page.module.css";

interface UploadWithAnalysis extends Upload {
  analysis_results: AnalysisResult[];
}

export default function HistoryPage() {
  const { t } = useLanguage();
  const [uploads, setUploads] = useState<UploadWithAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "flagged" | "safe">("all");

  useEffect(() => {
    async function fetchHistory() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("uploads")
        .select("*, analysis_results(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setUploads(data as UploadWithAnalysis[]);
      setLoading(false);
    }
    fetchHistory();
  }, []);

  const filtered = uploads.filter((u) => {
    if (filter === "all") return true;
    if (filter === "flagged") return u.status === "flagged";
    return (
      u.status === "completed" &&
      u.analysis_results?.some(
        (a) => a.risk_level === "safe" || a.risk_level === "low",
      )
    );
  });

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrap}>
          <LoadingSpinner text={t.historyPage.loading} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/dashboard" className={styles.back}>
        <ArrowLeft size={16} />
        {t.historyPage.backToDashboard}
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{t.historyPage.title}</h1>
        <p className={styles.subtitle}>
          {t.historyPage.subtitle}
        </p>
      </div>

      <div className={styles.filtersWrapper}>
        <div className={styles.filterIconWrap}>
          <Filter size={18} />
        </div>
        <div className={styles.filters}>
          {(["all", "flagged", "safe"] as const).map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
              onClick={() => setFilter(f)}
            >
              <span className={styles.filterDot} data-type={f} />
              {f === "all"
                ? t.historyPage.allUploads
                : f === "flagged"
                  ? t.historyPage.flaggedIssues
                  : t.historyPage.safeResults}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.list}>
          {filtered.map((upload) => (
            <div key={upload.id} className={styles.uploadCard}>
              <div className={styles.uploadHeader}>
                <div className={styles.uploadInfo}>
                  <div className={styles.iconBox}>
                    <ImageIcon size={24} />
                  </div>
                  <div>
                    <span className={styles.fileName}>{upload.file_name}</span>
                    <span className={styles.uploadDate}>
                      <Clock size={12} />
                      {new Date(upload.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <div className={styles.statusBox}>
                  <RiskBadge
                    level={
                      upload.status === "flagged"
                        ? "high"
                        : upload.status === "completed"
                          ? "safe"
                          : "medium"
                    }
                  />
                </div>
              </div>

              {upload.analysis_results && upload.analysis_results.length > 0 ? (
                <div className={styles.analysisSection}>
                  {upload.analysis_results.map((analysis) => (
                    <AnalysisCard key={analysis.id} analysis={analysis} />
                  ))}
                </div>
              ) : (
                <div className={styles.noAnalysis}>
                  <p>{t.historyPage.processing}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIconWrap}>
            <FileSearch size={32} />
          </div>
          <h3>{t.historyPage.noResults}</h3>
          <p>
            {filter !== "all"
              ? t.historyPage.tryFilter
              : t.historyPage.uploadStart}
          </p>
          <Link href="/dashboard/upload" className={styles.emptyButton}>
            {t.historyPage.newUpload}
          </Link>
        </div>
      )}
    </div>
  );
}
