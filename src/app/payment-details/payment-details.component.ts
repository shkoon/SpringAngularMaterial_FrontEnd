import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent  implements OnInit{
  paymentId!:number;
  pdfUrl!:any;
  constructor(private stService:StudentsService,
              private activeRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.paymentId=this.activeRoute.snapshot.params["id"]
    let mediaType='application/pdf'
    this.stService.getPaymentDetails(this.paymentId).subscribe({
      next:data=>{
        let blob=new Blob([data],{type:mediaType})
        this.pdfUrl=window.URL.createObjectURL(blob)
      },
      error:err => {
        console.log(err)
      }
    })
  }


  afterLoadComplete($event:any
  ) {

  }
}
