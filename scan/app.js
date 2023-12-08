/*

const startScanner = () => {
    const videoElem = document.querySelector("#scanner video");

    const qrScanner = new QrScanner(videoElem, (result) => {
        console.log('Contenu du QR Code :', result);
    });
    
    qrScanner.setCamera("environment");
    qrScanner.start();
}

document.querySelector("#start").addEventListener("click", () => {
    startScanner();
});
*/
const fileSelector = document.getElementById('file-selector');
const fileQrResult = document.getElementById('file-qr-result');

function setResult(label, result) {
    if (result) {
        label.innerText = result;
    } else {
        label.innerText = 'No QR code found.';
    }
    label.style.color = 'white';
}




// ####### File Scanning #######

fileSelector.addEventListener('change', event => {
    const file = fileSelector.files[0];
    if (!file) {
        return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
        .then(result => setResult(fileQrResult, result))
        .catch(e => setResult(fileQrResult, { data: e || 'No QR code found.' }));
});

async function displayTicket() {
    try {
        const ticketData = await fetchData('http://127.0.0.1:8000/api/ticket/');
        const stadiumsContainer = document.querySelector('#stadiums .card-container');

        stadiumsData.stadiums.forEach(stadium => {
            const stadiumCard = document.createElement('div');
            stadiumCard.classList.add('card');

            const stadiumContent = document.createElement('p');
            stadiumContent.textContent = `Stadium Name: ${stadium.name}, Location: ${stadium.location}`;

            stadiumCard.appendChild(stadiumContent);
            stadiumsContainer.appendChild(stadiumCard);
        });
    } catch (error) {
        console.error('Error displaying stadiums:', error);
    }
}