const rackSize = 7;
var i;
var pieceVals = []; // the current set of letters

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
		
		
    document.getElementById('content').innerHTML = data.pieces[1].letter + ", left:" + data.pieces[1].amount;
	//get the rackSize amount of random letters
	for(i = 0; i < rackSize; i++)
	{
		pieceVals[i] = data.pieces[(Math.floor(Math.random()*26))].letter;
		console.log("have letter: " + pieceVals[i]);
	}
	
	var pos = $("#droppable8").position(); 
	console.log(pos.left);
	console.log("top is: " + String(pos.top));
	
	 // function to space out the board spaces
	   $( ".board" ).each(function( index, element ) {
    // element == this
	var spacingFactor = 170;
    $( element ).css( "left", String(pos.left + spacingFactor * index) + "px" );
	console.log(String(pos.left + spacingFactor * index) + "px");
    });
	
	// function to space out the tile pieces
   $(".ui-widget-content" ).each(function( index, element ) {
		// element == this
		var spacingFactor = 130;
		var leftOffset = 30;
		var topOffset = 50;
		$( element ).css( "position", "fixed" );
		$( element ).css( "left", String(pos.left  + leftOffset + (spacingFactor * index)) + "px" );
		$( element ).css( "top", String(pos.top + topOffset) + "px" );
		$(element).attr("src","resource/Scrabble_Tiles/Scrabble_Tile_" + pieceVals[index] + ".jpg");
    });
	
	/* function to place button below the rack */
	$("#reset")
	{
		var topOffset = 200;
		$("#reset").css("top", String(pos.top + topOffset) + "px");
		$("#reset").css("left", topOffset + "px");
		$("#reset").css("color", "red");
	}
	
	document.getElementById("reset").addEventListener("click", displayDate);
	function displayDate() {
	document.getElementById("demo").innerHTML = Date();
	$(".ui-widget-content" ).each(function( index, element ) {
		// element == this
		var spacingFactor = 130;
		var leftOffset = 30;
		var topOffset = 50;
			for(i = 0; i < rackSize; i++)
		{
			pieceVals[i] = data.pieces[(Math.floor(Math.random()*26))].letter;

		}
		$( element ).css( "position", "fixed" );
		$( element ).css( "left", String(pos.left  + leftOffset + (spacingFactor * index)) + "px" );
		$( element ).css( "top", String(pos.top + topOffset) + "px" );
		$(element).attr("src","resource/Scrabble_Tiles/Scrabble_Tile_" + pieceVals[index] + ".jpg");
    });
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
      }
    });
	/* $( ".board").droppable({ 
	drop: function() {alert( "dropped" );
	}
    }); */
} );