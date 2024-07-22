import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User, UserReqModel } from 'src/app/models/users';
import { ApiService } from 'src/app/service/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUserComponent implements OnInit  {

  @Input() user: User = new User()
  @Input() isEditMode: boolean = false;
  @Input() name: string ='';
  @Input() job: string = '';
  @Output() saveUser = new EventEmitter<any>();

  userReqModel: UserReqModel = new UserReqModel()

  constructor(private apiService: ApiService,
              private NgbActiveModal: NgbActiveModal
            ) {}

  ngOnInit(): void {
  }

  Save(frm: NgForm) {
    if (frm.invalid) {
      return;
    }
    this.userReqModel.name = this.name ?? '';
    this.userReqModel.job = this.job ?? '';
    if(this.user){
      if (this.user.id == null) {
        this.apiService.createUser(this.userReqModel).subscribe(response => {
          this.saveUser.emit(response);
          this.NgbActiveModal.close(response);
        });
      } else {
        this.apiService.updateUser(this.userReqModel, this.user.id).subscribe(response => {
          this.saveUser.emit(response);
          this.NgbActiveModal.close(response);
        });
      }
    }
  }

  Cancel() {
    this.NgbActiveModal.dismiss();
}
}
