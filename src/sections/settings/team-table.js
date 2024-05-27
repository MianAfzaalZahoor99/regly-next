'use client';

import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types'

import { useTheme } from '@mui/system';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Avatar, Typography } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

// import { useSettingsContext } from 'src/components/settings';

import profileImage from '../../assets/images/profileImage.jpeg';

const TeamTableData = ({ filteredRows, selectedStatus, selectedRole }) => {
  const theme = useTheme();
  // const settings = useSettingsContext();

  const statusFilteredRows =
    selectedStatus === ''
      ? filteredRows
      : filteredRows.filter((row) => row.status === selectedStatus);

  const roleFilteredRows =
    selectedRole === ''
      ? statusFilteredRows
      : statusFilteredRows.filter((row) => row.role === selectedRole);


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              Member
            </TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roleFilteredRows.map((row) => (
            <TableRow sx={{ fontSize: '12px' }} key={row.member}>
              <TableCell
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: '12px',
                }}
              >
                <Avatar
                  alt=""
                  src={profileImage}
                  sx={{
                    width: { xs: 64, md: 128 },
                    height: { xs: 64, md: 128 },
                    border: `solid 2px ${theme.palette.common.white}`,
                  }}
                >
                  <Image src={profileImage} alt="Profile Image" />
                </Avatar>
                <Typography>{row.member}</Typography>
              </TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.lastLogin}</TableCell>
              <TableCell>
                {row.status === 'online' ? (
                  <Typography
                    borderRadius={2}
                    sx={{
                      backgroundColor: `green`,
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    {row.status}
                  </Typography>
                ) : (
                  <Typography
                    borderRadius={2}
                    sx={{
                      backgroundColor: `#c30010`,
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    {row.status}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody bg="blue">
          <TableCell colSpan={6}>
            {/* <TablePagination

              count={teamData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TeamTableData.propTypes = {
  filteredRows: PropTypes.array,
  selectedStatus: PropTypes.string,
  selectedRole: PropTypes.string,
}

export default TeamTableData;
