
'use client';
import { useEffect, useState } from 'react';
import AddProductDrawer from './AddProductDrawer';
import './products.css';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
      {/* <table className="products-table">
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
      </table> */}
{/* <Paper sx={{ height: 600, width: '100%', borderRadius: 3 }}>
  <DataGrid
    getRowHeight={() => 90}   // ✅ Important (force row height)

    rows={products.map((p) => ({
      id: p._id,
      image: p.image?.url,
      name: p.name,
      shortDescription: p.shortDescription,
      type: p.type,
      price: p.price,
      stock: p.stock,
      fullProduct: p,
    }))}

    columns={[
      {
        field: 'image',
        headerName: 'Image',
        width: 130,
        sortable: false,
        renderCell: (params) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={params.value}
              alt="product"
              style={{
                width: 65,
                height: 65,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
        ),
      },

      { field: 'name', headerName: 'Name', flex: 1 },

      {
        field: 'shortDescription',
        headerName: 'Description',
        flex: 1.5,
        renderCell: (params) => params.value || '—',
      },

      { field: 'type', headerName: 'Type', flex: 1 },

      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        renderCell: (params) => `₹${params.value}`,
      },

      { field: 'stock', headerName: 'Stock', flex: 1 },

      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params) =>
          params.row.stock >= 2000 ? (
            <Chip label="In Stock" color="success" />
          ) : (
            <Chip label="Out of Stock" color="error" />
          ),
      },

      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1.4,
        sortable: false,
        renderCell: (params) => {
          const product = params.row.fullProduct;

          return (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={() => openEdit(product)}
              >
                Edit
              </Button>

              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(product)}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ]}

    pageSizeOptions={[5, 10]}
    initialState={{
      pagination: { paginationModel: { pageSize: 5, page: 0 } },
    }}

    disableRowSelectionOnClick

    sx={{
      border: 0,

      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f8f9fa',
        fontWeight: 600,
      },

      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    }}
  />
</Paper> */}
<Paper sx={{ width: '100%', borderRadius: 3 }}>
  <DataGrid
    autoHeight
    getRowHeight={() => 90}

    rows={products.map((p) => ({
      id: p._id,
      image: p.image?.url,
      name: p.name,
      shortDescription: p.shortDescription,
      type: p.type,
      price: p.price,
      stock: p.stock,
      fullProduct: p,
    }))}

    columns={[
      {
        field: 'image',
        headerName: 'Image',
        minWidth: 130,
        sortable: false,
        renderCell: (params) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={params.value}
              alt="product"
              style={{
                width: 65,
                height: 65,
                objectFit: 'cover',
                borderRadius: 8,
              }}
            />
          </div>
        ),
      },

      { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },

      {
        field: 'shortDescription',
        headerName: 'Description',
        flex: 1.5,
        minWidth: 220,
        renderCell: (params) => params.value || '—',
      },

      { field: 'type', headerName: 'Type', flex: 1, minWidth: 140 },

      {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => `₹${params.value}`,
      },

      { field: 'stock', headerName: 'Stock', flex: 1, minWidth: 120 },

      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 160,
        renderCell: (params) =>
          params.row.stock >= 2000 ? (
            <Chip label="In Stock" color="success" />
          ) : (
            <Chip label="Out of Stock" color="error" />
          ),
      },

      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 200,
        sortable: false,
        renderCell: (params) => {
          const product = params.row.fullProduct;

          return (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Button
                size="small"
                variant="contained"
                onClick={() => openEdit(product)}
              >
                Edit
              </Button>

              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(product)}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ]}

    pageSizeOptions={[5, 10]}
    initialState={{
      pagination: { paginationModel: { pageSize: 5, page: 0 } },
    }}

    disableRowSelectionOnClick

    sx={{
      border: 0,

      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#f8f9fa',
        fontWeight: 600,
      },

      '& .MuiDataGrid-cell': {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
      },

      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    }}
  />
</Paper>




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
