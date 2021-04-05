//https://medium.com/@blakeeh723/how-to-build-a-card-game-with-object-oriented-programming-c43cd2cadb3a
//https://en.wikipedia.org/wiki/Glossary_of_card_game_terms
//https://en.wikipedia.org/wiki/Playing_card_suit
class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    createDeck() {
        let suits = ['acorns', 'bells', 'hearts', 'leaves'];
        let ranks = ['7', 'unter', 'ober', 'king', '10', 'ace'];
        let values = [0, 2, 3, 4, 10, 11];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
    }
    shuffleDeck() {

    }
}

const d = new Deck();
d.createDeck();
console.log(d.cards);