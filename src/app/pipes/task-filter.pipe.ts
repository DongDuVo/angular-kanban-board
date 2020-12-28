import { Pipe, PipeTransform } from '@angular/core';
import { TaskInfo, TaskStatus } from '../models/task.model';

@Pipe({ name: 'taskFilterByStatus' })
export class TaskFilterByStatus implements PipeTransform {
  transform(value: TaskInfo[], status: TaskStatus): TaskInfo[] {
    if (value === null || value === undefined) {
      return [];
    }
    return value.filter(t => t.status === status);
  }
}
