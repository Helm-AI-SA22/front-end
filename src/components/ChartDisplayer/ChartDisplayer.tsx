import React, {Component } from 'react';

import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';



interface ChartDisplayerProps { 
    HTMLString: string;
}


 export class ChartDisplayer extends Component<ChartDisplayerProps>{
    constructor(props: ChartDisplayerProps){
        super(props);
        console.log(this.props);  
    }

    componentDidMount() {

        Array.from(document.getElementsByClassName('trimone')).forEach((script) =>{
            window.eval(script.innerHTML)
        });
        //console.log(scripts)
        //for (let index = 0; index < this.state.scriptsNum; index++){
            
            console.log(1);
            //['innerHTML'];
            //window.eval(script);
        //}
            
    }

    render(){ 
        const parsedDoc = new DOMParser().parseFromString(this.props.HTMLString ? this.props.HTMLString : '', 'text/html');
        const links = Array.from(parsedDoc.getElementsByTagName('link'));
        const elements =  Array.from(parsedDoc.getElementsByTagName('div'));
        const scripts =  Array.from(parsedDoc.getElementsByTagName('script'));

        
        console.log(links, elements, scripts);

        return(
        
        <>
            <Helmet>
                {links.map((link: HTMLElement) => parse(link.outerHTML))}
            </Helmet>
            {elements.map((element: HTMLElement) => parse(element.outerHTML))}
            {scripts.map((script: HTMLElement, index: number) => {
                script.setAttribute('class', 'trimone');
                return parse(script.outerHTML);
            })}
        </>   

   )}
    
}


