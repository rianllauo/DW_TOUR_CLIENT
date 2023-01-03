import React from 'react'

// component
import { Card } from 'flowbite-react'

const CardHome = ({image, title, subtitle}) => {
  return (
    <Card href="#">
        <div className='flex flex-col text-center gap-3 items-center justify-center'>
            <img src={image} alt="" width="48px" height="48px"/>
            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
                {subtitle}
            </p>
        </div>
        
    </Card>
  )
}

export default CardHome