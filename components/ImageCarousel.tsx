import Image from "next/image";
import { FC, useState } from "react";
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardMedia } from "@mui/material";

interface Props {
  images: string[];
}

const ImageCarousel: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="max-w-[800px] mx-auto">
      <CardMedia
        image={images[index]}
        title="selected product image"
        sx={{ width: 800, height: 800 }}
        className="w-full rounded-t-lg"
      />
      <Slider
        beforeChange={(e) => setIndex(e % images.length)}
        arrows
        draggable
        focusOnSelect={true}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 100000,
              min: 0,
            },
            items: images.length >= 3 ? 3 : images.length,
          },
        }}
        rtl={false}
        shouldResetAutoplay
        slidesToSlide={1}
        swipeable
      >
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
    </div>
  );
};

export default ImageCarousel;
