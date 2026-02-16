import React from 'react'

const CardHabitat = () => {
  return (
    <div className="card bg-base-100 w-auto shadow-sm rounded-xs mb-12">
            <figure>
              <img src="img/H1-Wildlife/IMG_0124.jpg" alt="Lapa" />
            </figure>
            <div className="card-body bg-bln-azul-arena">
              <h2 className="card-title font-bold mb-2">
                Scarlet Macaw Habitat Project
              </h2>
              <p className="prose lg:prose-lg">
                The pride and joy of BijaLapa Natural is the Scarlet Macaw
                Habitat Project which has a simple premise...
              </p>
              <div className="card-actions justify-center">
                <a href="/habitat" className="btn btn-sm mt-4">
                  Learn More
                </a>
              </div>
            </div>
          </div>
  )
}

export default CardHabitat