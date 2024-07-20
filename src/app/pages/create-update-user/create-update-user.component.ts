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
  @Input() name: string =''
  userReqModel: UserReqModel = new UserReqModel()

  constructor(private apiService: ApiService,
              private NgbActiveModal: NgbActiveModal
            ) {}

  ngOnInit(): void {
    console.log("name", name)
  }

  Save(frm: NgForm) {
      if (this.user.id == null) {
        let userReqModel: UserReqModel ={
          name: this.name ?? '',
          job: ''
        }
        this.apiService.createUser(userReqModel).subscribe(response => {
            console.log("User created", response)
        });

    }
  }

  Cancel() {
    this.NgbActiveModal.dismiss();
}
}
