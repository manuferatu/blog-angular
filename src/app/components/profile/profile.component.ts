import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
//import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
  public page_title: string;
  public url;
  public user: any;
  public posts: Array<Post>;
  public identity;
  public token;


  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = "Perfil del usuario";
    this.url = global.url;
    this.posts = [];
    this.identity = _userService.getIdentity();
    this.token = _userService.getTocken();

  }

  ngOnInit(): void {
    this.getProfile();

  }

  getProfile() {
    //get porfile id from url
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);

    });
  }

  getUser(userId: any){
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.user = response.user;

          console.log(this.user);

        }
      },
      error => {
        console.log(<any>error);

      }
    );

  }

  getPosts(userId: any) {
    this._userService.getPostsByCategory(userId).subscribe(
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
        this.getProfile();
      },
      error => {
        console.log(error);

      }
    );
  }

}
