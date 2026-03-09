import { Criterion, RoundId, ScoresState } from '@/lib/types';

export function getCriterionTotal(
  scores: ScoresState,
  contestantId: string,
  round: RoundId,
  criterion: Criterion
): number {
  return criterion.aspects.reduce((sum, aspect) => {
    const value = scores[contestantId][round].criteria[criterion.id][aspect.id];
    return sum + (value ?? 0);
  }, 0);
}

export function getCriterionCompleted(
  scores: ScoresState,
  contestantId: string,
  round: RoundId,
  criterion: Criterion
): boolean {
  return criterion.aspects.every((aspect) => scores[contestantId][round].criteria[criterion.id][aspect.id] !== undefined);
}

export function getRoundCompletedCount(
  scores: ScoresState,
  contestantId: string,
  round: RoundId,
  criteria: Criterion[]
): number {
  return criteria.filter((criterion) => getCriterionCompleted(scores, contestantId, round, criterion)).length;
}

export function getRoundTotalPoints(
  scores: ScoresState,
  contestantId: string,
  round: RoundId,
  criteria: Criterion[]
): number {
  return criteria.reduce((sum, criterion) => sum + getCriterionTotal(scores, contestantId, round, criterion), 0);
}

export function getRoundStatus(
  scores: ScoresState,
  contestantId: string,
  round: RoundId,
  criteria: Criterion[]
): 'not_started' | 'in_progress' | 'submitted' {
  const roundData = scores[contestantId][round];
  if (roundData.submitted) return 'submitted';

  const hasAny = criteria.some((criterion) =>
    criterion.aspects.some((aspect) => roundData.criteria[criterion.id][aspect.id] !== undefined)
  );

  return hasAny ? 'in_progress' : 'not_started';
}
