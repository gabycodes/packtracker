import React from 'react';

export default function ClubItem(props) {
    return (
        <li className="club-item">
            {props.data.item} - {props.data.name}
            <button onClick={() => props.remove(props.data.key)}>Remove Item</button>
        </li>
    )
}