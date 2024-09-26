import { useState } from 'react';
import './App.css';
import leftarrow from './assets/arrow-left-circle.svg';
import rightarrow from './assets/arrow-right-circle.svg';

const CalendarUI = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateCalendar = () => {
    let daysArray = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null); // Empty cells for days of the week before the 1st
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }

    return daysArray;
  }

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  }

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  }

  return (
    <div className='main-container'>
      <div className='header'>
        {/* <button type="button" onClick={handlePreviousMonth}>
          <img className='arrow' src={leftarrow} alt="left" />
        </button> */}
        <div className='select'>
          <select value={selectedDate.getFullYear()} onChange={(e) => setSelectedDate(new Date(e.target.value, selectedDate.getMonth()))}>
            {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select value={selectedDate.getMonth()} onChange={(e) => setSelectedDate(new Date(selectedDate.getFullYear(), e.target.value))}>
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
        </div>
        {/* <button type="button" onClick={handleNextMonth}>
          <img className='arrow' src={rightarrow} alt="right" />
        </button> */}
      </div>
      <div className='week'>
        {weekdays.map((day) => <div key={day}>{day}</div>)}
      </div>
      <div className="days">
        {generateCalendar().map((day, index) => (
          <div key={index} className={day ? "day" : "empty"}>
            {day ? day.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <CalendarUI />
    </>
  );
}

export default App;
