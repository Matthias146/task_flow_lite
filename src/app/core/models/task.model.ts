export interface Task {
  id: number;
  title: string;
  done: boolean;
  description?: string;
}

export type Filter = 'all' | 'open' | 'done';
