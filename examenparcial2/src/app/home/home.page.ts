import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Calificacion, calificacionesService } from '../calificaciones.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  calificacionesText = '';
  calificaciones$: Observable<Calificacion[]> = new Observable(); // Cambiar a Observable para Firestore
  editingCalificacionId: string | null = null;

  constructor(private calificacionService: calificacionesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.calificaciones$ = this.calificacionService.getCalificaciones(); // Obtener tareas desde Firestore
  }

  addCalificacion() {
    if (this.calificacionesText.trim()) {
      const newCalificacion: Calificacion = { title: this.calificacionesText, done: false };

      if (this.editingCalificacionId) {
        this.calificacionService.updateCalificacion(this.editingCalificacionId, { title: this.calificacionesText }).then(() => {
          this.editingCalificacionId = null;
          this.calificacionesText = '';
        });
      } else {
        this.calificacionService.addCalificacion(newCalificacion).then(() => {
          this.calificacionesText = '';
        });
      }
    }
  }

  editCalificacion(calificacion: Calificacion) {
    this.calificacionesText = calificacion.title;
    this.editingCalificacionId = calificacion.id || null;
  }

  deleteCal(calificacionId: string) {
    this.calificacionService.deleteCalificacion(calificacionId);
  }

  async logout() {
    try {
      await this.authService.logout();
      alert('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}