import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

import { UserListComponent } from '../user-list.component';
import { users } from './data.test';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [ UserService ]
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const mock = spyOn(httpClient, 'get').and.returnValue(of(users));
    fixture.detectChanges();

    expect(component).toBeTruthy();

    component.userInfos$.forEach(res => {
      expect(res).toEqual(users);
    });
    expect(mock).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/users`);
  });

  it('should add user properly', async () => {
    const mockGet = spyOn(httpClient, 'get').and.returnValue(of([]));
    const mockPost = spyOn(httpClient, 'post').and.returnValue(of(users[0]));
    fixture.detectChanges();

    const res = await component.userInfos$.toPromise();
    expect(res).toEqual([]);

    const form = { firstname: 'du', lastname: 'vo' };
    component.userForm.setValue(form);
    component.addUser();

    component.userInfos$.forEach(result => {
      expect(result).toEqual(users);
    });
    expect(mockGet).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/users`);
    expect(mockPost).toHaveBeenNthCalledWith(1, `${environment.serviceUrl}/users`, form);
  });
});
