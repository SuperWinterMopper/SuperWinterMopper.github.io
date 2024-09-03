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

document.addEventListener('DOMContentLoaded', function() {
  loadSongs();
  let touchStartX;
  let touchStartY;    
  let sliderContainer = document.querySelector('.slider-container');
  let verticalSwipeThreshold = 15; // Adjust as needed

  sliderContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  /*sliderContainer.addEventListener('touchmove', function(e) {
      let touchEndX = e.touches[0].clientX;
      let touchEndY = e.touches[0].clientY;

      let deltaX = touchEndX - touchStartX;
      let deltaY = touchEndY - touchStartY;

      // Check if the swipe is predominantly vertical
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        e.preventDefault(); // Prevent default vertical scrolling
      }
      touchStartX = touchEndX;
      touchStartY = touchEndY;
  });  */  


  sliderContainer.addEventListener('touchend', function(e) {
    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;
    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) > (5 * Math.abs(deltaY))) {
      handleSwipe(touchStartX, touchEndX);
    }
    });

  function handleSwipe(startX, endX) {
    let swipeThreshold = 25; // Adjust as needed

    if (endX > startX + swipeThreshold) {
      // Swipe to the right
      moveSliderLeft();
    } else if (endX < startX - swipeThreshold) {
      // Swipe to the left
      moveSliderRight();
    }
  }
});

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

document.addEventListener('DOMContentLoaded', function() {
  const headers = document.getElementsByClassName('mobile-description');

  Array.from(headers).forEach(header => {
      header.addEventListener('click', function() {
          const containersong = this.closest('.mobile-song');
          const content = this.querySelector('.mobile-commentary');
          content.classList.toggle('open');
      });
  });
});

function loadSongs() {
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

    let counter4 = 100;
    fetch('https://docs.google.com/spreadsheets/d/1gdjDsSCLCYDi6cZzxS51F-lYwLM1dnhZ78xy540hJvw/pub?gid=881276312&single=true&output=csv')
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            header: true, 
            dynamicTyping: true, 
            complete: function (results) {
                results.data.forEach(row => {
                }
                )

                results.data.forEach(row => {
                  let counterString = counter4.toString();
                  document.querySelector("#mobile-coverart" + counterString).src = row['Cover'];
                  document.querySelector("#mobile-bandname" + counterString).textContent = row['Project'];
                  document.querySelector("#mobile-date" + counterString).textContent = row['Date'];
                  document.querySelector("#mobile-commentary" + counterString).textContent = row['Commentary'];
                  document.querySelector("#mobile-title" + counterString).textContent = row['Title'];
                  counter4--;
                });
            },
            error: function (error) {
                console.error('Error parsing CSV:', error.message);
            },
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }