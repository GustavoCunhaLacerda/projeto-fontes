import { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Image from "../Image";

import styles from "./styles.module.scss";
import { getImage } from "../../util/getImageFromName";

type ImageCarouselProps = {
  images: null | string[];
  type: null | string;
};

export default function ImageCarousel({ images, type }: ImageCarouselProps) {
  const carousel = useRef(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: type === "animal" ? 2 : 3,
      // slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomDot = ({ onMove, index, onClick, active }: any) => {
    return (
      <li className={active ? "active" : "inactive"} onClick={() => onClick()}>
        <div className={active ? styles.dotActive : styles.dotInactive} />
      </li>
    );
  };

  return (
    <div>
      {images ? (
        <Carousel
          responsive={responsive}
          ssr
          ref={(el: any) => {
            carousel.current = el;
          }}
          showDots
          infinite
          containerClass={styles.containerWithDots}
          itemClass={styles.imageItem}
          deviceType={"desktop"}
          customDot={<CustomDot />}
          autoPlaySpeed={2000}
          autoPlay={true}
        >
          {images.map((img: any, index: number) => {
            console.log(img.path);

            return <Image url={getImage(img.path) as string} key={index} />;
          })}
        </Carousel>
      ) : null}
    </div>
  );
}
