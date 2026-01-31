// 'use client';
// import { useEffect, useState } from 'react';

// export default function AddProductDrawer({
//   open,
//   onClose,
//   onAdded,
//   editData
// }) {
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null);

//   const [shortDescription, setShortDescription] = useState('');
// const [longDescription, setLongDescription] = useState('');

//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     type: '',
//     price: '',
//     offer: '',
//     stock: ''
//   });

//   useEffect(() => {
//     if (editData) {
//       setForm({
//         name: editData.name || '',
//         description: editData.description || '',
//         type: editData.type || '',
//         price: editData.price || '',
//         offer: editData.offer || '',
//         stock: editData.stock || ''
//       });
//     } else {
//       setForm({
//         name: '',
//         description: '',
//         type: '',
//         price: '',
//         offer: '',
//         stock: ''
//       });
//       setImage(null);
//     }
//   }, [editData, open]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       Object.keys(form).forEach(k => formData.append(k, form[k]));
//       if (image) formData.append('image', image);

//       const url = editData
//         ? `/api/products/${editData._id}`
//         : '/api/products/create';

//       const method = editData ? 'PUT' : 'POST';

//       const res = await fetch(url, { method, body: formData });
//       if (!res.ok) throw new Error();

//       onAdded();
//       onClose();
//     } catch {
//       alert('Save failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`drawer ${open ? 'open' : ''}`}>
//       <div className="drawer-header">
//         <h3>{editData ? 'Edit Product' : 'Add Product'}</h3>
//         <button type="button" className='delete' onClick={onClose}>✕</button>
//       </div>

//       <form onSubmit={submitHandler} className="drawer-form">

//         {/* IMAGE */}
//         <div className="field">
//           <label>Product Image</label>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             required={!editData}
//           />
//         </div>

//         {/* NAME */}
//         <div className="field">
//           <label>Product Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* DESCRIPTION */}
//         <div className="field">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* TYPE */}
//         <div className="field">
//           <label>Product Type</label>
//           <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Type</option>
//             <option value="hand-made bricks">Hand-made Bricks</option>
//             <option value="wire-cut bricks">Wire-cut Bricks</option>
//             <option value="machine-cut bricks">Machine-cut Bricks</option>
//             <option value="cement bricks">Cement Bricks</option>
//           </select>
//         </div>

//         {/* PRICE */}
//         <div className="field">
//           <label>Price</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* OFFER */}
//         {/* <div className="field">
//           <label>Offer (%)</label>
//           <input
//             type="number"
//             name="offer"
//             value={form.offer}
//             onChange={handleChange}
//           />
//         </div> */}

//         {/* STOCK */}
//         <div className="field">
//           <label>Stock (Bricks Count)</label>
//           <input
//             type="number"
//             name="stock"
//             value={form.stock}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button disabled={loading} className="submit-btn">
//           {loading ? 'Saving…' : editData ? 'Update Product' : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// }



'use client';
import { useEffect, useState } from 'react';

export default function AddProductDrawer({
  open,
  onClose,
  onAdded,
  editData
}) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  // 🔹 FORM STATE
  const [form, setForm] = useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    type: '',
    price: '',
    stock: ''
  });

  // 🔁 EDIT MODE LOAD
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || '',
        shortDescription: editData.shortDescription || '',
        longDescription: editData.longDescription || '',
        type: editData.type || '',
        price: editData.price || '',
        stock: editData.stock || ''
      });
    } else {
      setForm({
        name: '',
        shortDescription: '',
        longDescription: '',
        type: '',
        price: '',
        stock: ''
      });
      setImage(null);
    }
  }, [editData, open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🚀 SUBMIT
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      console.log("formdata", formData)

      if (image) formData.append('image', image);

      const url = editData
        ? `/api/products/${editData._id}`
        : '/api/products/create';

      const method = editData ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error();

      onAdded();
      onClose();
    } catch (err) {
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`drawer ${open ? 'open' : ''}`}>
      <div className="drawer-header sep">
        <h3>{editData ? 'Edit Product' : 'Add Product'}</h3>
        <button type="button" className="delete" onClick={onClose}>✕</button>
      </div>

      <form onSubmit={submitHandler} className="drawer-form">

        {/* IMAGE */}
        <div className="field">
          <label>Product Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editData}
          />
        </div>

        {/* NAME */}
        <div className="field">
          <label>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="field">
          <label>Short Description (List Page)</label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            required
          />
        </div>

        {/* LONG DESCRIPTION */}
        <div className="field">
          <label>Long Description (Details Page)</label>
          <textarea
            name="longDescription"
            value={form.longDescription}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {/* TYPE */}
        <div className="field">
          <label>Product Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="hand-made bricks">Hand-made Bricks</option>
            <option value="wire-cut bricks">Wire-cut Bricks</option>
            <option value="machine-cut bricks">Machine-cut Bricks</option>
            <option value="cement bricks">Cement Bricks</option>
          </select>
        </div>

        {/* PRICE */}
        <div className="field">
          <label>Price (per brick)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* STOCK */}
        <div className="field">
          <label>Stock (Bricks Count)</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <button disabled={loading} className="submit-btn">
          {loading ? 'Saving…' : editData ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
