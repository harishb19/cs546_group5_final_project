const theater_detail = $('#theater-detail');
const calendar = $('#calendar');

const selected = $('#selected');
const selected_day = $('#selected_day');
const selected_month = $('#selected_month');
const selected_year = $('#selected_year');

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const month_day = [['Jan', 31], ['Feb', 28], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], ['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 31]]

function isleapyear(year) {
    year = parseInt(year);
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    }
    return false;
}

function getCurSevenDay() {
    let curSevenDay = [];
    const todayDate = new Date();
    let curYear = todayDate.getFullYear();
    let curMonth = todayDate.getMonth();
    let curDay = todayDate.getDate();
    let curWeek = todayDate.getDay();
    month_day[1][1] = isleapyear(curYear) ? 29 : 28;
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
            if (curMonth == 12) {
                curMonth = 1;
                curYear += 1;
            } else {
                curMonth += 1;
            }
            curDay = 1;
        }
        curSevenDay[i].day = curDay;
        curSevenDay[i].month = month_day[curMonth - 1][0];
        curSevenDay[i].year = curYear;
    }
    return curSevenDay;
}

function addCalendar() {
    const sevenDay = getCurSevenDay();
    selected.text('0');
    let link = "<li class=\"theater-calendar-date\">" + "<button class=\"theater-calendar-date_btn theater-calendar-date_select\">" + 
    "<strong class=\"theater-calendar-date_btn_weekday btn_select\">" + sevenDay[0].week +"</strong>" + 
    "<span class=\"theater-calendar-date_btn_month btn_select\">" + sevenDay[0].month + "</span>" + 
    "<span class=\"theater-calendar-date_btn_day btn_select\">" + sevenDay[0].day +"</span></button></li>";
    for (let i = 1; i < sevenDay.length; ++i) {
        link += "<li class=\"theater-calendar-date\">" + "<button class=\"theater-calendar-date_btn\">" + 
        "<strong class=\"theater-calendar-date_btn_weekday\">" + sevenDay[i].week +"</strong>" + 
        "<span class=\"theater-calendar-date_btn_month\">" + sevenDay[i].month + "</span>" + 
        "<span class=\"theater-calendar-date_btn_day\">" + sevenDay[i].day +"</span></button></li>"
    }
    calendar.append(link);
}

addCalendar();

$.ajax({
    type: 'post',
    url: '/theater/showtime',
    contentType: 'application/json',
    data: JSON.stringify({
        id: id
    })
}).then (function (responMessage) {
    const theater = responMessage.theater;
    let link= "";
    for (let i = 0; i < theater.length; ++i) {
        link += "<div class=\"theater-detail-showtime\">" + "<div class=\"theater-detail-showtime_header\">" +
        "<div class=\"theater-detail-showtime_header_name\"><h2>" + theater[i].name + "</h2></div>" + 
        "<div class=\"theater-detail-showtime_header_address\"><p>" + theater[i].address + "</p></div></div>" + 
        "<div class=\"theater-detail-showtime_variants\">" + "<div class=\"theater-detail-showtime_variants_format\">" +
        "Standard</div>" + "<div class=\"theater-detail-showtime_variants_list_wrapper\">" + 
        "<ul class=\"theater-detail-showtime_variants_list\">";
        const showtime = theater[i].showtime;
        for (let j = 0; j < showtime.length; ++j) {
            link += "<li class=\"theater-detail-showtime_variants_time\">" + 
            "<button class=\"theater-detail-showtime_variants_time_btn\">" + 
            showtime[j] + "</button></li>";
        }
        link += "</ul></div></div></div>";
    }
    theater_detail.append(link);
});

$(document).ready(function(){
    $(".heatre-calendar-date").click(function() {
        console.log("click");
        const selectIndex = selected.text();
        const curSelected = $('#calendar li:eq(' + selectIndex +')');
        const curSelectedButton = curSelected.find(".theater-calendar-date_btn");
        const curSelectedWeek = curSelected.find(".theater-calendar-date_btn_weekday");
        const curSelectedMonth = curSelected.find(".theater-calendar-date_btn_month");
        const curSelectedDay = curSelected.find(".theater-calendar-date_btn_day");
        curSelectedButton.removeClass("theater-calendar-date_select");
        curSelectedWeek.removeClass("btn_select");
        curSelectedMonth.removeClass("btn_select");
        curSelectedDay.removeClass("btn_select");
        $(this).find(".theater-calendar-date_btn").addClass("theater-calendar-date_select");
        $(this).find(".theater-calendar-date_btn_weekday").addClass("btn_select");
        $(this).find(".theater-calendar-date_btn_month").addClass("btn_select");
        $(this).find(".theater-calendar-date_btn_day").addClass("btn_select");
        console.log($(this));
    })
  });