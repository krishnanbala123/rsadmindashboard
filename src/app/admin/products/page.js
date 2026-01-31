// 'use client';
// import { useEffect, useState } from 'react';
// import AddProductDrawer from './AddProductDrawer';
// import './products.css';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);

//   // 🔄 FETCH PRODUCTS
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products', { cache: 'no-store' });

//       if (!res.ok) {
//         console.error('API failed', res.status);
//         setProducts([]);
//         return;
//       }

//       const text = await res.text();
//       const data = text ? JSON.parse(text) : [];
//       setProducts(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Fetch products error:', err);
//       setProducts([]);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ✏️ EDIT
//   const openEdit = (product) => {
//     setEditProduct(product);
//     setOpen(true);
//   };

//   // ❌ DELETE (RULE BASED)
//  const handleDelete = async (product) => {
//   const ok = confirm(`Delete "${product.name}"?`);
//   if (!ok) return;

//   const res = await fetch('/api/products', {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id: product._id })
//   });

//   if (res.ok) {
//     fetchProducts(); // 🔄 refresh list
//   } else {
//     alert('Delete failed');
//   }
// };

//   return (
//     <div className="products-page">

//       {/* HEADER */}
//       <div className="products-header">
//         <h2>All Products</h2>
//         <button
//           className="add-btn"
//           onClick={() => {
//             setEditProduct(null); // ADD MODE
//             setOpen(true);
//           }}
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* TABLE */}
//       <table className="products-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length === 0 && (
//             <tr>
//               <td colSpan="6">No products found</td>
//             </tr>
//           )}

//           {products.map(p => (
//             <tr key={p._id}>
//               <td data-label="Image">
//                 <img src={p.image?.url} width="50" />
//               </td>

//               <td data-label="Name">{p.name}</td>

//               <td data-label="Description">{p.description}</td>

// <td data-label="Status">
//   {p.status === 'in-stock' ? (
//     <span className="status-in">In Stock</span>
//   ) : (
//     <span className="status-out">Out of Stock</span>
//   )}
// </td>

//               <td data-label="Price">₹{p.price}</td>

//               <td data-label="Stock">{p.stock}</td>

//               {/* <td data-label="Status">
//                 {p.status ? (
//                   <span className="status-true">True</span>
//                 ) : (
//                   <span className="status-false">False</span>
//                 )}
//               </td> */}

//               <td data-label="Actions" className="actions">
//                 <button onClick={() => openEdit(p)}>
//                   Edit
//                 </button>

//                 <button
//                   className="danger"
//                   onClick={() => handleDelete(p)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ADD / EDIT DRAWER */}
//       <AddProductDrawer
//         open={open}
//         editData={editProduct}
//         onClose={() => {
//           setOpen(false);
//           setEditProduct(null);
//         }}
//         onAdded={fetchProducts}
//       />
//     </div>
//   );
// }




// 'use client';
// import { useEffect, useState } from 'react';
// import AddProductDrawer from './AddProductDrawer';
// import './products.css';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);

//   // 🔄 FETCH PRODUCTS
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products', { cache: 'no-store' });

//       if (!res.ok) {
//         console.error('API failed', res.status);
//         setProducts([]);
//         return;
//       }

//       const text = await res.text();
//       const data = text ? JSON.parse(text) : [];
//       setProducts(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Fetch products error:', err);
//       setProducts([]);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ✏️ EDIT
//   const openEdit = (product) => {
//     setEditProduct(product);
//     setOpen(true);
//   };

//   // ❌ DELETE (ALWAYS ALLOW)
//   const handleDelete = async (product) => {
//     const ok = confirm(`Delete "${product.name}"?`);
//     if (!ok) return;

//     const res = await fetch('/api/products', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: product._id })
//     });

//     if (res.ok) {
//       fetchProducts();
//     } else {
//       alert('Delete failed');
//     }
//   };

//   return (
//     <div className="products-page">

//       {/* 🔝 HEADER */}
//       <div className="products-header">
//         <h2>All Products</h2>
//         <button
//           className="add-btn"
//           onClick={() => {
//             setEditProduct(null); // ADD MODE
//             setOpen(true);
//           }}
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* 📋 TABLE */}
//       <table className="products-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length === 0 && (
//             <tr>
//               <td colSpan="8">No products found</td>
//             </tr>
//           )}

//           {products.map(p => {
//             // 🔥 STATUS LOGIC (AUTO)
//             const status =
//               Number(p.stock) < 2000 ? 'out-of-stock' : 'in-stock';

//             return (
//               <tr key={p._id}>
//                 <td data-label="Image">
//                   <img src={p.image?.url} width="50" />
//                 </td>

//                 <td data-label="Name">{p.name}</td>

//                 <td data-label="Description">
//                   {p.description || '—'}
//                 </td> 

//                    <td data-label="type">{p.type}</td>

//                 <td data-label="Price">₹{p.price}</td>

//                 <td data-label="Stock">{p.stock}</td>

//                 <td data-label="Status">
//                   {status === 'in-stock' ? (
//                     <span className="status-in">In Stock</span>
//                   ) : (
//                     <span className="status-out">Out of Stock</span>
//                   )}
//                 </td>

//                 <td data-label="Actions" className="actions">
//                   <button className='edit' onClick={() => openEdit(p)}>Edit</button>
//                   <button
//                     className="danger"
//                     onClick={() => handleDelete(p)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* ➕ ADD / ✏️ EDIT DRAWER */}
//       <AddProductDrawer
//         open={open}
//         editData={editProduct}
//         onClose={() => {
//           setOpen(false);
//           setEditProduct(null);
//         }}
//         onAdded={fetchProducts}
//       />
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import AddProductDrawer from './AddProductDrawer';
import './products.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // 🔄 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });

      if (!res.ok) {
        console.error('API failed', res.status);
        setProducts([]);
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      console.log(data)
      setProducts(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error('Fetch products error:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✏️ EDIT
  const openEdit = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  // ❌ DELETE
  const handleDelete = async (product) => {
    const ok = confirm(`Delete "${product.name}"?`);
    if (!ok) return;

    const res = await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product._id })
    });

    if (res.ok) {
      fetchProducts();
    } else {
      alert('Delete failed');
    }
  };

  return (
    <div className="products-page">

      {/* 🔝 HEADER */}
      <div className="products-header">
        <h2>All Products</h2>
        <button
          className="add-btn"
          onClick={() => {
            setEditProduct(null);
            setOpen(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* 📋 TABLE */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}

          {products.map(p => {
            // 🔥 AUTO STATUS
            const status =
              Number(p.stock) < 2000 ? 'out-of-stock' : 'in-stock';

            return (
              <tr key={p._id}>
                <td data-label="Image">
                  <img src={p.image?.url} width="50" alt={p.name} />
                </td>

                <td data-label="Name">{p.name}</td>

                <td data-label="Short Description">
                  {p.shortDescription || '—'}
                </td>

                <td data-label="Type">{p.type}</td>

                <td data-label="Price">₹{p.price}</td>

                <td data-label="Stock">{p.stock}</td>

                <td data-label="Status">
                  {status === 'in-stock' ? (
                    <span className="status-in">In Stock</span>
                  ) : (
                    <span className="status-out">Out of Stock</span>
                  )}
                </td>

                <td data-label="Actions" className="actions">
                  <button className="edit" onClick={() => openEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="danger"
                    onClick={() => handleDelete(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ➕ ADD / ✏️ EDIT DRAWER */}
      <AddProductDrawer
        open={open}
        editData={editProduct}
        onClose={() => {
          setOpen(false);
          setEditProduct(null);
        }}
        onAdded={fetchProducts}
      />
    </div>
  );
}
