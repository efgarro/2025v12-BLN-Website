import React from "react";

const CardRooms = () => {
  return (
    <div className="card bg-base-100 w-auto shadow-sm rounded-xs mb-12">
      <figure>
        <img src="img/R1-View Rooms/interior-guarumo-1.jpg" alt="Rooms" />
      </figure>
      <div className="card-body bg-bln-verde-arena">
        <h2 className="card-title font-bold mb-2">Rooms with a View</h2>
        <p className="prose lg:prose-lg">
          Just to the side of the main high grounds at BijaLapa Natural, a
          two-room, rural-style place looks out...
        </p>
        <div className="card-actions justify-center">
          <a href="/rooms" className="btn btn-md mt-4">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardRooms;
