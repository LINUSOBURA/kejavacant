import React from "react";
import Image from "next/image";

export default function Corousel() {
  return (
    <div className="w-full">
      <div className="carousel w-full flex">
        <div id="slide1" className="carousel-item relative w-full">
          <Image
            src="https://media.istockphoto.com/id/95186348/photo/for-sale-sign-house-and-green-grass.jpg?s=2048x2048&w=is&k=20&c=2xD_352wcRrOYFOeASGVGK0x0lytSvheicfs1B4olko="
            className="w-full"
            alt="image"
            width={800}
            height={600}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <Image
            src="https://media.istockphoto.com/id/146897545/photo/house-for-sale.jpg?s=2048x2048&w=is&k=20&c=qzkif4fd2pK2TIBsmkGQG7b2URTzrhLgCKJN9AG8w9M="
            className="w-full"
            alt="image"
            width={800}
            height={600}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <Image
            src="https://media.istockphoto.com/id/479956054/photo/house-for-sale-pending-sign-front-yard-no-people.jpg?s=2048x2048&w=is&k=20&c=kyvkjOxDn0-ZXJvX-X-40LMqVNsyfubNSi5Gq3q8Gdw="
            className="w-full"
            alt="image"
            width={2000}
            height={800}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <Image
            src="https://media.istockphoto.com/id/155700839/photo/a-beautiful-home-available-for-rent.jpg?s=2048x2048&w=is&k=20&c=gakLVfBJAIPbYj_8EXKz8z9XKCUceY8KcrpDp_jGTRY="
            className="w-full"
            alt="image"
            width={800}
            height={600}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
