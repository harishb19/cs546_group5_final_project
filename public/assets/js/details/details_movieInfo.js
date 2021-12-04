const postImg = $('#postImg');
const background = $('#movie-detail-background');
const title = $('#title');
const rating = $('#rating');
const format = $('#format');
const time = $('#time');
const genre = $('#genre');
const country = $('#country');
const releaseDate = $('#releaseDate');
const info = $('#info');
const _id = $('#_id');
const id = _id.text();
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Convert seconds into hours, minutes and second
function formatSec(seconds) {
    let hours = 0, mins = 0;
    hours = parseInt(seconds / 3600);
    seconds %= 3600;
    mins = parseInt(seconds / 60);
    let format = "";
    format += hours == 0 ? "" : hours.toString() + "hr ";
    format += mins == 0 ? "" : mins.toString() + "min";
    return format;
}

// Convert genre to String
function formatGenre(genre) {
    if (genre.length == 0) return "";
    let format = ""
    for (let i = 0; i < genre.length; ++i) {
        if (i < genre.length - 1) {
            format += genre[i];
            format += ",";
        } else {
            format += genre[i];
        }
    }
    return format;
}

// Convert Date to String
function formatReleaseDate(releaseDate) {
    releaseDate = new Date(releaseDate);
    const releaseYear = releaseDate.getFullYear();
    const releaseMonth = releaseDate.getMonth();
    const releaseDay = releaseDate.getDate();
    return releaseDay.toString() + " " + month[releaseMonth] + "," + releaseYear;
}

console.log("run detail_Info");
$.ajax({
    type: 'post',
    url: '/details/movieInfo',
    contentType: 'application/json',
    data: JSON.stringify({
        id: id
    })
}).then (function (responMessage) {
    const movieDetail = responMessage.movieDetail;
    postImgUrl = movieDetail.images.mainImg;
    movieName = movieDetail.movieName;
    IMDBRating = movieDetail.IMDBRating;
    runtimeInSecs = movieDetail.runtimeInSecs;
    movieGenre = movieDetail.genre;
    movieCountry = movieDetail.country;
    movieReleaseDate = movieDetail.releaseDate;
    backgroundImgUrl = movieDetail.images.backgroundImg;
    movieDescription = movieDetail.description;
    movieFormat = '2D, 3D, IMAX 2D, IMAX 3D';

    postImg.append("<img src=\"" + postImgUrl + "\">");
    title.text(movieName);
    rating.text(IMDBRating);
    format.text(movieFormat);
    time.text(formatSec(runtimeInSecs));
    genre.text(formatGenre(movieGenre));
    country.text(movieCountry);
    releaseDate.text(formatReleaseDate(movieReleaseDate));
    background.css('background-image', background.css('background-image') + ', ' + 'url(' + backgroundImgUrl + ')');
    info.text(movieDescription);
});

const book = $('#book');

book.click(function () {
    const url = "../theatre/" + id;
    location.href = url;
});