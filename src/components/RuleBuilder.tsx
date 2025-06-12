import React, { useState } from 'react';
import { Rule, RuleCondition, RuleAction, Priority } from '../types';
import { Plus, Settings, ToggleLeft, ToggleRight, Trash2, AlertTriangle } from 'lucide-react';

interface RuleBuilderProps {
  rules: Rule[];
  onAddRule: (rule: Omit<Rule, 'id' | 'createdAt'>) => void;
  onUpdateRule: (id: string, updates: Partial<Rule>) => void;
  onDeleteRule: (id: string) => void;
  onToggleRule: (id: string) => void;
  conflicts: any[];
}

export default function RuleBuilder({ 
  rules, 
  onAddRule, 
  onUpdateRule, 
  onDeleteRule, 
  onToggleRule,
  conflicts 
}: RuleBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [condition, setCondition] = useState<RuleCondition>({
    field: 'name',
    operator: 'contains',
    value: ''
  });
  const [action, setAction] = useState<RuleAction>({
    type: 'highlight'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim() || !condition.value) return;

    onAddRule({
      name: ruleName,
      condition,
      action,
      isActive: true
    });

    // Reset form
    setRuleName('');
    setCondition({ field: 'name', operator: 'contains', value: '' });
    setAction({ type: 'highlight' });
    setShowForm(false);
  };

  const getActionDisplay = (action: RuleAction) => {
    switch (action.type) {
      case 'highlight': return 'Highlight task';
      case 'hide': return 'Hide task';
      case 'moveToTop': return 'Move to top';
      case 'changeColor': return `Change color to ${action.color}`;
      default: return action.type;
    }
  };

  const getConditionDisplay = (condition: RuleCondition) => {
    const fieldDisplay = {
      name: 'Task name',
      priority: 'Priority',
      completed: 'Completion status',
      count: 'Task count'
    }[condition.field];

    const operatorDisplay = {
      contains: 'contains',
      equals: 'equals',
      startsWith: 'starts with',
      endsWith: 'ends with',
      greaterThan: 'greater than',
      lessThan: 'less than'
    }[condition.operator];

    let valueDisplay = condition.value;
    if (condition.field === 'completed') {
      valueDisplay = condition.value === 'true' ? 'Completed' : 'Not Completed';
    }

    return `${fieldDisplay} ${operatorDisplay} "${valueDisplay}"`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Rule Builder</h2>
              <p className="text-gray-600 text-sm">Create custom automation rules for your tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {conflicts.length > 0 && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">{conflicts.length} conflicts</span>
              </div>
            )}
            <span className="text-gray-400 text-sm">{rules.length} rules</span>
            <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {/* Existing Rules */}
          <div className="space-y-3 mb-6">
            {rules.map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    If {getConditionDisplay(rule.condition)}, then {getActionDisplay(rule.action)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleRule(rule.id)}
                    className={`p-1 rounded transition-colors duration-200 ${
                      rule.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {rule.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => onDeleteRule(rule.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Rule */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg 
                       text-gray-600 hover:border-purple-400 hover:text-purple-600 
                       transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add New Rule
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="Enter rule name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Field</label>
                  <select
                    value={condition.field}
                    onChange={(e) => setCondition(prev => ({ 
                      ...prev, 
                      field: e.target.value as any,
                      // Reset value when field changes
                      value: e.target.value === 'completed' ? 'true' : 
                             e.target.value === 'priority' ? Priority.HIGH : ''
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="name">Task Name</option>
                    <option value="priority">Priority</option>
                    <option value="completed">Completed</option>
                    <option value="count">Task Count</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={condition.operator}
                    onChange={(e) => setCondition(prev => ({ ...prev, operator: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {condition.field === 'name' && (
                      <>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="startsWith">Starts with</option>
                        <option value="endsWith">Ends with</option>
                      </>
                    )}
                    {condition.field === 'count' && (
                      <>
                        <option value="greaterThan">Greater than</option>
                        <option value="lessThan">Less than</option>
                        <option value="equals">Equals</option>
                      </>
                    )}
                    {(condition.field === 'priority' || condition.field === 'completed') && (
                      <option value="equals">Equals</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  {condition.field === 'priority' ? (
                    <select
                      value={condition.value}
                      onChange={(e) => setCondition(prev => ({ ...prev, value: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {Object.values(Priority).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  ) : condition.field === 'completed' ? (
                    <select
                      value={condition.value}
                      onChange={(e) => setCondition(prev => ({ ...prev, value: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="true">Completed</option>
                      <option value="false">Not Completed</option>
                    </select>
                  ) : (
                    <input
                      type={condition.field === 'count' ? 'number' : 'text'}
                      value={condition.value}
                      onChange={(e) => setCondition(prev => ({ ...prev, value: condition.field === 'count' ? Number(e.target.value) : e.target.value }))}
                      placeholder={condition.field === 'count' ? '0' : 'Enter value...'}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <select
                  value={action.type}
                  onChange={(e) => setAction({ type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="highlight">Highlight task</option>
                  <option value="hide">Hide task</option>
                  <option value="moveToTop">Move to top</option>
                  <option value="changeColor">Change color</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded 
                           hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded 
                           hover:bg-purple-700 transition-colors duration-200"
                >
                  Add Rule
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}