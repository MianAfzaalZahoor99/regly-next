import Image from 'next/image';
import PropTypes from 'prop-types'

import { Box, Select, MenuItem, Typography, FormControl } from '@mui/material'

import cameraImage from '../../assets/images/videoFrames/cameraIcon.png'
import uploadImage from '../../assets/images/videoFrames/uploadIcon.png'

const DocumentType = ({handleNext}) => (
    <Box sx={{width: '100%', marginTop: '100px'}}>
      <FormControl sx={{width: '100%', marginBottom: '50px'}}>
        <Select label="Insurance">
          <MenuItem value='cnic'>National ID Card</MenuItem>
          <MenuItem value='passport'>Passport</MenuItem>
          <MenuItem value='license'>Driving License</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: '#f1f2f3', margin: '8px 20px', display: 'flex', alignItems: 'center', borderRadius: '8px', gap: '20px'}}
        onClick={handleNext}>
        <Image src={cameraImage} alt="camera" />
        <Typography sx={{color: '#637381', marginLeft: '50px'}}>Use Camera</Typography>
      </Box>
      <Box
        sx={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: '#f1f2f3', margin: '8px 20px', display: 'flex', alignItems: 'center', borderRadius: '8px', gap: '20px'}}
        onClick={handleNext}>
        <Image src={uploadImage} alt="file" />
        <Typography sx={{color: '#637381', marginLeft: '50px'}}>Upload a File</Typography>
      </Box>
    </Box>
  )

DocumentType.propTypes = {
  handleNext: PropTypes.any,
}


export default DocumentType
