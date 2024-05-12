import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../model/student.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  public paymentForm!:FormGroup;
  private studentCode!:string;
  public spin:boolean=false;
  public types:string[]=[];
  pdfUrl!:string;
  constructor(private fb:FormBuilder,
              private stService:StudentsService
              ,private activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
    for(let elt in PaymentType){
      if(typeof PaymentType[elt]==='string' ){
        this.types.push(PaymentType[elt])
      }

    }
    this.studentCode=this.activatedRoute.snapshot.params["code"]
    this.paymentForm=this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      file:this.fb.control(''),
      fileName:this.fb.control(''),
    })
  }
  submit(){

  }

  selectFile($event: any) {
    if($event.target.files.length>0){
      let file=$event.target.files[0]
      this.paymentForm.patchValue({file:file,
      fileName:file.name});
      this.pdfUrl=window.URL.createObjectURL(file);
    }

  }

  savePayment() {
    this.spin=true;
    let date=new Date(this.paymentForm.value.date);
    let formattedDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let formData:FormData=new FormData();
    formData.set("date",formattedDate);
    formData.set("amount",this.paymentForm.value.amount)
    formData.set("paymentType",this.paymentForm.value.type)
    formData.set("studentCode",this.paymentForm.value.studentCode)
    formData.set("file",this.paymentForm.value.file)

    this.stService.addPayment(formData).subscribe({
      next:data=>{
        this.spin=false;
        alert('Payment Saved successfully')

      },
      error:err => {
        console.log(err)
      }

    })

  }

  afterLoadComplete(event:any) {

  }
}
