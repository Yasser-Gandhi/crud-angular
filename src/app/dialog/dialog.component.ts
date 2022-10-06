import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    actionBtn: string = "Guardar";
  constructor(private formBuilder: FormBuilder, private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.lessonsForm = this.formBuilder.group({
      tema: ['', Validators.required],
      nivel: ['', Validators.required],
      fecha: ['', Validators.required],
      plataforma: ['', Validators.required],
      url: ['', Validators.required],
      descripcion: ['', Validators.required],
      pendientes: ['', Validators.required],
    });
    //Comprobamos si recibimos datos
    console.log(this.editData);

    //Si recibimos datos, los cargamos en el formulario
    if(this.editData){
      this.actionBtn = "Editar";
      this.lessonsForm.controls['tema'].setValue(this.editData.tema);
      this.lessonsForm.controls['nivel'].setValue(this.editData.nivel);
      this.lessonsForm.controls['fecha'].setValue(this.editData.fecha);
      this.lessonsForm.controls['plataforma'].setValue(this.editData.plataforma);
      this.lessonsForm.controls['url'].setValue(this.editData.url);
      this.lessonsForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.lessonsForm.controls['pendientes'].setValue(this.editData.pendientes);
    }
  }

  // FUNCIONES
  addLesson(){
    if(!this.editData){
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
    }else {
      this.updateLesson();
    }

  }//Fin de la función addLesson

  updateLesson(){
    this.api.putLesson(this.lessonsForm.value, this.editData.id).
    subscribe({
      next : (res) => {
        alert ("Clase editada correctamente");
        this.lessonsForm.reset();
        this.dialogRef.close('editar');
      },
      error : () => {
        alert ("Error al editar la clase")
      }
    })
  }

}//Fin de la clase DialogComponent
