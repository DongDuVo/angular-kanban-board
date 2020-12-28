import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardListComponent } from './components/board/board-list/board-list.component';
import { BoardDetailComponent } from './components/board/board-detail/board-detail.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardService } from './services/board.service';
import { TaskService } from './services/task.service';
import { TaskComponent } from './components/board/task/task.component';
import { TaskListComponent } from './components/board/task-list/task-list.component';
import { TaskFilterByStatus } from './pipes/task-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardListComponent,
    BoardDetailComponent,
    UserListComponent,
    TaskComponent,
    TaskListComponent,
    TaskFilterByStatus
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  providers: [UserService, BoardService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
