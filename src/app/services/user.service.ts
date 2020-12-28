import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  url = environment.serviceUrl + '/users';
  users: UserInfo[] = [];

  public getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.url).pipe(
      map(res => this.users = res)
    );
  }

  public addUser(user: UserInfo): Observable<UserInfo[]> {
    return this.http.post<UserInfo>(this.url, user).pipe(map(res => this.users = this.users.concat(res)));
  }
}
