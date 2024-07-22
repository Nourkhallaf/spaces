import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  @Input() message: string = '';
  @Input() name: string = '';


  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(true);
  }

  dismiss() {
    this.activeModal.dismiss(false);
  }
}
