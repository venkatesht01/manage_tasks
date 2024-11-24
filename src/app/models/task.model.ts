export type Task = {
  taskName: string;
  description: string;
  status: 'pending' | 'in progress' | 'completed';
  id?: string;
};

export type StatusList = {
  name: string;
  value: string;
};

export type Mode = 'create' | 'edit';
