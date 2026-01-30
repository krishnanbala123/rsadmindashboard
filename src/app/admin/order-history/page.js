'use client';

import { useEffect, useState } from 'react';
import './order-history.css';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  // 🔄 FETCH HISTORY ORDERS
  useEffect(() => {
    fetch('/api/orders/history')
      .then(res => res.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, []);

  // 🔍 FILTER LOGIC
  const filteredOrders = orders.filter(o => {
    const date = new Date(o.updatedAt);

    const phoneMatch = search
      ? String(o.phone).includes(search)
      : true;

    const yearMatch = year
      ? date.getFullYear() === Number(year)
      : true;

    const monthMatch = month
      ? date.getMonth() + 1 === Number(month)
      : true;

    return phoneMatch && yearMatch && monthMatch;
  });

  // 💰 MONTHLY TOTAL
  const monthlyTotal = filteredOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  return (
    <div className="history-page">
      <h2>Order History</h2>

      {/* 🔍 FILTER BAR */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={year} onChange={e => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="2031">2031</option>
          <option value="2032">2032</option>
          <option value="2033">2033</option>
          <option value="2034">2034</option>
          <option value="2035">2035</option>
        </select>

        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {/* 💰 MONTH TOTAL */}
      <div className="month-total">
        Monthly Total : <b>₹{monthlyTotal}</b>
      </div>

      {/* 📋 TABLE */}
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Completed At</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="5">No history found</td>
              </tr>
            )}

            {filteredOrders.map(o => (
              <tr key={o._id}>
                <td data-label="Order ID">{o.orderId}</td>
                <td data-label="Name">{o.name}</td>
                <td data-label="Phone">{o.phone}</td>
                <td data-label="Total">₹{o.totalAmount}</td>
                <td data-label="Completed At">
                  {new Date(o.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
