import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  active = 1;
  filterText = '';
  filterStatus = 'All';

  tasks = [
    {
      title: 'Design Landing Page',
      description: 'Create a responsive landing page.',
      status: 'In Progress',
    },
    {
      title: 'Fix Bug #123',
      description: 'Resolve the issue with user login.',
      status: 'Pending',
    },
    {
      title: 'Update Documentation',
      description: 'Add recent changes to the docs.',
      status: 'Completed',
    },
    // Add more tasks as needed
  ];

  statusOptions = ['All', 'Pending', 'In Progress', 'Completed'];

  constructor(private modalService: NgbModal) {}

  get filteredTasks() {
    return this.tasks.filter((task) => {
      const matchesText =
        task.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.filterText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'All' || task.status === this.filterStatus;

      return matchesText && matchesStatus;
    });
  }

  addNewTask() {
    const modalRef = this.modalService.open(EditTaskModalComponent);
    modalRef.componentInstance.taskAdded.subscribe((newTask: any) => {
      this.tasks.push(newTask);
    });
  }

  markAsCompleted(task: any) {
    task.status = 'Completed';
  }
}
