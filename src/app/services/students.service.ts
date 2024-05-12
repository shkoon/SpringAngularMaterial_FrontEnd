import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  public getAllPayments():Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/payments`)
  }
  public getStudents():Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${environment.backendHost}/students`)
  }
  public getPaymentsByCode(code:string):Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`)
  }
  public addPayment(payment:FormData):Observable<Payment>{
    return this.http.post<Payment>(`${environment.backendHost}/payments`,payment)
  }
  public getPaymentDetails(paymentId:number){
    return this.http.get(`${environment.backendHost}/paymentFile/${paymentId}`
      ,{responseType:"blob"} )
  }
}
