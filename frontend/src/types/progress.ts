export interface ChartDataPoint {
  label: string; // Ngày dd/MM hoặc tên bài học
  score: number; // Điểm số
}

export interface LeaderboardEntry {
  full_name: string;
  avg_pronunciation_score: number; // Điểm trung bình
  avatar_url?: string;
  learner_id?: number;
}

export interface ProgressResponse {
  avgPronunciation: number;
  current_streak_days: number;
  chartData: ChartDataPoint[];
  leaderboard: LeaderboardEntry[];
}
