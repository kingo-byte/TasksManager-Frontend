import { Component, computed, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditTaskRequest, GetLookupByTableNamesRequest } from '../../../../Services/models/requests';
import { CommonService } from '../../../../Services/common.service';
import {Lookup, Task} from '../../../../Services/models/models'
import { TaskService } from '../../../../Services/task.service';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [FormsModule, NgbModalModule],
  styleUrl: './edit-task-modal.component.scss',
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent implements OnInit { 
  @Output() taskAdded = new EventEmitter<Task>();
  decodedToken = computed(() => this.authService.decodedToken())

  task: Task = {
    id: -1,
    userId: parseInt(this.decodedToken()!['UserId']),
    title: '',
    description: '',
    statusCode: '',
    categoryCode: '',
    dueDate: new Date().toISOString(),
  };

  statusOptions:Lookup[] = [];
  categoryOptions:Lookup[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public commonService: CommonService,
    private taskService: TaskService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.getLookupByTableNames();
  }

  submitForm() {
    if (this.task.title.trim() && this.task.description.trim() && this.task.statusCode && this.task.categoryCode) {
      this.editTask();
    }
  }

  getLookupByTableNames(): void {
  const getLookupByTableNamesRequest: GetLookupByTableNamesRequest = {  tableNames: 'TaskStatus,TaskCategory' };

  this.commonService.getLookupByTableNames(getLookupByTableNamesRequest).subscribe({
    next: (response) => {
      this.statusOptions = response.lookups['TaskStatus'];
      this.categoryOptions = response.lookups['TaskCategory'];
    },
    error: (error) => { 
      console.log('Error: ', error);
    }
  })
  }

  editTask(): void {
      const request: EditTaskRequest = {
        task: this.task
      }

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
