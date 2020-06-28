export interface ITeam {
  teamId: number;
  teamName: string;
  teamShortName: string;
}

export interface IMatch {
  homeScore: number;
  awayScore: number;
  homeId: number;
  awayId: number;
}

export enum PresetQueries {
  Top6,
  Big6,
  Bottom6,
  TopHalf,
  BottomHalf,
  TopHalfVsBottom,
  BottomHalfVsTop,
  All,
  Custom,
}

export interface IQueryMap {
  visible: number[];
  results: number[];
}

export type ResultMap = Partial<Record<PresetQueries, IQueryMap>>;
