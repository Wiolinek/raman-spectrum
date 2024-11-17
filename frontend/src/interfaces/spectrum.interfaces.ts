export interface DataPoint {
  x: number;
  y: number;
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
  datasets: Dataset[];
  createdAt: string;
}