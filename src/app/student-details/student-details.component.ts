import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";
import {StudentsService} from "../services/students.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  public payments!:Array<Payment>;
  public dataSource!:MatTableDataSource<Payment>;
  private studentCode!:string;
  public displayedColumns:string[]=['id','date','amount','type',
    'status','student','details']
  constructor(private studentsService:StudentsService,
              private router:ActivatedRoute,
              private route:Router,
              public authService:AuthService) {
  }
  @ViewChild(MatSort) matSort!:MatSort;
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  ngOnInit(): void {
    this.studentCode=this.router.snapshot.params["code"];
    this.studentsService.getPaymentsByCode(this.studentCode).subscribe({
      next:data=>{
        this.payments=data;
        this.dataSource=new MatTableDataSource<Payment>(this.payments);
        this.dataSource.sort=this.matSort;
        this.dataSource.paginator=this.paginator;

      },
      error:err => {
        console.log(err)
      }
    })
  }


  public newPayment() {
    this.route.navigateByUrl(`/admin/newPayment/${this.studentCode}`)
  }

  paymentDetails(element:any) {
    this.route.navigateByUrl(`/admin/paymentDetails/${element.id}`)
  }
}
