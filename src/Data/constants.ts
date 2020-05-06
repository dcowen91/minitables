import { PresetQueries } from "../App.types";

const top6 = [5, 8, 9, 10, 11, 14];
const big6 = [0, 5, 9, 10, 11, 16];
const bottom6 = [1, 2, 3, 13, 17, 18];
const tophalf = [...top6, 0, 4, 16, 19];
const bottomhalf = [...bottom6, 6, 7, 12, 15];
const all = [...tophalf, ...bottomhalf];

interface IQueryMap {
  visible: number[];
  results: number[];
}

export const PresetQueryDataMap: Partial<Record<PresetQueries, IQueryMap>> = {
  [PresetQueries.Top6]: { visible: top6, results: top6 },
  [PresetQueries.Big6]: { visible: big6, results: big6 },
  [PresetQueries.Bottom6]: { visible: bottom6, results: bottom6 },
  [PresetQueries.TopHalf]: { visible: tophalf, results: tophalf },
  [PresetQueries.BottomHalf]: { visible: bottomhalf, results: bottomhalf },
  [PresetQueries.TopHalfVsBottom]: { visible: tophalf, results: bottomhalf },
  [PresetQueries.BottomHalfVsTop]: { visible: bottomhalf, results: tophalf },
  [PresetQueries.All]: { visible: all, results: all },
};
