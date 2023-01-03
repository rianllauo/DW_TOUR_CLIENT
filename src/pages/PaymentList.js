import React from 'react'
import CardPayment from '../components/card/CardPayment'

const PaymentList = () => {
  return (
    <div className='w-full pt-28 pb-16'>
        
        <div className='w-fit mx-auto flex flex-col items-center justify-center gap-6'>
            <CardPayment status={"pending"} />
            <CardPayment status={"pending"} />
            <CardPayment status={"pending"} />
        </div>

    </div>
  )
}

export default PaymentList