"use client";

import Sidebar from "@/components/Sidebar";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.ambientLayer} aria-hidden="true">
        <div className={styles.orbA} />
        <div className={styles.orbB} />
        <div className={styles.orbC} />
        <div className={styles.gridGlow} />
        <div className={styles.noise} />
      </div>

      <Sidebar />

      <main className={styles.main}>
        <div className={styles.shell}>
          <div className={styles.shellGlow} aria-hidden="true" />
          <div className={styles.shellInner}>{children}</div>
        </div>
      </main>
    </div>
  );
}
