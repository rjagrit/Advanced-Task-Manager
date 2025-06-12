import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { Edit2, Trash2, Check, X, Save } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete, onToggleComplete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editPriority, setEditPriority] = useState(task.priority);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH: return 'bg-red-100 text-red-800 border-red-200';
      case Priority.MEDIUM: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case Priority.LOW: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const handleSave = () => {
    if (editName.trim()) {
      onUpdate(task.id, { name: editName.trim(), priority: editPriority });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(task.name);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  if (task.style?.isHidden) {
    return null;
  }

  const cardStyle = {
    backgroundColor: task.style?.backgroundColor,
    color: task.style?.textColor,
    borderColor: task.style?.borderColor,
  };

  return (
    <div 
      className={`bg-white rounded-lg border shadow-sm p-4 transition-all duration-200 hover:shadow-md
                  ${task.completed ? 'opacity-75' : ''}
                  ${task.style?.isHighlighted ? 'ring-2 ring-yellow-400' : ''}`}
      style={cardStyle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                       ${task.completed 
                         ? 'bg-green-500 border-green-500 text-white' 
                         : 'border-gray-300 hover:border-green-400'}`}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>
          
          {isEditing ? (
            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(Priority).map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                {task.name}
              </h3>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border mt-1 ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
                disabled={!editName.trim()}
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}