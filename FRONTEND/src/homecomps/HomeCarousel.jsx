import React, { useEffect, useRef } from "react";
import './Carousel.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HomeCarousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const itemsRef = useRef([]);

  const images = [
    "https://i.pinimg.com/736x/8b/52/33/8b52339d2b72042a52272c0bec355459.jpg",
    "https://i.pinimg.com/736x/61/02/51/6102514bb5552372faaaceff27563064.jpg",
    "https://i.pinimg.com/736x/2e/97/7a/2e977a8c7107bf0ddf871e7c152a6486.jpg",
    "https://i.pinimg.com/736x/86/46/3c/86463c39bbd062cfef45ce4ec5cc84ff.jpg",
    "https://i.pinimg.com/736x/c1/e2/ca/c1e2ca5d02005ec45f1c8db84c1c1ffc.jpg",
    "https://i.pinimg.com/736x/5b/4f/54/5b4f54704ecc5aef7c80aa54ca265ffa.jpg",
    "https://i.pinimg.com/736x/c0/09/d9/c009d94c2748d61f24cb4ab897e36965.jpg",
  ];

  let width, height, totalWidth, margin = 20;
  let currIndex = 0;
  let intervalTime = 4000;
  let interval;

  const init = () => {
    resize();
    move(Math.floor(images.length / 2));
    bindEvents();
    timer();
  };

  const resize = () => {
    width = Math.max(window.innerWidth * 0.25, 275);
    height = window.innerHeight * 0.5;
    totalWidth = width * images.length;

    if (sliderRef.current) {
      sliderRef.current.style.width = `${totalWidth}px`;
    }
    itemsRef.current.forEach((item) => {
      if (item) {
        item.style.width = `${width - margin * 2}px`;
        item.style.height = `${height}px`;
      }
    });
  };

  const move = (index) => {
    if (index < 1) index = images.length;
    if (index > images.length) index = 1;
    currIndex = index;

    itemsRef.current.forEach((item, i) => {
      if (item) {
        const box = item.getElementsByClassName("item__3d-frame")[0];
        if (i === index - 1) {
          item.classList.add("carousel__slider__item--active");
          box.style.transform = "perspective(1200px)";
        } else {
          item.classList.remove("carousel__slider__item--active");
          box.style.transform = `perspective(1200px) rotateY(${
            i < index - 1 ? 40 : -40
          }deg)`;
        }
      }
    });

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(${
        index * -width + width / 2 + window.innerWidth / 2
      }px, 0, 0)`;
    }
  };

  const timer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  };

  const prev = () => {
    move(--currIndex);
    timer();
  };

  const next = () => {
    move(++currIndex);
    timer();
  };

  const bindEvents = () => {
    window.addEventListener("resize", resize);
    if (prevBtnRef.current) {
      prevBtnRef.current.addEventListener("click", prev);
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.addEventListener("click", next);
    }
  };

  useEffect(() => {
    // Collect all carousel items after render
    itemsRef.current = Array.from(
      carouselRef.current.getElementsByClassName("carousel__slider__item")
    );
    init();

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
      if (prevBtnRef.current) {
        prevBtnRef.current.removeEventListener("click", prev);
      }
      if (nextBtnRef.current) {
        nextBtnRef.current.removeEventListener("click", next);
      }
    };
  }, []);
  return (
    <div className="carousel" ref={carouselRef}>
      <div className="carousel__body">
        {/* <div className="carousel__prev" ref={prevBtnRef}>
          <FaAngleLeft className="carousel-icon" />
        </div>
        <div className="carousel__next" ref={nextBtnRef}>
          <FaAngleRight className="carousel-icon" />
        </div> */}
        <div className="carousel__slider" ref={sliderRef}>
          {images.map((src, index) => (
            <div
              className="carousel__slider__item"
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div className="item__3d-frame">
                <div className="item__3d-frame__box item__3d-frame__box--front">
                  <img src={src} alt="" height="100%" width="100%" />
                </div>
                <div className="item__3d-frame__box item__3d-frame__box--left"></div>
                <div className="item__3d-frame__box item__3d-frame__box--right"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
