import React from 'react';
import parse from 'html-react-parser';
import { Buffer } from 'buffer';
import {Helmet } from 'react-helmet';
import './Base64Displayer.css';
import ReactDOM from 'react-dom';


interface Base64DisplayerProps{
    source: string | undefined;
    width?: number;
    height?: number;
}

const Base64Displayer = (props: Base64DisplayerProps) => { 

    const decoded: string =  props.source ? Buffer.from(props.source as string, 'base64').toString() : '';
    console.log(decoded);


    return (
        <div dangerouslySetInnerHTML={{__html: decoded}} />
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