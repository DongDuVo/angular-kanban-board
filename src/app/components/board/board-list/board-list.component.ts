import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BoardSummary } from 'src/app/models/board.model';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  title = 'Board Management';
  pattern = /^[\w\d _-]+$/;
  boards$: Observable<BoardSummary[]>;
  boardForm: FormGroup;

  constructor(private boardService: BoardService, private fb: FormBuilder) {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.pattern)]]
    });
  }

  ngOnInit(): void {
    this.boards$ = this.boardService.getBoards();
  }

  addBoard(): void {
    this.boards$ = this.boardService.addBoard(this.boardForm.value.name);
    this.boardForm.reset();
  }

  get boardName(): AbstractControl {
    return this.boardForm.get('name');
  }
}
