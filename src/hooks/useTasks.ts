import { useState, useEffect } from 'react';
import { Task, Priority } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (name: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: name.trim(),
      priority,
      createdAt: new Date(),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    tasks,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    setTasks,
  };
}