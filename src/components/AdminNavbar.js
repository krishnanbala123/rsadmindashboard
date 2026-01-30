// 'use client';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// export default function AdminNavbar({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen
// }) {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setUser(auth.currentUser);
//   }, []);

//   // outside click close
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClick);
//     return () => document.removeEventListener('mousedown', handleClick);
//   }, []);

//   const handleLogout = async () => {
//     await signOut(auth);
//     router.push('/login');
//   };

//   return (
//     <header className="admin-navbar">
//       {/* LEFT */}
//       <div className="left">
//         <button
//           className="desktop-toggle"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           ☰
//         </button>

//         <button
//           className="mobile-toggle"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           ☰
//         </button>

//        <div className="brand">
//     <Image
//       src="/bricks-logo.png"
//       alt="RS Bricks"
//       width={120}
//       height={60}
//       priority
//     />
//   </div>
//       </div>

//       {/* RIGHT */}
//       <div className="right" ref={dropdownRef}>
//         {user && (
//           <>
//             <div
//               className="profile"
//               onClick={() => setOpen(!open)}
//             >
//               <img
//                 src={user.photoURL || '/user.png'}
//                 alt="profile"
//                 className="avatar"
//               />
//             </div>

//             {open && (
//               <div className="profile-dropdown">
//                 <p className="name">
//                   {user.displayName || 'Admin'}
//                 </p>
//                 <button onClick={handleLogout}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </header>
//   );
// }


'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminNavbar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const router = useRouter();

  const handleToggle = () => {
    if (window.innerWidth <= 768) {
      setMobileOpen(!mobileOpen); // 📱 mobile
    } else {
      setCollapsed(!collapsed);   // 🖥 desktop
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="topbar">
      <button className="toggle-btn" onClick={handleToggle}>
        ☰
      </button>

      <div className="topbar-right">
        <img
          src={auth.currentUser?.photoURL || '/user.png'}
          className="avatar"
        />
        <button className='logout' onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
