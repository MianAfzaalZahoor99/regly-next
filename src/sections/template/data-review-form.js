import React from 'react'
import Image from 'next/image'

import { Box, Typography } from '@mui/material'

import editImage from '../../assets/images/edit.png'

const DataReviewForm = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '40px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderBottom: '2px solid #d2cbcb'}}>
          <Typography sx={{color: '#99a1a8', fontWeight: 700, marginRight: '30px'}}>Personal/Basic Information</Typography>
          <Image src={editImage} alt="Edit Icon" style={{marginRight: '16px'}} />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', marginTop: '8px'}}>
          <Box sx={{display: 'flex', width: '50%', flexDirection: 'column', alignItems: 'start', justifyContent: 'start'}}>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Email</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Full Name</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Date of Birth</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Nationality</Typography>
          </Box>
          <Box sx={{display: 'flex', width: '50%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>johnsmith@gmail.com</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>John Smith</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>09/24/1996</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>Pakistani</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', marginTop: '40px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderBottom: '2px solid #d2cbcb'}}>
          <Typography sx={{color: '#99a1a8', fontWeight: 700, marginRight: '30px'}}>Personal/Basic Information</Typography>
          <Image src={editImage} alt="Edit Icon" style={{marginRight: '16px'}} />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', marginTop: '8px'}}>
          <Box sx={{display: 'flex', width: '50%', flexDirection: 'column', alignItems: 'start', justifyContent: 'start'}}>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Email</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Full Name</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Date of Birth</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Gender</Typography>
            <Typography sx={{color: '#99a1a8', fontSize: '13px', fontWeight: 600}}>Nationality</Typography>
          </Box>
          <Box sx={{display: 'flex', width: '50%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>johnsmith@gmail.com</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>John Smith</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>09/24/1996</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>Male</Typography>
            <Typography sx={{color: '#444d54', fontSize: '13px'}}>Pakistani</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )

export default DataReviewForm
