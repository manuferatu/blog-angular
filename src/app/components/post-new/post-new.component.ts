import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//importing these modules to make http requests
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public post: Post;
  public categories: any;
  public image: any;
  public status: string;
  public resetVar: boolean;

  afuConfig = <any>{
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + "post/upload",
      method: "POST",
      headers: {
        "Authorization": this._userService.getTocken()
      },

    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    attachPinBtn: 'Attach Files...',
    afterUploadMsg_success: 'Successfully Uploaded !',
    afterUploadMsg_error: 'Upload Failed !',
    sizeLimit: 'Size Limit'

  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getTocken();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null);
    this.status = '';
    this.resetVar = true;
  }

  ngOnInit(): void {
    this.getCategories();
    console.log(this.identity);

  }

  //collectiong the categories
  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
 if (response.status == "success") {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);

      }
    );
  }

  imageUpload(data: any) {
    console.log(data);
    let image_data = data.body;
    this.post.image = JSON.stringify(image_data.image).replace(/['"]+/g, '');
  }

  onSubmit(form: any) {
    //console.log(this.post);
    this._postService.create(this.token,this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['inicio']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);

      }
    );

  }

}
