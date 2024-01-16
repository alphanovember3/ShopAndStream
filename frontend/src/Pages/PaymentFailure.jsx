import React from 'react'

const PaymentFailure = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Opps Failure!</h1>
          <p className="py-6">Payment unsuccesful, please try again!</p>
          <button className="btn bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400">Continue Shopping</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure
