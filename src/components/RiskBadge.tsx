'use client';

import { type RiskLevel } from '@/lib/types';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertOctagon, Skull } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const config: Record<RiskLevel, { icon: React.ReactNode; className: string }> = {
  safe: { icon: <ShieldCheck size={14} />, className: 'badge-safe' },
  low: { icon: <ShieldAlert size={14} />, className: 'badge-low' },
  medium: { icon: <AlertTriangle size={14} />, className: 'badge-medium' },
  high: { icon: <AlertOctagon size={14} />, className: 'badge-high' },
  critical: { icon: <Skull size={14} />, className: 'badge-critical' },
};

export default function RiskBadge({ level, showIcon = true, size = 'md' }: RiskBadgeProps) {
  const { t } = useLanguage();
  const { icon, className } = config[level];
  const label = t.riskBadge[level];

  const sizeStyle: React.CSSProperties =
    size === 'sm'
      ? { fontSize: 11, padding: '2px 8px' }
      : size === 'lg'
        ? { fontSize: 14, padding: '6px 14px' }
        : {};

  return (
    <span className={`badge ${className}`} style={sizeStyle}>
      {showIcon && icon}
      {label}
    </span>
  );
}
