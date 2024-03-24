import { AqiValues } from '@/types/aqi.type.ts';

export const AqiValueLabels: Record<AqiValues, string> = {
  [AqiValues.GOOD]: 'Kiváló',
  [AqiValues.FAIR]: 'Megfelelő',
  [AqiValues.MODERATE]: 'Közepes',
  [AqiValues.POOR]: 'Rossz',
  [AqiValues.UNHEALTHY]: 'Kurva szar',
};

export const AqiColors: Record<AqiValues, string> = {
  [AqiValues.GOOD]: '#17A398',
  [AqiValues.FAIR]: '#6DC193',
  [AqiValues.MODERATE]: '#F7B34C',
  [AqiValues.POOR]: '#b93c32',
  [AqiValues.UNHEALTHY]: '#9f70b5',
};
