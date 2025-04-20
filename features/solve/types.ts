export interface SolveProblem {
  id: string;
  folderId: string;
  problem: string;
  solution: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SolveHistory {
  id: string;
  userId: string;
  problems: SolveProblem[];
}
