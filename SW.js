let counter = 0;
let currentPosition = 0;
let counter2 = 100;
const numberName = document.querySelector(".number-name");

function linkEssentialAlbums() {
    window.location.href = "essentialAlbums.html";
}

function linkStevenWilsonSongs () { 
    window.location.href = "stevenWilsonSongs.html";
}

function linkHome() {
    window.location.href = "index.html";
}

function moveSliderRight() {
    const sliderContainer = document.querySelector(".slider-container");
    if(currentPosition > -9900)
    {
        currentPosition-=100;
        sliderContainer.style.transform = `translateX(${currentPosition}vw)`;
    }
}

function moveSliderLeft() {
    const sliderContainer = document.querySelector(".slider-container");
    if(currentPosition != 0)
    {
        currentPosition+=100;
        sliderContainer.style.transform = `translateX(${currentPosition}vw)`;
    }
}

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTwNfrFm8_9-JnMkjisj3W7_gvMwYzq3Vt26I-pULut5TxEZaQv0z21SzfwuNjBkhM_Fr4W5D4ioy1w/pub?gid=881276312&single=true&output=csv')
  .then(response => response.text())
  .then(data => {
    Papa.parse(data, {
      header: true, // Use the first row as headers
      dynamicTyping: true, // Automatically convert numeric values
      complete: function (results) {
        results.data.forEach(row => {
            //console.log(row);
        }
        )

        results.data.forEach(row => {
            let counterString = counter2.toString();
            document.querySelector("#coverArt" + counterString).src = row['Cover'];
            document.querySelector("#location" + counterString).textContent = row['Album'];
            document.querySelector("#date" + counterString).textContent = row['Date'];
            document.querySelector("#commentary" + counterString).textContent = row['Commentary'];
            document.querySelector("#project" + counterString).textContent = row['Project'];
            document.querySelector("#song" + counterString).id = row['Album-ID'];
            console.log(row);

            let fontSize;
            //let songTitle = document.querySelector("#song-title" + counterString);
            if(row['Title'].length > 20)
            {
                fontSize = 1168 / row['Title'].replace(/\s/g, '').length;
                /*while(songTitle.offsetHeight > numberName.offsetHeight || songTitle.offsetWidth > numberName.offsetWidth)
                {
                    fontSize--;
                    songTitle.style.fontSize = fontSize + "px";
                }*/
            }
            document.querySelector("#song-title" + counterString).textContent = row['Title'];
            document.querySelector("#song-title" + counterString).style.fontSize = fontSize + "px";
            counter2--;
        });

        //let specificRow = results.data[1];
        //document.querySelector("#coverArt" + "2").src = specificRow['Cover'];
        //console.log(specificRow['Cover']);
      },
      error: function (error) {
        console.error('Error parsing CSV:', error.message);
      },
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
