let counter = 0;

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