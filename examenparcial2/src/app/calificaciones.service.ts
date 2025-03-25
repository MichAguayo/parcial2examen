
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Calificacion {
  id?: string;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class calificacionesService {
  private calificacionesCollection = collection(this.firestore, 'calificaciones');

  constructor(private firestore: Firestore) {}

  getCalificaciones(): Observable<Calificacion[]> {
    return collectionData(this.calificacionesCollection, { idField: 'id' }) as Observable<Calificacion[]>;
  }

  addCalificacion(calificacion: Calificacion) {
    return addDoc(this.calificacionesCollection, calificacion);
  }

  updateCalificacion(id: string, data: Partial<Calificacion>) {
    const calificacionDoc = doc(this.firestore, `calificaciones/${id}`);
    return updateDoc(calificacionDoc, data);
  }

  deleteCalificacion(id: string) {
    const calificacionDoc = doc(this.firestore, `calificaciones/${id}`);
    return deleteDoc(calificacionDoc);
  }
}