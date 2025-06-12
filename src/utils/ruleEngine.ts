import { Rule, Task, RuleConflict, Priority } from '../types';

export function evaluateRule(rule: Rule, task: Task, allTasks: Task[]): boolean {
  const { condition } = rule;
  
  switch (condition.field) {
    case 'name':
      return evaluateStringCondition(task.name, condition.operator, condition.value as string);
    
    case 'priority':
      return task.priority === condition.value;
    
    case 'completed':
      return task.completed === (condition.value === 'true');
    
    case 'count':
      const count = allTasks.filter(t => 
        condition.targetPriority ? t.priority === condition.targetPriority : true
      ).length;
      return evaluateNumberCondition(count, condition.operator, condition.value as number);
    
    default:
      return false;
  }
}

function evaluateStringCondition(value: string, operator: string, target: string): boolean {
  const lowerValue = value.toLowerCase();
  const lowerTarget = target.toLowerCase();
  
  switch (operator) {
    case 'contains':
      return lowerValue.includes(lowerTarget);
    case 'equals':
      return lowerValue === lowerTarget;
    case 'startsWith':
      return lowerValue.startsWith(lowerTarget);
    case 'endsWith':
      return lowerValue.endsWith(lowerTarget);
    default:
      return false;
  }
}

function evaluateNumberCondition(value: number, operator: string, target: number): boolean {
  switch (operator) {
    case 'greaterThan':
      return value > target;
    case 'lessThan':
      return value < target;
    case 'equals':
      return value === target;
    default:
      return false;
  }
}

export function detectConflicts(tasks: Task[], rules: Rule[]): RuleConflict[] {
  const conflicts: RuleConflict[] = [];
  
  tasks.forEach(task => {
    const applicableRules = rules.filter(rule => evaluateRule(rule, task, tasks));
    
    // Check for visibility conflicts (hide vs highlight)
    const hideRules = applicableRules.filter(r => r.action.type === 'hide');
    const visibilityRules = applicableRules.filter(r => 
      ['highlight', 'changeColor', 'moveToTop'].includes(r.action.type)
    );
    
    if (hideRules.length > 0 && visibilityRules.length > 0) {
      conflicts.push({
        taskId: task.id,
        conflictingRules: [...hideRules, ...visibilityRules],
        conflictType: 'visibility'
      });
    }
    
    // Check for styling conflicts (multiple color changes)
    const colorRules = applicableRules.filter(r => 
      ['highlight', 'changeColor'].includes(r.action.type)
    );
    
    if (colorRules.length > 1) {
      conflicts.push({
        taskId: task.id,
        conflictingRules: colorRules,
        conflictType: 'styling'
      });
    }
  });
  
  return conflicts;
}