import React, { useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';

const Table = ({ columns, data }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // The useFilter Hook provides a way to set the filter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // Adding the useFilters Hook to the table
    useSortBy // This plugin Hook will help to sort our table columns
    // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */

  const [filterInput, setFilterInput] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value || undefined;
    setFilter('show.name', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  return (
    <>
      <input
        value={filterInput}
        placeholder="search name ....."
        onChange={handleFilterChange}
        className="input"
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? 'sort-desc'
                            : 'sort-asc'
                          : ''}
                      </span>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically

            // Each row can be rendered directly as a string using the react-table render method
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
