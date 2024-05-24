'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useTheme } from '@mui/system';
import {
  Box,
  Card,
  Table,
  Button,
  Select,
  Avatar,
  MenuItem,
  TableRow,
  ClearIcon,
  Container,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
  TablePagination
} from '@mui/material';

import { Icon } from '@iconify/react'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { rows } from '../team-data';
import profileImage from '../../../assets/images/profileImage.jpeg';

const TeamList = () => {
  const theme = useTheme();
  const [view, setView] = useState('list')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const filteredRows = rows.filter(
    (row) =>
      ((selectedStatus === '' || row.status === selectedStatus) &&
        (selectedRole === '' || row.role === selectedRole) &&
        row.member.toLowerCase().includes(searchQuery.toLowerCase())) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };

  // _____________________

  const statusFilteredRows =
    selectedStatus === ''
      ? filteredRows
      : filteredRows.filter((row) => row.status === selectedStatus);

  const roleFilteredRows =
    selectedRole === ''
      ? statusFilteredRows
      : statusFilteredRows.filter((row) => row.role === selectedRole);
  // _____________________________________

  // ___________________________________________

  const tableHeaders = [
    'Name',
    'Role',
    'Status',
    'Last Login'
  ]

  return (
    <Container>
        <CustomBreadcrumbs
          heading="Team List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Settings', href: paths.dashboard.settings },
            { name: 'Team', href: paths.dashboard.settings.team },
          ]}
          action={
            <Button
              href="/dashboard/settings/team/new"
              variant="contained"
              sx={{
                color: '#454F5B',
                gap: '12px',
                border: '1px solid rgba(145, 158, 171, 1)',
                backgroundColor: '#FFFFFF',
                '&:hover': {
                  color: '#FFFFFF',
                }
              }}
              startIcon={<Iconify icon="material-symbols:add" />}
            >
              Add New Member
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ padding: 3, boxShadow: '0px 0px 20px 0px #BCBCBC73' }}>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
            }}
            gap={3}
            marginBottom={3}
          >
            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Role</InputLabel>
              <Select
                endAdornment={
                  <InputAdornment position="end">
                    {selectedRole !== '' && (
                      <Icon icon="ic:baseline-clear" onClick={() => setSelectedRole('')} style={{marginRight: '15px', cursor: 'pointer'}} />
                    )}
                  </InputAdornment>
                }
                value={selectedRole}
                onChange={handleRoleChange}
                label="Select an option">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                flexShrink: 0,
                width: { xs: 1, md: 200 },
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                clearable
                endAdornment={
                  <InputAdornment position="end">
                    {selectedStatus !== '' && (
                      <Icon icon="ic:baseline-clear" onClick={() => setSelectedStatus('')} style={{marginRight: '15px', cursor: 'pointer'}} />
                    )}
                  </InputAdornment>
                }
                onChange={handleStatusChange}
                label="Select an option">
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{
                width: '100%',
              }}
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <Box sx={{
              display: 'flex',
              alignItems: 'flex-end',
              marginLeft: 'auto',
              marginBottom: '12px',
              width: 'fit-content',
              gap: '12px'
            }}>
            <Iconify icon='material-symbols-light:lists-rounded' sx={{ color: '#ee416f', cursor: 'pointer', backgroundColor: view === 'list' ? '#ee416f14' : '', borderRadius: view === 'list' ? '4px' : '', padding: view === 'list' ? '4px' : ''}} onClick={() => setView('list')} width={22} />
            <Iconify icon='zondicons:view-tile' sx={{ color: '#ee416f', cursor: 'pointer', backgroundColor: view === 'grid' ? '#ee416f14' : '', borderRadius: view === 'grid' ? '4px' : '', padding: view === 'grid' ? '4px' : ''}} onClick={() => setView('grid')} width={22} />
          </Box>
          {view === 'list' && (
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => <TableCell key={header}>{header}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {roleFilteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((member) => (
                    <TableRow>
                      <TableCell sx={{paddingLeft: '30px'}}>
                        <Box sx={{display: 'flex', alignContent: 'flex-start', alignItems: 'center', gap: '12px'}}>
                          <Avatar
                            alt="Profile Image"
                            src={profileImage}
                            sx={{
                              width:'40px',
                              height: '40px',
                              border: `solid 2px ${theme.palette.common.white}`,
                          }}>
                            <Image src={profileImage} alt="Profile Image" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                          </Avatar>
                          <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'flex-start', alignItems: 'start'}}>
                            <span style={{ color: '#212B36'}}>{member.member}</span>
                            <span style={{ color: '#212B36', opacity: 0.8}}>{member.email}</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{textTransform: 'uppercase'}}>
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
                        '&:hover': {
                          backgroundColor: '#ee416f',
                          color: '#FFFFFF'
                        }
                      }}>{member.role}</Typography>
                      </TableCell>
                      <TableCell sx={{textTransform: 'capitalize'}}>
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
                    '&:hover': {
                      backgroundColor: '#27BAB1',
                      color: '#FFFFFF'
                    }
                  }}
                >{member.status}
                </Typography></TableCell>
                      <TableCell>{member.lastLogin}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          {view === 'grid' && (
            <Box display="flex" sx={{ flexWrap: 'wrap' }}>
              {roleFilteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="32%"
                    sx={{
                      border: '1px solid #D0D5DD',
                      backgroundColor: '#FFFFFF',
                      minHeight: '380px',
                      borderRadius: '8px',
                      marginTop: '10px',
                      marginLeft: '5px',
                      marginRight: '5px',
                      justifyContent: 'space-between',
                      '&:hover': {
                        backgroundColor: '#EE416F14',
                        opacity: 1,
                      }
                    }}
                  >
                    <Box sx={{height: '200px', display: 'flex', alignItems: "center"}}>
                      <Avatar
                        alt="Profile Image"
                        src={profileImage}
                        sx={{
                          width: { xs: 110, md: 128 },
                          height: { xs: 110, md: 128 },
                          border: `solid 2px ${theme.palette.common.white}`,
                      }}>
                        <Image src={profileImage} alt="Profile Image" />
                      </Avatar>
                    </Box>
                    <Box>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={3}padding="5px 8px">
                        <Typography sx={{
                          fontWeight: 500,
                          color: '#637381'
                        }}>{row.member}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={3}padding="5px 8px">
                        <Iconify icon='ic:outline-email' width={18} sx={{ color: '#637381' }} />
                        <Typography sx={{
                          fontWeight: 500,
                          color: '#637381'
                        }}>{row.email}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={3}padding="5px 8px">
                        <Iconify icon='f7:status' width={18} sx={{ color: row.status === 'offline' ? '#637381' : '#1EAE63' }} />
                        <Typography sx={{
                          fontWeight: 500,
                          color: row.status === 'offline' ? '#637381' : '#1EAE63',
                          textTransform: 'capitalize'
                        }}>{row.status}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={1} padding="5px 8px">
                        <Typography sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          color: '#637381',
                          textTransform: 'capitalize'
                        }}>Last Sign In: </Typography>
                        <Typography sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          color: '#637381',
                          textTransform: 'capitalize'
                        }}>{row.lastLogin}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      textTransform: 'uppercase',
                      padding: '0 10px',
                      minHeight: '39px',
                      width: '100%',
                      alignItems: 'center',
                      background: '#FCFCFD',
                      color: '#101828',
                      borderRadius: '0 0 8px 8px',
                      borderTop: '1px solid #D0D5DD',
                      marginTop: '13px'
                    }}>{row.role}</Typography>
                  </Box>
              ))}
            </Box>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={roleFilteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
  );
};

export default TeamList;
