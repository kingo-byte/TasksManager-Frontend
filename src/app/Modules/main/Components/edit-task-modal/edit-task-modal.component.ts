import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';
import { GetLookupByTableNamesRequest } from '../../../../Services/models/requests';
import { CommonService } from '../../../../Services/common.service';
import {Lookup} from '../../../../Services/models/models'

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
    status: 'PENDING',
  };

  statusOptions:Lookup[] = [];

  constructor(public activeModal: NgbActiveModal, public commonService: CommonService) {
    this.getLookupByTableNames();
  }

  submitForm() {
    if (this.task.title && this.task.description) {
      this.taskAdded.emit(this.task);
      this.activeModal.close();
    }
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
}
