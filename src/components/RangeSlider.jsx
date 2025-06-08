import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const valuetext = value => {
  return `${value} year(s) old`;
};
// MUI range slider
const RangeSlider = ({ value, setSearchTerms }) => {
  const handleChange = (event, newValue) => {
    setSearchTerms(prev => ({ ...prev, ageMin: newValue[0], ageMax: newValue[1] }));
  };

  return (
    <Box>
      <Slider
        sx={{ color: 'rgb(0, 0, 128)' }}
        marks
        min={0}
        max={20}
        getAriaLabel={() => 'Age range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
