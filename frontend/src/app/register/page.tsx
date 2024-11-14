"use client";

import Head from 'next/head';
import styles from '../styles/Register.module.css';
import { useRegister } from '@/hooks/auth/useRegister';
import { useLogin } from '@/hooks/auth/useLogin';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const { login } = useLogin();
  const { register } = useRegister();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Cambiar el rol seleccionado
  const handleRoleClick = (newRole: 'buyer' | 'seller' | 'admin') => {
    setRole(newRole);
  };

  // Validar las contraseñas
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

  // Manejo del envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    
    if (!validatePasswords()) {
      return;
    }

    try {
      const userInfo =await register(email, name, lastName, password, role);
      await login(email, password);

      console.log(userInfo);
      
      // Redirigir a la página correspondiente según el rol
      if (userInfo.role === "admin") {
        window.location.href = "/home/admin";
      } else if (userInfo.role === "seller") {
        window.location.href = "/home/seller";
      } else if (userInfo.role === "buyer") {
        window.location.href = "/home/buyer";
      }
    } catch (error) {
      setError("Error en el registro");
      console.error("Error en el registro:", error);
    }
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
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="ejemplo@correo.com" 
          />

          <label htmlFor="name">Nombre</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Tu nombre" 
          />

          <label htmlFor="lastName">Apellido</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            required 
            placeholder="Tu apellido" 
          />

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
            >
              Comprador
            </div>
            <div 
              className={`${styles.roleOption} ${role === 'seller' ? styles.active : ''}`}
              onClick={() => handleRoleClick('seller')}
            >
              Vendedor
            </div>
            <div 
              className={`${styles.roleOption} ${role === 'admin' ? styles.active : ''}`}
              onClick={() => handleRoleClick('admin')}
            >
              Admin
            </div>
          </div>

          <input type="hidden" id="role" name="role" value={role} />
          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit">Registrarse</button>
        </form>

        <div className={styles.login}>
          ¿Ya tienes una cuenta? 
          <Link href="/">
            <a>Inicia sesión</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
