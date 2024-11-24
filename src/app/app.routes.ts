import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: 'task-create',
    component: TaskFormComponent,
    data: { mode: 'create' },
  },
  {
    path: 'task-edit/:id',
    component: TaskFormComponent,
    data: { mode: 'edit' },
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
