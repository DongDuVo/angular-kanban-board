import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { TaskInfo, TaskStatus } from 'src/app/models/task.model';
import { UserInfo } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input()
  tasks: TaskInfo[];

  @Input()
  title: TaskStatus;

  @Input()
  users: UserInfo[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  updateTaskStatus(event: CdkDragDrop<TaskInfo[]>): void {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      this.taskService.updateTaskStatus({ id: task._id, status: this.title }).toPromise().then(res => {
        task.status = res.status;
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      });
    }
  }

}
