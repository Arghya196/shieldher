export type RiskLevel = 'safe' | 'low' | 'medium' | 'high' | 'critical';
export type UploadStatus = 'pending' | 'analyzing' | 'completed' | 'flagged';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  ghost_mode: boolean;
  created_at: string;
}

export interface Upload {
  id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  status: UploadStatus;
  created_at: string;
  analysis_results?: AnalysisResult[];
}

export interface AnalysisFlag {
  category: string;
  description: string;
  severity: RiskLevel;
  evidence: string;
}

export type MediaAuthenticityStatus =
  | 'ai_generated'
  | 'likely_human'
  | 'inconclusive'
  | 'unsupported'
  | 'unavailable';

export interface MediaAuthenticityItem {
  file_name: string;
  media_type: 'image' | 'audio' | 'video' | 'other';
  provider: string;
  status: MediaAuthenticityStatus;
  label: string;
  summary: string;
  ai_probability?: number;
  confidence?: number;
}

export interface MediaAuthenticityResult {
  provider: string;
  status: MediaAuthenticityStatus;
  label: string;
  summary: string;
  confidence?: number;
  ai_probability?: number;
  analyzed_count: number;
  supported_count: number;
  items: MediaAuthenticityItem[];
}

export interface AnalysisResult {
  id: string;
  upload_id: string;
  risk_level: RiskLevel;
  summary: string;
  flags: AnalysisFlag[];
  details: {
    tone_analysis?: string;
    manipulation_indicators?: string[];
    threat_indicators?: string[];
    recommendations?: string[];
    confidence_score?: number;
    media_authenticity?: MediaAuthenticityResult;
    legal_analysis?: {
      summary: string;
      potential_violations: string[];
      disclaimer: string;
    };
  };
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  upload_id: string;
  analysis_id: string;
  file_name: string;
  file_url: string;
  risk_level: RiskLevel;
  created_at: string;
}
