const theatre_detail = $('#theatre-detail');
const calendar = $('#calendar');

const _id = $('#_id');
const id = _id.text();

const selected = $('#selected');
const selected_day = $('#selected_day');
const selected_month = $('#selected_month');
const selected_year = $('#selected_year');

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const month_day = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

function getCurSevenDay() {
    let curSevenDay = [];
    const todayDate = new Date();
    const curYear = todayDate.getFullYear();
    let curMonth = todayDate.getMonth();
    let curDay = todayDate.getDate();
    let curWeek = todayDate.getDay();
    for (let i = 0; i < 7; ++i) {
        curSevenDay[i] = {
            week: 'Today',
            month: month_day[curMonth - 1][0],
            day: curDay,
            year: curYear,
        }
    }
    for (let i = 1; i < 7; ++i) {
        curDay += 1;
        curWeek = (curWeek + 1) % 7;
        curSevenDay[i].week = weeks[curWeek];
        if (curDay > month_day[curMonth - 1][1]) {
            curMonth = curMonth == 12 ? 1 : curMonth + 1;
            curDay = 1;
        }
        curSevenDay[i].day = curDay;
        curSevenDay[i].month = month_day[curMonth - 1][0];
    }
    return curSevenDay;
}

function addCalendar() {
    const sevenDay = getCurSevenDay();
    selected.text('0');
    let link = "<li class=\"theatre-calendar-date\">" + "<button class=\"theatre-calendar-date_btn theatre-calendar-date_select\">" + 
    "<strong class=\"theatre-calendar-date_btn_weekday btn_select\">" + sevenDay[0].week +"</strong>" + 
    "<span class=\"theatre-calendar-date_btn_month btn_select\">" + sevenDay[0].month + "</span>" + 
    "<span class=\"theatre-calendar-date_btn_day btn_select\">" + sevenDay[0].day +"</span></button></li>";
    for (let i = 1; i < sevenDay.length; ++i) {
        link += "<li class=\"theatre-calendar-date\">" + "<button class=\"theatre-calendar-date_btn\">" + 
        "<strong class=\"theatre-calendar-date_btn_weekday\">" + sevenDay[i].week +"</strong>" + 
        "<span class=\"theatre-calendar-date_btn_month\">" + sevenDay[i].month + "</span>" + 
        "<span class=\"theatre-calendar-date_btn_day\">" + sevenDay[i].day +"</span></button></li>"
    }
    calendar.append(link);
}

$.ajax({
    type: 'post',
    url: '/theatre/showtime',
    contentType: 'application/json',
    data: JSON.stringify({
        id: id
    })
}).then (function (responMessage) {
    addCalendar();
    const theatre = responMessage.theatre;
    let link= "";
    for (let i = 0; i < theatre.length; ++i) {
        link += "<div class=\"theatre-detail-showtime\">" + "<div class=\"theatre-detail-showtime_header\">" +
        "<div class=\"theatre-detail-showtime_header_name\"><h2>" + theatre[i].name + "</h2></div>" + 
        "<div class=\"theatre-detail-showtime_header_address\"><p>" + theatre[i].address + "</p></div></div>" + 
        "<div class=\"theatre-detail-showtime_variants\">" + "<div class=\"theatre-detail-showtime_variants_format\">" +
        "Standard</div>" + "<div class=\"theatre-detail-showtime_variants_list_wrapper\">" + 
        "<ul class=\"theatre-detail-showtime_variants_list\">";
        const showtime = theatre[i].showtime;
        for (let j = 0; j < showtime.length; ++j) {
            link += "<li class=\"theatre-detail-showtime_variants_time\">" + 
            "<button class=\"theatre-detail-showtime_variants_time_btn\">" + 
            showtime[j] + "</button></li>";
        }
        link += "</ul></div></div></div>";
    }
    theatre_detail.append(link);
});

$(document).ready(function(){
    $(".heatre-calendar-date").click(function() {
        console.log("click");
        const selectIndex = selected.text();
        const curSelected = $('#calendar li:eq(' + selectIndex +')');
        const curSelectedButton = curSelected.find(".theatre-calendar-date_btn");
        const curSelectedWeek = curSelected.find(".theatre-calendar-date_btn_weekday");
        const curSelectedMonth = curSelected.find(".theatre-calendar-date_btn_month");
        const curSelectedDay = curSelected.find(".theatre-calendar-date_btn_day");
        curSelectedButton.removeClass("theatre-calendar-date_select");
        curSelectedWeek.removeClass("btn_select");
        curSelectedMonth.removeClass("btn_select");
        curSelectedDay.removeClass("btn_select");
        $(this).find(".theatre-calendar-date_btn").addClass("theatre-calendar-date_select");
        $(this).find(".theatre-calendar-date_btn_weekday").addClass("btn_select");
        $(this).find(".theatre-calendar-date_btn_month").addClass("btn_select");
        $(this).find(".theatre-calendar-date_btn_day").addClass("btn_select");
        console.log($(this));
    })
  });