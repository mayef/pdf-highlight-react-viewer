import React, { useState } from 'react';
import PDFHighlighter from './components/PDFHighlighter';
import './App.css';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  
  const handlePageChange = (e) => {
    setPageNumber(parseInt(e.target.value));
  };

  const handleCoordinateChange = (axis, value) => {
    setCoordinates(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  return (
    <div className="App">
      <div className="controls">
        <div>
          <label>Page Number:</label>
          <input 
            type="number" 
            value={pageNumber}
            onChange={handlePageChange}
            min={1}
          />
        </div>
        <div>
          <label>X Coordinate:</label>
          <input 
            type="number" 
            value={coordinates.x}
            onChange={(e) => handleCoordinateChange('x', e.target.value)}
          />
        </div>
        <div>
          <label>Y Coordinate:</label>
          <input 
            type="number" 
            value={coordinates.y}
            onChange={(e) => handleCoordinateChange('y', e.target.value)}
          />
        </div>
      </div>
      
      <div className="pdf-container">
        <PDFHighlighter 
          pageNumber={pageNumber}
          coordinates={coordinates}
        />
      </div>
    </div>
  );
}

export default App; 