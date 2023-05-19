//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log
//the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let baseURL = "https://deckofcardsapi.com/api";
let myDeck;
let count = 0;

async function myCard() {
  myDeck = await axios.get(`${baseURL}/deck/new/shuffle/?deck_count=1`);
  console.log(myDeck);
  let card = await axios.get(
    `${baseURL}/deck/${myDeck.data.deck_id}/draw/?count=1`
  );
  console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
  return myDeck;
}

//Make a request to the deck of cards API to request a single card from a newly shuffled deck.
//Once you have the card, make a request to the same API to get one more card from the same deck.
//Once you have both cards, console.log the values and suits of both cards.

async function twoCards() {
  let shuffled = await axios.get(`${baseURL}/deck/new/shuffle/?deck_count=1`);
  let card1 = await axios.get(
    `${baseURL}/deck/${shuffled.data.deck_id}/draw/?count=1`
  );
  let card2 = await axios.get(
    `${baseURL}/deck/${shuffled.data.deck_id}/draw/?count=1`
  );

  console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
  console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
}

//Build an HTML page that lets you draw cards from a deck. When the page loads,
// go to the Deck of Cards API to create a new deck, and show a button on the page that
//will let you draw a card. Every time you click the button,
//display a new card, until there are no cards left in the deck.

async function shuffle() {
  myDeck = await axios.get(`${baseURL}/deck/new/shuffle/?deck_count=1`);

  return myDeck;
}

async function draw(event) {
  try {
    let newcard = await axios.get(
      `${baseURL}/deck/${myDeck.data.deck_id}/draw/?count=1`
    );
    console.log(newcard.data);
    $("#my-card").attr("src", `${newcard.data.cards[0].image}`);
  } catch (e) {
    $(".draw-button").addClass("hidden");
    $("#start-button").removeClass("hidden");
    $("#start-button").addClass("show");
  }
}

$(".draw-button").on("click", draw);
$("#start-button").on("click", function () {
  location.reload();
});

window.onload = (event) => {
  shuffle();
};
