import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination.js';
import SearchBar from '../components/searchBar.js';
import TableHeader from '../components/tableHeader.js';
import { saveState, loadState } from '../utils/localStorage.js';
import '../App.css'

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState(loadState('search') || '');
  const [sortConfig, setSortConfig] = useState(loadState('sortConfig') || null);
  const [page, setPage] = useState(loadState('page') || 1);
  const [pageSize, setPageSize] = useState(loadState('pageSize') || 10);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  // Filter + Sort + Paginate
  useEffect(() => {
    let filtered = [...comments];
    if (search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortConfig) {
      const { field, direction } = sortConfig;
      filtered.sort((a, b) => {
        if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setDisplayed(filtered.slice(start, end));

    // Save state
    saveState('search', search);
    saveState('sortConfig', sortConfig);
    saveState('page', page);
    saveState('pageSize', pageSize);
  }, [comments, search, sortConfig, page, pageSize]);

  return (
    <div className="container">
      <h2>Comments Dashboard</h2>
      <button onClick={() => navigate('/profile')}>Go to Profile</button>

      <SearchBar value={search} onChange={setSearch} />

      <TableHeader sortConfig={sortConfig} setSortConfig={setSortConfig} />

      <table>
        <tbody>
          {displayed.map(item => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={comments.length}
        currentPage={page}
        pageSize={pageSize}
        setCurrentPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default Dashboard;
