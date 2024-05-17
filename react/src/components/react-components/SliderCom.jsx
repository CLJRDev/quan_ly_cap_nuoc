import ReactSlider from 'react-slider'

export default function SliderCom(props) {


  return <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => (
      <div {...props} key={state.index}>
        {state.valueNow}
      </div>
    )}
    pearling
    defaultValue={props.defaultValue}
    minDistance={props.minDistance}
    min={props.min}
    max={props.max}
    onChange={props.onChange}
  />
}