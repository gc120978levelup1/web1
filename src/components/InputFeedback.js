import React from 'react';
import { useState } from 'react';
import News from './News';

const InputFeedback = (props) => {
    const [num1,setNum1] = useState(props.value1);
    const [num2,setNum2] = useState(props.value2);
    const [ans1,setAns1] = useState('0');
    const onSubmitNubersClickHandler = (e)=>{
        var n1 = parseFloat(num1);
        var n2 = parseFloat(num2);
        var a = n1 + n2;
        setAns1(a.toString());
    }
    return (
        <>
            <div className="form-group">
                <label for="email">Enter 2 Numbers:</label>
                <input type="number" className="form-control" value={num1} onChange={(e)=>{setNum1(e.target.value);}}/>
                <input type="number" className="form-control" value={num2} onChange={(e)=>{setNum2(e.target.value);}}/>
                <button className='btn btn-primary' onClick = {onSubmitNubersClickHandler}>Submit</button> 
            </div>
            <News message = {ans1}/>
        </>
    )

}

export default InputFeedback