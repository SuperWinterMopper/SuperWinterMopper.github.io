let counter = 0;
let currentPosition = 0;
let counter2 = 1;

function slideButton() {
    counter++;
    const button = document.querySelector(".sliding-photo-button");
    const background = document.querySelector(".background");
    const introduction = document.querySelector(".explanation-text");
    const darkModeSwitch = document.querySelector(".dark-mode-switch");
    const header = document.querySelector("home-header");
    if(counter % 2 == 1)
    {
        button.style.transform = "translateX(300px)";
        background.style.backgroundColor = "rgb(53, 53, 53)";
        introduction.style.color = "orange";
        darkModeSwitch.style.backgroundColor = "rgb(255, 161, 72)";
        header.style.backgroundColor = "blue";
    }
    else 
    {
        button.style.transform = "translateX(0px)";
        background.style.backgroundColor = "aliceblue";
        introduction.style.color = "rgb(108, 108, 108)";
        darkModeSwitch.style.backgroundColor = "lightgrey";
    }
}  

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
    if(currentPosition > -10000)
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

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRUSMvEQ88V3TJ-Czntq-02RwryeStduQjtpJ3lDGOL7sii1G0U8o_JNqYrwlTdWp0ecD6wj0gICFvu/pub?gid=881276312&single=true&output=csv')
  .then(response => response.text())
  .then(data => {
    Papa.parse(data, {
      header: true, // Use the first row as headers
      dynamicTyping: true, // Automatically convert numeric values
      complete: function (results) {
        results.data.forEach(row => {
            console.log(row);
        }
        )

        results.data.forEach(row => {
            let counterString = counter2.toString();
            document.querySelector("#coverArt" + counterString).src = row['Cover'];
            document.querySelector("#location" + counterString).textContent = row['Artist'];
            document.querySelector("#date" + counterString).textContent = row['Date'];
            document.querySelector("#commentary" + counterString).textContent = row['Commentary'];

            let fontSize
            if(row['Title'].length > 20)
            {
                fontSize = 1400 / row['Title'].length;
            }
            document.querySelector("#song-title" + counterString).textContent = row['Title'];
            document.querySelector("#song-title" + counterString).style.fontSize = fontSize + "px";
            counter2++;
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
