import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  empData:any;

  displayedColumns: string[] = ['id', 'firstName', 'LastName', 'dob','gender','mail', 'education', 'company', 'experence','package','action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dailog:MatDialog,private _empService:EmployeeService){}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAndEditEmpForm(){
   const dailogref= this._dailog.open(EmpAddEditComponent)
   dailogref.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeList();
      }
    }
   })
  }

  getEmployeeList(){
    this._empService.getAllEmployees().subscribe({

      next:(res)=>{
        console.log(res)
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log
      
    })  }

    deleteEmployee(id:number){
      this._empService.deleteEmployee(id).subscribe({
        next :(res)=>{  
alert('Employee Deleted!')
this.getEmployeeList();
        },
        error:console.log
      })   }



      updateAndEditEmpForm(data:any){
         this._dailog.open(EmpAddEditComponent,{data});
         console.log(data)
     
       }
}
