export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'progress' | 'done';
}
