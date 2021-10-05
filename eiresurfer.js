$(function () {
  var currentHourFactor;

  function getNoaaData(regionCode, hourFactor) {
    if (hourFactor < 100) {
      hourFactor = "0" + hourFactor;
    }

    if (hourFactor < 10) {
      hourFactor = "0" + hourFactor;
    }

    var baseAddress =
      "https://polar.ncep.noaa.gov/waves/WEB/gfswave.latest_run/plots/";

    return [
      {
        id: "waveHeight",
        name: "Wave Height",
        image: getImageAddress(baseAddress, regionCode, "hs", hourFactor),
        show: true,
      },
      {
        id: "peakPeriod",
        name: "Peak Period",
        image: getImageAddress(baseAddress, regionCode, "tp", hourFactor),
        show: true,
      },
      {
        id: "windSpeed",
        name: "Wind Speed",
        image: getImageAddress(baseAddress, regionCode, "u10", hourFactor),
        show: true,
      },
    ];
  }

  function assignDaysToPanels() {
    var todayIndex = new Date().getDay();
    for (var i = 0; i < 7; i++) {
      var adjustIndex = i + todayIndex;
      if (adjustIndex > 6) adjustIndex = adjustIndex - 7;
      var day = getDayFromIndex(adjustIndex);

      $("#day" + i).addClass(day);
      $("#day" + i).text(day);
    }
  }

  function getImageAddress(baseAddress, regionCode, modelType, hourFactor) {
    var forecastType;
    if (hourFactor === "000") forecastType = "h";
    else forecastType = "f";

    var imageAddress =
      baseAddress +
      regionCode +
      "." +
      modelType +
      "." +
      forecastType +
      hourFactor +
      ".png";
    console.log(imageAddress);
    return imageAddress;
  }

  function getHourFactorFromDay(requestedDay) {
    var requestedDayIndex;
    var todayIndex = new Date().getDay();

    var hourFactor;
    if (requestedDay === "Max") return 240;
    else if (requestedDay === "-") {
      if (currentHourFactor === 0) return currentHourFactor;
      return currentHourFactor - 3;
    } else if (requestedDay === "+") {
      if (currentHourFactor === 240) return currentHourFactor;
      return currentHourFactor + 3;
    } else if (hourFactor > 240) return 240;

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

    if (adjustIndex < 0) adjustIndex = 7 - adjustIndex * -1;

    var hourFactor = adjustIndex * 24;
    if (currentHourFactor > 240) currentHourFactor = 240;
    return hourFactor;
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

  function getImages(regionCode, hourFactor, showWaves, showPeriod, showWind) {
    var modelArray = getNoaaData(regionCode, hourFactor);

    $(".cloned").remove();

    var arrayLength = modelArray.length;
    for (var i = 0; i < arrayLength; i++) {
      switch (modelArray[i].id) {
        case "waveHeight":
          if (modelArray[i].show !== showWaves) continue;
          break;
        case "peakPeriod":
          if (modelArray[i].show !== showPeriod) continue;
          break;
        case "windSpeed":
          if (modelArray[i].show !== showWind) continue;
          break;
      }
      var $template = $("#template");
      var $newPanel = $template.clone();
      $newPanel.css("display", "block");
      $newPanel.addClass("cloned");
      $newPanel.attr("id", modelArray[i].id);
      $newPanel.find(".panel-title").text(modelArray[i].name);
      $newPanel.find(".model-image")[0].src = modelArray[i].image;
      $("#panelDiv").append($newPanel);
    }
  }

  function clickOnSaturday() {
    $("#days").find(".Saturday").click();
  }

  $(".day").click(function (ev) {
    let showWaves = $("#waveHeight").is(":checked");
    let showPeriod = $("#peakPeriod").is(":checked");
    let showWind = $("#wind").is(":checked");

    $(".day").removeClass("active");
    $(ev.target).addClass("active");

    var activeLocation = $("#locations").find("button.active")[0].id;
    currentHourFactor = getHourFactorFromDay($(ev.target).text());
    getImages(
      activeLocation,
      currentHourFactor,
      showWaves,
      showPeriod,
      showWind
    );
  });

  $(".location").click(function (ev) {
    let showWaves = $("#waveHeight").is(":checked");
    let showPeriod = $("#peakPeriod").is(":checked");
    let showWind = $("#wind").is(":checked");

    $(".location").removeClass("active");
    $(ev.target).addClass("active");

    var activeDay = $("#days").find("button.active").text();
    if (activeDay !== "-" && activeDay !== "+")
      currentHourFactor = getHourFactorFromDay(activeDay);
    getImages(
      $(ev.target)[0].id,
      currentHourFactor,
      showWaves,
      showPeriod,
      showWind
    );
  });

  $(".image-type").change(function (ev) {
    let showWaves = $("#waveHeight").is(":checked");
    let showPeriod = $("#peakPeriod").is(":checked");
    let showWind = $("#wind").is(":checked");

    var activeDay = $("#days").find("button.active").text();
    var activeLocation = $("#locations").find("button.active")[0].id;
    if (activeDay !== "-" && activeDay !== "+")
      currentHourFactor = getHourFactorFromDay(activeDay);
    getImages(
      activeLocation,
      currentHourFactor,
      showWaves,
      showPeriod,
      showWind
    );
  });

  assignDaysToPanels();
  clickOnSaturday();
});
