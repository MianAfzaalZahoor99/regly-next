'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';

import {
  Box,
  Card,
  Select,
  Button,
  Divider,
  MenuItem,
  Container,
  Typography,
  FormControl,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { countries } from './countries';

const AcceptableCountries = () => {
  const [selected, setSelected] = useState([...countries]);

  const removeSelectedCountry = (countryName) => {
    // setSelected((prevSelected) => prevSelected.filter((country) => country.name !== countryName));
    if (selected.some((country) => country.name === countryName)) {
      // If the country is already selected, remove it
      setSelected((prevSelected) => prevSelected.filter((country) => country.name !== countryName));
    } else {
      // If the country is not selected, add it
      setSelected((prevSelected) => [
        ...prevSelected,
        countries.find((country) => country.name === countryName),
      ]);
    }
  };

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Acceptable countries"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Template', href: paths.dashboard.template.root },
          { name: 'Acceptable Countries', href: paths.dashboard.template.acceptableCountries },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          p: 3,
        }}
      >
        <Box>
          <FormControl
            sx={{
              width: '40%',
              display: 'flex',
              mb: 3,
              mt: 1,
            }}
          >
            {/* <InputLabel id="country">Country</InputLabel> */}
            <Select
              sx={{
                outline: 'none',
                '& .MuiSelect-root': {
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Icon icon="tabler:world" />
                </InputAdornment>
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '200px', // Set the maximum height for the dropdown menu
                  },
                },
              }}
            >
              {countries.map((country, i) => (
                <MenuItem
                  sx={{
                    backgroundColor: '#77CCFF',
                  }}
                  key={i}
                  value={country.name}
                  onClick={() => removeSelectedCountry(country.name)}
                >
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
            gap: 2,
          }}
        >
          {selected.map((country) => (
            <Box
              sx={{
                backgroundColor: '#d7d7d7',
                color: 'black',
                borderRadius: 7,
                paddingY: '3px',
                width: '140px',
                paddingLeft: 1,
                paddingRight: 0,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{country.name}</Typography>
              <Button p={0} onClick={() => removeSelectedCountry(country.name)}>
                <Icon icon="radix-icons:cross-1" />
              </Button>
            </Box>
          ))}
        </Box>
      </Card>
    </Container>
  );
};

export default AcceptableCountries;
