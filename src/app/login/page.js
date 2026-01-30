'use client';
import { useState } from 'react';
import './login.css';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log()
      router.push('/admin/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>RS Bricks Admin</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="divider">OR</div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}


