export type RoundId = 1 | 2 | 3;

export interface Contestant {
  id: string;
  name: string;
}

export interface Aspect {
  id: string;
  name: string;
}

export interface CrownGuideItem {
  crowns: 0 | 1 | 2 | 3;
  description: string;
}

export interface Criterion {
  id: string;
  name: string;
  aspects: Aspect[];
  crownGuide?: CrownGuideItem[];
}

export type AspectScoreMap = Record<string, number | undefined>;
export type CriterionScoreMap = Record<string, AspectScoreMap>;

export interface RoundScore {
  submitted: boolean;
  submittedAt?: string;
  criteria: CriterionScoreMap;
}

export type ContestantRounds = Record<RoundId, RoundScore>;
export type ScoresState = Record<string, ContestantRounds>;
