import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute, Params, Route } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

//here we load the services
@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [CategoryService, UserService]

})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public category: Category;
  public status: string;


  constructor(
    //injecting dependincies
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService

  ) {
    this.page_title = 'Crear categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getTocken();
    this.category = new Category(1,'');
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    console.log(this.category);
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'success'){
            this.category = response.category;
            this.status = 'success';

            this._router.navigate(['/inicio']);
        }else{
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
