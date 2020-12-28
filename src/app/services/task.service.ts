import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TaskInfo, TaskStatus } from '../models/task.model';

@Injectable()
export class TaskService {
  url = environment.serviceUrl + '/tasks';
  tasks: TaskInfo[];

  constructor(private http: HttpClient) {}

  public getTasks(boardId: string): Observable<TaskInfo[]> {
    return this.http.get<TaskInfo[]>(this.url, { params: { boardId } }).pipe(
      map(res => this.tasks = res)
    );
  }

  public addTask({ title, board }): Observable<TaskInfo[]> {
    return this.http.post<TaskInfo>(this.url, { title, board, status: TaskStatus[TaskStatus.TODO] }).pipe(
      map(res => this.tasks = this.tasks.concat(res))
    );
  }

  public updateTaskAssignee({ id, assignee }): Observable<TaskInfo> {
    return this.http.put<any>(`${this.url}/${id}`, { joined: assignee === 'unassigned' ? [] : [assignee] }).pipe(
      map(res => {
        const task = this.tasks.find(t => t._id === res._id);
        task.joined[0]._id = res.joined[0];
        return task;
      })
    );
  }

  public updateTaskStatus({ id, status }): Observable<TaskInfo> {
    return this.http.put<any>(`${this.url}/${id}`, { status }).pipe(
      map(res => {
        const task = this.tasks.find(t => t._id === res._id);
        task.status = res.status;
        return task;
      })
    );
  }
}
