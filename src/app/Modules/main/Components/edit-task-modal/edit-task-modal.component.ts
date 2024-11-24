import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [FormsModule, NgbModalModule],
  styleUrl: './edit-task-modal.component.scss',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Add New Task</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <form (ngSubmit)="submitForm()" #taskForm="ngForm">
        <div class="mb-3">
          <label for="taskTitle" class="form-label">Title</label>
          <input
            type="text"
            id="taskTitle"
            class="form-control"
            [(ngModel)]="task.title"
            name="title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="taskDescription" class="form-label">Description</label>
          <textarea
            id="taskDescription"
            class="form-control"
            [(ngModel)]="task.description"
            name="description"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="taskStatus" class="form-label">Status</label>
          <select
            id="taskStatus"
            class="form-select"
            [(ngModel)]="task.status"
            name="status"
            required
          >
            <option *ngFor="let status of statusOptions" [value]="status">
              {{ status }}
            </option>
          </select>
        </div>
        <div class="text-end">
          <button
            type="button"
            class="btn btn-secondary me-2"
            (click)="activeModal.dismiss()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="taskForm.invalid"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  `,
})
export class EditTaskModalComponent {
  @Output() taskAdded = new EventEmitter<any>();

  task = {
    title: '',
    description: '',
    status: 'Pending',
  };

  statusOptions = ['Pending', 'In Progress', 'Completed'];

  constructor(public activeModal: NgbActiveModal) {}

  submitForm() {
    if (this.task.title && this.task.description) {
      this.taskAdded.emit(this.task);
      this.activeModal.close();
    }
  }
}
