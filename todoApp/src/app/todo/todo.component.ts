import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getToDoList().snapshotChanges().subscribe(item => {
      this.toDoListArray = [];
      item.forEach( element => {
        console.log('Element ---- ' + element);
        const toDoElemani = element.payload.toJSON();
        toDoElemani['$key'] = element.key;
        console.log('toDoElemani ----- ' + toDoElemani);
        this.toDoListArray.push(toDoElemani);
      });

      this.toDoListArray.sort((a, b) => a.isChecked - b.isChecked);
    });
  }

  alterCheck($key: any, isChecked: any) {
    this.todoService.checkOrUncheckTodo($key, !isChecked);
  }

  onDelete($key: any) {
    this.todoService.remoteTodo($key);
  }

  onAdd(itemTitle) {
    this.todoService.addTodo(itemTitle.value);
    itemTitle.value = null;
  }
}
