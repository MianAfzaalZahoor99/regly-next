import { Icon } from '@iconify/react';
import React, { useState } from 'react';

import { Box, List, Button, Divider, ListItem, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';

import { useSnackbar } from 'src/components/snackbar';
import Iconify from 'src/components/iconify';

const sessions = [
  {
    id: 1,
    browser: 'chrome',
    device: 'Windows',
    ip: '127.0.65.1',
    location: 'Islamabad',
    time: '12:54pm',
    date: '12-30-2023',
    currentDevice: true,
  },

  {
    id: 2,
    browser: 'chrome',
    device: 'Windows',
    ip: '127.0.65.1',
    location: 'Islamabad',
    time: '12:54pm',
    date: '12-30-2023',
    currentDevice: false,
  },

  {
    id: 3,
    browser: 'Opera',
    device: 'Windows',
    ip: '206.84.142.50',
    location: 'Islamabad',
    time: '12:54pm',
    date: '12-30-2023',
    currentDevice: false,
  },

  {
    id: 4,
    browser: 'Safari',
    device: 'MacOS',
    ip: '206.84.142.50',
    location: 'Islamabad',
    time: '12:54pm',
    date: '12-30-2023',
    currentDevice: false,
  },

  {
    id: 5,
    browser: 'Microsoft Edge',
    device: 'WIndows',
    ip: '206.84.142.50',
    location: 'Swat',
    time: '12:54pm',
    date: '12-30-2023',
    currentDevice: false,
  },
];

const ActiveSession = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [device, setDevice] = useState(sessions);
  const [state, setState] = useState({
    selectedIds: [],
    allSelected: false
  });
  const [loginDevice, setLoginDevice] = useState(false);
  const SignOutFromAllDevices = () => {
    setLoginDevice(true);
    enqueueSnackbar('Signed Out From All Devicess');
  };

  const SignOutDevices = (index) => {
    const updatedSessions = [...device];
    updatedSessions.splice(index, 1);
    setDevice(updatedSessions);
    enqueueSnackbar('Signed Out From Device Successfully');
  };

  const handleCheckBoxClick = (type, id) => {
    let newVal = []
    if (type === 'bulk') {
      if (state.allSelected) {
        setState({ ...state, selectedIds: newVal, allSelected: !state.allSelected })
      } else {
        device.forEach((session) => newVal.push(session.id))
        if (newVal.length > 0) {
          setState({ ...state, selectedIds: newVal, allSelected: !state.allSelected })
        }
      }
    } else {
      newVal = [...state.selectedIds]
      if (!newVal.includes(id)) {
        newVal.push(id)
      } else {
        newVal = newVal.filter((val) => val !== id)
      }
      setState({
        ...state,
        selectedIds: newVal,
        allSelected: newVal.length === device.length
      })
    }
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        sx={{
          right: '10px',
          top: '7px',
          position:'absolute',
          zIndex: 9,
        }}>
        {device.length > 0 ? (
          <Button
            onClick={SignOutFromAllDevices}
            sx={{
              color: '#red',
              gap: '12px',
              border: '1px solid rgba(145, 158, 171, 1)',
              backgroundColor: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(255, 86, 48, 0.16)',
                color: '#B71D18',
              },
            }}>
            <Iconify icon="mingcute:device-line" width={18} sx={{color: '#637381'}} />
            Sign out from all devices
          </Button>
        ) : (
          <Typography
            display="flex"
            alignItems="center"
            borderRadius="5px"
            sx={{
              padding: '4px 10px',
              color: 'rgba(145, 158, 171, 1)',
              gap: '12px',
              border: '1px solid rgba(145, 158, 171, 1)',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Iconify icon="mingcute:device-line" width={18} sx={{color: '#637381'}} />
            No Devices
          </Typography>
        )}
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ marginTop: '50px'}} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox checked={state.allSelected} onClick={() => handleCheckBoxClick('bulk')} />
            </TableCell>
            <TableCell>Device</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Signed In On</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {device.map((session, index) => (
            <TableRow>
              <TableCell>
                <Checkbox checked={state.selectedIds.includes(session.id)} onClick={() => handleCheckBoxClick('single', session.id)} />
              </TableCell>
              <TableCell>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: '12px'
                }}>
                  <Icon fontSize={30} icon="ic:baseline-laptop" />
                  <Typography>
                    {session.browser} on {session.device} - <b>{session.ip}</b>
                  </Typography>
                  {session.currentDevice && (
                    <Typography
                      sx={{
                        minWidth: '24px',
                        borderRadius: '6px',
                        alignItems: 'center',
                        padding: '4px 10px',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#118D57',
                        backgroundColor: 'rgba(34, 197, 94, 0.16)',
                      }}
                    >
                      Current Device
                    </Typography>
                  )}
                  {loginDevice && (
                    <Typography
                      sx={{
                        minWidth: '24px',
                        borderRadius: '6px',
                        alignItems: 'center',
                        padding: '4px 10px',
                        border: '1px solid #B71D18',
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#B71D18',
                        backgroundColor: 'rgba(255, 86, 48, 0.16)',
                      }}
                    >
                      Signed Out
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>{session.location}</TableCell>
              <TableCell>{session.date} {session.time}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => SignOutDevices(index)}
                  sx={{
                    minWidth: '24px',
                    borderRadius: '6px',
                    alignItems: 'center',
                    padding: '4px 10px',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: '#B71D18',
                    backgroundColor: 'rgba(255, 86, 48, 0.16)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                      color: 'white',
                    },
                  }}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ActiveSession;
