"use client";

import Head from 'next/head';
import styles from '../styles/Register.module.css';
import { useState, FormEvent } from 'react';

export default function Register() {
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');

  const handleRoleClick = (newRole: 'buyer' | 'seller' | 'admin') => {
    setRole(newRole);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Datos de registro:', data);
    // Aquí puedes enviar los datos a tu servidor
  };

  return (
    <div className={styles.body}>
      <div className={styles.registerContainer}>
        <Head>
          <title>Registro - TuMarketplace</title>
        </Head>
        <div className={styles.logo}>
          <span className={styles.logoLetter}>M</span>
        </div>
        <h2>Registro</h2>
        <form id="registerForm" onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" required placeholder="ejemplo@correo.com" />

          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required placeholder="Tu nombre" />

          <label htmlFor="lastName">Apellido</label>
          <input type="text" id="lastName" name="lastName" required placeholder="Tu apellido" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" required placeholder="Contraseña segura" />

          <label>Rol</label>
          <div className={styles.roleSelector}>
            <div
              className={`${styles.roleOption} ${role === 'buyer' ? styles.active : ''}`}
              onClick={() => handleRoleClick('buyer')}
              data-role="buyer"
            >
              Comprador
            </div>
            <div
              className={`${styles.roleOption} ${role === 'seller' ? styles.active : ''}`}
              onClick={() => handleRoleClick('seller')}
              data-role="seller"
            >
              Vendedor
            </div>
            <div
              className={`${styles.roleOption} ${role === 'admin' ? styles.active : ''}`}
              onClick={() => handleRoleClick('admin')}
              data-role="admin"
            >
              Admin
            </div>
          </div>
          <input type="hidden" id="role" name="role" value={role} />

          <button type="submit">Registrarse</button>
        </form>
        <div className={styles.login}>
          ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
