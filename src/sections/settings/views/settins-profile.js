'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { Box, Link, Stack, Avatar, CardHeader, ListItemText } from '@mui/material'

import { paths } from 'src/routes/paths'

import { useMockedUser } from 'src/hooks/use-mocked-user'

import Iconify from 'src/components/iconify'
import { useSettingsContext } from 'src/components/settings'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'

import ActiveSession from '../active-session'
// import ProfileHome from '../../user/view/user-profile-view';
import profileImage from '../../../assets/images/profileImage.jpeg'

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="mingcute:profile-fill" sx={{borderRadius: '4px'}} width={20} />,
  },

  {
    value: 'session',
    label: 'Session',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
]

// ----------------------------------------------------------------------

export default function SettingsProfile() {
  const theme = useTheme()
  const settings = useSettingsContext()

  const { user } = useMockedUser()

  const [currentTab, setCurrentTab] = useState('profile')

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue)
  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Settings', href: paths.dashboard.settings },
          { name: 'Profile', href: paths.dashboard.settings },
          { name: user?.displayName },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <Stack sx={{backgroundColor: '#6B3745', display: 'flex'}}>
          <Box display="flex" alignItems="center" sx={{padding: '100px 18px 0px 30px', position: 'relative'}}>
            <Avatar
              alt="Profile Image"
              src={profileImage}
              sx={{
                position: 'absolute',
                width: { xs: 110, md: 128 },
                height: { xs: 110, md: 128 },
                border: `solid 2px ${theme.palette.common.white}`,
              }}>
              <Image src={profileImage} alt="Profile Image" />
            </Avatar>

            <ListItemText
              sx={{
                mt: 3,
                mb: 1,
                ml: { md: 18 },
                textAlign: { xs: 'center', md: 'unset' },
              }}
              primary={user.displayName}
              secondary={user.role}
              primaryTypographyProps={{
                typography: 'h4',
                color: '#FFFFFF'
              }}
              secondaryTypographyProps={{
                mt: 0.5,
                color: '#FFFFF3',
                component: 'span',
                typography: 'body2',
                sx: { opacity: 0.48 },
              }}
            />
          </Box>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bgcolor: '#FFFFFF',
              justifyContent: 'flex-end',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              }
            }}>
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Stack>
      </Card>
      <Card sx={{ mb: 3, marginTop: '12px', padding: '24px' }}>
        {currentTab === 'profile' && (
          <Box sx={{gap: '12px', display: 'flex', flexDirection: 'column'}}>
            <CardHeader title="About Me" />
            <Stack direction="row" spacing={2} sx={{ marginLeft: '20px'}}>
              <Iconify icon="mingcute:location-fill" width={24} />

              <Box sx={{ typography: 'body2' }}>
                <Link variant="subtitle4" color="inherit">
                  {user.address},&nbsp;
                </Link>
                <Link variant="subtitle3" color="inherit">
                  {user.city}, {user.state}, {user.zipCode},&nbsp;
                </Link>
                <Link variant="subtitle2" color="inherit">
                  {user.country}
                </Link>
              </Box>
            </Stack>
            <Stack direction="row" sx={{ typography: 'body2', marginLeft: '20px' }}>
              <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
              {user.email}
            </Stack>
            <Stack direction="row" sx={{ typography: 'body2', marginLeft: '20px' }}>
              <Iconify icon="ic:outline-phone" width={24} sx={{ mr: 2 }} />
              {user.phoneNumber}
            </Stack>
          </Box>
        )}

        {currentTab === 'session' && <ActiveSession />}
      </Card>

    </Container>
  )
}
