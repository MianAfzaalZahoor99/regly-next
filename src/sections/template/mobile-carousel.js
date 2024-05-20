import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Box,
  Card,
  List,
  Button,
  Select,
  ListItem,
  MenuItem,
  Container,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  LinearProgress,
} from '@mui/material';

import CarouselForm from './carousel-form';
import { countries } from './views/countries';
import image1 from '../../assets/images/slide1.jpg';
import QRCode from '../../assets/images/QRCode.png';
import selfie from '../../assets/images/selfie.jpg';
import Iconify from 'src/components/iconify';
import CameraComponent from './scan-face';
import DocumentsForm from './documents-form';
import AddressForm from './address-form';

const slides = [
  {
    id: 1,
    heading: 'Lets start your verification',
    description: 'we will guide you a simple process to verify your identity',
    img: image1,
    buttonText: 'Lets Start',
  },
  {
    id: 2,
    heading: 'Prepare for your Verification',
    description: "By clicking 'Continue', you acknowledge to the Regly Technlogies Privacy Policy.",
    buttonText: 'Continue',
    subheadings: [
      {
        heading: 'Questionarie',
        description:
          'Fill out a questionaire with your personel information, email address and nationality',
      },
      {
        heading: 'Identity document',
        description:
          "Provide your identity document (Passport, Driver's license, ID Card) for visual scanning. Ensure that it is not expired or physically demaged",
      },
      {
        heading: 'Selfie',
        description:
          'Go through our liveness-detection check. This Involves turning your head in front of a camera for a few minutes',
      },
      {
        heading: 'Proof of residence',
        description:
          'Provide a proof of address (not older than 3 months) for visual scanning. Ensure that your fullname and address are on the documents',
      },
    ],
  },
  {
    id: 3,
    heading: 'Scan QR with your phone camera',
    buttonText: 'Continue here',
    description: 'Point your phone camera to this QR Code and follow the link.',
    img: QRCode,
  },
  {
    id: 4,

    heading: 'Prepare yourself for your selfie video',
    buttonText: 'Let`s do it',
    description: 'Position yourself in good lighting and follow instructions ont the next screen.',
    img: selfie,
  },
  {
    id: 5,
    heading: 'Please fill out with your personal information, email address and nationality',
    buttonText: 'Let`s start !',
  },
  { id: 6, heading: 'Align Your Face', buttonText: 'Start!', },
  {
    id: 7,
    heading: 'To complete identity verification you will need one of the following',
    buttonText: 'Got it',
    subheadings: [
      {
        heading: 'National ID Card',
        description: 'You will need to add live picture of your ID card for verfication',
      },
      {
        heading: 'Passport',
        description: 'You will need to add live picture of your passport for verfication',
      },
      {
        heading: 'Driving License',
        description: 'You will need to add live picture of your driving license for verfication',
      },
    ],
  },

  {
    id: 8,
    heading: 'What country is your document from ?',
    buttonText: 'Next!',
    description:
      'Please select the country from the drop down list and fill your identification number',
  },
  {
    id: 9,
    buttonText: 'Reupload',
  },
  {
    id: 10,
    heading: 'Capture The Front Side',
  },
  {
    id: 11,
    heading: 'Capture The Back Side',
  },
  {
    id: 12,
    buttonText: 'Next',
  },
  {
    id: 13,
    heading: 'Please enter your address details',
    buttonText: 'Next',
  },
];

const MobileCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [addedFields, setAddedFields] = useState([])

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setAddedFields([])
  }, [activeSlide])

  const handlePrev = (action) =>
    action === 'all' ? setActiveSlide(0) : setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  const handleSetFields = (field) => {
    if (addedFields.includes(field)) {
      setAddedFields((prev) => prev.filter((item) => item !== field))
    } else {
      setAddedFields([...addedFields, field])
    }
  }

  const renderDisplayFieldOption = (type, option) =>
    <Typography
      variant="contained"
      sx={{
        display: 'flex',
        alignItems: 'center',
        minWidth: '24px',
        justifyContent: 'space-between',
        borderRadius: '6px',
        padding: '4px 10px',
        fontWeight: 700,
        fontSize: '13px',
        color: '#637381',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${addedFields.includes(type) ? '#1EAE63' : '#B71D18'}`,
      }}
    >
      {option}
      <Iconify
        sx={{ cursor: 'pointer', color: addedFields.includes(type) ? '#1EAE63' : '#B71D18' }}
        icon={addedFields.includes(type) ? "iconamoon:check-bold" : "charm:cross"}
        onClick={() => handleSetFields(type)}
      />
    </Typography>

  return (
    <Container
      sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {slides[activeSlide].id == 5 && (
        <Box sx={{ display: 'flex', marginRight: 'auto', flexDirection: 'column', gap: '6px'}}>
          {renderDisplayFieldOption('name', 'First Name & Last Name')}
          {renderDisplayFieldOption('dob', 'Date of Birth')}
          {renderDisplayFieldOption('email', 'Email')}
          {renderDisplayFieldOption('country', 'Country')}
        </Box>
      )}
      {slides[activeSlide].id == 8 && (
        <Box sx={{ display: 'flex', marginRight: 'auto', flexDirection: 'column', gap: '6px'}}>
          {renderDisplayFieldOption('insurance', 'Insurance')}
          {renderDisplayFieldOption('id', 'ID')}
          {renderDisplayFieldOption('docType', 'Document Type')}
        </Box>
      )}
      {slides[activeSlide].id == 13 && (
        <Box sx={{ display: 'flex', marginRight: 'auto', flexDirection: 'column', gap: '6px'}}>
          {renderDisplayFieldOption('country', 'Country')}
          {renderDisplayFieldOption('city', 'City')}
          {renderDisplayFieldOption('address', 'Address')}
        </Box>
      )}
      <IconButton
        onClick={handlePrev}
        variant="contained"
        disabled={activeSlide === 0}
      >
        <ArrowBack />
      </IconButton>

      <Card
        sx={{
          width: '40%',
          //   height : "110vh",
          marginBottom: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          backgroundColor: [6, 10, 11].includes(slides[activeSlide].id) ? '#000000' : '#FFFFFF',
          padding: 2,
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handlePrev} variant="contained" disabled={activeSlide === 0}>
            <Iconify icon="material-symbols:arrow-back-ios-rounded" />
          </IconButton>
          <LinearProgress
            sx={{ width: '80%', backgroundColor: [6, 10, 11].includes(slides[activeSlide].id) ? '#FFFFFF' : '', height: '8px' }}
            variant="determinate"
            value={((activeSlide + 1) / slides.length) * 100}
          />
          <IconButton onClick={() => handlePrev('all')} variant="contained" disabled={activeSlide === 0}>
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            height: '500px',
            minHeight: '500px',
            maxHeight: '500px',
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {slides[activeSlide].id == 3 && (
            <Typography variant="h5" align="center" gutterBottom>
              Do you want to contiue on the phone ?
            </Typography>
          )}

          {slides[activeSlide].img ? (
            <Image
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '40px'
              }}
              src={slides[activeSlide].img}
              alt=""
              width={200}
              height={200}
            />
          ) : (
            <></>
          )}
          <Typography variant="h5" align="center" gutterBottom sx={{ color: [6, 10, 11].includes(slides[activeSlide].id) ? '#FFFFFF' : ''}}>
            {slides[activeSlide].heading}
          </Typography>

          {slides[activeSlide].subheadings ? (
            <Box>
              <List>
                {slides[activeSlide].subheadings.map((item) => (
                  <>
                    <ListItem
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {item.heading}
                    </ListItem>
                    <ListItem
                      sx={{
                        fontSize: '13px',
                        color: 'gray',
                      }}
                    >
                      {item.description}
                    </ListItem>
                  </>
                ))}
              </List>
            </Box>
          ) : (
            <></>
          )}

          {slides[activeSlide].id == 5 && (
            <CarouselForm addedFields={addedFields} />
          )}
          <Typography
            align="center"
            sx={{
              color: 'gray',
              fontSize: '15px',
            }}
          >
            {slides[activeSlide].description}
          </Typography>
          {slides[activeSlide].id == 6 && (
            <CameraComponent handleNext={handleNext} />
          )}
          {slides[activeSlide].id == 8 && (
            <DocumentsForm countries={countries} addedFields={addedFields}/>
          )}
          {slides[activeSlide].id == 9 && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'center', backgroundColor: '#000000', width: '300px', height: '230px', borderRadius: '20px'}}>
                <Iconify icon="uiw:warning" style={{ color: 'EE416F' }} />
              </Box>
              <Box sx={{display: 'flex', alignItems:'center', flexDirection: 'column', marginTop: '30px', marginBottom: 'auto'}}>
                <Typography sx={{ fontSize: '14px', color: '#637381' }}>Blur/focus Issue</Typography>
                <Typography sx={{ fontSize: '14px', color: '#637381' }}>Light too high/low</Typography>
                <Typography sx={{ fontSize: '14px', color: '#637381' }}>Image size is too large/small</Typography>
              </Box>
            </>
          )}
          {[10, 11].includes(slides[activeSlide].id) && (
            <CameraComponent handleNext={handleNext} documentPic={true} />
          )}
          {slides[activeSlide].id === 12 && (
            <Box display="flex" flexDirection="column" allignItems="center" justifyContent="center" width="100%">
              <Iconify icon="carbon:map" style={{ color: '#26BAB1', width: '150px', height: '150px', marginRight: 'auto', marginLeft: 'auto'}}/>
              <Typography sx={{fontSize: '24px', fontWeight: 600, textAlign: 'center', margin: '10px 30px'}}>We are almost there! Prepare to scan your
 proof of address.</Typography>
              <Typography sx={{fontSize: '14px', fontWeight: 400, textAlign: 'center', margin: '10px 30px', color: '#637381'}}>Turn to the front of yo
ur proof and continue on the next screen. Document should not be older than 3 months. Ensure that your full name and address are on the document.</Typo
graphy>
            </Box>
          )}
           {slides[activeSlide].id === 13 && (
            <AddressForm countries={countries} addedFields={addedFields}/>
           )}
        </Box>
        <Button
          sx={{
            width: 150,
            opacity: [6, 10, 11].includes(slides[activeSlide].id) ? 0 : 1
          }}
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={activeSlide === slides.length - 1}
        >
          {slides[activeSlide].buttonText}
        </Button>
      </Card>

      <IconButton
        onClick={handleNext}
        variant="contained"
        sx={{marginRight: [5, 8, 13].includes(slides[activeSlide].id) ? '26%' : ''}}
        disabled={activeSlide === slides.length - 1}
      >
        <ArrowForward />
      </IconButton>
    </Container>
  );
};

export default MobileCarousel;
