const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let timer = 10;

const rocket = new Image();
rocket.src = "images/rocket.jpg";

let rocketstats = {
    x: 75,
    y: canvas.height - 200
};

// Function to draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "black"; // Set the text color
    ctx.font = "12px sans-serif"; // Set the font size and family
    ctx.textAlign = "center"; // Center the text
    ctx.textBaseline = "middle"; // Middle align the text
    ctx.fillText("Count Down: " + timer, canvas.width / 2, 24); // Draw the timer in the center

    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50); // Fixed height to 50

    ctx.drawImage(rocket, rocketstats.x, rocketstats.y);
}

// Wait for the rocket image to load before drawing
rocket.onload = () => {
    draw(); // Draw the canvas once the image has loaded
};

// Start the countdown
function startCountdown() {
    const intervalId = setInterval(() => {
        if (timer > 0) {
            timer--; // Decrease the timer by 1
            draw(); // Redraw the canvas with the updated timer
        } else {
            clearInterval(intervalId); // Stop the countdown when it reaches 0
            launch(); // Start the rocket launch after countdown ends
        }
    }, 1000); // Update every second
}

// Rocket movement flag
let rocketMoving = false;

function launch() {
    if (rocketstats.y > 0) {
        rocketstats.y -= 5; // Move the rocket up
        draw(); // Redraw the canvas with the updated rocket position
        requestAnimationFrame(launch); // Keep launching until it reaches the top
    } else {
        rocketMoving = false; // Stop moving once it reaches the top
    }
}

// Handle canvas click event
canvas.addEventListener("click", (event) => {
    if (timer > 0 && !rocketMoving) {
        startCountdown(); // Start the countdown on the first click
        rocketMoving = true; // Set the flag to indicate the rocket will launch after countdown
    }
})
