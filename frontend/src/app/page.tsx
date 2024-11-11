"use client";

import Head from 'next/head';
import styles from './styles/Login.module.css';
import { useLogin } from '@/hooks/auth/useLogin';
import { useState} from 'react';
import Cookies from "js-cookie";

export default function Login() {
  const { login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); 

    try {
        await login(email, password);
        const currentUserCookie = Cookies.get("currentUser");
        if (!currentUserCookie) {
            setError("No se encontró el usuario actual");
            return;
        }
        const currentUser = JSON.parse(currentUserCookie);
        if (currentUser.role === "admin") {
            window.location.href = "/home/admin";
            return;
        }else if (currentUser.role === "seller") {
            window.location.href = "/home/seller";
            return;
        }else if (currentUser.role === "buyer") {
            window.location.href = "/home/buyer";
            return;
        }
    } catch (error) {
        setError("Correo o contraseña incorrectos");
        console.error("Error en el login:", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <Head>
          <title>Iniciar Sesión - TuMarketplace</title>
        </Head>
        <div className={styles.logo}>
          <span className={styles.logoLetter}>M</span>
        </div>
        <h2>Iniciar Sesión</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div className={styles.forgotPassword}>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <div className={styles.signup}>
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}