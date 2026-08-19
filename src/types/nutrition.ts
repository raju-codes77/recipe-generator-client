export interface DetectedItem {
  name: string;
  icon: "meat" | "avocado" | "apple" | "seed" | "leaf" | "default";
}

export interface MacroBreakdown {
  label: "Protein" | "Carbs" | "Fat";
  grams: number;
  percent: number;
  color: "success" | "warning" | "pro";
}

export interface MicroNutrient {
  label: "Fiber" | "Sugar" | "Sodium";
  value: string;
  color: "success" | "warning" | "accent";
}

export interface HealthInsight {
  title: string;
  description: string;
  icon: "meat" | "cactus" | "scale";
}

export interface Recommendation {
  title: string;
  description: string;
  icon: "leaf" | "avocado" | "droplet";
}

export interface ScoreBreakdown {
  label: string;
  value: number;
}

export interface NutritionResult {
  id: string;
  foodName: string;
  tag: string;
  imageUrl: string;
  detectedItems: DetectedItem[];
  confidenceScore: number;
  calories: number;
  macros: MacroBreakdown[];
  micros: MicroNutrient[];
  healthScore: number;
  healthScoreLabel: string;
  scoreBreakdown: ScoreBreakdown[];
  insights: HealthInsight[];
  recommendations: Recommendation[];
  analyzedAt: string;
}

export type AnalyzerStatus = "idle" | "uploading" | "analyzing" | "done" | "error";