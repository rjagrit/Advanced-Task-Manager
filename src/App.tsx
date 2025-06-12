import React from 'react';
import { useTasks } from './hooks/useTasks';
import { useRules } from './hooks/useRules';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import RuleBuilder from './components/RuleBuilder';
import { AlertTriangle, ListTodo, Sparkles } from 'lucide-react';

function App() {
  const {
    tasks,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks();

  const {
    rules,
    conflicts,
    addRule,
    updateRule,
    deleteRule,
    toggleRule,
    applyRulesToTasks,
  } = useRules(filteredTasks);

  // Apply rules to filtered tasks
  const processedTasks = applyRulesToTasks(filteredTasks);

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High' && !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <ListTodo className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Task Tracker Pro
            </h1>
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg">
            Advanced task management with intelligent automation rules
          </p>
        </header>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <ListTodo className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityTasks}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm onAddTask={addTask} />

        {/* Rule Builder */}
        <div className="mb-8">
          <RuleBuilder
            rules={rules}
            conflicts={conflicts}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
            onToggleRule={toggleRule}
          />
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            <span className="text-sm text-gray-500">
              {processedTasks.filter(t => !t.style?.isHidden).length} of {totalTasks} tasks
            </span>
          </div>
          <TaskList
            tasks={processedTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>

        {/* Conflicts Warning */}
        {conflicts.length > 0 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium text-amber-800">Rule Conflicts Detected</h3>
            </div>
            <p className="text-sm text-amber-700">
              Some rules have conflicting actions. Tasks may not appear as expected. 
              Review your rules to resolve conflicts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;