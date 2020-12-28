import { SelectionChange } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskInfo } from 'src/app/models/task.model';
import { UserInfo } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input()
  task: TaskInfo;

  @Input()
  users: UserInfo[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  }

  updateTask(event$: any): void {
    const assignee = event$.target.value;
    this.taskService.updateTaskAssignee({ id: this.task._id, assignee }).toPromise().then(res => this.task = res);
  }

}
