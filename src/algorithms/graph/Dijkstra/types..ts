export type StepType =
  | "start"
  | "visit"
  | "relax"
  | "update"
  | "complete";

export interface DijkstraStep {
  type: StepType;

  current?: string;

  neighbor?: string;

  edgeWeight?: number;

  oldDistance?: number;

  newDistance?: number;

  distances: Map<string, number>;

  previous: Map<string, string | null>;

  visited: Set<string>;
}

export interface DijkstraResult {
  distances: Map<string, number>;

  previous: Map<string, string | null>;

  steps: DijkstraStep[];
}