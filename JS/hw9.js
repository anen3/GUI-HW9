const rackSize = 7;
var score = 0;
var board = []

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
		

function makeTile(id, letter, value) {
  this.letter = letter;
  this.id = id;
  this.value = value;
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
		var x = Math.floor(Math.random()*27);
		return x;
	}
	var pos = $("#droppable8").position(); 
	 // initial spacing of the board spaces
	   $( ".board" ).each(function( index, element ) {
			// element == this
			var spacingFactor = 170;
			$( element ).css( "left", String(pos.left + spacingFactor * index) + "px" );
			if ( $( this ).is( "#droppable7" ) ) {
			  return false;
			}
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
			tile[index] = new makeTile(($(element).attr("id")), letter, value);
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
	//bind the button to a function startover
	document.getElementById("reset").addEventListener("click", startOver);
	// return pieces back to the rack and get new pieces
	function startOver() {
		document.getElementById("demo").innerHTML = Date();
		randomizeLetters();
		setPieces();
		updateScore(0, 0);
		document.getElementById("demo6").innerHTML = "place score here: " + score;
		$( ".ui-widget-content" ).draggable({
		scope: "placeOnBoardOnly"
		});
	}
	function updateScore(code, val) 
	{
		switch(code){
			case -1:
			{
				score = score - val;
			} 
			break;
			case 1:
			{
				score = score + val;
			}
			break;
			case 0:
			{
				score = 0;
			}
		}
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
	$( ".ui-widget-content" ).draggable({
		scope: "placeOnBoardOnly"
		});
	$( "#droppable8" ).droppable({
		  scope: "placeOnRackOnly"
		});
	$( ".board" ).droppable({
	  scope: "placeOnBoardOnly"
	});
	//do not count trigger the drop event for droppable 8 for scoring reason
	$("#droppable8").droppable({
	 classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
	  drop: function( event, ui ) 
		{
			
			var id = ui.draggable.attr("id");
			var x = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[x].letter;
			updateScore(-1, tile[x].value);
			document.getElementById('demo6').innerHTML = "place score here: " + score;
			$( "#"+ id ).draggable( "option", "scope", "placeOnBoardOnly" );
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
			document.getElementById("demo5").innerHTML = "the drop target is:" +  this.id;
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
			var x = tile.findIndex(tile => tile.id == id);
			var letterLookup = tile[x].letter;
			updateScore(1, tile[x].value);
			document.getElementById('demo6').innerHTML = "place score here: " + score;
			$( "#"+ id ).draggable( "option", "scope", "placeOnRackOnly" );
		}
	});
});



$(document).ready(function(){
	randomizeLetters();
	setPieces();

});