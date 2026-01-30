// 'use client';

// import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

// export default function AuthGuard({ children }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push('/login');
//       } else {
//         setLoading(false);
//       }
//     });

//     return () => unsub();
//   }, [router]);

//   if (loading) return <p>Loading...</p>;

//   return children;
// }


'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // ❌ not logged in
      if (!user) {
        router.replace('/login');
        return;
      }

      // ❌ not admin
      if (user.email !== ADMIN_EMAIL) {
        alert('Access denied. Admin only!');
        auth.signOut();
        router.replace('/login');
        return;
      }

      // ✅ admin
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return <div style={{ padding: 40 }}>Checking access…</div>;
  }

  return children;
}

