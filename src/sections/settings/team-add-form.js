'use client';

import React, { useState } from 'react';
// import FormProvider from 'src/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Select,
  Avatar,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';

import FormProvider from 'src/components/hook-form';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  // Add more countries as needed
];

const AddTeamForm = () => {
  const router = useRouter();
  const { onSubmit, control } = useForm();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    router.push('/dashboard/settings/team');
  };
  const method = () => {};

  return (
    <FormProvider onSubmit={handleSubmit} methods={method}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              {/* <InputLabel>Full Name</InputLabel> */}

              <TextField label="Full Name" required />
              <TextField label="Phone Number" type="number" required />
              <TextField label="Address" />
              <TextField label="State" />
              <TextField label="Role" required />
              {/* <TextField label="Country"/> */}
              <FormControl>
                <InputLabel>Country</InputLabel>
                <Select>
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField label="Email" type="email" required />
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
                <TextField
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span" disabled={selectedImage}>
                    Upload Image
                  </Button>
                </label>
              </Box>
            </Box>

            {selectedImage && (
              <Avatar
                src={selectedImage}
                sx={{ width: 300, height: 300, marginTop: 10, marginX: 'auto' }}
              />
            )}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained">
                {/* loading={isSubmitting} */}
                Create Member
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </FormProvider>
  );
};

export default AddTeamForm;
