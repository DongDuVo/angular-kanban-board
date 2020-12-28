import { BoardSummary } from './board.model';
import { UserInfo } from './user.model';

export interface TaskInfo {
  joined: UserInfo[];
  _id: string;
  title: string;
  status: TaskStatus;
  board: BoardSummary;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  TODO, IN_PROGRESS, DONE
}
