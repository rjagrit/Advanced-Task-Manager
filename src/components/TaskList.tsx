import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { CheckCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskList({ tasks, onUpdate, onDelete, onToggleComplete }: TaskListProps) {
  const visibleTasks = tasks.filter(task => !task.style?.isHidden);

  if (visibleTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Add a new task to get started or adjust your search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}