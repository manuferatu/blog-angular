import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public category: any;
  public posts: any;
  public url: string;
  public identity: any;
  public token:any;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  ) {
    this.url = global.url;
    this.page_title = "Detalle de la Categoría";
    this.identity = _userService.getIdentity;
    this.token = _userService.getTocken;

  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory() {
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            //console.log(response);
            this.category = response.category;
            this._categoryService.getPostsCategory(id).subscribe(
              response => {
                if (response.status == 'success') {
                  this.posts = response.posts;
                } else {
                  this._router.navigate(['/inicio']);

                }

              },
              error => {
                console.log(error);

              }
            );

          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);

        }
      );
    });
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;

          console.log(this.posts);

        }
      },
      error => {
        console.log(<any>error);

      }
    );
  }
  deletePost(id: any) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);

      }
    );

  }
}
