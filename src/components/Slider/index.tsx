import React from 'react';
import ReactSlider from 'react-slider';

// ReactSlider does some magic with CSS class names, so no modules here
import './Slider.css';

export interface SliderProps {
  min: number;
  max: number;
  onChange: (n: number) => void;
  startingValue: number;
  step?: number;
}

const Slider = ({ min, max, startingValue, onChange, step }: SliderProps) => {
  return (
    <React.Fragment>
      <ReactSlider
        className="evergolf-slider"
        thumbClassName="evergolf-slider-thumb"
        trackClassName="evergolf-slider-track"
        min={min}
        max={max}
        defaultValue={startingValue}
        onChange={onChange}
        step={step}
      />
    </React.Fragment>
  );
};

export default Slider;
