const screenJSON = JSON.parse(seatInfo)
// const movieJSON = JSON.parse(movieInfo);

const layout = screenJSON.layout;
const seats = screenJSON.seats;
console.log(screenJSON);
let seatList = [];
const continueButton = document.getElementById('continueButton');
continueButton.disabled = true;

function addSeats () {
    const seatNos = Object.keys(seats);

    let seatNoIndex = 0;
    for (let row of layout) {

        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        for (let ele of row) {

            let seatDiv = document.createElement("div");

            if (ele){
                seatDiv.className = "seat";
                seatDiv.id = seatNos[seatNoIndex];
                var node = document.createTextNode(seatNos[seatNoIndex]);
                let seatNoDisplay = document.createElement("p");
                seatNoDisplay.className = "seat-no";
                // seatNoDisplay.appendChild(node);
                seatDiv.appendChild(node);

                if (parseInt(seats[seatNos[seatNoIndex]])) {
                    seatDiv.classList.add("occupied");
                }

                seatNoIndex++;
            }
            else seatDiv.classList.add("hidden")
            rowDiv.appendChild(seatDiv);
        }
        document.getElementById('container').appendChild(rowDiv);
    }
}
addSeats();

container.addEventListener('click', (e) => {

    if ((e.target.classList.contains(('seat')) || e.target.classList.contains('seat-no')) && !e.target.classList.contains('occupied') && !e.target.classList.contains('hidden')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
    updateButton();
});


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    let selectedSeatsList = [];
    for (let ele of selectedSeats){
        selectedSeatsList.push(ele.id)
    }
    console.log(selectedSeatsList)
    seatList = selectedSeatsList;
}



function updateButton() {
    if (!seatList.length) continueButton.disabled = true;
    else continueButton.disabled = false;
}



continueButton.addEventListener('click', e => {

    const summaryObj = {
        // movieName: movieJSON.movie,
        // date: movieJSON.date,
        // time: movieJSON.time,
        noOfSeats: seatList.length,
        seats: seatList
    }

    const form = document.createElement("form");
    const purchaseSummary = document.createElement("input");

    form.method = "POST";
    form.action = "/movies/" + screenJSON.movieId + "/book/seat/pay";

    purchaseSummary.value=JSON.stringify(summaryObj);
    purchaseSummary.type='hidden'
    purchaseSummary.name="Purchase Summary";
    form.appendChild(purchaseSummary);

    document.body.appendChild(form);

    form.submit();
})
