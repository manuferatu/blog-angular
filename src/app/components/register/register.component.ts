import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]// We load the service
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Registro";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
  }

  ngOnInit(): void {
    console.log('componente de registro cargado');
    console.log(this._userService.test());
  }

  onSubmit(form: any) {
    //console.log(this.user);

    //Usamos el metodo del servicio
    //este metodo tiene dos funciones de callback la de la respuesta y la del error
    this._userService.register(this.user).subscribe(
      response => {

        //console.log(response);
        if (response.status == "success") {
          this.status = response.status;
          form.reset();//clear the form fields
        } else {
          this.status = 'error';
        }

      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );


  }




}
