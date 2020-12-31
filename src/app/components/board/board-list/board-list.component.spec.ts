import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BoardService } from 'src/app/services/board.service';
import { environment } from 'src/environments/environment';
import { UserListComponent } from '../../user/user-list/user-list.component';
import { BoardDetailComponent } from '../board-detail/board-detail.component';

import { BoardListComponent } from './board-list.component';

describe('BoardListComponent', () => {
  let component: BoardListComponent;
  let fixture: ComponentFixture<BoardListComponent>;
  let httpClient: HttpClient;

  const boards = [{ _id: 1, name: 'board_1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardListComponent ],
      imports: [ HttpClientModule, ReactiveFormsModule, RouterTestingModule ],
      providers: [ BoardService ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    const mock = spyOn(httpClient, 'get').and.returnValue(of([]));

    fixture.detectChanges();
    expect(component).toBeTruthy();

    const result = await component.boards$.toPromise();
    expect(result).toEqual([]);
    expect(mock).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/boards`);
  });

  it('should add board properly', async () => {
    const mockGet = spyOn(httpClient, 'get').and.returnValue(of([]));
    const mockPost = spyOn(httpClient, 'post').and.returnValue(of(boards[0]));

    fixture.detectChanges();

    let result = await component.boards$.toPromise();
    expect(result).toEqual([]);
    expect(mockGet).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/boards`);

    const form = { name: 'board_1' };
    component.boardForm.setValue(form);
    component.addBoard();

    result = await component.boards$.toPromise();
    expect(result).toEqual(boards);
    expect(mockPost).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/boards`, form);
  });
});
