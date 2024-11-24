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
  templateUrl: './edit-task-modal.component.html',
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
