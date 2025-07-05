import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../shared/models/task.model';
import { TaskItemComponent } from '../../../../shared/components/task-item/task-item.component';
import { TaskFormComponent } from '../../forms/task-form/task-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatButtonToggleGroup,
  MatButtonToggle,
} from '@angular/material/button-toggle';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TaskFormComponent,
    TaskItemComponent,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './task-list.page.html',
  styleUrl: './task-list.page.scss',
})
export class TaskListPage {
  private filterSubject = new BehaviorSubject<'all' | 'completed' | 'pending'>(
    'all'
  );

  filter$ = this.filterSubject.asObservable();

  tasks$: Observable<Task[]>;

  // Отфильтрованные задачи
  filteredTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks$ = this.taskService.tasks$;
    this.filteredTasks$ = combineLatest([this.tasks$, this.filter$]).pipe(
      map(([tasks, filter]) => {
        switch (filter) {
          case 'completed':
            return tasks.filter((t) => t.status === 'completed');
          case 'pending':
            return tasks.filter((t) => t.status !== 'completed');
          default:
            return tasks;
        }
      })
    );
  }

  onTaskCreated(data: { title: string; description?: string }) {
    this.taskService.add(data);
  }

  deleteTask(id: string) {
    this.taskService.delete(id);
  }

  toggleStatus(id: string) {
    this.taskService.toggleStatus(id);
  }

  viewTask(id: string) {
    this.router.navigate(['/tasks', id]);
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filterSubject.next(filter);
  }
}
