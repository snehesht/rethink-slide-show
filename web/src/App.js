import { useState, useEffect } from 'react';
import SlideShow from './Components/Carousel';

function App() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/slideshow')
      .then(response => response.json())
      .then(data => {
        setFiles(data)
      })
      .catch((error) => {
        console.log('Error during fetch', error);
      })
  }, [])
  

  return (
    <SlideShow files={files} />
  );
}

export default App;
