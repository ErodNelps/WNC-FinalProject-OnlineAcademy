import { useEffect, useState } from 'react';

import NavBar from '../NavBar';
import CourseCarousel from '../Carousel'
import './style.css'
function App() {
  return (
    <div className="App">
      <NavBar />
      
      <div className="pageMargin">
      <p className="label">Nổi bật tuần qua</p>
      <CourseCarousel/>
      </div>
    </div>
  );
}

export default App;
