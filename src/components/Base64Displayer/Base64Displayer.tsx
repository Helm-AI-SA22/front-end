import React from 'react';
import ReactDOM from 'react-dom';
import { Buffer } from 'buffer';
import './Base64Displayer.css';


interface Base64DisplayerProps{
    source: string | undefined;
    width: number;
    height: number;
}

const Base64Displayer = (props: Base64DisplayerProps) => { 
    // if (!props.source) {
    //     return (
    //         <div></div>
    //     )
    // }
    const decoded: string = Buffer.from(props.source as string, 'base64').toString('utf8');
    return (
        <div>{ props.source ? <img src={`data:image/png;base64,${props.source }`}/>: ''}</div>
    )
    
    // const Example = ({ imageURL }: any) =>  <img src={imageURL} width={props.width} height={props.height}/>
    
    // ReactDOM.render(<Example imageURL={props.source} />, document.getElementById('base64container'))
    // return (
    //     <div>
    //         <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
    //         <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
    //         <div id="base64container"></div>
    //     </div>
    //  )
}

export default Base64Displayer;