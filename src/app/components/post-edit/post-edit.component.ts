import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';//importing these modules to make http requests
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: any;
  public post: Post;
  public categories: any;
  public image: any;
  public status: string;
  public resetVar: boolean;
  public is_edit: boolean;

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
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getTocken();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null);
    this.status = '';
    this.resetVar = true;
    this.is_edit = true;

  }

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
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

  getPost() {
    //get post id from url
    this._route.params.subscribe(params => {
      let id = +params['id'];

      //Ajax request to fetch post data
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
            //console.log(this.post);

            if(this.post.user_id != this.identity.sub){
              this._router.navigate(['/inicio'])
            }

          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);

        }
      );
    });
  }

  onSubmit(form: any) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          //this.post = response.post;


          //Redigir a la paginadel post
          this._router.navigate(['/entrada', this.post.id]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
      }
    );

  }





}


