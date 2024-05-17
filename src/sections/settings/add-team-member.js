'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AddTeamForm from './team-add-form';

// ----------------------------------------------------------------------

export default function AddTeamMember() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Team Member"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Setting',
            href: paths.dashboard.settings,
          },
          { name: 'New Team Member', href: '/dasboard/settings/team/new' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AddTeamForm />
    </Container>
  );
}
