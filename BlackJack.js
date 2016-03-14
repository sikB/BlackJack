var theDeck=[];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;


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
			if(cardValue == 11){
				total = 10;
			}else if(cardValue == 12){
				total = 10;
			}else if(cardValue == 13){
				total = 10;
			}else if(cardValue == 14){
				total = 1;
			}
		}
		var idToGet = '.' + who + '-total';
		$(idToGet).html(total);

		//good place to program bust(>21)
		if(total > 21){
			bust(who);

		}
		return total;
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
		var slot = '';
		if(playerTotalCards == 2){slot = "three";}
		else if(playerTotalCards == 3){slot = "four";}
		else if(playerTotalCards == 4){slot = "five";}
		else if(playerTotalCards == 5){slot = "six";}
		
		placeCard(theDeck[placeInDeck], 'player', slot);
		playerHand.push(theDeck[placeInDeck]);
		calculateTotal(playerHand, 'player');
		placeInDeck++;
		playerTotalCards++;
		
	}

	function stand(){
		var dealerTotal = $('.dealer-total').html();
		while (dealerTotal < 17){
			if(dealerTotalCards == 2){slot = 'three';}
			else if(dealerTotalCards == 3){slot = "four";}
			else if(dealerTotalCards == 4){slot = "five";}
			else if(dealerTotalCards == 5){slot = "six";}
			placeCard(theDeck[placeInDeck], 'dealer', slot);
			dealerHand.push(theDeck[placeInDeck]);
			dealerTotalCards++;
			placeInDeck++;
			calculateTotal(dealerHand, 'dealer');
			dealerTotal = $('dealer-total').html();
		}
		checkWin();
	}

	function checkWin(){
		var playerHas = Number($('.player-total').html());
		var dealerHas = Number($('.dealer-total').html());
		if(dealerHas > 21){
			//dealer has busted
			bust('dealer');
		}else{
			//neither player busted and the dealer has at least 17
			if(playerHas > dealerHas){
				//player won
				$('#message').html('You won!')
			}
			else if(dealerHas > playerHas){
				//dealer won
				$('#message').html('Dealer won!')
			}else{
				//tie
				$('#message').html('Tie Game!')
			}
		}
	}

	function bust(who){
		if(who === 'player'){
			$('#message').html('You Busted!')
		}else{
			$('#message').html('Dealer Busted!')
		}
	}

}); //change to document.ready if problem occurs! move it up
