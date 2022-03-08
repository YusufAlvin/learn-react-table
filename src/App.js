import React from 'react';
import axios from 'axios';
import Table from './Table';
// import Genres from './Genres';
import { useState, useEffect, useMemo } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */

  const columns = useMemo(() => {
    return [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'User Id',
        accessor: 'userId',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
    ];
  });

  useEffect(() => {
    (async () => {
      const result = await axios('https://jsonplaceholder.typicode.com/posts');
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
