import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BoardSummary } from '../models/board.model';

@Injectable()
export class BoardService {
  boards: BoardSummary[];
  url = environment.serviceUrl + '/boards';

  constructor(private http: HttpClient) {}

  public getBoards(): Observable<BoardSummary[]> {
    return this.http.get<BoardSummary[]>(this.url).pipe(
      map(res => this.boards = res)
    );
  }

  public addBoard(boardName: string): Observable<BoardSummary[]> {
    return this.http.post<BoardSummary>(this.url, { name: boardName }).pipe(
      map(res => this.boards = this.boards.concat(res))
    );
  }
}
