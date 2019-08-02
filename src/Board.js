import React from 'react';
import './board.css';
import Square from './Square';

class Board extends React.Component  {

	constructor(props) {
	    
 		super(props);
	    this.state = {
	      squares: Array(9).fill(null),
	      xIsNext: true,
	      turns: 0,
	    };

	    this.handleReset = this.handleReset.bind(this);
	    this.showStatus = this.showStatus.bind(this);
	}

	calculateWinner(squares) {
		
	  const lines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	  ];
	  for (let i = 0; i < lines.length; i++) {
	    const [a, b, c] = lines[i];
	    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
	      
	      return lines[i];
	    }
	  }
	  return null;
	}

	handleClick(i) {

	    const squares = this.state.squares.slice();
   		const winningLine = this.calculateWinner(squares); 
   		
   		if (winningLine || squares[i] || this.state.turns > 9) return;
    		    

		const turns = this.state.turns + 1;
	    squares[i] = this.state.xIsNext ? 'X' : 'O';
	    
	    this.setState({	squares: squares, 
	    				xIsNext: !this.state.xIsNext,
	    				turns: turns, });
 	}
	
  	renderSquares() {

   		const winningLine = this.calculateWinner(this.state.squares); 

  		let squaresSet = [];
  		let toHighlight;

			for (let i = 0; i < 9; i++) {
				if (winningLine) {
					toHighlight =  i == winningLine[0]  || 
								   i == winningLine[1]  ||
								   i == winningLine[2]  ;
				}
				
				squaresSet.push(<Square key={i}
    				   					value={this.state.squares[i]} 
    									clickFn={() => this.handleClick(i)}
    									highlight={toHighlight}/>);
			} 

		return squaresSet;		
  	}

  	showStatus() {

  		this.setState((prevState) => {
      		return { 
        		
        		squares : prevState.squares, 
	    		xIsNext : prevState.xIsNext,
	    		turns :	prevState.turns,
     		 }
    	});
  	}

  	handleReset() {
		
  		this.setState({	squares: Array(9).fill(null), 
	    				xIsNext: true,
	    				turns : 0, });
 	}

  	render() {

	   let status;
	   
	   const winningNums = this.calculateWinner(this.state.squares);
	   
	   if (winningNums) {
	      status =  this.state.squares[winningNums[0]] + ' WINS!';
	      

	    } else if (this.state.turns > 8) {
			status = "it's a tie!";
	      }

	      else {
	      	status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
	     }
		
	
	   return (
	      
	   		<div>

		   		<div>
		     		<h1 className="title">Tic Tac Toe</h1>
		    	</div>

			   <div>
				   <div className={winningNums ? "gameEnd" : "next"}> {status} </div>
			   </div>


			   <div className='resetWrapper'>
				   <button className="resetBtn"
	   				   onClick={this.handleReset}> Reset </button>
			   </div>

		    	<div>
			    	<div className="container"> {this.renderSquares()} </div>
	    		</div> 
	    		
	    	</div>
    	);
	}
}

export default Board; 
