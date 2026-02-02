'use client';

import { useEffect, useState } from 'react';
import './orders.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '@/components/invoice/InvoicePDF';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');


  // payment modal
  const [payOrder, setPayOrder] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  // 🔄 FETCH ORDERS (SAFE & FINAL)
  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', { cache: 'no-store' });

      if (!res.ok) {
        console.error('Orders API failed');
        setOrders([]);
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, []);

  // setInterval(() =>{
  //   console.log("TEST TEST")
  //   document.querySelectorAll("script")?.forEach(svg => svg.remove());
  // },1000)

  // 🔍 SEARCH BY PHONE
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
      alert('Verify failed');
      return;
    }

    const updated = await res.json();

    setOrders(prev =>
      prev.map(o => (o._id === updated._id ? updated : o))
    );

    // WhatsApp message
    const msg = `
  RS Bricks-Nellai’s Leading Brick Manufacturer & Supplier
Hello ${order.name},

Your order (${order.orderId}) has been VERIFIED ✅

Bricks: ${updated.noOfBricks}
Brick/Rate: ₹${updated.brickRate}  
Total: ₹${updated.totalAmount}
Paid: ₹${updated.paidAmount}
Balance: ₹${updated.remainingAmount}

RS Bricks team will contact you shortly        
`.trim();
    console.log("openingwhatsapp", order.phone);
    
    window.open(
      `https://wa.me/91${order.phone}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const deleteOrder = async (id) => {
  const ok = confirm('Payment completed. Move order to history?');
  if (!ok) return;

  const res = await fetch(`/api/orders/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    alert('Move to history failed');
    return;
  }

  // UI remove
  setOrders(prev => prev.filter(o => o._id !== id));
};


  // 📍 VIEW MAP
  const openMap = (loc) => {
    if (!loc?.lat || !loc?.lng) {
      alert('Location not available');
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
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date&Time</th>
              <th>Brick Type</th>      
              <th>Rate / Brick</th>
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
                <td colSpan="11">No orders found</td>
              </tr>
            )}

            {filteredOrders.map(order => (
              <tr key={order._id}>

                <td data-label="Order ID">{order.orderId}</td>
                <td data-label="Name">{order.name}</td>
                <td data-label="Phone">{order.phone}</td>
                {/* <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td> */}
                <td data-label="Date">
  {new Date(order.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
</td>
                <td data-label="Brick Type"> {order.items[0].type}</td>
                <td data-label="Rate / Brick">₹{order.items[0].rate}</td>
                <td data-label="Bricks">{order.items[0].quantity}</td>
                <td data-label="Total">₹{order.totalAmount}</td>
                <td data-label="Paid">₹{order.paidAmount}</td>

                <td
                  data-label="Balance"
                  className={
                    order.remainingAmount > 0
                      ? 'balance-red'
                      : 'balance-green'
                  }
                >
                  ₹{order.remainingAmount}
                </td>

                <td data-label="Payment">
                  {order.paymentStatus === 'completed'
                    ? 'Completed'
                    : 'Pending'}
                </td>

                <td data-label="Verified">
                  {order.verified ? 'Yes' : 'No'}
                </td>

                <td data-label="Location">
                  {order.location?.lat ? (
                    <button
                      className="map-btn"
                      onClick={() => openMap(order.location)}
                    >
                      View Map
                    </button>
                  ) : '-'}
                </td>

                {/* ACTIONS */}
                <td data-label="Action">
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
      </div>

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
              className='save'
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
                    alert(data.error);
                    return;
                  }

                  setOrders(prev =>
                    prev.map(o =>
                      o._id === data._id ? data : o
                    )
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
