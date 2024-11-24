import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Task } from '../../models/task.model';
import { SelectionModel } from '@angular/cdk/collections';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-list',
  imports: [MatButtonModule, RouterLink, MatTableModule, MatCheckboxModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'taskName', 'description', 'status'];
  dataSource = new MatTableDataSource<Task>();
  selection = new SelectionModel<Task>(true, []);

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.taskService.getTasks();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numRows > 0 && numSelected === numRows;
  }

  toggleAllRows(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.selection.select(...this.dataSource.data);
  }

  toggleSelection(row: Task): void {
    this.selection.toggle(row);
  }

  onRowClick(id: string): void {
    this.router.navigate([`/task-edit/${id}`]);
  }

  deleteSelectedTasks(): void {
    const selectedTasks = this.selection.selected;
    this.taskService.deleteTask(selectedTasks);
    this.selection.clear();
    this.dataSource.data = this.taskService.getTasks();
  }

  get isDeleteButtonDisabled(): boolean {
    return this.selection.selected.length === 0;
  }
}
