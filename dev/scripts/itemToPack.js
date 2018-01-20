import React from 'react';

export default function ItemToPack(props) {
    return (
        <li className="itemToPack">
            {props.data.item}
            <button onClick={() => { props.remove(props.data.key, "clothing"); props.remove(props.data.key, "misc"); props.remove(props.data.key, "toiletries"); props.remove(props.data.key, "documents"); props.remove(props.data.key, "electronics")}}>Remove Item</button>
        </li>
    )
}