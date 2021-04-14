import React, { useState } from 'react';
import props from 'prop-types';

const Label = (props) => {
    return (
        <h1>{props.data}</h1>
    );
}
const List = () => {
    const [change, setChange] = useState(true);
    return (
        <div>
            <button onClick={() => setChange(!change)}>
                Click Here!
		</button>
            {change ?
                <Label data="Welcome to GeeksforGeeks" /> :
                <Label data="A Computer Sciecne Portal for Geeks" />}
        </div>
    );
}

export default List;
