var theDeck=[];
var placeInDeck = 0;

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
		shuffleDeck();
		playerHand = [ theDeck[0], theDeck[2] ];
		dealerHand = [ theDeck[1], theDeck[3] ];
		placeInDeck = 4;
		placeCard(playerHand[0], 'player', 'one');
		placeCard(dealerHand[0], 'dealer', 'one');
		placeCard(playerHand[1], 'player', 'two');
		placeCard(dealerHand[1], 'dealer', 'two');
		calculateTotal(playerHand, 'player');
		calculateTotal(dealerHand, 'dealer');
	}

	function placeCard(card, who, slot){
		var currId = '#' + who + '-card-' + slot;
		$(currId).removeClass('empty');
		$(currId).html(card);
	}

	function calculateTotal(hand, who){
		var total=0;
		for (i=0; i<hand.length; i++){
			var cardValue = Number(hand[i].slice(0, -1));
			total += cardValue;
		}
		var idToGet = '.' + who + '-total';
		$(idToGet).html(total);
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
		var numberOfTimesToShuffle = 500;
		for(i=1; i<500; i++){
			card1 = Math.floor(Math.random() * theDeck.length);
			card2 = Math.floor(Math.random() * theDeck.length);
			if(card1 != card2){
				temp = theDeck[card1];
				theDeck[card1] = theDeck[card2];
				theDeck[card2] = temp;
			}
		}

	}

	function hit(){
		
	}

	function stand(){
		
	}
}); //change to document.ready if problem occurs! move it up
