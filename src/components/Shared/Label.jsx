import React from 'react'

export function CurrencyLabel(props) {
    return (
        <span {...props}>{props.children.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        })}</span>
    )
}
