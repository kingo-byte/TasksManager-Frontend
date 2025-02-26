import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbDatepicker,
  NgbDateStruct,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import {
  EditTaskRequest,
  GetLookupByTableNamesRequest,
} from '../../../../Services/models/requests';
import { CommonService } from '../../../../Services/common.service';
import { Lookup, Task } from '../../../../Services/models/models';
import { TaskService } from '../../../../Services/task.service';
import { AuthService } from '../../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [FormsModule, NgbModalModule, NgbDatepickerModule],
  styleUrl: './edit-task-modal.component.scss',
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent implements OnInit {
  @Input() task!: Task;

  decodedToken = computed(() => this.authService.decodedToken());

  // Use a separate model for the datepicker
  dueDateModel: NgbDateStruct | undefined;

  statusOptions: Lookup[] = [];
  categoryOptions: Lookup[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public commonService: CommonService,
    private taskService: TaskService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
    if (
      this.task.title.trim() &&
      this.task.description.trim() &&
      this.task.statusCode &&
      this.task.categoryCode
    ) {
      this.editTask();
    }
  }

  getLookupByTableNames(): void {
    const getLookupByTableNamesRequest: GetLookupByTableNamesRequest = {
      tableNames: 'TaskStatus,TaskCategory',
    };

    this.commonService
      .getLookupByTableNames(getLookupByTableNamesRequest)
      .subscribe({
        next: (response) => {
          this.statusOptions = response.lookups['TaskStatus'];
          this.categoryOptions = response.lookups['TaskCategory'];
        },
        error: (error) => {
         const errorsObj = error.error.errors;
         let message: string = '';
         for (const key in errorsObj) {
           if (errorsObj.hasOwnProperty(key)) {
             message += `${errorsObj[key].join(', ')}\n`;
           }
         }
         this.toastr.error(message, error.error.title);
        },
      });
  }

  editTask(): void {
    if (this.dueDateModel) {
      const { year, month, day } = this.dueDateModel;
      this.task.dueDate = new Date(
        Date.UTC(year, month - 1, day)
      ).toISOString();
    }
    const request: EditTaskRequest = {
      task: this.task,
    };

    this.taskService.editTask(request).subscribe({
      next: (response) => {
        this.toastr.success('New Task has been added');
        this.activeModal.close();
      },
      error: (error) => {
       const errorsObj = error.error.errors;
       let message: string = '';
       for (const key in errorsObj) {
         if (errorsObj.hasOwnProperty(key)) {
           message += `${errorsObj[key].join(', ')}\n`;
         }
       }
       this.toastr.error(message, error.error.title);
      },
    });
  }
}
