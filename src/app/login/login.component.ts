import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../shared/autenticacion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Declaración de propiedad para el formulario
  public myForm!:FormGroup;

  // Declaración de propiedad para el formulario
  constructor(private fb:FormBuilder, private autenticacionService: AutenticacionService, private router: Router) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  // Método para crear el formulario con validaciones
  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:['', [Validators.required]],
      password:['', [Validators.required]]
    });
  }

  // Método que se ejecuta al enviar el formulario
  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      });
      return;

    }

    //Verifica que el usuario ingresado sea válido y si es correcto lo redirige a /pedidos
    if(this.autenticacionService.ingresarAplicativo(this.myForm.value)){
      console.log("Usuario y contraseña válida");
      this.router.navigate(['/pedidos']);
    }else{
      alert("Usuario o contraseña invalida");
    }

      console.log(this.myForm.value)
  }

   // Método para obtener los controles del formulario de manera más sencilla
  public get f():any{
    return this.myForm.controls;
  }

}
