import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'  // Hace que este servicio esté disponible en toda la aplicación.
})

export class FirebaseService {

  // Inyecta los servicios de autenticación y firestore para Firebase.
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // ===== Autenticación =====

  // Método que permite iniciar sesión a un usuario registrado en Firebase utilizando email y contraseña.
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  // Método que permite registrar a un nuevo usuario en Firebase con email y contraseña.
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Método para cerrar sesión
  logout() {
    return this.auth.signOut();
  }

  // Método que permite actualizar el nombre de usuario (displayName) en el perfil del usuario actual.
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // ===== Base de Datos Firestore =====
  // Método que permite guardar un documento en una colección de Firestore en la ruta especificada.
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Método que permite obtener un documento de Firestore desde la ruta especificada.
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
}
