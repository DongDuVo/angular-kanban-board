import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskInfo, TaskStatus } from 'src/app/models/task.model';
import { UserInfo } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  tasks$: Observable<TaskInfo[]>;
  pattern = /^[\w\d _-]+$/;
  taskForm: FormGroup;
  boardId = '';
  boardName = '';
  users$: Observable<UserInfo[]>;
  status = Object.values(TaskStatus).filter(value => typeof value === 'string');

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {
      this.taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.pattern(this.pattern)]]
      });
      this.boardName = this.activatedRoute.snapshot.params.name;
      this.boardId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.tasks$ = this.taskService.getTasks(this.boardId);
  }

  addTask(): void {
    this.tasks$ = this.taskService.addTask({ board: this.boardId, title: this.taskTitle.value });
    this.taskForm.reset();
  }

  get taskTitle(): AbstractControl {
    return this.taskForm.get('title');
  }
}
