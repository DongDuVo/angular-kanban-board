import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  title = 'User Management';
  userInfos$: Observable<UserInfo[]>;
  userForm: FormGroup;

  constructor(private userSerivce: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userInfos$ = this.userSerivce.getUsers();
  }

  addUser(): void {
    this.userInfos$ = this.userSerivce.addUser({ ...this.userForm.value });
    this.userForm.reset();
  }

  get firstName(): AbstractControl {
    return this.userForm.get('firstname');
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastname');
  }

}
