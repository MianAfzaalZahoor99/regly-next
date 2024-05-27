'use client';

import { useState } from 'react';
import PropTypes from 'prop-types'

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TablePagination,
} from '@mui/material';

import { auditTableData } from './audit-data';

const rowsPerPageOptions = [5, 10, 25];

const AuditTable = ({ auditData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_, newPage) => {
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
+                 '&:hover': {
+                   backgroundColor: '#ee416f',
+                   color: '#FFFFFF'
+                 }
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
                    border: '1px solid rgba(39, 186, 177, 0.1)',
+                   '&:hover': {
+                     backgroundColor: '#27BAB1',
+                     color: '#FFFFFF'
+                   }
                  }}
                >
                  {row.action}
                </Typography>
              </TableCell>
            </TableRow>
        ))}
        <TableRow />
      </TableBody>
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

AuditTable.propTypes = {
  auditData: PropTypes.array.isRequired,
}

export default AuditTable;
