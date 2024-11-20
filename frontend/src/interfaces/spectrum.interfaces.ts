import { ChartType } from "./chartType.enum";
import { CreateDatasetOperationType, DatasetOperationType } from "./operationType.enum";

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
  operations?: {
    type: CreateDatasetOperationType | DatasetOperationType;
    constant: 2
  }
}

export interface Spectrum {
  id: string;
  name: string;
  xAxisName: Axis.X;
  yAxisName: Axis.Y;
  chartType: ChartType;
  datasets: Dataset[];
  createdAt: string;
}