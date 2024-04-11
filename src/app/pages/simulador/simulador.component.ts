import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {

  lista_tipos_credito = [
    {id:1, nombre:'Credito de Libre Inversion'},
    {id:2, nombre:'Credito de Vehiculo'},
    {id:3, nombre:'Credito de Vivienda'},
    {id:4, nombre:'Credito de Estudio'},
    {id:5, nombre:'Credito de Compra de Cartera'}
  ]

  lista_tipos_poliza = [
    {id:1, nombre:'Poliza de Vida'},
    {id:2, nombre:'Poliza de Salud'},
    {id:3, nombre:'Poliza de Hogar'},
    {id:4, nombre:'Poliza de Vehiculo'},
    {id:5, nombre:'Poliza de Viaje'}
  ]

  lista_genero = [
    {id:1, nombre:'Masculino'},
    {id:2, nombre:'Femenino'},
    {id:3, nombre:'Otro'}
  ]

  lista_simular_con_seguro = [
    {id:1, nombre:'Si'},
    {id:2, nombre:'No'}
  ]

  onLoading = false;
  onAvissment = false;

  formulario_simulador: FormGroup;

  constructor (private __formBuilder : FormBuilder) {
    this.formulario_simulador = this.__formBuilder.group(
      {
        tipo_credito : ['',Validators.required],
        valor_credito : ['',[Validators.required,Validators.min(500000),Validators.max(1000000000)]],
        plazo_meses : ['',[Validators.required,Validators.min(3),Validators.max(36)]],
        tasa_interes : ['12,5%',Validators.required],
        simular_con_seguro : ['',Validators.required],
        tipo_poliza : ['',Validators.required],
        genero: ['',Validators.required],
        fecha_nacimiento: ['',[Validators.required,this.myValidation]]
      }
    );
  }

  ngOnInit(): void {
  }

  get fechaNacimientoField() {
    return this.formulario_simulador.get('fecha_nacimiento') 
  }

  setForm(){
    this.onLoading = true;
    setTimeout(() => {
      this.onLoading = false;
      this.onAvissment = true;
    } , 3000);
  }


  myValidation(control: AbstractControl): ValidationErrors | null {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(control.value);
    const diferenciaAnios = Math.floor((fechaActual.getTime() - fechaNacimiento.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    const esMayorDe18 = diferenciaAnios >= 18;

    if (!esMayorDe18) {
      return { edadInvalida: true };
    }

    return null;
  }
}
