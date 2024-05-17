'use client';

import React, { useState } from 'react';

import {
  Table,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';

import { auditTableData } from './audit-data';

const rowsPerPageOptions = [5, 10, 25];

const AuditTable = ({ auditData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };

  const tableHeaders = [
    'Description',
    'User Name',
    'User Type',
    'Audit Duration',
    'Category',
    'Action'
  ]

  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableCell key={index}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {auditData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>
                <Typography sx={{
                  width: 'fit-content',
                  borderRadius: '12px',
                  alignItems: 'center',
                  padding: '4px 10px',
                  textTransform: 'capitalize',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: `1px solid #EE416F14`,
                  backgroundColor: '#EE416F14',
                  color: '#EE416F',
                }}>{row.userType}</Typography>
              </TableCell>
              <TableCell>{row.auditDuration}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <Typography
                  variant="contained"
                  sx={{
                    minWidth: '24px',
                    borderRadius: '12px',
                    alignItems: 'center',
                    padding: '4px 10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#27BAB1',
                    backgroundColor: 'rgba(39, 186, 177, 0.1)',
                    border: '1px solid rgba(39, 186, 177, 0.1)'
                  }}
                >
                  {row.action}
                </Typography>
              </TableCell>
            </TableRow>
        ))}
        <TableRow />
      </TableBody>
      {/* <TableHead>
        <TableRow>
          <TableCell>
            Page {1} of {auditTableData.length}
          </TableCell>
          <TableCell></TableCell>
          <TableCell>sdsdf</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Records Per Page {5}</TableCell>
        </TableRow>
      </TableHead> */}
      <TableBody bg="blue">
        <TableCell colSpan={6}>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={auditTableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableCell>
      </TableBody>
    </Table>
  );
};

export default AuditTable;
