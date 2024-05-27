import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { Box, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material'

import Iconify from 'src/components/iconify'

const AddressForm = ({ countries, addedFields }) => {
  const [sectionFields, setSectionFields] = useState(addedFields)
  const [selectedCountry, setSelectedCountry] = useState('Australia')

  const handleChange = (event) => {
    setSelectedCountry(event.target.value)
  }
  const [address, setAddress] = useState('')
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

  return (
    <Box sx={{ width: '100%', height: '300px', marginTop: '40px' }}>
      <FormControl
        sx={{
          width: '100%',
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
            {field === 'country' && (
              <FormControl sx={{width: '100%'}}>
                <InputLabel shrink>Country</InputLabel>
                <Select value={selectedCountry} onChange={handleChange} label="Select Country">
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country.name}>
                        {country.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {field === 'city' && (
              <>
                <TextField sx={{width: '50%'}} label="City" InputLabelProps={{ shrink: true }} />
                <TextField sx={{width: '50%'}} label="Postal Address" InputLabelProps={{ shrink: true }} />
              </>
            )}
            {field === 'address' && (
              <FormControl sx={{width: '100%'}}>
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  InputLabelProps={{ shrink: true }}
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e)}
                />
              </FormControl>
            )}
        </Box>
      ))}
      </FormControl>
    </Box>
  )
}

AddressForm.propTypes = {
  countries: PropTypes.array,
  addedFields: PropTypes.array,
};

export default AddressForm
