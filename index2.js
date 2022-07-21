const mainPage = document.querySelector('main');

const buttonPage = document.querySelector('button');

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
    }
    
    catch(e) {
        result.innerHTML = `${e}`
    }
}

async function takeCardsFromDeck(deckId) {
    try {

        const getCardDeck = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
 
        const results = await Promise.all ([
            fetch(getCardDeck), 
            fetch(getCardDeck), 
            fetch(getCardDeck), 
            fetch(getCardDeck), 
            fetch(getCardDeck)
        ])

        const dataPromises = results.map(result => result.json())

        const finalData = await Promise.all(dataPromises)

        onsole.log(finalData);
        
        for (let index = 0; index < finalData.length; index++) {
            
            const getCard = finalData[index].cards[0];
            
            createCards(getCard);
        }     
    }
    catch(err) {
        result.innerHTML = `${err}`
    }
}


function createCards(getCard) {
    const createImgCard = document.createElement('img');
    createImgCard.setAttribute('src', `${getCard.image}`);
    mainPage.appendChild(createImgCard);
}
