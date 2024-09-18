import Image from "next/image";
import React from "react";

export default function House() {
  return (
    <div className="min-h-screen ml-0 mr-0 sm:ml-5 sm:mr-5">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <Image
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album"
            width={500}
            height={500}
          />
        </figure>
        <div className="card-body bg-CustomPink1">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
