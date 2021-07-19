import React, { useEffect, useState } from 'react'

export default function TipingAlert({ client }) {
    const [life, setLife] = useState(2)
    
    useEffect(() => {
        if (life !== 0) {
            setTimeout(() => {
                setLife(life-1)
            }, 1000)
        }
    }, [life])

    return (
        <div>
            {
                life !== 0 && (<p>esta escribiendo {life}</p>)   
            }
        </div>
    )
}
