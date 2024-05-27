import Image from "next/image";
import { useState } from "react";
import PropTypes from 'prop-types'
import { makeStyles } from "@material-ui/core"
import { ColorPicker } from "material-ui-color"

import { Box, Grid, Select, MenuItem, Typography, FormControl } from "@mui/material";

import uploadImage from '../../assets/images/exporticon.png'

const useStyles = makeStyles({
  root: {
    border: "1px solid red"
  }
});

const ScreenCustomizer = ({
  buttonColor,
  setButtonColor,
  barColor,
  setBarColor,
  fontFamily,
  setFontFamily,
  replaceLogo,
  setReplaceLogo,
  activeSlide,
}) => {
  const [fileNames, setFileNames] = useState({})
  const classes = useStyles()

  const handleButtonColorChange = (value) => {
    setButtonColor({...buttonColor, [activeSlide]: value.css.backgroundColor})
    localStorage.setItem('buttonColor', JSON.stringify({...buttonColor, [activeSlide]: value.css.backgroundColor}))
  }

  const handleBarColorChange = (value) => {
    setBarColor({...barColor, [activeSlide]: value.css.backgroundColor})
    localStorage.setItem('barColor', JSON.stringify({...barColor, [activeSlide]: value.css.backgroundColor}))
  }

  const handleFontFamilyChange = (value) => {
    setFontFamily({...fontFamily, [activeSlide]: value.target.value})
    localStorage.setItem('fontFamily', JSON.stringify({...fontFamily, [activeSlide]: value.target.value}))
  }

  const handleLogoChange = (value) => {
    setFileNames({...fileNames, [activeSlide]: value.target.files[0].name})
    const file = value.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setReplaceLogo({...replaceLogo, [activeSlide]: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Grid sx={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px'}}>
      <Box display="flex" flexDirection="row" alignItems="center" width="100%" gap={2}>
        <Box display="flex" flexDirection="row" alignItems="center" width="50%" justifyContent="space-between">
          <Typography sx={{color: '#212B36', fontSize: "14px"}}>Button Color</Typography>
          <ColorPicker
            classes={classes}
            value={buttonColor[activeSlide]}
            onChange={handleButtonColorChange}
          />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" width="50%" justifyContent="space-between">
          <Typography sx={{color: '#212B36', fontSize: "14px"}}>Progress Bar Color</Typography>
          <ColorPicker
            classes={classes}
            value={barColor[activeSlide]}
            onChange={handleBarColorChange}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" width="100%" gap={2}>
        <Box display="flex" flexDirection="row" alignItems="center" width="50%" justifyContent="space-between">
          <Typography sx={{color: '#212B36', fontSize: "14px"}}>Font Family</Typography>
          <FormControl sx={{width: '200px'}}>
            <Select value={fontFamily[activeSlide]} selectedValue={fontFamily[activeSlide]} onChange={handleFontFamilyChange}>
              <MenuItem value='Inter'>Inter</MenuItem>
              <MenuItem value='Gilroy'>Gilroy ExtraBold</MenuItem>
              <MenuItem value='Rubik'>Rubik</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" width="50%" justifyContent="space-between">
          <Typography sx={{color: '#212B36', fontSize: "14px"}}>Replace Logo</Typography>
          <input
            style={{ display: 'none' }}
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
          <label htmlFor="logo-upload" style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '150px', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{fileNames[activeSlide] ? fileNames[activeSlide] : 'Click to Upload'}</span>
            <Image src={uploadImage} alt="Upload Logo" style={{ objectFit: 'contain' }} />
          </label>
        </Box>
      </Box>
    </Grid>
  )
}

ScreenCustomizer.propTypes = {
  buttonColor: PropTypes.any,
  setButtonColor: PropTypes.any,
  barColor: PropTypes.any,
  setBarColor: PropTypes.any,
  fontFamily: PropTypes.any,
  setFontFamily: PropTypes.any,
  replaceLogo: PropTypes.any,
  setReplaceLogo: PropTypes.any,
  activeSlide: PropTypes.number,
}

export default ScreenCustomizer
