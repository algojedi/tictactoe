import React from 'react';
import './Square.css';

const Square = props => {

		let newStyle;

		if (props.highlight) {		
			newStyle = { color : "#AA0820",
						 fontSize : "4em", 
						 
						 textShadow: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #25507F"} 

		} else { 
			newStyle = { color : "white" }
		  }
				
			
    	return (
	   
	      <button className="square" 
	      		  style= {newStyle} 
	      		  onClick={props.clickFn} >
	     		  {props.value} 
	      </button>
	   
	    );
	
}


export default Square; 
 
