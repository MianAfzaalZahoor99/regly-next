'use client';

import PropTypes from 'prop-types'
import React, {useState, useEffect}   from 'react';

import { Box, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';

import { countries } from './views/countries';

const CarouselForm = ({addedFields}) => {
  const [selectedCountry, setSelectedCountry] = useState('Australia')
  const [sectionFields, setSectionFields] = useState(addedFields)
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index)
  }

  useEffect(()=> {
    setSectionFields(addedFields)
  }, [addedFields])

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDragDrop = (event, index) => {
    const sourceIndex = event.dataTransfer.getData('text/plain')
    const sourceData = sectionFields[sourceIndex]
    const updatedFields = [...sectionFields]
    updatedFields.splice(sourceIndex, 1)
    updatedFields.splice(index, 0, sourceData)
    setSectionFields(updatedFields)
  }

  const handleChange = (event) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {sectionFields.map((field, index) => (
          <Box
            key={index}
            draggable
            onDragOver={handleDragOver}
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDragDrop(e, index)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
            <Iconify icon="ri:drag-move-2-fill" />
            {field === 'name' && (
              <>
                <TextField sx={{width: '50%'}} label="First Name" InputLabelProps={{ shrink: true }} />
                <TextField sx={{width: '50%'}} label="Last Name" InputLabelProps={{ shrink: true }} />
              </>
            )}
            {field === 'dob' && (
              <TextField
                sx={{ width: '100%' }}
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            )}
            {field === 'email' && <TextField sx={{width: '100%'}} InputLabelProps={{ shrink: true }} label="Email" type="email" />}
            {field === 'country' && (
              <FormControl sx={{width: '100%'}}>
                <InputLabel shrink>Select Country</InputLabel>
                <Select value={selectedCountry} onChange={handleChange} label="Select Country">
                  {countries.map((country) => <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>)}
                </Select>
              </FormControl>
            )}
          </Box>
        ))}
      </FormControl>
    </Box>
  );
};

CarouselForm.propTypes = {
  addedFields: PropTypes.array,
};

export default CarouselForm;
