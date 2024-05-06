import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestClientsService } from 'src/app/services/request-clients.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss'],
})
export class ResultadoComponent implements OnChanges {
  @Input() formulario: any;
  @Input() resultado: any;
  @Input() loading: boolean = false;

  finalizado: boolean = false;

  formulario_solicitud: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private requestClientsService: RequestClientsService
  ) {
    this.formulario_solicitud = this.formBuilder.group({
      tipo_credito: [{ value: '', disabled: true }, Validators.required],
      valor_credito: [{ value: '', disabled: true }],
      plazo_meses: [{ value: '', disabled: true }],
      tipo_poliza: [{ value: '', disabled: true }],
      genero: [{ value: '', disabled: true }],
      simular_con_seguro: [{ value: '', disabled: true }],
      fecha_nacimiento: [{ value: '', disabled: true }],
      tasa_interes: [{ value: '12.5%', disabled: true }],
      interes_mensual: [{ value: '', disabled: true }],
      valor_cuota: [{ value: '', disabled: true }],
      valor_seguro: [{ value: '', disabled: true }],
      valor_total_credito: [{ value: '', disabled: true }],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });

    // Habilitar campos específicos
    this.formulario_solicitud.get('nombres')?.enable();
    this.formulario_solicitud.get('apellidos')?.enable();
    this.formulario_solicitud.get('correo')?.enable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formulario'] && this.formulario) {
      this.patchFormulario(changes['formulario'].currentValue);
    }
    if (changes['resultado'] && this.resultado) {
      this.patchResultado(changes['resultado'].currentValue);
    }
  }

  patchFormulario(formularioData: any): void {
    this.formulario_solicitud.patchValue({
      tipo_credito: formularioData.tipo_credito,
      valor_credito: formularioData.valor_credito,
      plazo_meses: formularioData.plazo_meses,
      tipo_poliza: formularioData.tipo_poliza,
      genero: formularioData.genero,
      simular_con_seguro: formularioData.simular_con_seguro,
      fecha_nacimiento: formularioData.fecha_nacimiento,
    });
  }

  patchResultado(resultadoData: any): void {
    this.formulario_solicitud.patchValue({
      interes_mensual: resultadoData.intereses_mensual,
      valor_cuota: resultadoData.cuota_mensual,
      valor_seguro: resultadoData.seguro_mensual,
      valor_total_credito: resultadoData.total_pagar,
    });
  }

  setForm(): void {
    const resultado = {
      ...this.formulario_solicitud.value,
      ...this.formulario,
      ...this.resultado,
    };
    this.requestClientsService
      .postClient(resultado)

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.finalizado = true;
      }, 1000);

  }

}
