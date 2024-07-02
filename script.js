const theater = document.querySelector(".theater");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const total = document.querySelector(".total");
const select = document.querySelector(".movie");

let ticketPrice = +select.value;
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedCount = selectedSeats.length;
    count.innerText = selectedCount
    total.innerText = selectedCount * ticketPrice;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

populateUI();

select.addEventListener("change", e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();

    localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
})

theater.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
})

updateSelectedCount();
