import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*public users:any={
    admin:{password:'1234',roles:['STUDENT','ADMIN']},
    user1:{password:'1234',roles:['STUDENT']}
  }*/

  public username!:any;
  public isAuthenticated:boolean=false;
  public roles!:any;
  public accessToken!:any;
  constructor(private router:Router,
              private http:HttpClient) { }


  public login(username:string,password:string){
      /*if(this.users[username] && this.users[username].password==password){
        this.isAuthenticated=true;
        this.roles=this.users[username].roles;
        this.username=username
        return true
      }
      return false*/
    let params=new HttpParams().set("username",username).set("password",password);
    let options={
      headers: new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post(`${environment.backendHost}/auth/login`,params,options)
  }

  logout() {
    this.isAuthenticated=false;
    this.username=undefined;
    this.roles=undefined;
    this.accessToken=undefined;
    this.router.navigateByUrl("/login");
  }

  loadProfile(data: any) {
    this.isAuthenticated=true
    this.accessToken=data['access-token'];
    let decodedJwt:any=jwtDecode(this.accessToken);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope.split(" ");

  }
}
