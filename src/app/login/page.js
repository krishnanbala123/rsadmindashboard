// 'use client';
// import { useState } from 'react';
// import './login.css';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/admin/dashboard');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//       console.log()
//       router.push('/admin/dashboard');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-card">
//         <h2>RS Bricks Admin</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="input"
//           value={email}
//           autoComplete="off"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input"
//           value={password}
//           autoComplete="new-password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="login-btn" onClick={handleLogin}>
//           Login
//         </button>

//         <div className="divider">OR</div>

//         <button className="google-btn" onClick={handleGoogleLogin}>
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import './login.css';
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
        alert('Access denied. Admin only!');
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

      // ✅ STORE EMAIL FOR ADMIN GUARD
      localStorage.setItem('userEmail', user.email);

      router.push('/admin/dashboard');
    } catch (error) {
      alert(error.message);
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
        alert('Access denied. Admin only!');
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

      router.push('/admin/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>RS Bricks Admin</h2>

        {/* <input
          type="email"
          placeholder="Admin Email"
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

        <div className="divider">OR</div> */}

        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

