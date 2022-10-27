import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class IdentityGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
  ){

  }

  canActivate(){
    let identity = this._userService.getIdentity();
    //For Angular 14 release (JUL/28/2022), it is necessary to check if the json object is empty, for the check to work.
    if(JSON.stringify(identity) !== '{}'){
      return true;
    }else{
      this._router.navigate(['/error']);
      return false;
    }
  }
}
