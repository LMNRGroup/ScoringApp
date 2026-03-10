import { Contestant, Criterion, RoundId, ScoresState } from '@/lib/types';

export const contestants: Contestant[] = [
  { id: 'valeria-cruz', name: 'Valeria Cruz' },
  { id: 'camila-ortiz', name: 'Camila Ortiz' },
  { id: 'mateo-rivera', name: 'Mateo Rivera' },
];

export const rounds: RoundId[] = [1, 2, 3];

export const roundLabels: Record<RoundId, string> = {
  1: 'Primera Salida: Imagen y Presentación',
  2: 'Segunda Salida: Pasarela & Dominio Escénico',
  3: 'Tercera Salida: Comunicación',
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
  2: [
    {
      id: 'pasarela',
      name: 'Pasarela',
      aspects: [
        { id: 'seguridad', name: 'Seguridad' },
        { id: 'postura-pasarela', name: 'Postura' },
        { id: 'ritmo', name: 'Ritmo' },
        { id: 'gracia', name: 'Gracia' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Camina con seguridad, elegancia y dominio.' },
        { crowns: 2, description: 'Buena pasarela con leves fallas.' },
        { crowns: 1, description: 'Caminar inseguro o poco fluido.' },
        { crowns: 0, description: 'Falta de coordinación evidente.' },
      ],
    },
    {
      id: 'uso-escenario',
      name: 'Uso del Escenario',
      aspects: [
        { id: 'aprovechamiento-espacio', name: 'Aprovechamiento del espacio' },
        { id: 'movimientos-naturales', name: 'Movimientos Naturales' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Excelente dominio del escenario.' },
        { crowns: 2, description: 'Buen uso del espacio con pequeñas dudas.' },
        { crowns: 1, description: 'Uso limitado del espacio.' },
        { crowns: 0, description: 'No utiliza adecuadamente el escenario.' },
      ],
    },
    {
      id: 'tiempo-presentacion',
      name: 'Tiempo de Presentación',
      aspects: [{ id: 'cumplimiento-tiempo', name: 'Cumplimiento del Tiempo Establecido' }],
      crownGuide: [
        { crowns: 3, description: 'Cumple perfectamente el tiempo.' },
        { crowns: 2, description: 'Ligera variación del tiempo.' },
        { crowns: 1, description: 'Se extiende o termina demasiado rápido.' },
        { crowns: 0, description: 'No respeta el tiempo.' },
      ],
    },
  ],
  3: [
    {
      id: 'hablar-publico',
      name: 'Hablar en Público',
      aspects: [
        { id: 'claridad', name: 'Claridad' },
        { id: 'diccion', name: 'Dicción' },
        { id: 'tono-voz', name: 'Tono de voz' },
        { id: 'lenguaje-corporal', name: 'Lenguaje Corporal' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Expresión clara, segura y fluida.' },
        { crowns: 2, description: 'Buena comunicación con pequeños detalles.' },
        { crowns: 1, description: 'Dificultad para expresarse.' },
        { crowns: 0, description: 'No logra comunicar su mensaje.' },
      ],
    },
    {
      id: 'contenido-respuesta',
      name: 'Contenido de la respuesta',
      aspects: [
        { id: 'coherencia', name: 'Coherencia' },
        { id: 'profundidad', name: 'Profundidad' },
        { id: 'valores', name: 'Valores' },
        { id: 'relevancia-mensaje', name: 'Relevancia del Mensaje' },
      ],
      crownGuide: [
        { crowns: 3, description: 'Respuesta profunda, coherente y bien estructurada.' },
        { crowns: 2, description: 'Buena respuesta con ideas claras.' },
        { crowns: 1, description: 'Respuesta simple o poco desarrollada.' },
        { crowns: 0, description: 'Respuesta incoherente o fuera del tema.' },
      ],
    },
  ],
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
