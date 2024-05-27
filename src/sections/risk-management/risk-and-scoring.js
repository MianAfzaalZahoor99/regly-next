'use client';

import { Container } from '@mui/material';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

const RiskAndScoring = () => (
  <Container>
    <CustomBreadcrumbs
      heading="Acceptable countries"
      links={[
        { name: 'Dashboard', href: paths.dashboard.root },
        { name: 'Risk Management', href: paths.dashboard.risk.root },
        { name: 'Risk Scoring and Rating', href: paths.dashboard.risk.riskScoringAndRating },
      ]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />
  </Container>
)
export default RiskAndScoring;
