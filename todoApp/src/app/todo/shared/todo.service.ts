import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(){
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  addTodo(title: string) {
    this.toDoList.push({
      title,
      isChecked: false
    });
  }

  checkOrUncheckTodo($key: string, flag: boolean){
    this.toDoList.update($key, { isChecked: flag});
  }

  remoteTodo($key: string){
    this.toDoList.remove($key);
  }
}
