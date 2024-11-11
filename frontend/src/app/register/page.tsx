"use client";

import Head from 'next/head';
import styles from '../styles/Register.module.css';
import { useState, FormEvent } from 'react';

export default function Register() {
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRoleClick = (newRole: 'buyer' | 'seller' | 'admin') => {
    setRole(newRole);
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Datos de registro:', data);
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
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Contraseña segura" 
          />

          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
            placeholder="Confirma tu contraseña" 
          />
          {passwordError && <span className={styles.error}>{passwordError}</span>}

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