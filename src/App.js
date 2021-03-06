import React from 'react';
import axios from 'axios';
import Table from './Table';
import Genres from './Genres';
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
        // first group - TV Show
        Header: 'TV Show',
        // first group column
        columns: [
          {
            Header: 'Name',
            accessor: 'show.name',
          },
          {
            Header: 'Type',
            accessor: 'show.type',
          },
        ],
      },
      {
        // second group - Details
        Header: 'Details',
        // second group columns
        columns: [
          {
            Header: 'Language',
            accessor: 'show.language',
          },
          {
            Header: 'Genre(s)',
            accessor: 'show.genres',
            // Cell method will provide the cell value; we pass it to render a custom component
            Cell: ({ value }) => <Genres genres={value} />,
          },
          {
            Header: 'Runtime',
            accessor: 'show.runtime',
            // Cell method will provide the value of the cell; we can create a custom element for the Cell
            Cell: ({ value }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? 's' : ''}` : ''}{' '}
                  {min > 0 ? `${min} min${min > 1 ? 's' : ''}` : ''}
                </>
              );
            },
          },
          {
            Header: 'Status',
            accessor: 'show.status',
          },
        ],
      },
    ];
  });

  useEffect(() => {
    (async () => {
      const result = await axios('https://api.tvmaze.com/search/shows?q=snow');
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}
