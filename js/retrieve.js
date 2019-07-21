$(function() {
    retrieveWeather("Tokyo", 1850147);

    retrieveWeather("Yokohama", 1848354);

    retrieveWeather("Kyoto", 1857910);

    retrieveWeather("Osaka", 1853909);

    retrieveWeather("Sapporo", 2130404);

    retrieveWeather("Nagoya", 1856057);
});

/**
 * 天気を取得し表示させる
 * 
 * @param string cityName 
 * @param int id 
 * @return void
 */
function retrieveWeather(cityName, id) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?&appid=7c7e9a1a2dc82d2cc06e211549f43a84&units=metric&id=" + id,
    }).done(function(data) {

        let city = $("#city" + cityName).find("tbody");

        for (var o = 0; o < Object.keys(data["list"]).length; o++) {
            var teid = "list-" + data["city"]["name"] + "-" + o;
            var textColor = imageColorOfWeather(data["list"][o]["weather"][0]["icon"]);

            city.append("<tr id='" + teid + "'></tr>");
            city.find("#" + teid).append("<td class='list'><p>" + data["list"][o]["dt_txt"].slice(0, -9) + "</p><p>" + data["list"][o]["dt_txt"].slice(11, -3) + "</p></td>");
            city.find("#" + teid).append("<td class='list color'><img src='https://openweathermap.org/img/wn/" + data["list"][o]["weather"][0]["icon"] + ".png'><br>" + data["list"][o]["weather"][0]["description"] + "</td>");
            city.find("#" + teid).append("<td class='list'>" + data["list"][o]["clouds"]["all"] + "%</td>");
            city.find("#" + teid).append("<td class='list'>" + data["list"][o]["main"]["temp"] + "%<br>（<span class='temp-min'>Min:" + data["list"][o]["main"]["temp_min"] + "%</span>　<span class='temp-max'>Max:" + data["list"][o]["main"]["temp_min"] + "%</span>）</td>");
            city.find("#" + teid).append("<td class='list'>" + data["list"][o]["main"]["humidity"] + "%</td>");
            city.find("#" + teid).append("<td class='list'>" + data["list"][o]["main"]["pressure"] + "(hPa)</td>");

            $('#' + teid + ' > .color').css({ 'color': textColor });

            if (o === 2) {
                $('#' + teid).css({ 'background-color': '#ffffe0', 'font-weight': 'bold', 'vertical-align': 'baselin' });
            }
        }

    }).fail(function(data) {
        console.log('Ajax fail (communication error)');
    });
}

/**
 * 天気のイメージカラーを返す
 * 
 * @param sting iconParam 
 * @return string カラーコード
 * @link https://openweathermap.org/weather-conditions
 */
function imageColorOfWeather(iconParam) {
    // clear sky
    if (iconParam === "01d" || iconParam === "01n") {
        return "#ff0000";
    }

    // few clouds
    if (iconParam === "02d" || iconParam === "02n") {
        return "#ff7f00";
    }

    // scattered clouds
    if (iconParam === "03d" || iconParam === "03n") {
        return "#606060";
    }

    // broken clouds
    if (iconParam === "04d" || iconParam === "04n") {
        return "#606060";
    }

    // shower rain
    if (iconParam === "09d" || iconParam === "09n") {
        return "#007fff";
    }

    // rain
    if (iconParam === "10d" || iconParam === "10n") {
        return "#0000ff";
    }

    // thunderstorm
    if (iconParam === "11d" || iconParam === "11n") {
        return "#ffff7f";
    }

    // snow
    if (iconParam === "13d" || iconParam === "13n") {
        return "#00ffff";
    }

    // mist
    if (iconParam === "50d" || iconParam === "50n") {
        return "#f6f6f6";
    }

    return "#000";
}