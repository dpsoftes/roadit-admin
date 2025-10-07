import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { I18nService } from '@i18n/i18n.service';
import { TranslatePipe } from '@i18n//translate.pipe';
import { EnvironmentService } from '@services/environment.service';
import { ApiService, EndPoints } from '@services';
import { LoginRequestDto, LoginResponseDto } from '@dtos';
import { GlobalStore } from '@store/global';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  
  private globalStore = inject(GlobalStore);
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private i18nService: I18nService,
    private envService: EnvironmentService,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailOrUsernameValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Ejemplo de uso del environment service
    if (this.envService.isDevelopment) {
      console.log('🔧 Modo desarrollo activado');
      console.log('API URL:', this.envService.apiUrl);
      console.log('Environment info:', this.envService.getEnvironmentInfo());
      
      // Verificar que ApiService está configurado correctamente
      console.log('🌐 ApiService Base URL:', this.apiService.getBaseUrl());
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      try {
        // Crear el DTO de request
        const loginRequest = new LoginRequestDto({
          username: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
        });

        // Llamar al API
        const loginResponse = await this.apiService.post<LoginResponseDto>(
          EndPoints.login,
          loginRequest.toJson()
        );

        // Convertir la respuesta a DTO
        const loginDto = LoginResponseDto.fromJson(loginResponse);

        // Actualizar el GlobalStore con los datos del usuario
        this.globalStore.setUser(loginDto);

        // El guard se encargará automáticamente de la redirección
        // pero agregamos un fallback por si hay problemas de timing
        setTimeout(() => {
          if (this.globalStore.isAuthenticated()) {
            this.router.navigate(['']);
          }
        }, 50);
        
      } catch (error) {
        console.error('Error en login:', error);
        // TODO: Mostrar mensaje de error al usuario
        // this.showErrorMessage(this.i18nService.translate('login.error'));
      } finally {
        this.isLoading.set(false);
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onForgotPassword(): void {
    // TODO: Implementar lógica de recuperación de contraseña
    console.log('Recuperar contraseña');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get emailError(): string | null {
    const control = this.emailControl;
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return this.i18nService.translate('login.email_required');
      if (control.errors['invalidEmail']) return this.i18nService.translate('login.email_invalid');
    }
    return null;
  }

  get passwordError(): string | null {
    const control = this.passwordControl;
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return this.i18nService.translate('login.password_required');
      if (control.errors['minlength']) return this.i18nService.translate('login.password_min');
    }
    return null;
  }

  // Validador personalizado: Si contiene @ debe ser email válido, sino cualquier string
  emailOrUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null; // El required se encarga de valores vacíos
    }
    
    // Si contiene @, debe ser un email válido
    if (value.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { invalidEmail: true };
      }
    }
    
    // Si no contiene @, es válido como username
    return null;
  }
}