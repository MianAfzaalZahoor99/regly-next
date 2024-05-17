'use client';

import React from 'react';

import {
  Box,
  Container,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import MobileCarousel from '../mobile-carousel';

const Customization = () => (
    <Container>
        <CustomBreadcrumbs
          heading="Customizations"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Template', href: paths.dashboard.template.root },
            { name: 'Customization', href: paths.dashboard.template.customization },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        {/* Carousel Starts Here */}

        <MobileCarousel />
        {/* Carousel Ends Here */}
        {/* <CameraComponent /> */}
      </Container>
  );

export default Customization;
