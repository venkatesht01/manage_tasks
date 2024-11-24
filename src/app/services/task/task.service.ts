import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() {}

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.localStorageKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  getTask(id: string): Task | null {
    const task = this.getTasks().find((task) => task.id == id) ?? null;
    return task;
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    const id = crypto.randomUUID();
    tasks.push({ ...task, id });
    this.saveTasks(tasks);
  }

  updateTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.id == task.id);
    tasks[index] = task;
    this.saveTasks(tasks);
  }

  deleteTask(tasks: string | Task[]): void {
    let currentTasks = this.getTasks();
    if (typeof tasks === 'string') {
      tasks = [{ id: tasks }] as Task[];
    }
    currentTasks = currentTasks.filter(
      (task) => !tasks.some((t) => t.id === task.id)
    );
    this.saveTasks(currentTasks);
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
