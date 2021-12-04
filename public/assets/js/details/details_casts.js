const cast = $('#movie-detail-cast');
const cast_left = $('#cast_arrow_left');
const cast_right = $('#cast_arrow_right');

let castinfo;
let cast_showCount = 5;
let cast_count = 0;
console.log("run detail_casts");
$.ajax({
    type: 'post',
    url: '/details/casts',
    contentType: 'application/json',
    data: JSON.stringify({
        id: id
    })
}).then (function (responMessage) {
    cast_left.css('visibility','hidden');
    cast_right.css('visibility','hidden');
    castinfo = responMessage.castinfo;
    cast_count = 0;
    let link = "";
    if (castinfo.length <= cast_showCount) {
        for (let i = 0; i < castinfo.length; ++i) {
            link += "<li class=\"cast\">" + "<div class=\"cast_img\">" + 
                "<img src=\"" + castinfo[i].imgSrc + "\"></div><h3>" + castinfo[i].castName + "</h3><h4>" + castinfo[i].characterName + "</h4></li>";
        }
    } else {
        for (let i = 0; i < cast_showCount; ++i) {
            link += "<li class=\"cast\">" + "<div class=\"cast_img\">" + 
                "<img src=\"" + castinfo[i].imgSrc + "\"></div><h3>" + castinfo[i].castName + "</h3><h4>" + castinfo[i].characterName + "</h4></li>";
        }
        cast_right.css('visibility','visible');
    }
    cast.append(link);
});
cast_right.click(function () {
    ++cast_count;
    cast_left.css('visibility','visible');
    let link = "";
    $('#movie-detail-cast  li').remove();
    const remainLength = castinfo.length - cast_count * cast_showCount;
    const beginIndex = cast_count * cast_showCount;
    if (remainLength < cast_showCount) {
        cast_right.css('visibility','hidden');
        for (let i = beginIndex; i < castinfo.length; ++i) {
            link += "<li class=\"cast\">" + "<div class=\"cast_img\">" + 
                "<img src=\"" + castinfo[i].imgSrc + "\"></div><h3>" + castinfo[i].castName + "</h3><h4>" + castinfo[i].characterName + "</h4></li>";
        }
    } else {
        for (let i = beginIndex; i < cast_showCount; ++i) {
            link += "<li class=\"cast\">" + "<div class=\"cast_img\">" + 
                "<img src=\"" + castinfo[i].imgSrc + "\"></div><h3>" + castinfo[i].castName + "</h3><h4>" + castinfo[i].characterName + "</h4></li>";
        }
    }
    cast.append(link);
});
cast_left.click(function () {
    --cast_count;
    cast_right.css('visibility','visible');
    let link = "";
    $('#movie-detail-cast  li').remove();
    const beginIndex = cast_count * cast_showCount;
    if (cast_count == 0) {
        cast_left.css('visibility','hidden');
    }
    for (let i = beginIndex; i < cast_showCount; ++i) {
        link += "<li class=\"cast\">" + "<div class=\"cast_img\">" + 
            "<img src=\"" + castinfo[i].imgSrc + "\"></div><h3>" + castinfo[i].castName + "</h3><h4>" + castinfo[i].characterName + "</h4></li>";
    }
    cast.append(link);
});