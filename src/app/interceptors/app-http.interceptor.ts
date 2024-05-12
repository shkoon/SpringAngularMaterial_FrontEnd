import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {catchError, Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{

  constructor(private  authService:AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.url.includes("/auth/login")){
      let request=req.clone({
        headers:req.headers.set('Authorization',"Bearer "+this.authService.accessToken)
      });
      return next.handle(request).pipe(
        catchError(err => {

          if(err.status==401){
            this.authService.logout();
          }
          return throwError(err.message)
        })
      );
    }
    else return next.handle(req);
  }

}
