import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Mode, StatusList, Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  mode: Mode = 'create';
  taskId: string | null = null;

  statusList: StatusList[] = [
    { name: 'Pending', value: 'Pending' },
    { name: 'In Progress', value: 'In Progress' },
    { name: 'Completed', value: 'Completed' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeMode();
    this.initializeForm();

    if (this.mode === 'edit' && this.taskId) {
      this.loadTask();
    }
  }

  onSubmit(): void {
    const formValue = this.taskForm.getRawValue();

    if (this.mode === 'edit' && this.taskId) {
      this.taskService.updateTask({ ...formValue, id: this.taskId });
    } else {
      this.taskService.addTask(formValue);
    }
    this.router.navigate(['/']);
  }

  get isTaskNameValid(): boolean {
    const control = this.taskForm.get('taskName');
    return !!(control?.invalid && control.touched);
  }

  get isDescriptionValid(): boolean {
    const control = this.taskForm.get('description');
    return !!(control?.invalid && control.touched);
  }

  get isCreateMode(): boolean {
    return this.mode === 'create';
  }

  private initializeMode(): void {
    this.mode = this.route.snapshot.data['mode'];
    this.taskId = this.route.snapshot.paramMap.get('id');
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: [
        { value: 'Pending', disabled: this.mode === 'create' },
        Validators.required,
      ],
    });
  }

  private loadTask(): void {
    const task = this.taskService.getTask(this.taskId!);
    if (!task) {
      this.router.navigate(['/']);
      return;
    }
    this.taskForm.patchValue({
      taskName: task.taskName,
      description: task.description,
      status: task.status,
    });
  }
}
