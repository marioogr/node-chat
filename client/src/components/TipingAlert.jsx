import React from 'react'

export default function TipingAlert({ life, name }) {    
    if (life) {
        return (<p>{name} esta escribiendo</p>)
    } else {
        return (<></>)
    }
}
