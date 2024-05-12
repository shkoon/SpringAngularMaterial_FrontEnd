import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/student.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{


  public students!:Array<Student>;
  public dataSource!:MatTableDataSource<Student>;
  public displayedColumns:string[]=["id","firstname","lastname","code","programId",
  "payments"]
  constructor(private studentService:StudentsService,
              private router:Router) {
  }
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  @ViewChild(MatSort) matSort!:MatSort;
  ngOnInit(): void {
      this.studentService.getStudents().subscribe({
      next:data=>{
        this.students=data;
        this.dataSource=new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.matSort;
      },
      error:err =>{
        console.log(err)
      }
    })
  }

  studentPayments(student:Student){
    this.router.navigateByUrl(`/admin/student-details/${student.code}`)
  }

}
