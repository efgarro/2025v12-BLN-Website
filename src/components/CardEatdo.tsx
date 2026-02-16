import React from "react";

const CardEatdo = () => {
  return (
    <div className="card bg-base-100 w-auto shadow-sm rounded-xs mb-12">
      <figure>
        <img src="https://r2storage.bijalapa.com/hiking/bac1160f0046_IMG_3127.JPEG" alt="Eat" />
      </figure>
      <div className="card-body bg-bln-flor-amarilla">
        <h2 className="card-title font-bold mb-2">Where to Eat & What to Do</h2>
        <p className="prose lg:prose-lg">
          Around Bijagual, you can find several nearby restaurants with a warm
          and attentive atmosphere. When it comes to activities...
        </p>
        <div className="card-actions justify-center">
          <a href="/eatdo" className="btn btn-sm mt-4">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardEatdo;
