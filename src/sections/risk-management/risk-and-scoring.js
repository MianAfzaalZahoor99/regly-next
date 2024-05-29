'use client';

import { Card, Checkbox, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useState } from 'react'

const riskAreas = [
  {
    id: 1,
    riskType: 'Country/Jurisdiction',
    weight: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    riskScore: 0,
    intensity: 'Low',
    searchBy: 'Search By'
  },
  {
    id: 2,
    riskType: 'Nationality',
    weight: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    riskScore: 0,
    intensity: 'Medium',
    searchBy: 'Search By'
  },
  {
    id: 3,
    riskType: 'Product',
    weight: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    riskScore: 0,
    intensity: 'High',
    searchBy: 'Search By'
  },
  {
    id: 4,
    riskType: 'Customer',
    weight: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    riskScore: 0,
    intensity: 'Medium',
    searchBy: 'Search By'
  },
  {
    id: 5,
    riskType: 'Occupation',
    weight: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    riskScore: 0,
    intensity: 'Medium',
    searchBy: 'Search By'
  }
]

const tableHeaders = [
  "Risk Type",
  "Weights",
  "Risk Score",
  "Intensity",
  "Search By"
]

const RiskAndScoring = () => {
  const [state, setState] = useState({
    selectedIds: [],
    allSelected: false
  })
  const handleCheckBoxClick = (type, id) => {
    let newVal = []
    if (type === 'bulk') {
      if (state.allSelected) {
        setState({ ...state, selectedIds: newVal, allSelected: !state.allSelected })
      } else {
        riskAreas.forEach((area) => newVal.push(area.id))
        if (newVal.length > 0) {
          setState({ ...state, selectedIds: newVal, allSelected: !state.allSelected })
        }
      }
    } else {
      newVal = [...state.selectedIds]
      if (!newVal.includes(id)) {
        newVal.push(id)
      } else {
        newVal = newVal.filter((val) => val !== id)
      }
      setState({
        ...state,
        selectedIds: newVal,
        allSelected: newVal.length === riskAreas.length
      })
    }
  }

  return (
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
        <Card
          sx={{
            p: 2,
            borderRadius: 1.5,
            textAlign: 'left',
            display: 'flex',
            marginBottom: '12px'
          }}
        >
    Hello
        </Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleCheckBoxClick('bulk')}><Checkbox checked={state.allSelected} /> Select All</TableCell>
              {tableHeaders.map(header => <TableCell key={header}>{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {riskAreas.map((area) => (
              <TableRow>
                <TableCell>1</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Container>
  )
}
export default RiskAndScoring;
