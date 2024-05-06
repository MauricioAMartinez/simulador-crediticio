import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss'],
})
export class SimuladorComponent implements OnInit {
  lista_tipos_credito = [
    { id: 1, nombre: 'Credito de Libre Inversion' },
    { id: 2, nombre: 'Credito de Vehiculo' },
    { id: 3, nombre: 'Credito de Vivienda' },
    { id: 4, nombre: 'Credito de Estudio' },
    { id: 5, nombre: 'Credito de Compra de Cartera' },
  ];

  lista_tipos_poliza = [
    { id: 1, nombre: 'Poliza de Vida' },
    { id: 2, nombre: 'Poliza de Salud' },
    { id: 3, nombre: 'Poliza de Hogar' },
    { id: 4, nombre: 'Poliza de Vehiculo' },
    { id: 5, nombre: 'Poliza de Viaje' },
    { id: 6, nombre: 'No Aplica' },
  ];

  lista_genero = [
    { id: 1, nombre: 'Masculino' },
    { id: 2, nombre: 'Femenino' },
    { id: 3, nombre: 'Otro' },
  ];

  lista_simular_con_seguro = [
    { id: 1, nombre: 'Si' },
    { id: 2, nombre: 'No' },
  ];

  onLoading = false;
  onResult = false;

  formulario_simulador: FormGroup;

  resultado_simulador = {
    cuota_mensual: 0,
    intereses_anual: 0,
    intereses_mensual:0,
    seguro_mensual: 0,
    total_pagar: 0,
  }

  constructor(private __formBuilder: FormBuilder) {
    this.formulario_simulador = this.__formBuilder.group({
      tipo_credito: ['', Validators.required],
      valor_credito: [
        '',
        [
          Validators.required,
          Validators.min(500000),
          Validators.max(1000000000),
        ],
      ],
      plazo_meses: [
        '',
        [Validators.required, Validators.min(3), Validators.max(36)],
      ],
      tasa_interes: [{ value: '12,5%', disabled: true }, Validators.required],
      simular_con_seguro: ['', Validators.required],
      tipo_poliza: ['', Validators.required],
      genero: ['', Validators.required],
      fecha_nacimiento: ['', [Validators.required, this.myValidation]],
    });
  }

  ngOnInit(): void {
  }

  get fechaNacimientoField() {
    return this.formulario_simulador.get('fecha_nacimiento');
  }

  setForm() {
    this.onLoading = true;
    this.calcularCuotaMensual();

    setTimeout(() => {
      this.onLoading = false;
      this.onResult = true;
    }, 1000);
  }

  myValidation(control: AbstractControl): ValidationErrors | null {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(control.value);
    const diferenciaAnios = Math.floor(
      (fechaActual.getTime() - fechaNacimiento.getTime()) /
        (365.25 * 24 * 60 * 60 * 1000)
    );
    const esMayorDe18 = diferenciaAnios >= 18;

    if (!esMayorDe18) {
      return { edadInvalida: true };
    }

    return null;
  }

  validationTypeCredit() {
    if (this.formulario_simulador.get('simular_con_seguro')?.value == 2) {
      this.formulario_simulador.get('tipo_poliza')?.setValue(6);
    }
  }

  calcularCuotaMensual() {
    const formmatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    const interesAnual = 12.5;
    const interesMensual: number = interesAnual / 12 / 100;
    const valorPrestamo = this.formulario_simulador.get('valor_credito')?.value;
    const plazoMeses = this.formulario_simulador.get('plazo_meses')?.value;
    const seguro = this.formulario_simulador.get('simular_con_seguro')?.value;
    const seguroPoliza = this.formulario_simulador.get('tipo_poliza')?.value;
    let seguroValor = 0;
    if (this.formulario_simulador.get('simular_con_seguro')?.value == 'Si'){
      seguroValor = 10000;
    }
    const seguroPolizaMensual = seguroValor * 12;

    const cuotaMensual = valorPrestamo * (interesMensual / (1 - Math.pow(1 + interesMensual, -plazoMeses)));
    const interesesAnual = cuotaMensual * plazoMeses - valorPrestamo;
    const totalPagar = cuotaMensual * plazoMeses;
    const interesesMensual = interesAnual / 12 / 100 ;

    
    this.resultado_simulador = {
      cuota_mensual: cuotaMensual,
      intereses_anual: interesesAnual,
      intereses_mensual: parseInt(interesesMensual.toFixed(2)),
      seguro_mensual: seguroValor,
      total_pagar: totalPagar,
    }
  }

  

}
