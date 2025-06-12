import React, { useState } from 'react';
import { Priority } from '../types';
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (name: string, priority: Priority) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [step, setStep] = useState(1);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const [error, setError] = useState('');

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = taskName.trim();
    
    if (!trimmedName) {
      setError('Task name cannot be empty');
      return;
    }
    
    setError('');
    setStep(2);
  };

  const handlePrioritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(taskName, priority);
    setTaskName('');
    setPriority(Priority.MEDIUM);
    setStep(1);
  };

  const resetForm = () => {
    setStep(1);
    setTaskName('');
    setError('');
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-red-100 border-red-300 text-red-800';
      case Priority.MEDIUM: return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case Priority.LOW: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          Add New Task
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`w-6 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                setError('');
              }}
              placeholder="Enter task name..."
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         ${error ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-300'}`}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                     transition-all duration-200 flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handlePrioritySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Priority
            </label>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(Priority).map((p) => (
                <label key={p} className="cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={priority === p}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg transition-all duration-200
                                  ${priority === p 
                                    ? `${getPriorityColor(p)} ring-2 ring-offset-2 ring-blue-500` 
                                    : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{p} Priority</span>
                      <div className={`w-4 h-4 rounded-full border-2 
                                      ${priority === p ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                        {priority === p && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg 
                       hover:bg-gray-200 transition-all duration-200 
                       flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg 
                       hover:bg-blue-700 transition-all duration-200 
                       flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}