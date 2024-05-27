import Image from 'next/image';
import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import videoFrame from '../../assets/images/videoFrames/faceFrame.png'
import documentFrame from '../../assets/images/videoFrames/documentFrame.png'

const CameraComponent = ({handleNext, documentPic, increasedHeight, screenID}) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  // const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing the camera:', err);
      });

    return () => {
      // Cleanup - stop the video stream when component unmounts
      const stream = videoRef?.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    // setImageData(dataUrl);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
      {/* <video
        style={{
            borderRadius : "1000px",
            width : "200px",
            height : "300px",
        }}
        ref={videoRef}
        autoPlay
        playsInline
      >
          <track kind="captions" src="/path/to/captions.vtt" srcLang="en" label="English" />
      </video> */}
      <Image src={documentPic ? documentFrame : videoFrame} alt="Frame" style={{ width: increasedHeight ? '230px' : documentPic ? '320px' : '190px', height: increasedHeight ? '280px' : documentPic ? '200px' : '250px', margin: '20px 0px 10px 0px'}}  />
      <Box sx={{display: 'flex', alignItems: 'center', gap: '12px', width: 'auto', marginBottom: '40px'}}>
        {(!documentPic || screenID === 16) && <Iconify icon="uiw:warning" style={{ color: 'EE416F' }} />}
        <Typography sx={{width: '100%', display: 'flex', alignItems: 'center', color: '#637381', fontSize: '14px', textWrap: 'nowrap'}}>
          {(screenID === 16) ? <>Blur document! Try again</> : documentPic ? <>Make sure the text is clearly visible</> : <>Please try again</>}
        </Typography>
      </Box>
      <Iconify icon="ph:radio-button-fill" style={{ color: '#EE416F', width: '100px', height: '100px', marginTop: increasedHeight ? '40px' : '60px' }} onClick={handleNext} />
      {/* <button onClick={handleCapture}>Take Picture</button>
      {imageData && <img src={imageData} alt="Captured" />} */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </Box>
  );
};

CameraComponent.propTypes = {
  handleNext: PropTypes.any,
  documentPic: PropTypes.any,
  increasedHeight: PropTypes.any,
  screenID: PropTypes.number,
}

export default CameraComponent;
