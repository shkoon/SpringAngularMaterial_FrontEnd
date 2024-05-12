import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public  payments:any;
  public dataSource:any;
  public displayedColumns:string[]=['id','date','amount','type',
  'status','student']

  @ViewChild(MatPaginator) paginator!:MatPaginator;

   @ViewChild(MatSort) matSort!:MatSort;
  constructor(private studentsService:StudentsService) {
  }

  ngOnInit(): void {
   this.studentsService.getAllPayments().subscribe({
      next:value => {
        this.payments=value;
        this.dataSource=new MatTableDataSource(this.payments)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.matSort;

        console.log(this.payments)
      },
      error:err => {
        console.log(err)
      }
    })

  }


}
