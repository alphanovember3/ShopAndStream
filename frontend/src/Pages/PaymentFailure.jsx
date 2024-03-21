import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFailure = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Opps Failure!</h1>
          <p className="py-6">Payment unsuccesful, please try again!</p>
          <Link to={'/cart'}>
          <button 
            className="btn bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400"
          >
            Continue Shopping
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure
