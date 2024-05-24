import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Iconify from 'src/components/iconify'

const DocumentsForm = ({countries, addedFields}) => {
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
            <Iconify icon="mdi:image-filter-tilt-shift" />
            {field === 'insurance' && (
              <FormControl sx={{width: '100%'}}>
                <InputLabel>Insurance Country</InputLabel>
                <Select label="Insurance">
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
                <InputLabel>Document Type</InputLabel>
                <Select label="Insurance">
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

export default DocumentsForm
