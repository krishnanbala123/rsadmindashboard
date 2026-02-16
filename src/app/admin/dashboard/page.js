
'use client';
import { useEffect, useState } from 'react';
import './dashboard.css';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
  const res = await fetch('/api/users', { cache: 'no-store' });
  const data = await res.json();
  setUsers(Array.isArray(data) ? data : []);
};

  const [userStats, setUserStats] = useState({
  totalUsers: 0,
  admins: 0,
  todayActiveUsers: 0
});

const [recentLogins, setRecentLogins] = useState([]);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        cache: 'no-store'
      });

      if (!res.ok) {
        console.error('Dashboard API failed');
        return;
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      setUserStats(data);
      setRecentLogins(data.recentLogins || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
  };

  fetchDashboard();
}, []);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard', {
          cache: 'no-store'
        });

        if (!res.ok) return;

        const data = await res.json();

        if (isMounted) {
          setStats({
            totalProducts: data.totalProducts,
            totalOrders: data.totalOrders,
            pendingOrders: data.pendingOrders,
            totalRevenue: data.totalRevenue
          });

          // 🔥 latest 5 orders always replace old ones
          setRecentOrders(data.recentOrders || []);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    // 🚀 initial load
    fetchData();

    // 🔁 AUTO REFRESH EVERY 5 SECONDS (KEY FIX)
    const interval = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* SUMMARY */}
      <div className="dashboard-cards">
        <div className="card">
          <p>Total Products</p>
          <h3>{stats.totalProducts}</h3>
        </div>

        <div className="card">
          <p>Total Orders</p>
          <h3>{stats.totalOrders}</h3>
        </div>

        <div className="card">
          <p>Pending Orders</p>
          <h3>{stats.pendingOrders}</h3>
        </div>

        <div className="card">
          <p>Total Revenue</p>
          <h3>₹{stats.totalRevenue}</h3>
        </div>

{/* <div className="card">
  <p>Total Users</p>
  <h3>{users.length}</h3>
</div> */}
<div className="card">
  <p>Total Users</p>
  <h3>{userStats.totalUsers}</h3>
</div>
      </div>

      {/* RECENT ORDERS */}
      {/* <div className="recent-orders">
        <h3>Recent Orders (Latest 5)</h3>

        {recentOrders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Name</th>
                <th>Phone</th>
                 <th>Date</th>
                <th>Paid</th>               
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td data-label="Order ID">{order.orderId}</td>
                  <td data-label="Name">{order.name}</td>
                  <td data-label="Phone">{order.phone}</td>
                                    <td data-label="Date">
                                   {new Date(order.createdAt).toLocaleDateString()}
                           </td>
                  <td data-label="Paid">₹{order.paidAmount}</td>
                  <td data-label="Status">
                    <span
                      className={`status ${
                        order.paymentStatus === 'completed'
                          ? 'completed'
                          : 'pending'
                      }`}
                    >
                      {order.paymentStatus === 'completed'
                        ? 'Completed'
                        : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div> */}


      {/* <div className="recent-orders">
  <h3>Recent Orders (Latest 5)</h3>

  {recentOrders.length === 0 ? (
    <p>No orders yet</p>
  ) : (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={recentOrders.map((order) => ({
          id: order._id,
          orderId: order.orderId,
          name: order.name,
          phone: order.phone,
          date: new Date(order.createdAt).toLocaleDateString(),
          paidAmount: order.paidAmount,
          paymentStatus: order.paymentStatus,
        }))}
       columns={[
  { field: 'orderId', headerName: 'Order ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  {
    field: 'paidAmount',
    headerName: 'Paid',
    flex: 1,
    renderCell: (params) => `₹${params.value}`,
  },
  {
    field: 'paymentStatus',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) =>
      params.value === 'completed'
        ? <Chip label="Completed" color="success" />
        : <Chip label="Pending" color="warning" />,
  },
]}

        pageSizeOptions={[5]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  )}
</div> */}

<div className="recent-orders">
  <h3>Recent Orders (Latest 5)</h3>

  {recentOrders.length === 0 ? (
    <p>No orders yet</p>
  ) : (
    <Paper sx={{ width: '100%', borderRadius: 3 }}>
      <DataGrid
        autoHeight
        getRowHeight={() => 65}

        rows={recentOrders.map((order) => ({
          id: order._id,
          orderId: order.orderId,
          name: order.name,
          phone: order.phone,
          date: new Date(order.createdAt).toLocaleDateString(),
          paidAmount: order.paidAmount,
          paymentStatus: order.paymentStatus,
        }))}

        columns={[
          { field: 'orderId', headerName: 'Order ID', flex: 1, minWidth: 140 },
          { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
          { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
          { field: 'date', headerName: 'Date', flex: 1, minWidth: 130 },
          {
            field: 'paidAmount',
            headerName: 'Paid',
            flex: 1,
            minWidth: 120,
            renderCell: (params) => `₹${params.value}`,
          },
          {
            field: 'paymentStatus',
            headerName: 'Status',
            flex: 1,
            minWidth: 140,
            renderCell: (params) =>
              params.value === 'completed'
                ? <Chip label="Completed" color="success" size="small" />
                : <Chip label="Pending" color="warning" size="small" />,
          },
        ]}

        pageSizeOptions={[5]}
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
            padding: '0 12px',
          },

          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
        }}
      />
    </Paper>
  )}
</div>



{/* <div className='recent-orders'>
<h3>Recent User Logins</h3>

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Last Login</th>
    </tr>
  </thead>

  <tbody>
    {recentLogins.map(u => (
      <tr key={u._id}>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
        <td>{new Date(u.lastLogin).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>
</div> */}

    </div>
  );
}
