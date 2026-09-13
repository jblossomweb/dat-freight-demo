import type { EquipmentType, LoadStatus } from './Load';

export interface StatsTotal<Label extends string = string> {
  label: Label;
  value: number;
}

export interface ApiStatsResponse {
  requestURL: string;
  meta: {
    numTotal: number;
    responseTimeMs: number;
    timestamp: string;
  };
  stats: {
    totals: {
      equipmentType: StatsTotal<EquipmentType>[];
      status: StatsTotal<LoadStatus>[];
    };
  };
}
