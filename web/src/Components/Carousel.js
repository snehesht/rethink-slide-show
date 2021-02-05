import React from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Slide = ({ file }) => (
  <div>

  </div>
);

export default function SlideShow({ files }) {
  return (
    <Carousel plugins={['arrows']}>
      {files.map(file => <LazyLoadImage src={file.url} height="400" width="400" />)}
    </Carousel>
  )
}