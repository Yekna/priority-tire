import Image from "next/image";
import { FC, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardMedia } from "@mui/material";

interface Props {
  images: string[];
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    afterChange: setIndex,
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <CardMedia image={images[index]} title="selected product image" sx={{width: 800, height: 800}} className="w-full rounded-t-lg" />
      {/* React slick breaks if it doesn't have more than 2 images. This is a workaround */}
      {images.length >= 3 && (
        <Slider {...settings}>
          {images.map((src, i) => (
            <Image
              className="hover:cursor-pointer"
              key={src}
              src={src}
              alt={`product image ${i}`}
              width={800}
              height={800}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageCarousel;
