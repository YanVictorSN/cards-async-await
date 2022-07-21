const mainPage = document.querySelector('main');

const buttonPage = document.querySelector('button');

const result = document.getElementById('result');

buttonPage.addEventListener('click', takeDeck);


async function takeDeck() {
    try {

        const shuffleDeck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

        if (shuffleDeck.status !== 200) {
            throw 'Tente novamente mais tarde.'
        }
   
    const deckJson = await shuffleDeck.json();

    const deckId = deckJson.deck_id;

    takeCardsFromDeck(deckId);
            console.log(shuffleDeck);
            console.log(deckJson)
            console.log(deckId)
    }
    catch(e) {
        result.innerHTML = `${e}`
    }
}

async function takeCardsFromDeck(deckId) {
    try {
        for (let index = 0; index < 5; index++) {

            const getCardDeck = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    
            if(getCardDeck.status !== 200) {
               throw 'Tente novamente mais tarde'
            }
    
            const getCardJson = await getCardDeck.json();
        
            const getCard = getCardJson.cards[0];

            createCards(getCard);
    }
    }
    catch(e) {
        result.innerHTML = `${e}`
    }
}


function createCards(getCard) {
    const createImgCard = document.createElement('img');
    createImgCard.setAttribute('src', `${getCard.image}`);
    mainPage.appendChild(createImgCard);
}

// function deleteCards() {
//     mainPage.removeChild(createImgCard)
// }