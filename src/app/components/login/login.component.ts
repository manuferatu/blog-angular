import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Identificate";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = "";

  }

  ngOnInit(): void {
    //it´s always executed and closes session only when ths parameter sure, gets by the url
    this.logout();
  }

  onSubmit(form: any) {
    this._userService.signup(this.user).subscribe(

      response => {
        //Tocken
        //console.log(response)
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          //OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(

            response => {
              this.identity = response;
              console.log(this.token);//con esto autentificamos al usuario en cada una de las rutas
              console.log(this.identity);//y aqui los datos de usuario para mostrar sus datos en el frontend

              //Persist identified user data
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              //Redirection
              this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

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

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure']; // with + force it to be converted to integer

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redirection
        this._router.navigate(['inicio']);

      }
    });
  }

}
