export interface Task {
  id: string;
  name: string;
  priority: Priority;
  createdAt: Date;
  completed: boolean;
  style?: TaskStyle;
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface TaskStyle {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  isHidden?: boolean;
  isHighlighted?: boolean;
  order?: number;
}

export interface Rule {
  id: string;
  name: string;
  condition: RuleCondition;
  action: RuleAction;
  isActive: boolean;
  createdAt: Date;
}

export interface RuleCondition {
  field: 'name' | 'priority' | 'completed' | 'count';
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: string | number;
  targetPriority?: Priority;
}

export interface RuleAction {
  type: 'highlight' | 'hide' | 'moveToTop' | 'changeColor' | 'showWarning';
  value?: string;
  color?: string;
  message?: string;
}

export interface RuleConflict {
  taskId: string;
  conflictingRules: Rule[];
  conflictType: 'visibility' | 'styling' | 'positioning';
}