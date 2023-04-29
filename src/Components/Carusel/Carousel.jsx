import { Carousel } from "react-responsive-carousel";

import CustomDot from "./CustomDot";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import s from "./Carousel.module.scss";

const CarouselImg = ({ images }) => {
  return (
    <Carousel
      className={s.wrapper}
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      renderThumbs={() =>
        images.map((image) => {
          return <CustomDot key={image} img={image} />;
        })
      }
    >
      {images.map((image) => (
        <img key={image} src={image} className={s.mainImg} alt={image}/>
      ))}
    </Carousel>
  );
};

export default CarouselImg;
