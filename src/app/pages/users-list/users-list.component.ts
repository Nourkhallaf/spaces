import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as bootstrap from 'bootstrap';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../create-update-user/create-update-user.component';
import { User } from 'src/app/models/users';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading = true; // check to delete
  selectedUser: any = {};
  isEditMode: boolean = false;
  loadingMore: boolean = false;
  offCanvas: bootstrap.Offcanvas | null = null;
  selectedArrowUserId: number | null = null;
  isArrowClicked: boolean = false;;


  ModelOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false,
    centered: true

};
  constructor(private apiService: ApiService, private NgbModal: NgbModal,private renderer: Renderer2,private el: ElementRef)
   {}

  ngOnInit(): void {

    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(response => {
      this.users = response.data;
      this.loading = false;
    });
  }

  loadMoreUsers() {
    this.loadingMore = true;
    this.apiService.getUsersWithDelay().subscribe((response: any) => {
      // this.users = this.users.concat(data.data);
      this.users = [...this.users, ...response.data];
      this.loadingMore = false;
    });
  }

  selectUser(userId: number) {
    this.isArrowClicked = true;
    this.selectedArrowUserId = userId;

    this.apiService.getUser(userId).subscribe((data: any) => {
      this.selectedUser = data.data;
    });
  }

  deleteUser(userId: number): void {
    this.apiService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    });
  }


// Edit Grid
  openOffCanvas() {
    const offCanvasElement = this.el.nativeElement.querySelector('#offCanvasUser');
    const tableElement = this.el.nativeElement.querySelector('.users-card');
    if (offCanvasElement && tableElement) {
      const tableRect = tableElement.getBoundingClientRect();
      this.renderer.setStyle(offCanvasElement, 'top', `${tableRect.top}px`);
      this.renderer.setStyle(offCanvasElement, 'left', `${tableRect.right}px`);
      this.renderer.setStyle(offCanvasElement, 'height', `${tableRect.height}px`);
      if (this.offCanvas) {
        this.offCanvas.show();
      } else {
        this.offCanvas = new bootstrap.Offcanvas(offCanvasElement, {backdrop: false});
        this.offCanvas.show();
      }
    }
  }

  closeCanvas(): void {
      this.selectedUser = null;
      this.deselectArrowUser();
  }

  openCreateAndUpdatePopup(user: User = new User): void {
    const modalRef = this.NgbModal.open(CreateUserComponent, this.ModelOptions);
    // const toBeSavedRow = JSON.parse(JSON.stringify(row));
    if (user.id) {
      const fullName = `${user.first_name} ${user.last_name}`;
      modalRef.componentInstance.name = fullName;
    } else {
      modalRef.componentInstance.name = '';
    }
    modalRef.componentInstance.user = { ...user };
    modalRef.componentInstance.isEditMode = !!user.id;
    modalRef.componentInstance.job = user.job ?? '';
    modalRef.result.then(
      (savedUser) => {
        const index = this.users.findIndex(user => user.id === user.id);
        if (index !== -1) {
          this.users[index] = savedUser;
        } else {
          // savedUser.avatar = 'assets/images/person.jpg'; // Set default image for new users
          this.users.push(savedUser);
        }
      }, (reason) => {console.log('Dismissed:', reason);}
    ).catch((error) => {
      console.error('Modal error:', error);
    });
  }

  openAddUserModal(): void {
    this.isEditMode = false;
    this.openCreateAndUpdatePopup();
  }

  openEditUserModal(user: any): void {
    this.deselectArrowUser();
    this.isEditMode = true;
    this.openCreateAndUpdatePopup(user);
  }

  deselectArrowUser() {
    this.isArrowClicked = false;
    this.selectedArrowUserId = null;
  }

  confirmDeleteUser(user: User): void {
    this.deselectArrowUser();
    const modalRef = this.NgbModal.open(DeleteUserComponent,this.ModelOptions);
    modalRef.componentInstance.message = `Are you sure you want to delete`;
    modalRef.componentInstance.name = `${user.first_name} ${user.last_name}`;
    modalRef.result.then((result) => {
      if (result) {
        this.deleteUser(user.id!);
      }
    },(reason) => {console.log('Dismissed:', reason);}
    ).catch((error) => {
      console.error('Modal error:', error);
    });
  }

}
