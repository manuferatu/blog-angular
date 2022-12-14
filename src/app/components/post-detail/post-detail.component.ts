import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
    public post: any;
    public url: any;
    public identity: any;
  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    //this.post = new Post(1,1, 1, '', '', '', null);
    this.url = global.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {

  this.getPost();
  }

  getPost(){
    //get post id from url
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      //Ajax request to fetch post data
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.post;
            console.log(this.post);

          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/inicio']);

        }
      );
    });



  }

}
