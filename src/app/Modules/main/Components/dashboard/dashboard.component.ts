import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { Lookup, Task } from '../../../../Services/models/models';
import { CommonService } from '../../../../Services/common.service';
import { GetLookupByTableNamesRequest } from '../../../../Services/models/requests';
import { UserService } from '../../../../Services/user.service';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  filterText = '';
  filterStatus = 'INPROGRESS';
  tasks: Task[]= [];
  statusOptions: Lookup[] = [];
  decodedToken = computed(() => this.authService.decodedToken())
  
  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private userService: UserService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.getLookupByTableNames();
    this.getUserTasks();
  }

  addNewTask() {
    const modalRef = this.modalService.open(EditTaskModalComponent);
    modalRef.componentInstance.taskAdded.subscribe((newTask: Task) => {
      window.location.reload(); 
    });
  }

  markAsCompleted(task: Task) {
    task.statusCode = 'COMPLETED';
  }

  get filteredTasks() {
    const statusFilter = this.filterStatus.trim().toLowerCase();
    const textFilter = this.filterText.trim().toLowerCase();
  
    return this.tasks.filter((task) => {
      const matchesStatus = task.statusCode.toLowerCase() === statusFilter;
      const matchesText =
        !textFilter ||
        task.title.toLowerCase().startsWith(textFilter) 
  
      return matchesStatus && matchesText;
    });
  }
  
  getLookupByTableNames(): void {
   const getLookupByTableNamesRequest: GetLookupByTableNamesRequest = {  tableNames: 'TaskStatus' };

   this.commonService.getLookupByTableNames(getLookupByTableNamesRequest).subscribe({
    next: (response) => {
      this.statusOptions = response.lookups['TaskStatus'];
    },
    error: (error) => { 
      console.log('Error: ', error);
    }
   })
  }

  getUserTasks(): void {
    const id: number =  parseInt(this.decodedToken()!['UserId']);

    this.userService.getUserTasks(id).subscribe({ 
      next: (response) => {
        this.tasks = response.tasks ? response.tasks :[];
      },
      error: (error) => {
        console.log('Error: ', error);
      }
    });
  }
}
