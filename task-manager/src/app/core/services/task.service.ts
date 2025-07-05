import { Injectable } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { randomUUID } from 'crypto';

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks$ = new BehaviorSubject<Task[]>(this.loadFromStorage());

  constructor() {}

  get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  getAll(): Task[] {
    return this._tasks$.getValue();
  }

  getById(id: string): Task | undefined {
    return this.getAll().find((task) => task.id === id);
  }

  add(taskData: { title: string; description?: string }): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: 'pending',
      createdAt: new Date(),
    };

    const updated = [...this.getAll(), newTask];
    this._tasks$.next(updated);
    this.saveToStorage(updated);
  }

  delete(id: string): void {
    const updated = this.getAll().filter((task) => task.id !== id);
    this._tasks$.next(updated);
    this.saveToStorage(updated);
  }

  toggleStatus(id: string): void {
    const updated = this.getAll().map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === 'pending' ? 'completed' : 'pending',
          }
        : task
    ) as Task[];

    this._tasks$.next(updated);
    this.saveToStorage(updated);
  }

  private loadFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return parsed.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    } catch {
      return [];
    }
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}
