const rackSize = 7;

function makeTile(id, letter) {
  this.letter = letter;
  this.id = id;
  
} 
var tile = []; // the current set of letters ex. A, B, F ...

var data = {"pieces": [
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
			//console.log(String(pos.left + spacingFactor * index) + "px");
			});
			
	// function to space out the tile pieces, and load the tile image 
	function setPieces(){
	   $(".ui-widget-content" ).each(function( index, element ) {
			// element == this
			var spacingFactor = 130;
			var leftOffset = 30;
			var topOffset = 50;
			tile[index] = new makeTile(($(element).attr("id")), data.pieces[randomizeLetters()].letter );
			$( element ).css( "position", "absolute" );
			$( element ).css( "left", String(pos.left  + leftOffset + (spacingFactor * index)) + "px" );
			$( element ).css( "top", String(pos.top + topOffset) + "px" );
			$(element).attr("src","resource/Scrabble_Tiles/Scrabble_Tile_" + tile[index].letter + ".jpg");
		});
	}
	
	/* move the reset button to a place below the rack */
	$("#reset")
	{
		var topOffset = 200;
		$("#reset").css("top", String(pos.top + topOffset) + "px");
		$("#reset").css("left", topOffset + "px");
		$("#reset").css("color", "red");
	}
	//bind the button to a function startover
	document.getElementById("reset").addEventListener("click", startOver);
	// return pieces back to the rack and get new pieces
	function startOver() {
		document.getElementById("demo").innerHTML = Date();
		randomizeLetters();
		setPieces();
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
    $( ".drop" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      },
    
	/* $( ".board").droppable({ 
	drop: function() {alert( "dropped" );
	}
    }); */
	/* get the id of draggable that was last dropped */
	/* https://stackoverflow.com/questions/10665901/jquery-droppable-get-draggable-id */
		drop: function(event, ui) {
		var id = ui.draggable.attr("id");
		document.getElementById('demo').innerHTML = id; 
		document.getElementById('demo2').innerHTML = "the letter associated with the id: " + tile[tile.findIndex(tile => tile.id == id)].letter;
		// trying to get the index of the the last draggable that dropped using findIndex https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
	}

});
} );



$(document).ready(function(){
	randomizeLetters();
	setPieces();

});