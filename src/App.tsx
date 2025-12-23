import { useState } from 'react';
import './App.css';
import './index.css';
import { TaskItem } from './components/TaskItem';
import type { Task } from './types';
import { Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateTask() {
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskText.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskText('');
  }

  function handleToggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const tasksCreated = tasks.length;
  const tasksCompleted = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-logo">
          <span>todo</span>
        </div>
      </header>

      <main className="app-main">
        <div className="todo-form">
          <input
            className="todo-input"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
          />
          <button className="todo-button" onClick={handleCreateTask}>
            Criar
            <Plus size={16} />
          </button>
        </div>

        <div className="todo-header">
          <div className="todo-header-group">
            <span className="todo-header-label-created">Tarefas criadas</span>
            <span className="todo-header-badge">{tasksCreated}</span>
          </div>

          <div className="todo-header-group">
            <span className="todo-header-label-done">Concluídas</span>
            <span className="todo-header-badge">
              {tasksCreated === 0
                ? 0
                : `${tasksCompleted} de ${tasksCreated}`}
            </span>
          </div>
        </div>

        <section className="todo-list-container">
          {tasks.length === 0 ? (
            <div className="todo-empty">
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : (
            <ul className="todo-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
