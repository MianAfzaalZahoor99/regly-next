import { Box, Typography } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import Iconify from 'src/components/iconify';

const CameraComponent = ({handleNext, documentPic}) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [imageData, setImageData] = useState(null);

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
    setImageData(dataUrl);
  };

  return (
    <Box sx={{ width: '100px', display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      {/* <video
        style={{
            borderRadius : "1000px",
            width : "200px",
            height : "300px",
        }}
        ref={videoRef}
        autoPlay
        playsInline
      />
      <track kind="captions" src="/path/to/captions.vtt" srcLang="en" label="English" />
      </video> */}
      {documentPic ? (
        <Iconify icon="fluent:border-none-24-regular" style={{ color: '#FFFFFF', width: '150px', height: '150px', margin: '50px 0px 20px 0px'}} />
      ) : (
        <Iconify icon="gala:portrait2" style={{ width: '150px', height: '150px', margin: '50px 0px 20px 0px'}} />
      )}
      <Box sx={{display: 'flex', alignItems: 'center', gap: '12px', width: 'auto', marginBottom: '40px'}}>
        {!documentPic && <Iconify icon="uiw:warning" style={{ color: 'EE416F', margin: '20px 0px' }} />}
        <Typography sx={{width: '100%', display: 'flex', alignItems: 'center', color: '#FFFFFF', fontSize: '14px', textWrap: 'nowrap'}}>
          {documentPic ? <>Make sure the text is clearly visible</> : <>Please try again</>}
        </Typography>
        </Box>
      <Iconify icon="ph:radio-button-fill" style={{ color: '#EE416F', width: '100px', height: '100px'}} onClick={handleNext} />
      {/* <button onClick={handleCapture}>Take Picture</button>
      {imageData && <img src={imageData} alt="Captured" />} */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </Box>
  );
};

export default CameraComponent;
