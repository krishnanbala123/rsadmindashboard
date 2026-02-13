'use client';

import { useState } from 'react';
import './login/login.css';
import toast from 'react-hot-toast';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // 🔐 EMAIL + PASSWORD LOGIN
  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = res.user;

      // ❌ ADMIN CHECK
      if (user.email !== ADMIN_EMAIL) {
        toast.error('Access denied. Admin only ❌', 
                  {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
        );
        await auth.signOut();
        return;
      }

      // ✅ SAVE USER IN DB
      await fetch('/api/users/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Admin',
          photoURL: user.photoURL || '',
          role: 'admin'
        })
      });

      localStorage.setItem('userEmail', user.email);

      toast.success('Login successful ✅',
            {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );

      router.push('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed ❌',
                {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
    }
  };

  // 🔐 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // ❌ ADMIN CHECK
      if (user.email !== ADMIN_EMAIL) {
        toast.error('Access denied. Admin only ❌',
                  {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
        );
        await auth.signOut();
        return;
      }

      // ✅ SAVE USER IN DB
      await fetch('/api/users/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'Admin',
          photoURL: user.photoURL || '',
          role: 'admin'
        })
      });

      localStorage.setItem('userEmail', user.email);

      toast.success('Google login successful ✅',
            {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );

      router.push('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Google login failed ❌',
                {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>RS Bricks Admin</h2>

        {/* EMAIL LOGIN (optional – commented) */}
        {/*
        <input
          type="email"
          placeholder="Admin Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="divider">OR</div>
        */}

        {/* GOOGLE LOGIN */}
        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
