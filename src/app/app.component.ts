import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'crud-angular';

  displayedColumns: string[] = ['tema', 'nivel', 'fecha', 'plataforma', 'url', 'descripcion', 'pendientes', 'acciones'];
  dataSource! : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.getAllLessons();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    width: '30%';
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllLessons(){
    this.api.getLessons()
    .subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : (err) => {
        alert ("Error al obtener las clases")
      }
    })
  }

  editLesson(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    });
  }

  deleteLesson(row : any){
    this.api.deleteLesson(row.id)
    .subscribe({
      next : (res) => {
        alert ("Clase eliminada correctamente");
        this.getAllLessons();
      },
      error : (err) => {
        alert ("Error al eliminar la clase")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
