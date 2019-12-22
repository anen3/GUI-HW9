/*Alex Nguyen
alex_nguyen@student.uml.edu
UMass Lowell COMP4610 GUI Programming I
Purpose of this webpage: implementing part of the scrabble game using jquery ui draggable and droppable*/


const rackSize = 7;
var score = 0;
var amountArr = [];
var refreshAmountArr = [];
var wordFlag;
var tile = []; // the current set of letters ex. A, B, F ...
var totalScore = 0;
var testingAmt;
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
		//testingAmt = testingAmt + " " +  amountArr[i];
	}		
	
function makeTile(id, letter, value, droppedOn, previousDropped) {
  this.letter = letter;
  this.id = id;
  this.value = value;
  this.droppedOn = droppedOn;
  this.previousDropped = previousDropped;
} 


//initialize board
//for(int i = 0; i < rackSize; i++)



    
	//get the rackSize amount of random letters
	//returns a random letter
	function randomizeLetters() 
	{
		var x = Math.floor(Math.random()*26);
		if(amountArr[x] >= 1)
		{
			amountArr[x] = amountArr[x] - 1;
			return x;
			
		}
			console.log("im printing: " + x);
			randomizeLetters();
			return x;
		
	}
	//get top of tile rack for spacing of board pieces
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
		setPieces();
		resetScore();
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$('.board').droppable('option', 'disabled', false);
		var index;
		for(index = 0; index < tile.length; index++)
		{
			tile[index].previousDropped = "droppable8";
		}
		//reset pool of tiles
		for(var i = 0; i < 26; i++)
		{
			amountArr[i] = data.pieces[i].amount;
			//testingAmt = testingAmt + " " +  amountArr[i];
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
		//console.log("dropped onto:" + x);
		//console.log("previous is:" + tile[index].previousDropped);

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
			//resetScore(false, data[data.findIndex(data => data.pieces == letterLookup)].value);
			// trying to get the index of the the last draggable that dropped using findIndex https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
			var id = ui.draggable.attr("id");
			var index = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[index].letter;
			tile[tile.findIndex(tile => tile.id == id)].droppedOn = this.id; //give the tile the drop target id
			
		
        var x  = tile[index].droppedOn;
		//$('#' + x).droppable('option', 'disabled', true);
		//console.log("dropped onto:" + x);
		//console.log("previous is:" + tile[index].previousDropped);
	
			$('#' + tile[index].previousDropped).droppable('option', 'disabled', false);
			$('#' + tile[index].droppedOn).droppable('option', 'disabled', true);
			
			//moved from rack to tile
			//console.log("UUUUUU we get here");
			if(tile[index].previousDropped == "droppable8")
			{
				//console.log("why we get here");
				movedFromRacktoTile(index, tile[index].droppedOn );
				
			}
			// moved from one board slot to another
			else
			{
				//console.log("maybe we get here");
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
				// moved from the double word score tile to another tile i think it works
				score = score/2;
				score = score -tile[index].value;
				wordFlag = 0;
			}
			break;
			case "droppable5":
			{
				//wordFlagCheck(tile[index].droppedOn, index);
				//console.log("what is wordflag: " + wordFlag);
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
				// moved from the double letter score tile to a tile (regular or special)?

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