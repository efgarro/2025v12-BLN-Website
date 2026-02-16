import React from 'react'

const CardGrounds = () => {
  return (
    <div className="card bg-base-100 w-auto shadow-sm rounded-xs mb-12">
            <figure>
              <img src="img/G1-Yard/IMG_4759.JPEG" alt="Yard" />
            </figure>
            <div className="card-body bg-bln-azul-arena">
              <h2 className="card-title font-bold mb-2">The Grounds</h2>
              <p className="prose lg:prose-lg">
                Across the grounds, a mixture of blooming flowers keep
                pollinators...
              </p>
              <div className="card-actions justify-center">
                <a href="/grounds" className="btn btn-sm mt-4">
                  Learn More
                </a>
              </div>
            </div>
          </div>
  )
}

export default CardGrounds