import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import { Box, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material'

import Iconify from 'src/components/iconify'

const DocumentsForm = ({countries, addedFields}) => {
  const [sectionFields, setSectionFields] = useState(addedFields)
  const [selectedCountry, setSelectedCountry] = useState('Australia')
  const [selectedDoc, setSelectedDoc] = useState('cnic')

  const handleChange = (event) => {
    setSelectedCountry(event.target.value)
  }

  const handleDocChange = (event) => {
    setSelectedDoc(event.target.value)
  }

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
            {field === 'insurance' && (
              <FormControl sx={{width: '100%'}}>
                <InputLabel shrink>Insurance Country</InputLabel>
                <Select value={selectedCountry} onChange={handleChange} label="Insurance Country">
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country.name}>
                        {country.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {field === 'id' && (
              <TextField
                sx={{ width: '100%' }}
                label="ID Number"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            )}
            {field === 'docType' && (
              <FormControl sx={{width: '100%'}}>
                <InputLabel shrink>Document Type</InputLabel>
                <Select value={selectedDoc} onChange={handleDocChange} label="Document Type">
                  <MenuItem value='cnic'>National ID Card</MenuItem>
                  <MenuItem value='passport'>Passport</MenuItem>
                  <MenuItem value='license'>Driving License</MenuItem>
                </Select>
              </FormControl>
            )}
        </Box>
      ))}
      </FormControl>
    </Box>
  )
}

DocumentsForm.propTypes = {
  countries: PropTypes.array,
  addedFields: PropTypes.array,
}

export default DocumentsForm
