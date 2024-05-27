'use client'

import { Icon } from '@iconify/react'
import React, { useState } from 'react'
// import 'flag-icon-css/css/flag-icon.min.css';
import ReactCountryFlag from 'react-country-flag'

import {
  Box,
  Card,
  Table,
  Select,
  Button,
  MenuItem,
  Checkbox,
  TableRow,
  Container,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  FormControl,
  InputAdornment,
  TablePagination,
} from '@mui/material'

import { paths } from 'src/routes/paths'

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'

export const countries = [
  {
    name: 'Afghanistan',
    code: 'AF',
  },
  {
    name: 'Albania',
    code: 'AL',
  },
  {
    name: 'Algeria',
    code: 'DZ',
  },
  {
    name: 'Andorra',
    code: 'AD',
  },
  {
    name: 'Angola',
    code: 'AO',
  },
  {
    name: 'Antigua',
    code: 'AG',
  },
  {
    name: 'Argentina',
    code: 'AR',
  },
  {
    name: 'Armenia',
    code: 'AM',
  },
  {
    name: 'Australia',
    code: 'AU',
  },
  {
    name: 'Austria',
    code: 'AT',
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
  },
  {
    name: 'Bahamas',
    code: 'BS',
  },
  {
    name: 'Bahrain',
    code: 'BH',
  },
  {
    name: 'Bangladesh',
    code: 'BD',
  },
  {
    name: 'Barbados',
    code: 'BB',
  },
  {
    name: 'Belarus',
    code: 'BY',
  },
  {
    name: 'Belgium',
    code: 'BE',
  },
  {
    name: 'Belize',
    code: 'BZ',
  },
  {
    name: 'Benin',
    code: 'BJ',
  },
  {
    name: 'Bhutan',
    code: 'BT',
  },
]

const AcceptableIdTypes = () => {
  const [selected, setSelected] = useState([...countries])
  const [state, setState] = useState({
    selectedIds: [],
    allSelectedIds: false,
    selectedPassports: [],
    allSelectedPassports: false,
    selectedLicenses: [],
    allSelectedLicenses: false,
    selectedPermits: [],
    allSelectedPermits: false
  });

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [paginatedCountries, setPaginatedCountries] = useState(countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    setPaginatedCountries(selected.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage))
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    setPaginatedCountries(selected.slice(page * parseInt(event.target.value, 10), page * parseInt(event.target.value, 10) + parseInt(event.target.value, 10)))
  }

  const removeSelectedCountry = (countryName) => {
    // setSelected((prevSelected) => prevSelected.filter((country) => country.name !== countryName));
    if (selected.some((country) => country.name === countryName)) {
      // If the country is already selected, remove it
      setSelected((prevSelected) => prevSelected.filter((country) => country.name !== countryName))
    } else {
      // If the country is not selected, add it
      setSelected((prevSelected) => [
        ...prevSelected,
        countries.find((country) => country.name === countryName),
      ])
    }
  }

  const handleCheckBoxClick = (type, id, optionState, actionType) => {
    let newVal = []
    if (type === 'bulk') {
      if (state[actionType]) {
        setState({ ...state, [optionState]: newVal, [actionType]: !state[actionType] })
      } else {
        paginatedCountries.forEach((country) => newVal.push(country.code))
        if (newVal.length > 0) {
          setState({ ...state, [optionState]: newVal, [actionType]: !state[actionType] })
        }
      }
    } else {
      newVal = [...state[optionState]]
      if (!newVal.includes(id)) {
        newVal.push(id)
      } else {
        newVal = newVal.filter((val) => val !== id)
      }
      setState({
        ...state,
        [optionState]: newVal,
        [actionType]: newVal.length === paginatedCountries.length
      })
    }
  }

  return (
    <Container
        sx={{
          fontFamily: 'Gilroy Extrabold',
        }}>
        <CustomBreadcrumbs
          heading="Acceptable ID Types"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Template', href: paths.dashboard.template.root },
            { name: 'Acceptable Id Types', href: paths.dashboard.template.acceptableIdTypes },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

          <Card sx={{ p: 2, mb: '12px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                <FormControl
                  sx={{
                    width: '90%',
                    display: 'flex',
                  }}>
                  {/* <InputLabel id="country">Country</InputLabel> */}
                  <Select
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="tabler:world" />
                      </InputAdornment>
                    }
                    renderValue={(newSelected) => (
                      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <ReactCountryFlag countryCode={countries.filter((country) => country.name === newSelected)[0].code} svg />
                        {newSelected}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px', // Set the maximum height for the dropdown menu
                        },
                      },
                    }}>
                    {countries.map((country, i) => (
                      <MenuItem
                        key={i}
                        value={country.name}
                        onClick={() => removeSelectedCountry(country.name)} sx={{gap: '12px'}}>
                        <ReactCountryFlag countryCode={country.code} svg />
                        <Typography>{country.name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    marginRight: 0,
                    color: '#EE416F',
                    backgroundColor: '#EE416F14',
                    marginLeft: 'auto',
                    height: '55px',
                    width: '100px',
                    '&:hover': {
                      backgroundColor: '#EE416F',
                      color: '#FFFFFF'
                    }
                  }}
                >
                  Save
                </Button>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Checkbox checked={state.allSelectedIds} onClick={() => handleCheckBoxClick('bulk', null, 'selectedIds', 'allSelectedIds')} /> ID
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Checkbox checked={state.allSelectedPassports} onClick={() => handleCheckBoxClick('bulk', null, 'selectedPassports', 'allSelectedPassports')} /> Passport
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Checkbox checked={state.allSelectedLicenses} onClick={() => handleCheckBoxClick('bulk', null, 'selectedLicenses', 'allSelectedLicenses')} /> Driving License
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Checkbox checked={state.allSelectedPermits} onClick={() => handleCheckBoxClick('bulk', null, 'selectedPermits', 'allSelectedPermits')} /> Residence Permit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCountries.map((country, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <ReactCountryFlag countryCode={country.code} svg />
                        <Typography>{country.name}</Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><Checkbox onClick={() => handleCheckBoxClick('single', country.code, 'selectedIds', 'allSelectedIds')} checked={state.selectedIds.includes(country.code)} /></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><Checkbox onClick={() => handleCheckBoxClick('single', country.code, 'selectedPassports', 'allSelectedPassports')} checked={state.selectedPassports.includes(country.code)} /></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><Checkbox onClick={() => handleCheckBoxClick('single', country.code, 'selectedLicenses', 'allSelectedLicenses')} checked={state.selectedLicenses.includes(country.code)} /></TableCell>
                      <TableCell sx={{ textAlign: 'center' }}><Checkbox onClick={() => handleCheckBoxClick('single', country.code, 'selectedPermits', 'allSelectedPermits')} checked={state.selectedPermits.includes(country.code)} /></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 25]}
              component="div"
              count={selected.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>

      </Container>
  )
}

export default AcceptableIdTypes
