import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
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
      const stream = videoRef.current.srcObject;
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
    <div>
      <video
        style={{
            // borderRadius : "1000px",
            // width : "200px",
            // height : "300px",
        }}
        ref={videoRef}
        autoPlay
        playsInline
      />
      {/* <button onClick={handleCapture}>Take Picture</button>
      {imageData && <img src={imageData} alt="Captured" />} */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
};

export default CameraComponent;
