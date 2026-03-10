import { Contestant, Criterion, RoundId, ScoresState } from '@/lib/types';

export const contestants: Contestant[] = [
  { id: 'valeria-cruz', name: 'Valeria Cruz' },
  { id: 'camila-ortiz', name: 'Camila Ortiz' },
  { id: 'mateo-rivera', name: 'Mateo Rivera' },
];

export const rounds: RoundId[] = [1, 2, 3];

const legacyCriteria: Criterion[] = [
  {
    id: 'presentacion-personal',
    name: 'Presentación Personal',
    aspects: [
      { id: 'arreglo-personal', name: 'Arreglo Personal' },
      { id: 'postura', name: 'Postura' },
      { id: 'expresion-facial', name: 'Expresión Facial' },
      { id: 'maquillaje', name: 'Maquillaje' },
      { id: 'peinado', name: 'Peinado' },
    ],
  },
  {
    id: 'vestuario-estilo',
    name: 'Vestuario / Estilo',
    aspects: [
      { id: 'vestuario-acorde-ocasion', name: 'Vestuario acorde a la ocasión' },
      { id: 'originalidad', name: 'Originalidad' },
      { id: 'ajuste', name: 'Ajuste' },
      { id: 'estilo', name: 'Estilo' },
      { id: 'coherencia-personalidad', name: 'Coherencia con la personalidad' },
    ],
  },
  {
    id: 'pasarela',
    name: 'Pasarela',
    aspects: [
      { id: 'seguridad', name: 'Seguridad' },
      { id: 'postura-pasarela', name: 'Postura' },
      { id: 'ritmo-caminar', name: 'Ritmo al caminar' },
      { id: 'gracia', name: 'Gracia' },
      { id: 'coordinacion', name: 'Coordinación' },
    ],
  },
  {
    id: 'uso-escenario',
    name: 'Uso del Escenario',
    aspects: [
      { id: 'aprovechamiento-espacio', name: 'Aprovechamiento del espacio' },
      { id: 'movimientos-naturales', name: 'Movimientos Naturales' },
      { id: 'equilibrio', name: 'Equilibrio' },
    ],
  },
  {
    id: 'actitud',
    name: 'Actitud',
    aspects: [
      { id: 'confianza', name: 'Confianza' },
      { id: 'simpatia', name: 'Simpatía' },
      { id: 'energia-positiva', name: 'Energía positiva' },
      { id: 'conexion-publico', name: 'Conexión con el público' },
    ],
  },
  {
    id: 'hablar-publico',
    name: 'Hablar en público',
    aspects: [
      { id: 'claridad', name: 'Claridad' },
      { id: 'diccion', name: 'Dicción' },
      { id: 'tono-voz', name: 'Tono de Voz' },
      { id: 'lenguaje-corporal', name: 'Lenguaje Corporal' },
      { id: 'coherencia', name: 'Coherencia' },
    ],
  },
  {
    id: 'tiempo-presentacion',
    name: 'Tiempo de Presentación',
    aspects: [{ id: 'cumplimiento-tiempo', name: 'Cumplimiento con el tiempo establecido' }],
  },
];

export const roundLabels: Record<RoundId, string> = {
  1: 'Primera Salida: Imagen y Presentación',
  2: 'Ronda 2',
  3: 'Ronda 3',
};

export const criteriaByRound: Record<RoundId, Criterion[]> = {
  1: [
    {
      id: 'presentacion-personal',
      name: 'Presentación Personal',
      aspects: [
        { id: 'arreglo-personal', name: 'Arreglo Personal' },
        { id: 'postura', name: 'Postura' },
        { id: 'expresion-facial', name: 'Expresión Facial' },
        { id: 'maquillaje', name: 'Maquillaje' },
        { id: 'peinado', name: 'Peinado' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Imagen impecable, elegante y segura.' },
        { crowns: 2, description: 'Buena presentación con pequeños detalles.' },
        { crowns: 1, description: 'Presentación aceptable con varios aspectos por mejorar.' },
        { crowns: 0, description: 'Imagen descuidada o inapropiada.' },
      ],
    },
    {
      id: 'vestuario-estilo',
      name: 'Vestuario & Estilo',
      aspects: [
        { id: 'vestuario-acorde-ocasion', name: 'Vestuario acorde a la ocasión' },
        { id: 'originalidad', name: 'Originalidad' },
        { id: 'ajuste', name: 'Ajuste' },
        { id: 'estilo', name: 'Estilo' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Vestuario elegante, original y perfectamente ajustado.' },
        { crowns: 2, description: 'Vestuario adecuado con leves detalles.' },
        { crowns: 1, description: 'Vestuario simple o poco favorecedor.' },
        { crowns: 0, description: 'Vestuario inapropiado.' },
      ],
    },
    {
      id: 'actitud-carisma',
      name: 'Actitud & Carisma',
      aspects: [
        { id: 'confianza', name: 'Confianza' },
        { id: 'simpatia', name: 'Simpatía' },
        { id: 'energia-positiva', name: 'Energía positiva' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Gran presencia escénica y carisma natural.' },
        { crowns: 2, description: 'Buena actitud y simpatía.' },
        { crowns: 1, description: 'Actitud tímida o poco expresiva.' },
        { crowns: 0, description: 'Falta de carisma o energía.' },
      ],
    },
  ],
  2: legacyCriteria,
  3: legacyCriteria,
};

export function getRoundCriteria(round: RoundId): Criterion[] {
  return criteriaByRound[round];
}

export function createInitialScoresState(): ScoresState {
  return contestants.reduce<ScoresState>((acc, contestant) => {
    const roundTemplate = rounds.reduce((roundAcc, round) => {
      const criteriaTemplate = getRoundCriteria(round).reduce((criterionAcc, criterion) => {
        const aspectTemplate = criterion.aspects.reduce<Record<string, number | undefined>>((aspectAcc, aspect) => {
          aspectAcc[aspect.id] = undefined;
          return aspectAcc;
        }, {});

        criterionAcc[criterion.id] = aspectTemplate;
        return criterionAcc;
      }, {} as Record<string, Record<string, number | undefined>>);

      roundAcc[round] = {
        submitted: false,
        criteria: criteriaTemplate,
      };

      return roundAcc;
    }, {} as ScoresState[string]);

    acc[contestant.id] = roundTemplate;
    return acc;
  }, {} as ScoresState);
}

export function normalizeScoresState(raw: unknown): ScoresState {
  const base = createInitialScoresState();
  if (!raw || typeof raw !== 'object') return base;

  const rawState = raw as ScoresState;

  for (const contestant of contestants) {
    for (const round of rounds) {
      const rawRound = rawState[contestant.id]?.[round];
      if (!rawRound || typeof rawRound !== 'object') continue;

      base[contestant.id][round].submitted = !!rawRound.submitted;
      base[contestant.id][round].submittedAt = rawRound.submittedAt;

      for (const criterion of getRoundCriteria(round)) {
        for (const aspect of criterion.aspects) {
          const rawValue = rawRound.criteria?.[criterion.id]?.[aspect.id];
          if (typeof rawValue === 'number' && rawValue >= 0 && rawValue <= 3) {
            base[contestant.id][round].criteria[criterion.id][aspect.id] = rawValue;
          }
        }
      }
    }
  }

  return base;
}
