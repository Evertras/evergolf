import React from 'react';
import ReactSlider from 'react-slider';

// ReactSlider does some magic with CSS class names, so no modules here
import './Slider.css';

export interface ShotEditSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  startingValue: number;
  step?: number;
}

const ShotEditSlider = ({min, max, startingValue, onChange, step}: ShotEditSliderProps) => {
  return (
    <React.Fragment>
      <ReactSlider
        className="evergolf-slider"
        thumbClassName="evergolf-slider-thumb"
        trackClassName="evergolf-slider-track"
        min={min}
        max={max}
        defaultValue={startingValue}
        onChange={(val: number, index: number) => {
          console.log(index, val);
        }
        }
        step={step}
      />
    </React.Fragment>
  );
};

export default ShotEditSlider;
