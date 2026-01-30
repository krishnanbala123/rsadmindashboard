'use client';

import { useEffect, useState } from 'react';
import './users.css';

export default function UserLoginsPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []));
  }, []);

  // 🔍 FILTER LOGIC
  const filteredUsers = users.filter(u => {
    const date = new Date(u.lastLogin);

    const searchMatch = search
      ? (u.email?.includes(search) )
      : true;

    const yearMatch = year
      ? date.getFullYear() === Number(year)
      : true;

    const monthMatch = month
      ? date.getMonth() + 1 === Number(month)
      : true;

    return searchMatch && yearMatch && monthMatch;
  });

  return (
    <div className="users-page">

      {/* HEADER */}
      <div className="users-header">
        <h2>User Login History</h2>

        {/* RIGHT SIDE FILTERS */}
        <div className="filters">
          <input
            placeholder="Search email"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={year} onChange={e => setYear(e.target.value)}>
            <option value="">All Years</option>
            {Array.from({ length: 10 }).map((_, i) => {
              const y = new Date().getFullYear() - i;
              return <option key={y} value={y}>{y}</option>;
            })}
          </select>

          <select value={month} onChange={e => setMonth(e.target.value)}>
            <option value="">All Months</option>
            {[
              'Jan','Feb','Mar','Apr','May','Jun',
              'Jul','Aug','Sep','Oct','Nov','Dec'
            ].map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Phone</th> */}
              <th>Role</th>
              <th>Last Login</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}

            {filteredUsers.map(u => (
              <tr key={u._id}>
                <td>{u.name || '-'}</td>
                <td>{u.email}</td>
                {/* <td>{u.phone || '-'}</td> */}
                <td>{u.role}</td>
                <td>
                  {new Date(u.lastLogin).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
