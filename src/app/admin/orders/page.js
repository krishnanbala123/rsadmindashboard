// 'use client';

// import { useEffect, useState } from 'react';
// import './orders.css';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDF from '@/components/invoice/InvoicePDF';
// import toast from 'react-hot-toast';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState('');


//   // payment modal
//   const [payOrder, setPayOrder] = useState(null);
//   const [payAmount, setPayAmount] = useState('');

//   // 🔄 FETCH ORDERS (SAFE & FINAL)
//   const fetchOrders = async () => {
//     try {
//       const res = await fetch('/api/orders', { cache: 'no-store' });

//       if (!res.ok) {
//         console.error('Orders API failed');
//         setOrders([]);
//         return;
//       }

//       const text = await res.text();
//       const data = text ? JSON.parse(text) : [];
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Fetch orders error:', err);
//       setOrders([]);
//     }
//   };

//   useEffect(() => {
//     fetchOrders()
//   }, []);

//   // setInterval(() =>{
//   //   console.log("TEST TEST")
//   //   document.querySelectorAll("script")?.forEach(svg => svg.remove());
//   // },1000)

//   // 🔍 SEARCH BY PHONE
//   const filteredOrders = orders.filter(o =>
//     String(o.phone || '').includes(search)
//   );

//   // ✅ VERIFY ORDER
//   const verifyOrder = async (order) => {
//     const ok = confirm('Verify this order and notify customer?');
//     if (!ok) return;

//     const res = await fetch(`/api/orders/${order._id}/verify`, {
//       method: 'PUT'
//     });

//     if (!res.ok) {
//       alert('Verify failed');
//       return;
//     }

//     const updated = await res.json();

//     setOrders(prev =>
//       prev.map(o => (o._id === updated._id ? updated : o))
//     );

//     // WhatsApp message
//     const msg = `
//   RS Bricks-Nellai’s Leading Brick Manufacturer & Supplier
// Hello ${order.name},

// Your order (${order.orderId}) has been VERIFIED ✅

// Bricks: ${updated.noOfBricks}
// Brick/Rate: ₹${updated.brickRate}  
// Total: ₹${updated.totalAmount}
// Paid: ₹${updated.paidAmount}
// Balance: ₹${updated.remainingAmount}

// RS Bricks team will contact you shortly        
// `.trim();
//     console.log("openingwhatsapp", order.phone);
    
//     window.open(
//       `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`,
//       '_blank'
//     );
//   };

//   const deleteOrder = async (id) => {
//   const ok = confirm('Payment completed. Move order to history?');
//   if (!ok) return;

//   const res = await fetch(`/api/orders/${id}`, {
//     method: 'DELETE'
//   });

//   if (!res.ok) {
//     alert('Move to history failed');
//     return;
//   }

//   // UI remove
//   setOrders(prev => prev.filter(o => o._id !== id));
// };


//   // 📍 VIEW MAP
//   const openMap = (loc) => {
//     if (!loc?.lat || !loc?.lng) {
//       alert('Location not available');
//       return;
//     }
//     window.open(
//       `https://www.google.com/maps?q=${loc.lat},${loc.lng}`,
//       '_blank'
//     );
//   };

//   return (
//     <div className="orders-page">

//       {/* HEADER */}
//       <div className="orders-header">
//         <h2>Orders</h2>
//         <input
//           className="search-input"
//           placeholder="Search by phone number"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Date&Time</th>
//               <th>Brick Type</th>      
//               <th>Rate / Brick</th>
//               <th>Bricks</th>
//               <th>Total</th>
//               <th>Paid</th>
//               <th>Balance</th>
//               <th>Payment</th>
//               <th>Verified</th>
//               <th>Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.length === 0 && (
//               <tr>
//                 <td colSpan="11">No orders found</td>
//               </tr>
//             )}

//             {filteredOrders.map(order => (
//               <tr key={order._id}>

//                 <td data-label="Order ID">{order.orderId}</td>
//                 <td data-label="Name">{order.name}</td>
//                 <td data-label="Phone">{order.phone}</td>
//                 {/* <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td> */}
//                 <td data-label="Date">
//   {new Date(order.createdAt).toLocaleString("en-IN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   })}
// </td>
//                 <td data-label="Brick Type"> {order.items[0].type}</td>
//                 <td data-label="Rate / Brick">₹{order.items[0].rate}</td>
//                 <td data-label="Bricks">{order.items[0].quantity}</td>
//                 <td data-label="Total">₹{order.totalAmount}</td>
//                 <td data-label="Paid">₹{order.paidAmount}</td>

//                 <td
//                   data-label="Balance"
//                   className={
//                     order.remainingAmount > 0
//                       ? 'balance-red'
//                       : 'balance-green'
//                   }
//                 >
//                   ₹{order.remainingAmount}
//                 </td>

//                 <td data-label="Payment">
//                   {order.paymentStatus === 'completed'
//                     ? 'Completed'
//                     : 'Pending'}
//                 </td>

//                 <td data-label="Verified">
//                   {order.verified ? 'Yes' : 'No'}
//                 </td>

//                 <td data-label="Location">
//                   {order.location?.lat ? (
//                     <button
//                       className="map-btn"
//                       onClick={() => openMap(order.location)}
//                     >
//                       View Map
//                     </button>
//                   ) : '-'}
//                 </td>

//                 {/* ACTIONS */}
//                 <td data-label="Action">
//                   <div className="action-buttons">

//                     {!order.verified && (
//                       <button
//                         className="verify-btn"
//                         onClick={() => verifyOrder(order)}
//                       >
//                         Verify
//                       </button>
//                     )}

//                     <button
//                       className="pay-btn"
//                       onClick={() => {
//                         setPayOrder(order);
//                         setPayAmount(order.paidAmount);
//                       }}
//                     >
//                       Update Payment
//                     </button>

//                     <PDFDownloadLink
//                       document={<InvoicePDF order={order} />}
//                       fileName={`Invoice-${order.orderId}.pdf`}
//                     >
//                       {({ loading }) => (
//                         <button className="invoice-btn">
//                           {loading ? 'Preparing…' : 'Invoice'}
//                         </button>
//                       )}
//                     </PDFDownloadLink>

//                     {order.paymentStatus === 'completed' && (
//                       <button
//                         className="delete-btn"
//                         onClick={() => deleteOrder(order._id)}
//                       >
//                         Delete
//                       </button>
//                     )}

//                   </div>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAYMENT MODAL */}
//       {payOrder && (
//         <div className="modal-backdrop">
//           <div className="modal">
//             <h3>Update Payment</h3>

//             <p><b>{payOrder.orderId}</b></p>
//             <p>Total Amount: ₹{payOrder.totalAmount}</p>

//             <input
//               type="number"
//               value={payAmount}
//               onChange={(e) => setPayAmount(e.target.value)}
//               placeholder="Paid Amount"
//             />

//             <div className="modal-actions">
//               <button
//               className='save'
//                 onClick={async () => {
//                   const res = await fetch(
//                     `/api/orders/${payOrder._id}/payment`,
//                     {
//                       method: 'PUT',
//                       headers: { 'Content-Type': 'application/json' },
//                       body: JSON.stringify({
//                         paidAmount: Number(payAmount)
//                       })
//                     }
//                   );

//                   const data = await res.json();

//                   if (!res.ok) {
//                     alert(data.error);
//                     return;
//                   }

//                   setOrders(prev =>
//                     prev.map(o =>
//                       o._id === data._id ? data : o
//                     )
//                   );

//                   setPayOrder(null);
//                   setPayAmount('');
//                 }}
//               >
//                 Save
//               </button>

//               <button
//                 className="cancel"
//                 onClick={() => setPayOrder(null)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




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

    // WhatsApp message
    const item = updated.items?.[0];
    const msg = `
 RS Bricks-Nellai’s Leading Brick Manufacturer & Supplier

Hello ${order.name},
Your order (${order.orderId}) has been VERIFIED.

Brick Type: ${item?.type || '-'}
Bricks: ${item?.quantity || 0}
Rate: ₹${item?.rate || 0}
Total: ₹${updated.totalAmount}
Paid: ₹${updated.paidAmount}
Balance: ₹${updated.remainingAmount}

RS Bricks team will contact you shortly.
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

      {/* TABLE */}
      {/* <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date & Time</th>
              <th>Brick Type</th>
              <th>Rate</th>
              <th>Bricks</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Payment</th>
              <th>Verified</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="14">No orders found</td>
              </tr>
            )}

            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>
                  {new Date(order.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
                <td>{order.items[0].type}</td>
                <td>₹{order.items[0].rate}</td>
                <td>{order.items[0].quantity}</td>
                <td>₹{order.totalAmount}</td>
                <td>₹{order.paidAmount}</td>
                <td
                  className={
                    order.remainingAmount > 0
                      ? 'balance-red'
                      : 'balance-green'
                  }
                >
                  ₹{order.remainingAmount}
                </td>
                <td>
                  {order.paymentStatus === 'completed'
                    ? 'Completed'
                    : 'Pending'}
                </td>
                <td>{order.verified ? 'Yes' : 'No'}</td>
                <td>
                  {order.location?.lat ? (
                    <button
                      className="map-btn"
                      onClick={() => openMap(order.location)}
                    >
                      View Map
                    </button>
                  ) : '-'}
                </td>
                <td>
                  <div className="action-buttons">
                    {!order.verified && (
                      <button
                        className="verify-btn"
                        onClick={() => verifyOrder(order)}
                      >
                        Verify
                      </button>
                    )}

                    <button
                      className="pay-btn"
                      onClick={() => {
                        setPayOrder(order);
                        setPayAmount(order.paidAmount);
                      }}
                    >
                      Update Payment
                    </button>

                    <PDFDownloadLink
                      document={<InvoicePDF order={order} />}
                      fileName={`Invoice-${order.orderId}.pdf`}
                    >
                      {({ loading }) => (
                        <button className="invoice-btn">
                          {loading ? 'Preparing…' : 'Invoice'}
                        </button>
                      )}
                    </PDFDownloadLink>

                    {order.paymentStatus === 'completed' && (
                      <button
                        className="delete-btn"
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* MUI TABLE */}
{/* <div className="table-wrapper">
  <Paper sx={{ height: 600, width: '100%' }}>
    <DataGrid
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
        paidAmount: order.paidAmount,
        remainingAmount: order.remainingAmount,
        paymentStatus: order.paymentStatus,
        verified: order.verified,
        location: order.location,
        fullOrder: order,
      }))}
      columns={[
        { field: 'orderId', headerName: 'Order ID', width: 130 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'date', headerName: 'Date & Time', width: 170 },
        { field: 'brickType', headerName: 'Brick Type', width: 130 },
        { field: 'rate', headerName: 'Rate', width: 100 },
        { field: 'quantity', headerName: 'Bricks', width: 100 },
        { field: 'totalAmount', headerName: 'Total', width: 110 },
        { field: 'paidAmount', headerName: 'Paid', width: 110 },
        {
          field: 'remainingAmount',
          headerName: 'Balance',
          width: 120,
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
          width: 120,
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
          width: 100,
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
          width: 120,
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
          width: 320,
          renderCell: (params) => {
            const order = params.row.fullOrder;

            return (
              <Stack direction="row" spacing={1}>
                {!order.verified && (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => verifyOrder(order)}
                  >
                    Verify
                  </Button>
                )}

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setPayOrder(order);
                    setPayAmount(order.paidAmount);
                  }}
                >
                  Update
                </Button>

                <PDFDownloadLink
                  document={<InvoicePDF order={order} />}
                  fileName={`Invoice-${order.orderId}.pdf`}
                >
                  {({ loading }) => (
                    <Button size="small" variant="contained">
                      {loading ? 'Preparing…' : 'Invoice'}
                    </Button>
                  )}
                </PDFDownloadLink>

                {order.paymentStatus === 'completed' && (
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            );
          },
        },
      ]}
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5, page: 0 } },
      }}
      disableRowSelectionOnClick
      sx={{ border: 0 }}
    />
  </Paper>
</div> */}

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
        // renderCell: (params) => {
        //   const order = params.row.fullOrder;

        //   return (
        //     <Stack direction="row" spacing={1}>
        //       {!order.verified && (
        //         <Button
        //           size="small"
        //           variant="contained"
        //           color="primary"
        //           onClick={() => verifyOrder(order)}
        //         >
        //           Verify
        //         </Button>
        //       )}

        //       <Button
        //         size="small"
        //         variant="outlined"
        //         onClick={() => {
        //           setPayOrder(order);
        //           setPayAmount(order.paidAmount);
        //         }}
        //       >
        //         Update
        //       </Button>

        //       <PDFDownloadLink
        //         document={<InvoicePDF order={order} />}
        //         fileName={`Invoice-${order.orderId}.pdf`}
        //       >
        //         {({ loading }) => (
        //           <Button size="small" variant="contained">
        //             {loading ? 'Preparing…' : 'Invoice'}
        //           </Button>
        //         )}
        //       </PDFDownloadLink>

        //       {order.paymentStatus === 'completed' && (
        //         <Button
        //           size="small"
        //           variant="contained"
        //           color="error"
        //           onClick={() => deleteOrder(order._id)}
        //         >
        //           Delete
        //         </Button>
        //       )}
        //     </Stack>
        //   );
        // },
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
          setPayOrder(order);
          setPayAmount(order.paidAmount);
        }}
      >
        Update
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
            <h3>Update Payment</h3>

            <p><b>{payOrder.orderId}</b></p>
            <p>Total Amount: ₹{payOrder.totalAmount}</p>

            <input
              type="number"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder="Paid Amount"
            />

            <div className="modal-actions">
              <button
                className="save"
                onClick={async () => {
                  const res = await fetch(
                    `/api/orders/${payOrder._id}/payment`,
                    {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        paidAmount: Number(payAmount)
                      })
                    }
                  );

                  const data = await res.json();

                  if (!res.ok) {
                    toast.error(data.error || 'Payment update failed ❌',
                              {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  } 
                    );
                    return;
                  }

                  setOrders(prev =>
                    prev.map(o =>
                      o._id === data._id ? data : o
                    )
                  );

                  toast.success('Payment updated successfully 💰',
                         {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
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



