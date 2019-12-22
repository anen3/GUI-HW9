/*Alex Nguyen
alex_nguyen@student.uml.edu
UMass Lowell COMP4610 GUI Programming I
Purpose of this webpage: implementing part of the scrabble game using jquery ui draggable and droppable*/


const rackSize = 7;
var score = 0;
var board = []
var doubleFlag;
var tile = []; // the current set of letters ex. A, B, F ...

const data = {"pieces": [
			{"letter":"A", "value":1,  "amount":9},
			{"letter":"B", "value":3,  "amount":2},
			{"letter":"C", "value":3,  "amount":2},
			{"letter":"D", "value":2,  "amount":4},
			{"letter":"E", "value":1,  "amount":12},
			{"letter":"F", "value":4,  "amount":2},
			{"letter":"G", "value":2,  "amount":3},
			{"letter":"H", "value":4,  "amount":2},
			{"letter":"I", "value":1,  "amount":9},
			{"letter":"J", "value":8,  "amount":1},
			{"letter":"K", "value":5,  "amount":1},
			{"letter":"L", "value":1,  "amount":4},
			{"letter":"M", "value":3,  "amount":2},
			{"letter":"N", "value":1,  "amount":6},
			{"letter":"O", "value":1,  "amount":8},
			{"letter":"P", "value":3,  "amount":2},
			{"letter":"Q", "value":10, "amount":1},
			{"letter":"R", "value":1,  "amount":6},
			{"letter":"S", "value":1,  "amount":4},
			{"letter":"T", "value":1,  "amount":6},
			{"letter":"U", "value":1,  "amount":4},
			{"letter":"V", "value":4,  "amount":2},
			{"letter":"W", "value":4,  "amount":2},
			{"letter":"X", "value":8,  "amount":1},
			{"letter":"Y", "value":4,  "amount":2},
			{"letter":"Z", "value":10, "amount":1},
			{"letter":"_", "value":0,  "amount":2}
		],
		"creator":"Ramon Meza"
		}
		

function makeTile(id, letter, value, droppedOn, previousDropped) {
  this.letter = letter;
  this.id = id;
  this.value = value;
  this.droppedOn = droppedOn;
  this.previousDropped = previousDropped;
} 
function makeBoard(id, letter){
	this.letter = letter;
	this.id = id;
}

//initialize board
//for(int i = 0; i < rackSize; i++)



    
	//get the rackSize amount of random letters
	//returns a random letter
	function randomizeLetters() 
	{
		var x = Math.floor(Math.random()*26);
		return x;
	}
	var pos = $("#droppable8").position(); 
	 // initial spacing of the board spaces
	$( ".board" ).each(function( index, element ) {
		// element == this
		var spacingFactor = 170;
		$( element ).css( "left", String(pos.left + spacingFactor * index) + "px" );
	if( $( this ).is(  "#droppable5" ) ) {
			$(element).attr("src","resource/Scrabble_Tiles/double-letter-score.png");
		}
		else if ( $( this ).is( "#droppable" ) ) {
			$(element).attr("src","resource/Scrabble_Tiles/double-word-score.png");
		}
		else if ( $( this ).is( "#droppable7" ) ) {
			$(element).attr("src","resource/Scrabble_Tiles/double-letter-score.png");
		}
		else 
		{
			$(element).attr("src","resource/Scrabble_Tiles/regular-board.png");
		}
		// stop spacing elements here so the rack does not get affected?
		
		
		
		
		
	});
		// the tile underneath the board
	/* $( ".drop" ).each(function( index, element ) {
			// element == this
			var spacingFactor = 170;
			$(element).find("p").html("why is it not working");
			var posTileEnd = $("#droppable7").position().left; 
			$( element ).css( "zIndex", "-1");
			$( element ).css( "width", String(posTileEnd + $("#droppable7").width()) + "px");
		}); */
	
	
	// function to space out the tile pieces, and load the tile image 
	function setPieces(){
	   $(".ui-widget-content" ).each(function( index, element ) {
			// element == this
			var spacingFactor = 130;
			var leftOffset = 30;
			var topOffset = 50;
			var gotRandom = randomizeLetters();
			var letter = data.pieces[gotRandom].letter;
			var value = data.pieces[gotRandom].value;
			tile[index] = new makeTile(($(element).attr("id")), letter, value, "droppable8", "droppable8");
			$( element ).css( "position", "absolute" );
			$( element ).css( "left", String(pos.left  + leftOffset + (spacingFactor * index)) + "px" );
			$( element ).css( "top", String(pos.top + topOffset) + "px" );
			$(element).attr("src","resource/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg");
		});
	}
	
	/* move the reset button to a place below the rack */
	$("#reset")
	{
		var topOffset = 200;
		$("#reset").css("top", String(pos.top + topOffset) + "px");
		$("#reset").css("left", topOffset + "px");
		$("#reset").css("color", "red");
		score = 0;
	}
	/* move the reset button to a place beside reset button */
	$("#submit")
	{
		var topOffset = 200;
		$("#submit").css("top", String(pos.top + topOffset) + "px");
		$("#submit").css("left", topOffset + 100 + "px");
		$("#submit").css("color", "red");
		score = 0;
	}
	//bind the button to a function startover
	document.getElementById("reset").addEventListener("click", startOver);
	document.getElementById("submit").addEventListener("click", pressedSubmit);
	// return pieces back to the rack and get new pieces
	function startOver() {
		document.getElementById("demo").innerHTML = Date();
		randomizeLetters();
		setPieces();
		updateScore(0, 0);
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$('.board').droppable('option', 'disabled', false);
		var index;
		for(index = 0; index < tile.length; index++)
		{
			tile[index].previousDropped = "droppable8";
		}
	}
	function pressedSubmit() {
		document.getElementById("demo").innerHTML = Date();
		randomizeLetters();
		setPieces();
		updateScore(0, 0);
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$('.board').droppable('option', 'disabled', false);
	}
	
	
	//set draggable property for the piece tiles, make the board tiles detect the piece tiles with img tag
$( function() {
    $( "#draggable" ).draggable({ revert: "invalid" });
    $( "#draggable2" ).draggable({ revert: "invalid" });
    $( "#draggable3" ).draggable({ revert: "invalid" });
	$( "#draggable4" ).draggable({ revert: "invalid" });
	$( "#draggable5" ).draggable({ revert: "invalid" });
	$( "#draggable6" ).draggable({ revert: "invalid" });
	$( "#draggable7" ).draggable({ revert: "invalid" });
	//initializing the scope of tiles and board and rack
	/* $( ".ui-widget-content" ).draggable({
		scope: "placeOnBoardOnly"
		});
	$( "#droppable8" ).droppable({
		  scope: "placeOnRackOnly"
		});
	$( ".board" ).droppable({
	  scope: "placeOnBoardOnly"
	}); */
	//do not count trigger the drop event for droppable 8 for scoring reason
	$("#droppable8").droppable({
	 classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
	  drop: function( event, ui ) 
		{
			
			var id = ui.draggable.attr("id");
			var index = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[index].letter;
			document.getElementById("demo5").innerHTML = "the drop target is:" +  this.id;
			tile[tile.findIndex(tile => tile.id == id)].droppedOn = this.id; //give the tile the drop target id
			
			
			//$( "#"+ id ).draggable( "option", "scope", "placeOnBoardOnly" );
			
			
			
        var x  = tile[index].droppedOn;
		//$('#' + x).droppable('option', 'disabled', true);
		console.log("dropped onto:" + x);
		console.log("previous is:" + tile[index].previousDropped);

			$('#' + tile[index].previousDropped).droppable('option', 'disabled', false);
			

			if(tile[index].previousDropped == "droppable8")
			{
				//moving a tile originally on the rack to another spot on the rack
			}
			else
			{
				movedFromTiletoRack(index, tile[index].previousDropped);
			}
			tile[index].previousDropped = tile[index].droppedOn;
			document.getElementById('demo6').innerHTML = "place score here: " + score;
			

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		}
	});
	// accept classes: board and rack except for current board, or only board because the tile is on the rack
	$('.ui-widget-content').draggable({
    start: function() {
		/* var x = tile[tile.findIndex(tile => tile.id == this.id) ].droppedOn;
		console.log("picked up from:" + x);
		tile[tile.findIndex(tile => tile.id == this.id) ].previousDropped = x;
        if( x == "droppable8")
			{console.log("the rack");}
		else
		{
			
			$('#' + x).droppable('option', 'disabled', true);
		} */
		//$( '#' + x).removeClass( "valid" )
    },
    stop: function() {
		
    }
});
	//underlapped droppable should be hidden under board tiles functions out and drop
    $( ".board" ).droppable({
		classes: 
		{
			"ui-droppable-active": "ui-state-active",
			"ui-droppable-hover": "ui-state-hover"
		},
	  //jquery ui drop, not the css class
		drop: function( event, ui ) 
		{
			$( this )
			.addClass( "ui-state-highlight" )
			.find( "p" )
			.html( "Dropped!" )
			
			/* get the id of draggable that was last dropped */
			/* https://stackoverflow.com/questions/10665901/jquery-droppable-get-draggable-id */
			var id = ui.draggable.attr("id");
			var letterLookup = tile[tile.findIndex(tile => tile.id == id)].letter;
			//updateScore(false, data[data.findIndex(data => data.pieces == letterLookup)].value);
			document.getElementById('demo').innerHTML = id; 
			document.getElementById('demo2').innerHTML = "the letter associated with the id: " + letterLookup;
			// trying to get the index of the the last draggable that dropped using findIndex https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
			document.getElementById('demo3').innerHTML ="what is this" +  ui.helper.attr("id");
			document.getElementById('demo4').innerHTML = "test of position top: " + ui.position.top;
			var id = ui.draggable.attr("id");
			var index = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[index].letter;
			
			
			//$( "#"+ id ).draggable( "option", "scope", "placeOnRackOnly" );
			document.getElementById("demo5").innerHTML = "the drop target is:" +  this.id;
			tile[tile.findIndex(tile => tile.id == id)].droppedOn = this.id; //give the tile the drop target id
			
		
        var x  = tile[index].droppedOn;
		//$('#' + x).droppable('option', 'disabled', true);
		console.log("dropped onto:" + x);
		console.log("previous is:" + tile[index].previousDropped);
	
			$('#' + tile[index].previousDropped).droppable('option', 'disabled', false);
			$('#' + tile[index].droppedOn).droppable('option', 'disabled', true);
			
			//moved from rack to tile
			console.log("UUUUUU we get here");
			if(tile[index].previousDropped == "droppable8")
			{
				console.log("why we get here");
				movedFromRacktoTile(index, tile[index].droppedOn );
				
			}
			// moved from one board slot to another
			else
			{
				console.log("maybe we get here");
				movedtoAnotherBoardSlot(index, tile[index].previousDropped, tile[index].droppedOn );
			}
	
			document.getElementById('demo6').innerHTML = "place score here: " + score;
			tile[index].previousDropped = tile[index].droppedOn;	

			

		}
	});
});
function updateScore(code, val) 
{
	switch(code){
		case -1:
		{
			console.log("yo");
			// moved from board to board
			if(doubleFlag == -1)
			{
				console.log("hellO");
				score = score 
				doubleFlag = 0;
				return;
			}
			score = score - val;
		} 
		break;
		case 1:
		{
			score = score + val;
			if(doubleFlag)
			{
				score = score *2;
				doubleFlag = 0;
			}
			
		}
		break;
		case 0:
		{
			score = 0;
		}
	}
}
function updateScoreRackPrevious(code, val) 
{
	score = val + score;
}
function updateScoreBoardPrevious(code, val) 
{
	score =  score - val * 2;
	
}
function movedFromTiletoRack(index, previous)
{
	switch(previous)
		{
			case "droppable": 
			{
				// moved from the double word score tile to another tile i think it works
				doubleFlag = -1;
				updateScoreBoardPrevious(-1, tile[index].value);
				console.log("did we get here");
				
			}
			break;
			case "droppable5":
			{
				//updateScoreBoardPrevious(-1,   tile[index].value/2);
				score = score - 2*tile[index].value;

				
			}
			break;
			case "droppable7":
			{
				// moved from the double letter score tile to a tile (regular or special)?
				//updateScoreBoardPrevious(-1,   tile[index].value/2);
				score = score - 2*tile[index].value;
			}
			break;
			default:
			{
				//move to rack from a  regular slot 
				score = score - tile[index].value;
				
			}	
		}
	
}


function movedtoAnotherBoardSlot(index, previous, newlyDropped)
{
	switch(previous)
		{
			case "droppable": 
			{
				// moved from the double word score tile to another tile i think it works
				doubleFlag = -1;
				updateScoreBoardPrevious(-1, tile[index].value);
				console.log("did we get here");
				switch(newlyDropped)
				{
					case "droppable7":
					{
						score = score + tile[index].value;
					}
					break;
					case "droppable7":
					{
						
					}
					break;
					default:
					{
						// moved to a regular tile
						//score = score - tile[index].value;
					}
				}
			}
			break;
			case "droppable5":
			{
				//updateScoreBoardPrevious(-1,   tile[index].value/2);
				score = score - tile[index].value;
				switch(newlyDropped)
				{
					case "droppable7":
					{
						score = score + tile[index].value;
					}
					break;
					case "droppable":
					{
						
					}
					break;
					default:
					{
						// moved to a regular tile
						//score = score - tile[index].value;
					}
				}

				
			}
			break;
			case "droppable7":
			{
				// moved from the double letter score tile to a tile (regular or special)?
				switch(newlyDropped)
				{
					//moved to another double letter score so add the bonus back in
					case "droppable5":
					{
						
					}
					break;
					case "droppable":
					{
						
					}
					break;
					default:
					{
						// moved to a regular tile
						score = score - tile[index].value;
					}
				}
			}
			break;
			default:
			{
				//move to a regular slot from a double word/letter tile or a regular tile 
				switch(newlyDropped)
				{
					case "droppable7":
					{
						score = score + tile[index].value;
					}
					break;
					case "droppable":
					{
						
					}
					break;
					case "droppable5":
					{
						score = score + tile[index].value;
					}
					break;
					default:
					{
						// moved to a regular tile
						
					}
				}
			}	
		}
}
//add up the score
function movedFromRacktoTile(index, newlyDropped)
 {
		switch(newlyDropped)
			{
				// moved to the double word score
				case "droppable": 
				{
					score = score + tile[index].value;
					score = score + score;
				}
				break;
				case "droppable5":
				{
					score = score + 2 * tile[index].value;
				}
				break;
				case "droppable7":
				{
					score = score + 2 * tile[index].value;
				}
				break;
				default:
				{
					updateScoreRackPrevious(1,  tile[index].value);
				}
				
			}	

	
	
}


$(document).ready(function(){
	randomizeLetters();
	setPieces();

});