var theDeck=[];

$(document).ready(function(){

	$('button').click(function(){
		var clickedButton = ($(this).attr('id'));
		if(clickedButton == 'deal-button'){
			deal();
		}
		else if(clickedButton == 'hit-button'){
			hit();
		}
		else if(clickedButton == 'stand-button'){
			stand();
		}
	});

	function deal(){
		theDeck = shuffleDeck();
	}
	function shuffleDeck(){
		for(s=1; s<=4; s++){
			var suit="";
			if(s === 1){
				suit = 'h';
				}else if(s === 2){
					suit = 's';
				}
				else if(s === 3){
					suit = 'd';
				}
				else if(s === 4){
					suit = 'c';
				}
				for(i=1; i<=13; i++){
					theDeck.push(i+suit);
				
			}
		}
	}

	function hit(){
		
	}

	function stand(){
		
	}
}); //change to document.ready if problem occurs! move it up
