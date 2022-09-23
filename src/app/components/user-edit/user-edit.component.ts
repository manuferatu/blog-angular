import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity: any;
  public token: any;
  public status: any;

  constructor(
    public _userSevice: UserService
  ) {
    this.page_title = 'Ajustes de usuario'
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getTocken();
    //filling user object
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this._userSevice.update(this.token, this.user).subscribe(
      response => {
        if (response && response.status) {
          console.log(response);
          this.status = 'success';

          //update user in session
          if (response.changes.name) {
            this.user.name = response.changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.description) {
            this.user.description = response.changes.description;
          }
          if (response.changes.image) {
            this.user.image = response.changes.image;
          }
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
