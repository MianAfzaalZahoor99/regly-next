import Image from 'next/image';
import React, { useState } from 'react';

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
];

const MobileCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [addedFields, setAddedFields] = useState([])

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

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
      <IconButton
        onClick={handlePrev}
        variant="contained"
        disabled={activeSlide === 0}
        // sx={{ position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)' }}
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
            <ArrowBack />
          </IconButton>
          <LinearProgress
            sx={{ width: '70%' }}
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
            maxHeight: '500px',
            display: 'flex',
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
          <Typography variant="h5" align="center" gutterBottom>
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

          {/* {slides[activeSlide].id == 6 && (
            <>
              <CameraComponent />
            </>
          )} */}

          {slides[activeSlide].id == 8 && (
            <Box
            sx={{
                  width: '100%',
                }}>
              <FormControl sx={{
                  width: '100%',
                }}>
                <InputLabel>Insurance</InputLabel>
                <Select label="Insurance">
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country.name}>
                        {country.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>
        <Button
          sx={{
            width: 150,
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
        sx={{marginRight: slides[activeSlide].id == 5 ? '26%' : ''}}
        disabled={activeSlide === slides.length - 1}
        // sx={{ position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)' }}
      >
        <ArrowForward />
      </IconButton>
    </Container>
  );
};

export default MobileCarousel;
