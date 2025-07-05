import { Routes } from '@angular/router';
import { TaskListPage } from './features/tasks/pages/task-list/task-list.page';
import { TaskDetailPage } from './features/tasks/pages/task-detail/task-detail.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TaskListPage,
  },
  {
    path: 'tasks/:id',
    component: TaskDetailPage,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
