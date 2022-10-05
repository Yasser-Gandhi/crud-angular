import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';


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

  clasesForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.clasesForm = this.formBuilder.group({
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
  agregarClase(){
    console.log(this.clasesForm.value);
  }

}
