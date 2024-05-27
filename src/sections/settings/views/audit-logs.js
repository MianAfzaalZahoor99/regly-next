'use client';

import React from 'react';

import {
  Box,
  Card,
  Button,
  Container,
  TextField,
  InputLabel
} from '@mui/material';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import AuditTable from '../audit/audit-table';
import { auditTableData } from '../audit/audit-data';

const AuditLogs = () => {
  const settings = useSettingsContext();

  const convertToCSV = (data) => {
    const header = `${Object.keys(data[0]).join(',')  }\n`;
    const rows = data.map((row) => Object.values(row).join(',')).join('\n');
    return header + rows;
  };

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomBreadcrumbs
          heading="Audit Logs"
          links={[
            { name: 'Settings', href: paths.dashboard.settings },
            { name: 'Audit', href: paths.dashboard.audit },
            { name: 'audit' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Container>
      <Card sx={{p: 2, mb: 2}}>
        <Box display="flex" alignContent="flex-start" flexDirection="column" alignItems="center" mb={1} gap={2} mt={1}>
          <Box display="flex" flexDirection="column" width="100%" gap={1}>
            <InputLabel>From</InputLabel>
            <Box display="flex" width="100%" gap={2}>
              <TextField type="date" sx={{ width: '25%'}} />
              <TextField type="time" sx={{ width: '25%'}} />
              <TextField type="name" sx={{ width: '25%'}} label="username" />
              <TextField type="name" sx={{ width: '25%'}} label="action" />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width="100%" gap={1}>
            <InputLabel>To</InputLabel>
            <Box display="flex" width="100%" gap={2}>
              <TextField type="date" sx={{ width: '25%'}} />
              <TextField type="time" sx={{ width: '25%'}} />
              <TextField type="name" sx={{ width: '25%'}} label="username" />
              <TextField type="name" sx={{ width: '25%'}} label="action" />
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignContent="flex-end" gap={2} sx={{width: '100%'}}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginRight: 0,
              color: '#ee416f',
              backgroundColor: '#ee416f14',
              marginLeft: 'auto',
              '&:hover': {
+                backgroundColor: '#ee416f',
+                color: '#FFFFFF'
+              }
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              const csvData = convertToCSV(auditTableData);
              downloadCSV(csvData, 'audit-logs.csv');
            }}
            sx={{
              color: '#ee416f',
              gap: '12px',
              backgroundColor: '#ee416f14',
              '&:hover': {
+                backgroundColor: '#ee416f',
+                color: '#FFFFFF'
+              }
            }}
            startIcon={<Iconify icon="foundation:page-export-csv" />}
          >
            Export CSV
          </Button>
        </Box>
      </Card>
      <Card sx={{ mb: 3, p: 2 }}>
        <AuditTable auditData={auditTableData} />
      </Card>
    </Container>
  );
};

export default AuditLogs;
