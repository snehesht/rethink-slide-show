import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';


export default function SlideShow({ files }) {
  console.log(files[0])
  return (
    <Carousel>
      {files.map(file => <img key={file.filename} src={'http://localhost:8000/api/v1/slideshow/file/' + file.filename} />)}
    </Carousel>
  )
}