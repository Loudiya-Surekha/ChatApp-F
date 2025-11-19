import React from 'react'

function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="d-none d-lg-flex align-items-center justify-content-center bg-light p-5">
      <div className="text-center" style={{ maxWidth: '200px' }}>
        <div className="row row-cols-3 g-2 mb-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="col">
              <div
                className={`rounded-4 ratio ratio-1x1 ${
                  i % 2 === 0
                    ? 'bg-primary bg-opacity-25'
                    : 'bg-secondary bg-opacity-10'
                }`}
                style={{
                  animation: i % 2 === 0 ? 'pulse 1.5s infinite' : 'none'
                }}></div>
            </div>
          ))}
        </div>
        <h2 className="fs-4 fw-bold mb-2">{title}</h2>
        <p className="text-black">{subtitle}</p>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default AuthImagePattern
