const mainPage = document.querySelector('main');

const buttonPage = document.querySelector('button');

buttonPage.addEventListener('click', takeCards);


async function takeCards() {
    
    const shuffleCards = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

    const deckJson = await shuffleCards.json();

    const deckId = await deckJson.deck_id;

    for (let index = 0; index < 5; index++) {

        const getCardDeck = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)

        const getCardJson = await getCardDeck.json();
    
        const getCard = await getCardJson.cards[0];

        const createImgCard = document.createElement('img');
        createImgCard.setAttribute('src', `${getCard.image}`);
        mainPage.appendChild(createImgCard);
    }
}

