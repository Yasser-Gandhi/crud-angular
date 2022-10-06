import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    plataformas = [
      "Miro Board",
      "Google Drive",
      "Aula virtual",
      ];

    lessonsForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.lessonsForm = this.formBuilder.group({
      tema: ['', Validators.required],
      nivel: ['', Validators.required],
      fecha: ['', Validators.required],
      plataforma: ['', Validators.required],
      url: ['', Validators.required],
      descripcion: ['', Validators.required],
      pendientes: ['', Validators.required],
    })
  }

  // FUNCIONES
  addLesson(){
    console.log(this.lessonsForm.value);
    if(this.lessonsForm.valid){
      this.api.postLesson(this.lessonsForm.value)
      .subscribe({
        next : (res) => {
          alert ("Clase agregada correctamente");
          this.lessonsForm.reset();
          this.dialogRef.close('guardar');
        },
        error : () => {
          alert ("Error al agregar la clase")
        }
      })
    }
  }//Fin de la función addLesson

}//Fin de la clase DialogComponent
