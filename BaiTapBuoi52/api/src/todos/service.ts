import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Học NestJS Provider', completed: false },
    { id: 2, title: 'Làm bài tập thực hành', completed: false },
  ];
  findAll ():Todo[]{
    return this.todos
  }
}
