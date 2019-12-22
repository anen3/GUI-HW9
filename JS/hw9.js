/*Alex Nguyen
alex_nguyen@student.uml.edu
https://github.com/anen3/GUI-HW9
UMass Lowell COMP4610 GUI Programming I
Purpose of this webpage: implementing part of the scrabble game using jquery ui draggable and droppable*/
const rackSize = 7;
var score = 0;
var amountArr = [];
var wordFlag;
var tile = []; // the current set of letters ex. A, B, F ...
var totalScore = 0;
//couldn't get json to work so here is the data
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
	for(var i = 0; i < 26; i++)
	{
		amountArr[i] = data.pieces[i].amount;
	}		
	
function makeTile(id, letter, value, droppedOn, previousDropped) {
  this.letter = letter;
  this.id = id;
  this.value = value;
  this.droppedOn = droppedOn;
  this.previousDropped = previousDropped;
} 

	//returns a random letter index. if the pool does not contain that letter anymore, go back and get another one.
	function randomizeLetters() 
	{
		var x = Math.floor(Math.random()*26);
		if(amountArr[x] >= 1)
		{
			amountArr[x] = amountArr[x] - 1;
			return x;
			
		}
			randomizeLetters();
			return x;
		
	}
	//get top of tile rack for spacing of board pieces
	var pos = $("#droppable8").position(); 
	
	 // initial spacing of the board spaces and load their images
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

	});
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
			wordFlag = 0;
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
		totalScore = 0;
		wordFlag = 0;
	}
	/* move the reset button to a place beside reset button */
	$("#submit")
	{
		var topOffset = 200;
		$("#submit").css("top", String(pos.top + topOffset) + "px");
		$("#submit").css("left", topOffset + 100 + "px");
		$("#submit").css("color", "red");
	}
	//bind the button to a function startover
	document.getElementById("reset").addEventListener("click", startOver);
	document.getElementById("submit").addEventListener("click", pressedSubmit);
	// return pieces back to the rack and get new pieces
	function startOver() {
		setPieces(); // move the pieces to the rack
		resetScore();
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$('.board').droppable('option', 'disabled', false); // enable all board slots
		var index;
		for(index = 0; index < tile.length; index++)
		{
			tile[index].previousDropped = "droppable8";
		}
		//reset pool of tiles
		for(var i = 0; i < 26; i++)
		{
			amountArr[i] = data.pieces[i].amount;
		}		
		totalScore = 0;
		document.getElementById("demo7").innerHTML = "Total Score is: " + totalScore;
		document.getElementById("demo8").innerHTML = "";
	}
	function pressedSubmit() {
		var sum = 0;
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$('.board').droppable('option', 'disabled', false);
		for(var index = 0; index < 26; index++)
		{
			console.log("letter: " + data.pieces[index].letter + " amount: " + amountArr[index]);
			sum = sum + amountArr[index];
			
		}
		if(sum <= 7) 
		{
			document.getElementById("demo8").innerHTML = "You have run out of letters!"
			$( "#reset" ).trigger( "click" );
			return;
		}
		for(var i = 0; i < rackSize; i++)
		{
			if(tile[i].droppedOn != "droppable8")
			{
				var gotRandom = randomizeLetters();
				var letter = data.pieces[gotRandom].letter;
				$("#" + tile[i].id).attr("src","resource/Scrabble_Tiles/Scrabble_Tile_" + letter + ".jpg");
				tile[i].letter = data.pieces[gotRandom].letter;
				tile[i].value = data.pieces[gotRandom].value;
			}
		}
		//reseting position of tiles onto the rack
		 $(".ui-widget-content" ).each(function( index, element ) {
			// element == this
			var spacingFactor = 130;
			var leftOffset = 30;
			var topOffset = 50;
			$( element ).css( "position", "absolute" );
			$( element ).css( "left", String(pos.left  + leftOffset + (spacingFactor * index)) + "px" );
			$( element ).css( "top", String(pos.top + topOffset) + "px" );
			});

		totalScore = totalScore + score;
		document.getElementById("demo7").innerHTML = "Total Score is: " + totalScore;
		wordFlag = 0;
		for(var index = 0; index < tile.length; index++)
		{
			tile[index].previousDropped = "droppable8";
			tile[index].droppedOn = "droppable8";
		}
		for(var index = 0; index < 26; index++)
		{
			console.log("letter: " + data.pieces[index].letter + " amount: " + amountArr[index]);
		}
		document.getElementById("demo8").innerHTML = "remaining letters: " + sum;
		score = 0;
		document.getElementById('demo6').innerHTML = "current score is: " + score;
	}
	
	
	//set draggable property for the piece tiles, make the board tiles detect the piece tiles with img tag
$( function() {
	// keep tiles from being dropping again on its same board space
    $( "#draggable" ).draggable({ revert: "invalid" });
    $( "#draggable2" ).draggable({ revert: "invalid" });
    $( "#draggable3" ).draggable({ revert: "invalid" });
	$( "#draggable4" ).draggable({ revert: "invalid" });
	$( "#draggable5" ).draggable({ revert: "invalid" });
	$( "#draggable6" ).draggable({ revert: "invalid" });
	$( "#draggable7" ).draggable({ revert: "invalid" });
	//the rack function for when a tile is dropped onto it. update the score if a tile is moved from the board to the rack, otherwise do not change the score.
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
			tile[tile.findIndex(tile => tile.id == id)].droppedOn = this.id; //give the tile the drop target id
			var x  = tile[index].droppedOn;
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
			document.getElementById('demo6').innerHTML = "Current score is: " + score;
		}
	});
	//underlapped droppable should be hidden under board tiles functions out and drop
	//droppable code following from the tutorial: https://jqueryui.com/droppable/#revert*/
    $( ".board" ).droppable({
		classes: 
		{
			"ui-droppable-active": "ui-state-active",
			"ui-droppable-hover": "ui-state-hover"
		},
	  //jquery ui drop, not the css class
		drop: function( event, ui ) 
		{
			$( this ).addClass( "ui-state-highlight" )

			/* get the id of draggable that was last dropped */
			/* VisioN's comment also it's in the documentation of droppable event: drop -> ui draggable https://stackoverflow.com/questions/10665901/jquery-droppable-get-draggable-id */
			var id = ui.draggable.attr("id");
			var letterLookup = tile[tile.findIndex(tile => tile.id == id)].letter;
			// trying to get the index of the the last draggable that dropped using findIndex https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
			var id = ui.draggable.attr("id");
			var index = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[index].letter;
			tile[tile.findIndex(tile => tile.id == id)].droppedOn = this.id; //give the tile the drop target id
			var x  = tile[index].droppedOn;
			$('#' + tile[index].previousDropped).droppable('option', 'disabled', false);
			$('#' + tile[index].droppedOn).droppable('option', 'disabled', true);
			
			//moved from rack to tile
			if(tile[index].previousDropped == "droppable8")
			{
				movedFromRacktoTile(index, tile[index].droppedOn );
				
			}
			// moved from one board slot to another
			else
			{
				movedtoAnotherBoardSlot(index, tile[index].previousDropped, tile[index].droppedOn );
			}
	
			document.getElementById('demo6').innerHTML = "current score is: " + score;
			tile[index].previousDropped = tile[index].droppedOn;	
			
			

		}
	});
});
function resetScore() 
{
		score = 0;
}


function movedFromTiletoRack(index, previous)
{
	switch(previous)
		{
			case "droppable": 
			{
				// moved from the double word score tile to rack
				score = score/2;
				score = score -tile[index].value;
				wordFlag = 0;
			}
			break;
			case "droppable5":
			{
				// moved from the double letter score tile rack 
				if(wordFlag)
				{
					score = score/2;
				}
				score = score - 2*tile[index].value;
				if(wordFlag)
				{
					score = score*2;
				}
				
				
			}
			break;
			case "droppable7":
			{
				// moved from the double letter score tile rack 

				score = score - 2*tile[index].value;
			}
			break;
			default:
			{
				//move to rack from a  regular slot 
				wordFlagCheckBegin();
				score = score - tile[index].value;
				wordFlagCheckEnd();
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
				switch(newlyDropped)
				{
					case "droppable7":
					{
						score = score/2;
						score = score + tile[index].value;
						wordFlag = 0;
					}
					break;
					case "droppable5":
					{
						score = score/2;
						score = score + tile[index].value;
						wordFlag = 0
					}
					break;
					default:
					{
						score = score/2;
						wordFlag = 0;
						// moved to a regular tile
					}
				}
			}
			break;
			case "droppable5":
			{

				
				switch(newlyDropped)
				{
					case "droppable7":
					{
						
					}
					break;
					case "droppable":
					{
						wordFlag = 1;
					}
					break;
					default:
					{
						// moved to a regular tile
						wordFlagCheckBegin();
						score = score - tile[index].value;
						wordFlagCheckEnd();
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
						wordFlag = 1;
					}
					break;
					default:
					{
						// moved to a regular tile
						wordFlagCheckBegin();
						score = score - tile[index].value;
						wordFlagCheckEnd();
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
						wordFlagCheckBegin();
						score = score + tile[index].value;
						wordFlagCheckEnd();
					}
					break;
					case "droppable":
					{
						score = score * 2;
					}
					break;
					case "droppable5":
					{
						wordFlagCheckBegin();
						score = score + tile[index].value;
						wordFlagCheckEnd();
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
					wordFlag = 1;
				}
				break;
				case "droppable5":
				{
					wordFlagCheckBegin();
					score = score + 2 * tile[index].value;
					wordFlagCheckEnd();
				}
				break;
				case "droppable7":
				{
					wordFlagCheckBegin();
					score = score + 2 * tile[index].value;
					wordFlagCheckEnd();
				}
				break;
				default:
				{
					wordFlagCheckBegin();
					score = score +  tile[index].value;
					wordFlagCheckEnd();
				}
			}	
}
function wordFlagCheckBegin()
{
	if(wordFlag)
	{
		score = score/2;
	}
}
function wordFlagCheckEnd()
{
	if(wordFlag)
	{
		score = score*2;
	}
	
}

$(document).ready(function(){
	setPieces();

});