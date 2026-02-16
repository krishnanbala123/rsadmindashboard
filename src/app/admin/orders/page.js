
'use client';

import { useEffect, useState } from 'react';
import './orders.css';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '@/components/invoice/InvoicePDF';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function OrdersPage() {
  const [editMode, setEditMode] = useState('payment'); 
// payment | delivery

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  // payment modal
  const [payOrder, setPayOrder] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  // 🔄 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', { cache: 'no-store' });

      if (!res.ok) {
        toast.error('Failed to load orders ❌',
           {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
        );
        setOrders([]);
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error('Server error while fetching orders ❌',
         {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔍 SEARCH
  const filteredOrders = orders.filter(o =>
    String(o.phone || '').includes(search)
  );

  // ✅ VERIFY ORDER
  const verifyOrder = async (order) => {
    const ok = confirm('Verify this order and notify customer?');
    if (!ok) return;

    const res = await fetch(`/api/orders/${order._id}/verify`, {
      method: 'PUT'
    });

    if (!res.ok) {
      toast.error('Order verification failed ❌',
         {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }

    const updated = await res.json();

    setOrders(prev =>
      prev.map(o => (o._id === updated._id ? updated : o))
    );

    toast.success('Order verified successfully ✅', 
      {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );

 
//     const item = updated.items?.[0];
//     const msg = `
//  RS Bricks-Nellai’s Leading Brick Manufacturer & Supplier

// Hello ${order.name},
// Your order (${order.orderId}) has been VERIFIED.

// Bricks Type: ${item?.type || '-'}
// Quantity: ${item?.quantity || 0}
// BricksRate: ₹${item?.rate || 0}
// TotalAmount: ₹${updated.totalAmount}
// PaidAmount: ₹${updated.paidAmount}
// BalanceAmount: ₹${updated.remainingAmount}

// RS Bricks team will contact you shortly.
// `.trim();

//     window.open(
//       `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`,
//       '_blank'
//     );

// WhatsApp message
const item = updated.items?.[0];
console.log(item);


const msg = `
RS Bricks – Nellai’s Leading Brick Manufacturer & Supplier

Hello ${order.name},

Your order (${order.orderId}) has been VERIFIED ✅

Order Details:
Brick Type : ${item?.type || '-'}
Bricks     : ${item?.quantity || 0}
Rate       : ₹${item?.rate || 0}

Amount Details:
Material Total : ₹${(updated.totalAmount - (updated.delAmount || 0))}
Delivery Charge: ₹${updated.delAmount || 0}
Grand Total    : ₹${updated.totalAmount}

 Paid Amount  : ₹${updated.paidAmount}
 Balance      : ₹${updated.remainingAmount}

Our RS Bricks team will contact you shortly.

Thank you for choosing RS Bricks 
`.trim();

window.open(
  `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`,
  '_blank'
);


  };

  // 🗑️ DELETE ORDER
  const deleteOrder = async (id) => {
    const ok = confirm('Payment completed. Move order to history?');
    if (!ok) return;

    const res = await fetch(`/api/orders/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      toast.error('Move to history failed ❌',
              {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }

    setOrders(prev => prev.filter(o => o._id !== id));

    toast.success('Order moved to history 🗑️', 
          {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
    );
  };

  // 📍 MAP
  const openMap = (loc) => {
    if (!loc?.lat || !loc?.lng) {
      toast.error('Location not available❌',
                  {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }
    window.open(
      `https://www.google.com/maps?q=${loc.lat},${loc.lng}`,
      '_blank'
    );
  };

  return (
    <div className="orders-page">

      {/* HEADER */}
      <div className="orders-header">
        <h2>Orders</h2>
        <input
          className="search-input"
          placeholder="Search by phone number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


<Paper sx={{ width: '100%', borderRadius: 3 }}>
  <DataGrid
    autoHeight
    getRowHeight={() => 75}

    rows={filteredOrders.map((order) => ({
      id: order._id,
      orderId: order.orderId,
      name: order.name,
      phone: order.phone,
      date: new Date(order.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      brickType: order.items?.[0]?.type,
      rate: order.items?.[0]?.rate,
      quantity: order.items?.[0]?.quantity,
      totalAmount: order.totalAmount,
      delAmount: order.delAmount,
      paidAmount: order.paidAmount,
      remainingAmount: order.remainingAmount,
      paymentStatus: order.paymentStatus,
      verified: order.verified,
      location: order.location,
      fullOrder: order,
    }))}

    columns={[
      { field: 'orderId', headerName: 'Order ID', minWidth: 140 },
      { field: 'name', headerName: 'Name', minWidth: 150 },
      { field: 'phone', headerName: 'Phone', minWidth: 140 },
      { field: 'date', headerName: 'Date & Time', minWidth: 200 },
      { field: 'brickType', headerName: 'Brick Type', minWidth: 140 },
      { field: 'rate', headerName: 'Rate', minWidth: 110 },
      { field: 'quantity', headerName: 'Bricks', minWidth: 110 },
      { field: 'totalAmount', headerName: 'Total', minWidth: 120 },
      { field: 'delAmount', headerName: 'Delivery', minWidth: 120 },
      { field: 'paidAmount', headerName: 'Paid', minWidth: 120 },

      {
        field: 'remainingAmount',
        headerName: 'Balance',
        minWidth: 130,
        renderCell: (params) =>
          params.value > 0 ? (
            <Chip label={`₹${params.value}`} color="error" />
          ) : (
            <Chip label={`₹${params.value}`} color="success" />
          ),
      },

      {
        field: 'paymentStatus',
        headerName: 'Payment',
        minWidth: 140,
        renderCell: (params) =>
          params.value === 'completed' ? (
            <Chip label="Completed" color="success" />
          ) : (
            <Chip label="Pending" color="warning" />
          ),
      },

      {
        field: 'verified',
        headerName: 'Verified',
        minWidth: 110,
        renderCell: (params) =>
          params.value ? (
            <Chip label="Yes" color="success" />
          ) : (
            <Chip label="No" color="default" />
          ),
      },

      {
        field: 'location',
        headerName: 'Location',
        minWidth: 140,
        renderCell: (params) =>
          params.value?.lat ? (
            <Button
              size="small"
              variant="outlined"
              onClick={() => openMap(params.row.fullOrder.location)}
            >
              View Map
            </Button>
          ) : (
            '-'
          ),
      },

      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 360,
        sortable: false,
        renderCell: (params) => {
  const order = params.row.fullOrder;

  const btnStyle = {
    height: 28,
    minWidth: 60,
    padding: '0 8px',
    fontSize: '12px',
    textTransform: 'none',
  };

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      {!order.verified && (
        <Button
          variant="contained"
          color="primary"
          sx={btnStyle}
          onClick={() => verifyOrder(order)}
        >
          Verify
        </Button>
      )}

      <Button
        variant="outlined"
        sx={btnStyle}
        onClick={() => {
          setEditMode('payment');
          setPayOrder(order);
          setPayAmount(order.paidAmount);
        }}
      >
        Payment
      </Button>

      <Button
        variant="outlined"
        sx={btnStyle}
        onClick={() => {
          setEditMode('delivery');
          setPayOrder(order);
          setPayAmount(order.delAmount);
        }}
      >
        Delivery
      </Button>


      <PDFDownloadLink
        document={<InvoicePDF order={order} />}
        fileName={`Invoice-${order.orderId}.pdf`}
      >
        {({ loading }) => (
          <Button
            variant="contained"
            sx={btnStyle}
          >
            {loading ? '...' : 'Invoice'}
          </Button>
        )}
      </PDFDownloadLink>

      {order.paymentStatus === 'completed' && (
        <Button
          variant="contained"
          color="error"
          sx={btnStyle}
          onClick={() => deleteOrder(order._id)}
        >
          Delete
        </Button>
      )}
    </Stack>
  );
}

      },
    ]}

    pageSizeOptions={[5, 10, 20]}
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
        padding: '0 14px',
      },

      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    }}
  />
</Paper>



      {/* PAYMENT MODAL */}
      {payOrder && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              {editMode === 'delivery'
                ? 'Update Delivery Charges'
                : 'Update Payment'}
            </h3>

            <p><b>{payOrder.orderId}</b></p>
            <p>Total Amount: ₹{payOrder.totalAmount}</p>

            <input
              type="number"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder={
                editMode === 'delivery'
                  ? 'Delivery Amount'
                  : 'Paid Amount'
              }

            />

            <div className="modal-actions">
              <button
                className="save"
                onClick={async () => {

                  const url =
                    editMode === 'delivery'
                      ? `/api/orders/${payOrder._id}/delivery`
                      : `/api/orders/${payOrder._id}/payment`;

                  const body =
                    editMode === 'delivery'
                      ? { deliveryAmount: Number(payAmount) }
                      : { paidAmount: Number(payAmount) };

                  const res = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                  });

                  const data = await res.json();

                  if (!res.ok) {
                    toast.error(data.error || 'Update failed ❌', {
                      className: `border-path-toast1 run-${Date.now()}`,
                      duration: 4000,
                    });
                    return;
                  }

                  setOrders(prev =>
                    prev.map(o =>
                      o._id === data._id ? data : o
                    )
                  );

                  toast.success(
                    editMode === 'delivery'
                      ? 'Delivery updated successfully 🚚'
                      : 'Payment updated successfully 💰',
                    {
                      className: `border-path-toast run-${Date.now()}`,
                      duration: 4000,
                    }
                  );

                  setPayOrder(null);
                  setPayAmount('');
                }}

              >
                Save
              </button>

              <button
                className="cancel"
                onClick={() => setPayOrder(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



