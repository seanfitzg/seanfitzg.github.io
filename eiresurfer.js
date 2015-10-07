$(function() {

    var currentHourFactor;

    function getNoaaData(regionCode, hourFactor) {

        if (hourFactor < 100) {
            hourFactor = "0" + hourFactor;
        };

        if (hourFactor < 10) {
            hourFactor = "0" + hourFactor;
        };

        var baseAddress = 'http://polar.ncep.noaa.gov/waves/WEB/multi_1.latest_run/plots/';

        return [{
            id: "waveHeight",
            name: "Wave Height",
            image: getImageAddress(baseAddress, regionCode, 'hs', hourFactor)
        }, {
            id: "peakPeriod",
            name: "Peak Period",
            image: getImageAddress(baseAddress, regionCode, 'tp', hourFactor)
        }, {
            id: "windSpeed",
            name: "Wind Speed",
            image: getImageAddress(baseAddress, regionCode, 'u10', hourFactor)
        }];
    }

    function getImageAddress(baseAddress, regionCode, modelType, hourFactor) {

        var forecastType;
        if (hourFactor === '000')
            forecastType = 'h';
        else
            forecastType = 'f';

        var imageAddress = baseAddress + regionCode + '.' + modelType + '.' + forecastType + hourFactor + 'h.png';
        //console.log(imageAddress);
        return imageAddress
    };

    function getHourFactorFromDay(requestedDay) {
        var requestedDayIndex;
        var todayIndex = new Date().getDay();

        switch (requestedDay) {
            case "Sunday":
                requestedDayIndex = 0;
                break;
            case "Monday":
                requestedDayIndex = 1;
                break;
            case "Tuesday":
                requestedDayIndex = 2;
                break;
            case "Wednesday":
                requestedDayIndex = 3;
                break;
            case "Thursday":
                requestedDayIndex = 4;
                break;
            case "Friday":
                requestedDayIndex = 5;
                break;
            case "Saturday":
                requestedDayIndex = 6;
                break;
        }

        var adjustIndex = requestedDayIndex - todayIndex;

        if (adjustIndex < 0)
            adjustIndex = 7 - (adjustIndex * -1);

        var hourFactor = adjustIndex * 24;
        return hourFactor;

    }

    function assignDaysToPanels() {
        var todayIndex = new Date().getDay();
        for (var i = 0; i < 7; i++) {
            var adjustIndex = i + todayIndex;
            if (adjustIndex > 6)
                adjustIndex = adjustIndex - 7;
            var day = getDayFromIndex(adjustIndex);

            $('#day' + i).addClass(day)
            $('#day' + i).text(day)
        }
    }

    function getDayFromIndex(index) {
        switch (index) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
        return "error";
    }

    function getImages(location, day) {
        var hourFactor;
        if (day === 'Max')
            hourFactor = 180
        else if (day === '-')
            hourFactor = currentHourFactor - 3;
        else if (day === '+')
            hourFactor = currentHourFactor + 3;
        else
            hourFactor = getHourFactorFromDay(day);
        
        if (hourFactor > 180) hourFactor = 180;

        currentHourFactor = hourFactor;

        var modelArray = getNoaaData(location, hourFactor);

        $(".cloned").remove()

        var arrayLength = modelArray.length;
        for (var i = 0; i < arrayLength; i++) {
            var $template = $("#template");
            var $newPanel = $template.clone();
            $newPanel.css("display", "block")
            $newPanel.addClass('cloned');
            $newPanel.attr("id", modelArray[i].id);
            $newPanel.find('.panel-title').text(modelArray[i].name);
            $newPanel.find('.model-image')[0].src = modelArray[i].image;
            $("#panelDiv").append($newPanel);
        }
    }

    function clickOnSaturday() {
        $('#days').find('.Saturday').click();
    }

    $('.day').click(function(ev) {
        $('.day').removeClass('active');
        $(ev.target).addClass('active');
        var activeLocation = $('#locations').find('button.active')[0].id;
        getImages(activeLocation, $(ev.target).text())
    });

    $('.location').click(function(ev) {
        $('.location').removeClass('active');
        $(ev.target).addClass('active');
        var activeDay = $('#days').find('button.active').text();
        getImages($(ev.target)[0].id, activeDay)
    });

    assignDaysToPanels();
    clickOnSaturday();

});
