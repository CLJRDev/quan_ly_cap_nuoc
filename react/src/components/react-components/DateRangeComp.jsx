import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = ({ onDateChange }) => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  useEffect(() => {
    // Call the callback function whenever range changes
    if (onDateChange) {
      onDateChange(range);
    }
  }, [range, onDateChange]);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  const handleDateChange = (item) => {
    setRange([item.selection])
  }

  return (
    <div className="calendarWrap">

      <input       
        value={range[0].startDate && range[0].endDate 
          ? `Từ ${format(range[0].startDate, "dd/MM/yyyy")} đến ${format(range[0].endDate, "dd/MM/yyyy")}` 
          : "Chọn thời gian"}
        //value={`Từ ${format(range[0].startDate, "dd/MM/yyyy")} đến ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open &&
          <DateRange
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}

export default DateRangeComp
