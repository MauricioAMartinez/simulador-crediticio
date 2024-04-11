import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SimuladorComponent } from './simulador.component';

describe('SimuladorComponent', () => {
  let component: SimuladorComponent;
  let fixture: ComponentFixture<SimuladorComponent>;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimuladorComponent],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SimuladorComponent);
    component = fixture.componentInstance;
    form = component.formulario_simulador;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Formulario', () => {
    it('debería ser inválido inicialmente', () => {
      expect(form.valid).toBeFalsy();
    });

    it('debería ser válido con todos los campos completados correctamente', () => {
      form.get('tipo_credito')?.setValue(1);
      form.get('valor_credito')?.setValue(1000000);
      form.get('plazo_meses')?.setValue(12);
      form.get('simular_con_seguro')?.setValue(1);
      form.get('tipo_poliza')?.setValue(1);
      form.get('genero')?.setValue(1);
      form.get('fecha_nacimiento')?.setValue('01/01/1980');

      expect(form.valid).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "tipo_credito" está vacío', () => {
      const errors = form.get('tipo_credito')?.errors;
      expect(errors['required']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "valor_credito" está vacío', () => {
      const errors = form.get('valor_credito').errors;
      expect(errors['required']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "valor_credito" es menor a $500.000', () => {
      form.get('valor_credito').setValue(499999);
      const errors = form.get('valor_credito').errors;
      expect(errors['min']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "valor_credito" es mayor a $100.000.000', () => {
      form.get('valor_credito').setValue(100000001);
      const errors = form.get('valor_credito').errors;
      expect(errors['max']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "plazo_meses" está vacío', () => {
      const errors = form.get('plazo_meses').errors;
      expect(errors['required']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "plazo_meses" es menor a 3', () => {
      form.get('plazo_meses').setValue(2);
      const errors = form.get('plazo_meses').errors;
      expect(errors['min']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "plazo_meses" es mayor a 36', () => {
      form.get('plazo_meses').setValue(37);
      const errors = form.get('plazo_meses').errors;
      expect(errors['max']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "simular_con_seguro" está vacío', () => {
      const errors = form.get('simular_con_seguro').errors;
      expect(errors['required']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "tipo_poliza" está vacío', () => {
      const errors = form.get('tipo_poliza').errors;
      expect(errors['required']).toBeTruthy();
    });

    it('debería mostrar mensaje de error si el campo "
