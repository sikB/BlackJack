var theDeck=[];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var clicks = 0;
var playerBank = 500;
var playerLoss = 0;
var bet = 0;
var whoWon = '';

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

$('#reset-button').click(function(){
	reset();
})
	function reset(){
		$('.card').html('');
		$('.card').addClass('empty');
		$('.dealer-total').html(0);
		$('.player-total').html(0);
		dealerTotalCards = 2;
		playerTotalCards = 2;
		$('#hit-button').prop('disabled', false);
		$('#deal-button').prop('disabled', false);
		// $('#message').hide();
	};

	function addTwentyFive(){
	 clicks += 25;
	 bet += 25;
	 if(whoWon == 'player'){
	 	playerBank + 25;
	 }else if(whoWon == 'tie'){
	 	playerBank - 0;}
	 	else{playerBank - 25};

	}

	function addFifty(){
	 clicks += 50;
	 bet += 50;
	 if(whoWon == player){
	 	playerBank + 50;
	 }else if(whoWon == 'tie'){
	 	playerBank - 0;}
	 	else{playerBank - 50};

	}
	function addSeventyFive(){
	 clicks += 75;
	 bet += 75;
	 if(whoWon == player){
	 	playerBank + 75;
	 }else if(whoWon == 'tie'){
	 	playerBank - 0;}
	 	else{playerBank - 75};

	}
	function addHundred(){
	 clicks += 100;
	 bet += 100;
	 if(whoWon == player){
	 	playerBank + 100;
	 }else if(whoWon == 'tie'){
	 	playerBank - 0;}
	 	else{playerBank - 100};

	}
	function addFiveHundred(){
	 clicks += 500;
	 bet += 500;
	 if(whoWon == player){
	 	playerBank + 500;
	 }else if(whoWon == 'tie'){
	 	playerBank - 0;}
	 	else{playerBank - 500};

	}

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
		var suit = card[card.length-1];
		if(suit == 'h'){
			var suitImg = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnoX6Anc9Yz80CPF8mbBun9QgYiCzJ52yckKTPZLriDxiO7CUz">';
		}else if(suit == 's'){
			var suitImg = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQb67elR6XlBtqYoxI55eFZu9t78COJeEPX71Wm2Y_Pb8w4x19">';
		}else if(suit == 'd'){
			var suitImg = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgqOmctz_qmRiH4VB_19djpmvaUeEtyGWBei_aZM1TlgQeju0K">';
		}else if(suit == 'c'){
			var suitImg = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRP6Mgkux8OzT1mfIt-hV0jvhYX9xpA9I1V-rJzXonNnjxquIEfJQ">';
		}
		var cardValue = Number(card.slice(0, -1));
		$(currId).html(cardValue + suitImg);
	}

	function calculateTotal(hand, who){
		var total=0;
		for (i=0; i<hand.length; i++){
			var cardValue = Number(hand[i].slice(0, -1));
			if(cardValue == 11){
				cardValue = 10;
			}else if(cardValue == 12){
				cardValue = 10;
			}else if(cardValue == 13){
				cardValue = 10;}
				if(cardValue == 1){
					if(total + 11 <= 21){
						cardValue = 11;
					}else{
						cardValue = 1;
					}
				}
				total += cardValue;
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
			var suit;
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
		playerTotal = $('player-total').html();
		
		// bust();
		
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
			calculateTotal(dealerHand, 'dealer');
			dealerTotalCards++;
			placeInDeck++;
			dealerTotal = $('dealer-total').html();
		}
		checkWin();
		// bust();
		$('#hit-button').prop('disabled', true);
		$('#deal-button').prop('disabled', true);
		
	}

	function checkWin(){
		var playerHas = Number($('.player-total').html());
		var dealerHas = Number($('.dealer-total').html());
		if(dealerHas > 21){
			//dealer has busted
			bust('dealer')
		// }else if(playerHas > 21){
		// 	bust('player');
		}
		else{
			//neither player busted and the dealer has at least 17
			if(playerHas > dealerHas){
				//player won
				whoWon = 'player';
				$('#message').html('You won!');
				setTimeout(function(){$('#message').hide()}, 1500);
			}
			else if(dealerHas > playerHas){
				//dealer won
				whoWon = 'dealer';
				$('#message').html('Dealer won!');
				setTimeout(function(){$('#message').hide()}, 1500);
			}else{
				//tie
				whoWon = 'tie';
				$('#message').html('Tie Game!')
				setTimeout(function(){$('#message').hide()}, 1500);
			}
		}
	}

	function bust(who){
		if(who === 'player'){
			whoWon = 'dealer';
			$('#message').html('You Busted! You Lose!')
			setTimeout(function(){$('#message').hide()}, 1500);
		}else{
			whoWon = 'player';
			$('#message').html('Dealer Busted! You Win!')
			setTimeout(function(){$('#message').hide()}, 1500);
		}
	}

}); //change to document.ready if problem occurs! move it up
