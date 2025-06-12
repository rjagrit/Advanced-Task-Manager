import { useState, useEffect } from 'react';
import { Rule, Task, RuleConflict } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { evaluateRule, detectConflicts } from '../utils/ruleEngine';

export function useRules(tasks: Task[]) {
  const [rules, setRules] = useLocalStorage<Rule[]>('rules', []);
  const [conflicts, setConflicts] = useState<RuleConflict[]>([]);

  const addRule = (rule: Omit<Rule, 'id' | 'createdAt'>) => {
    const newRule: Rule = {
      ...rule,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setRules(prev => [...prev, newRule]);
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const toggleRule = (id: string) => {
    updateRule(id, { isActive: !rules.find(r => r.id === id)?.isActive });
  };

  // Detect conflicts when rules or tasks change
  useEffect(() => {
    const activeRules = rules.filter(rule => rule.isActive);
    const tasksWithStyles = tasks.map(task => ({ ...task, style: {} }));
    const newConflicts = detectConflicts(tasksWithStyles, activeRules);
    setConflicts(newConflicts);
  }, [rules, tasks]);

  // Apply rules to tasks (pure function - no state updates)
  const applyRulesToTasks = (tasks: Task[]): Task[] => {
    const activeRules = rules.filter(rule => rule.isActive);
    const tasksWithStyles = tasks.map(task => ({ ...task, style: {} }));

    // Apply rules
    return tasksWithStyles.map(task => {
      const applicableRules = activeRules.filter(rule => 
        evaluateRule(rule, task, tasks)
      );

      const combinedStyle = applicableRules.reduce((style, rule) => {
        switch (rule.action.type) {
          case 'highlight':
            return { ...style, isHighlighted: true, backgroundColor: '#FEF3C7' };
          case 'hide':
            return { ...style, isHidden: true };
          case 'changeColor':
            return { ...style, textColor: rule.action.color };
          case 'moveToTop':
            return { ...style, order: -1 };
          default:
            return style;
        }
      }, task.style || {});

      return { ...task, style: combinedStyle };
    }).sort((a, b) => (a.style?.order || 0) - (b.style?.order || 0));
  };

  return {
    rules,
    conflicts,
    addRule,
    updateRule,
    deleteRule,
    toggleRule,
    applyRulesToTasks,
  };
}