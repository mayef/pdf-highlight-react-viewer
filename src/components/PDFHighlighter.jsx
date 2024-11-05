import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin } from '@react-pdf-viewer/highlight';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFHighlighter = ({ pageNumber, coordinates }) => {
  const [highlightAreas, setHighlightAreas] = useState([]);

  // Create the highlight plugin instance
  const highlightPluginInstance = highlightPlugin({
    renderHighlights: ({ pageIndex, rotation, getCssProperties }) => (
      <>
        {highlightAreas
          .filter((area) => area.pageIndex === pageIndex)
          .map((area, idx) => (
            <div
              key={idx}
              style={{
                ...getCssProperties({
                  left: area.bounds.x,
                  top: area.bounds.y,
                  width: area.bounds.width,
                  height: area.bounds.height,
                  pageIndex: area.pageIndex,
                }, rotation),
                background: 'yellow',
                opacity: 0.4,
              }}
            />
          ))}
      </>
    ),
  });

  // Create the default layout plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Update highlight areas when props change
  React.useEffect(() => {
    const newHighlight = {
      pageIndex: pageNumber - 1,
      bounds: {
        x: coordinates.x,
        y: coordinates.y,
        width: 100,  // You can adjust these values
        height: 50,  // You can adjust these values
      },
    };

    setHighlightAreas([newHighlight]);
  }, [pageNumber, coordinates]);

  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.js">
      <div style={{ height: '750px' }}>
        <Viewer
          fileUrl="/fnins-09-00002.pdf"  // Replace with your PDF file path
          plugins={[
            defaultLayoutPluginInstance,
            highlightPluginInstance,
          ]}
        />
      </div>
    </Worker>
  );
};

export default PDFHighlighter; 