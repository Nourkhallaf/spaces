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
  @Output() saveUser = new EventEmitter<any>();
  @Input() job: string = '';
  firstName = '';
  lastName = '';
  userReqModel: UserReqModel = new UserReqModel()

  constructor(private apiService: ApiService,
              private NgbActiveModal: NgbActiveModal
            ) {}

  ngOnInit(): void {
    if (this.isEditMode && this.user) {
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.job = this.user.job ?? '';
    }

    console.log("firstname", this.firstName)
  }

  createUser(): void {
    this.apiService.createUser(this.userReqModel).subscribe(response => {
      let newUser = this.mapResponseToUser(response);
      console.log(response)
      newUser.id = response.id; // Assuming the response contains an ID field
      console.log("newuser",newUser )
      this.saveUser.emit(newUser);
      this.NgbActiveModal.close(newUser);
    });
  }

  updateUser(): void {
    this.apiService.updateUser(this.userReqModel, this.user.id!).subscribe(response => {
      const updatedUser = this.mapResponseToUser(response);
      this.saveUser.emit(updatedUser);
      this.NgbActiveModal.close(updatedUser);
    });
  }


  Save(frm: NgForm): void {
    if (frm.invalid) {
      return;
    }

    this.userReqModel.name = this.name ?? '';
    this.userReqModel.job = this.job ?? '';

    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  mapResponseToUser(response: any): User {
    const newUser = new User();
    const nameSplit= response.name.split(' ');
    newUser.first_name = nameSplit[0];
    newUser.last_name = nameSplit[1] || '';
    newUser.job = response.job;
    newUser.avatar = 'assets/images/person.jpg'; // Default static image for new users
    return newUser;
  }


  Cancel() {
    this.NgbActiveModal.dismiss();
}
}
