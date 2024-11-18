export interface DataPoint {
  x: number;
  y: number;
}

export enum Axis {
  X = 'xAxisName',
  Y = 'yAxisName',
}

export interface Dataset {
  id: string;
  name: string;
  data: DataPoint[];
  color: string;
}

export interface Spectrum {
  id: string;
  name: string;
  xAxisName: Axis.X;
  yAxisName: Axis.Y;
  datasets: Dataset[];
  createdAt: string;
}