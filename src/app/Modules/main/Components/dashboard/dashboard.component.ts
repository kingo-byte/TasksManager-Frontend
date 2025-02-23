import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { Lookup, Task } from '../../../../Services/models/models';
import { CommonService } from '../../../../Services/common.service';
import {
  DeleteTaskRequest,
  EditTaskRequest,
  GetLookupByTableNamesRequest,
} from '../../../../Services/models/requests';
import { UserService } from '../../../../Services/user.service';
import { AuthService } from '../../../../Services/auth.service';
import { TaskService } from '../../../../Services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  statusOptions: Lookup[] = [];
  decodedToken = computed(() => this.authService.decodedToken());

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private userService: UserService,
    private authService: AuthService,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLookupByTableNames();
    this.getUserTasks();
  }

  editTask(id: number) {
    const userId: number = parseInt(this.decodedToken()!['UserId']);
    const modalRef = this.modalService.open(EditTaskModalComponent);

    const currentTask: Task | null =
      this.tasks.find((task) => task.id === id) ?? null;

    const task: Task = {
      id: id !== -1 ? currentTask!.id! : -1,
      userId: currentTask?.userId! ?? userId,
      title: currentTask?.title ?? '',
      description: currentTask?.description ?? '',
      statusCode: currentTask?.statusCode ?? '',
      categoryCode: currentTask?.categoryCode ?? '',
      dueDate: currentTask?.dueDate ?? '',
    };

    modalRef.componentInstance.task = task;

    modalRef.result
      .then((resultTask: Task) => {
        this.getUserTasks();
      })
      .catch((reason) => {});
  }

  markAsCompleted(index: number) {
    const task: Task = {
      id: this.tasks[index].id,
      userId: this.tasks[index].userId,
      title: this.tasks[index].title,
      description: this.tasks[index].description,
      statusCode: 'COMPLETED',
      categoryCode: this.tasks[index].categoryCode,
      dueDate: this.tasks[index].dueDate,
    };

    const request: EditTaskRequest = {
      task: task,
    };

    this.taskService.editTask(request).subscribe({
      next: (response) => {
        this.toastr.success('Task has been marked as completed');
        this.getUserTasks();
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

  deleteTask(index: number) {
    const request: DeleteTaskRequest = {
      taskId: this.tasks[index].id,
    };

    this.taskService.deleteTask(request).subscribe({
      next: (response) => {
        this.toastr.success('Task has been deleted');
        this.tasks.splice(index, 1);
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

  getLookupByTableNames(): void {
    const getLookupByTableNamesRequest: GetLookupByTableNamesRequest = {
      tableNames: 'TaskStatus',
    };

    this.commonService
      .getLookupByTableNames(getLookupByTableNamesRequest)
      .subscribe({
        next: (response) => {
          this.statusOptions = response.lookups['TaskStatus'];
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

  getUserTasks(): void {
    const id: number = parseInt(this.decodedToken()!['UserId']);

    this.userService.getUserTasks(id).subscribe({
      next: (response) => {
        this.tasks = response.tasks ? response.tasks : [];
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
