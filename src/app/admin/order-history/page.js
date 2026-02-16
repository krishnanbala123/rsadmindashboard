'use client';

import { useEffect, useState } from 'react';
import './order-history.css';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';


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
{/* <div className="table-wrapper">
  <Paper sx={{ height: 500, width: '100%', borderRadius: 3 }}>
    <DataGrid
      rows={filteredOrders.map((o) => ({
        id: o._id,
        orderId: o.orderId,
        name: o.name,
        phone: o.phone,
        totalAmount: o.totalAmount,
        completedAt: new Date(o.updatedAt).toLocaleDateString(),
      }))}

      columns={[
        { field: 'orderId', headerName: 'Order ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        {
          field: 'totalAmount',
          headerName: 'Total',
          flex: 1,
          renderCell: (params) => `₹${params.value}`,
        },
        { field: 'completedAt', headerName: 'Completed At', flex: 1 },
      ]}

      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: { paginationModel: { pageSize: 5, page: 0 } },
      }}

      disableRowSelectionOnClick
      getRowHeight={() => 70}

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
</div> */}

<Paper sx={{ width: '100%', borderRadius: 3 }}>
  <DataGrid
    autoHeight
    getRowHeight={() => 70}

    rows={filteredOrders.map((o) => ({
      id: o._id,
      orderId: o.orderId,
      name: o.name,
      phone: o.phone,
      totalAmount: o.totalAmount,
      completedAt: new Date(o.updatedAt).toLocaleDateString(),
    }))}

    columns={[
      { field: 'orderId', headerName: 'Order ID', flex: 1, minWidth: 140 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
      {
        field: 'totalAmount',
        headerName: 'Total',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => `₹${params.value}`,
      },
      { field: 'completedAt', headerName: 'Completed At', flex: 1.2, minWidth: 160 },
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



    </div>
  );
}
