import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as bootstrap from 'bootstrap';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from 'src/app/models/users';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  AllUsers: User[] = [];
  UserResModel: User = new User();
  PagedRows: User[] = [];

  loading = true;
  selectedUser: any = {};
  isEditMode: boolean = false;
  loadingMore: boolean = false;

  offCanvas: bootstrap.Offcanvas | null = null;



  ModelOptions: NgbModalOptions = {
    size: 'lg',
    backdrop: 'static',
    keyboard: false
};
  constructor(private apiService: ApiService,
    private NgbModal: NgbModal,
    private renderer: Renderer2, private el: ElementRef

  ) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(response => {
      this.users = response.data;
      this.loading = false;
    });
  }

  // openOffCanvas() {
  //   const offCanvasElement = this.el.nativeElement.querySelector('#offCanvasUser');
  //   if (offCanvasElement) {
  //     if (this.offCanvas) {
  //       this.offCanvas.show();
  //     } else {
  //       this.offCanvas = new bootstrap.Offcanvas(offCanvasElement, {
  //         backdrop: false
  //       });
  //       this.offCanvas.show();
  //     }
  //   } else {
  //     console.error('Offcanvas element not found');
  //   }
  // }

  openOffCanvas() {
    const offCanvasElement = this.el.nativeElement.querySelector('#offCanvasUser');
    const tableElement = this.el.nativeElement.querySelector('.users-card');
    if (offCanvasElement && tableElement) {
      const tableRect = tableElement.getBoundingClientRect();
      console.log('tableRect: ' + tableRect)
      this.renderer.setStyle(offCanvasElement, 'top', `${tableRect.top}px`);
      this.renderer.setStyle(offCanvasElement, 'left', `${tableRect.right}px`);
      this.renderer.setStyle(offCanvasElement, 'height', `${tableRect.height}px`);
      if (this.offCanvas) {
        this.offCanvas.show();
      } else {
        this.offCanvas = new bootstrap.Offcanvas(offCanvasElement, {
          backdrop: false
        });
        this.offCanvas.show();
      }
    } else {
      console.error('Offcanvas or table element not found');
    }
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(response => {
      this.users = response.data;
      this.loading = false;
    });
  }

  loadMoreUsers() {
    this.loadingMore = true;
    this.apiService.getUsersWithDelay().subscribe((data: any) => {
      this.users = this.users.concat(data.data);
      this.loadingMore = false;
    });
  }

openModal(row: User = new User): void {

  const modalRef = this.NgbModal.open(CreateUserComponent, this.ModelOptions);
  const toBeSavedRow = JSON.parse(JSON.stringify(row));
  modalRef.componentInstance.user = toBeSavedRow;
  modalRef.result.then((savedRow) => {
    console.log("savedrow",savedRow);
    console.log("row", row.id)
    if(row.id === null) {
      this.users.push(savedRow);
    }else{

      console.log("else",row.id)
    }
  })

}
  openAddUserModal(): void {
    this.isEditMode = false;
    this.selectedUser = {};

    this.openModal();
  }

  openEditUserModal(user: any): void {
    this.isEditMode = true;
    this.selectedUser = { ...user };
    this.openModal();
  }

  selectUser(userId: number) {
    this.apiService.getUser(userId).subscribe((data: any) => {
      this.selectedUser = data.data;
    });
  }
  deleteUser(userId: number) {
  }

}
