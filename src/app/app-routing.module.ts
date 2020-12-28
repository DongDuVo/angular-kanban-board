import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardDetailComponent } from './components/board/board-detail/board-detail.component';
import { BoardListComponent } from './components/board/board-list/board-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: BoardListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'board/:name', component: BoardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
