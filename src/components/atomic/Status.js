import React from 'react'

const StatusWaiting = () => {
  return (

    <div className='bg-red-300 px-4 py-2 text-xs font-medium text-red-700 rounded-md'>
        Waiting Payment
    </div>
  )
}

const StatusPending = () => {
  return (

    <div className='bg-amber-300 px-4 py-2 text-xs font-medium text-amber-700 rounded-md'>
        Pending
    </div>
  )
}

const StatusApprove = () => {
  return (

    <div className='bg-green-300 px-4 py-2 text-xs font-medium text-green-700 rounded-md'>
        Success
    </div>
  )
}

export {StatusWaiting, StatusPending, StatusApprove}