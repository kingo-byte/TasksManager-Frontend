import { Component, computed, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbDatepicker, NgbDateStruct, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskRequest, GetLookupByTableNamesRequest } from '../../../../Services/models/requests';
import { CommonService } from '../../../../Services/common.service';
import { Lookup, Task } from '../../../../Services/models/models';
import { TaskService } from '../../../../Services/task.service';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [FormsModule, NgbModalModule, NgbDatepickerModule],
  styleUrl: './edit-task-modal.component.scss',
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<Task>();
  decodedToken = computed(() => this.authService.decodedToken());

  // Bind all other Task fields normally
  task: Task = {
    id: -1,
    userId: parseInt(this.decodedToken()!['UserId']),
    title: '',
    description: '',
    statusCode: '',
    categoryCode: '',
    dueDate: '', // We'll keep the “string” type, but handle it properly
  };

  // Use a separate model for the datepicker
  dueDateModel: NgbDateStruct | undefined;

  statusOptions: Lookup[] = [];
  categoryOptions: Lookup[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public commonService: CommonService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1) Initialize dropdowns
    this.getLookupByTableNames();

    // 2) If task.dueDate is already set, parse it to an NgbDateStruct
    if (this.task.dueDate) {
      const existingDate = new Date(this.task.dueDate);
      this.dueDateModel = {
        year: existingDate.getFullYear(),
        month: existingDate.getMonth() + 1, 
        day: existingDate.getDate(),
      };
    }
  }

  submitForm() {
    // Validate all required fields
    if (this.task.title.trim() && this.task.description.trim() && this.task.statusCode && this.task.categoryCode) {
      this.editTask();
    }
  }

  getLookupByTableNames(): void {
    const getLookupByTableNamesRequest: GetLookupByTableNamesRequest = {
      tableNames: 'TaskStatus,TaskCategory',
    };

    this.commonService.getLookupByTableNames(getLookupByTableNamesRequest).subscribe({
      next: (response) => {
        this.statusOptions = response.lookups['TaskStatus'];
        this.categoryOptions = response.lookups['TaskCategory'];
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  editTask(): void {
    // 3) Convert the local NgbDateStruct to a real Date, then to ISO string
    if (this.dueDateModel) {
      const { year, month, day } = this.dueDateModel;
      this.task.dueDate = new Date(year, month - 1, day).toISOString();
    }

    const request: EditTaskRequest = {
      task: this.task,
    };

    this.taskService.editTask(request).subscribe({
      next: (response) => {
        this.taskAdded.emit(this.task);
        this.activeModal.close();
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  }
}
