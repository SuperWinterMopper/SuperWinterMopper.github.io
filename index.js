let counter = 0;
let currentPosition = 0;
let counter2 = 1;
const numberName = document.querySelector(".number-name");

function slideButton() {    
    counter++;
    const button = document.querySelector(".sliding-photo-button");
    const background = document.querySelector(".background");
    const introduction = document.querySelector(".explanation-text");
    const darkModeSwitch = document.querySelector(".dark-mode-switch");
    if(counter % 2 == 1)
    {
        if(window.innerWidth <= 600) {
            button.style.transform = "translateX(150px)";
        }
        else {
            button.style.transform = "translateX(300px)";
        }
        background.style.backgroundColor = "rgb(53, 53, 53)";
        introduction.style.color = "orange";
        darkModeSwitch.style.backgroundColor = "rgb(255, 161, 72)";
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

    sliderContainer.addEventListener('touchmove', function(e) {
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
    });    
    
  
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
    if(currentPosition < 0)
    {
        currentPosition+=100;
        sliderContainer.style.transform = `translateX(${currentPosition}vw)`;
    }
}

function loadSongs() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRUSMvEQ88V3TJ-Czntq-02RwryeStduQjtpJ3lDGOL7sii1G0U8o_JNqYrwlTdWp0ecD6wj0gICFvu/pub?gid=881276312&single=true&output=csv')
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
                    let counterString = counter2.toString();
                    document.querySelector("#coverArt" + counterString).src = row['Cover'];
                    document.querySelector("#location" + counterString).textContent = row['Artist'];
                    document.querySelector("#date" + counterString).textContent = row['Date'];
                    document.querySelector("#commentary" + counterString).textContent = row['Commentary'];
                    
                    if(window.innerWidth <= 600) {
                        let fontSize = 33;
                        console.log("the window is less than 600 has been called");
                        if(row['Title'].length > 20)
                        {
                            fontSize = 584 / row['Title'].replace(/\s/g, '').length; 
                        }
                        document.querySelector("#song-title" + counterString).textContent = row['Title'];
                        document.querySelector("#song-title" + counterString).style.fontSize = fontSize + "px";
                        counter2++;
                    }
                    else {
                        console.log("Mate the window MORE THAN 600");
                        let fontSize = 66;
                        if(row['Title'].length > 20)
                        {
                            fontSize = 1168 / row['Title'].replace(/\s/g, '').length;
                        }
                        document.querySelector("#song-title" + counterString).textContent = row['Title'];
                        document.querySelector("#song-title" + counterString).style.fontSize = fontSize + "px";
                        counter2++;
                    }
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