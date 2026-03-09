import { Contestant, Criterion, RoundId, ScoresState } from '@/lib/types';

export const contestants: Contestant[] = [
  { id: 'valeria-cruz', name: 'Valeria Cruz' },
  { id: 'camila-ortiz', name: 'Camila Ortiz' },
  { id: 'sophia-rivera', name: 'Sophia Rivera' },
];

export const rounds: RoundId[] = [1, 2, 3];

export const criteria: Criterion[] = [
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

export function createInitialScoresState(): ScoresState {
  return contestants.reduce<ScoresState>((acc, contestant) => {
    const roundTemplate = rounds.reduce((roundAcc, round) => {
      const criteriaTemplate = criteria.reduce((criterionAcc, criterion) => {
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
