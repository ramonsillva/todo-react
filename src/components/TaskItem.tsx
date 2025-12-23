import type { Task } from '../types';
import { Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="task-item">
      <button
        className={`task-check ${task.completed ? 'task-check--checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label="Concluir tarefa"
      >
        {task.completed && <span className="task-check-inner" />}
      </button>

      <span
        className={`task-text ${
          task.completed ? 'task-text--completed' : ''
        }`}
      >
        {task.title}
      </span>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        aria-label="Excluir tarefa"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}
