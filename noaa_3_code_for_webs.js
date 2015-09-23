	var dtdate = new Date();
	var nToday;
	var nHourAdjustday;
	//var sRoot = "http://polar.wwb.noaa.gov/waves/latest_run/";

	var sRoot = "http://polar.ncep.noaa.gov/waves/WEB/multi_1.latest_run/plots/"; // NE_atlantic.hs.f027h.png";
	
	var sEuroRoot = "http://facs.scripps.edu/surf/images/";
	var sFNMocRoot = "https://www.fnmoc.navy.mil/products/WW3/ww3.b.";

	var sRegionCode;
	
	nToday = dtdate.getDay();
	if (nToday==0) nToday=7;

	function window_onload() {
		
		var sRegionCookie;
		var sBuoyCookie;
		var sScrippsCookie;
		
		//setCookie( "testcookie", "testval" );
		sRegionCookie = getCookie("NOAA3Region");
		if (sRegionCookie!=null) getID('cboRegions').value = sRegionCookie;
						
		switch (nToday)
		{
		case 1:
			refresh_data(5, 0);
			break;
		case 2:
			refresh_data(4, 0);			
			break;
		case 3:
			refresh_data(3, 0);			
			break;
		case 4:
			refresh_data(2, 0);			
			break;
		case 5:
			refresh_data(1, 0);			
			break;
		case 6:
			refresh_data(0, 0);			
			break;
		case 7:
			refresh_data(6, 0);		
			break;
		};
		
	};

	function cboTime_onchange()
	{
		refresh_data(nHourAdjustday, getID('cboTime').value);
	};

	function getDayName(nDayIndex)
	{

		var sDay;

		if (nDayIndex>7)
		{
			nDayIndex=7-nDayIndex;
			if (nDayIndex <0) nDayIndex = nDayIndex*-1;
		};
		
		if (nDayIndex==0) nDayIndex=7;

		
		switch (nDayIndex)
		{
		case 1:
			sDay = "Mon";
			break;
		case 2:
			sDay = "Tue";
			break;
		case 3:
			sDay = "Wed";
			break;
		case 4:
			sDay = "Thu";
			break;
		case 5:
			sDay = "Fri";
			break;
		case 6:
			sDay = "Sat";
			break;
		case 7:
			sDay = "Sun";
			break;
		}

		return sDay;
	}

function anim_link_onclick() {
	colourCells(8);
}

function maxfore_link_onclick() {
	colourCells(9);
}

function cmdView_onclick() {
	var oViewAll;
	oViewAll = window.open("viewall.htm?from=" + getID('cboFrom').value + "&to=" + getID('cboTo').value + "&PP=" + getID('chkPP').checked + "&WH=" + getID('chkWH').checked + "&WI=" + getID('chkWind').checked + "&Euro=" + getID('chkEuro').checked + "&Region=" + getID('cboRegions').value);
}


function chkEuro_onclick() {
	refresh_data(nHourAdjustday, getID('cboTime').value);
}

function optFNMoc_onclick() {
	refresh_data(nHourAdjustday, getID('cboTime').value);
}

function cboRegions_onchange() {
	refresh_data(nHourAdjustday, getID('cboTime').value);
}

function window_onunload() {
    setCookie("NOAA3Region", getID('cboRegions').value);
}


function PopulateDayCombo(sComboBox)
{
		var nWeekDay
		var sDayName
		var dtdate
		var n
		
    	dtdate = new Date();
    	nWeekDay = dtdate.getday;
};



function refresh_data(nDayFactor, nHourAdjust) {

    var sPikType;
    var nHourFactor;
    var nEuroHourFactor;
    var sselectedDay;
    var nCurrentHour;
    var sForecastType;
    //var picSigWaveHieght = document.getElementById("picSigWaveHieght");

    var nViewDate = new Date();

    sRegionCode = getID('cboRegions').value

    sForecastType = "f";

    nHourAdjustday = nDayFactor;

    nCurrentHour = dtdate.getHours();

    nHourFactor = 24;

    colourCells(nDayFactor);

    if (nCurrentHour >= 12)
        nHourFactor = (nDayFactor * nHourFactor) + 6;
    else
        nHourFactor = (nDayFactor * nHourFactor) + 12;

    nHourFactor = nHourFactor + parseInt(nHourAdjust);

    if (nHourFactor <= 0) {
        nHourFactor = nHourFactor * -1;
        sForecastType = "h";
    };

    if (nHourFactor < 100) {
        nHourFactor = "0" + nHourFactor;
    };

    if (nHourFactor < 10) {
        nHourFactor = "0" + nHourFactor;
    };

    if (nHourFactor < 10)
        nEuroHourFactor = "0" + (nHourFactor * 1)
    else
        nEuroHourFactor = nHourFactor * 1

    sselectedDay = getDayName(nToday + nDayFactor);
    nViewDate.setDate(nViewDate.getDate() + nDayFactor);

    getID('descWavePeakPeriod').innerHTML = 'Wave Peak Period - ' + nViewDate.toDateString();
    getID('descSigWaveHeight').innerHTML = 'Significant Wave Height - ' + nViewDate.toDateString();
    getID('descWindSpeed').innerHTML = 'Wind Speed & Direction - ' + nViewDate.toDateString();
    getID('descWindSeaWaveHeight').innerHTML = 'Wind Sea Wave Height - ' + nViewDate.toDateString();
    getID('descPrimarySwellWaveHeight').innerHTML = 'Primary Swell Wave Height - ' + nViewDate.toDateString();
    getID('descSecondarySwellWaveHeight').innerHTML = 'Secondary Swell Wave Height - ' + nViewDate.toDateString();
    getID('descWindSeaPeakPeriod').innerHTML = 'Wind Sea Peak Period - ' + nViewDate.toDateString();
    getID('descPrimarySwellPeakPeriod').innerHTML = 'Primary Swell Peak Period - ' + nViewDate.toDateString();
    getID('descSecondarySwellPeakPeriod').innerHTML = 'Secondary Swell Peak Period - ' + nViewDate.toDateString();

    if (nHourFactor > 180) { nHourFactor = 180 }
    //alert(sRoot + sRegionCode + sForecastType + nHourFactor + "h" + sWindSeaWaveHeight);
    //getID('picSigWaveHieght').src = sRoot + sRegionCode + sSigWaveHeight + sForecastType + nHourFactor + "h.png";
    DisplayNOAA3Picture(getID('picWavePeakPeriod'), "tp", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picSigWaveHeight'), "hs", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picWindSpeed'), "u10", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picWindSeaWaveHeight'), "hs_ws", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picPrimarySwellWaveHeight'), "hs_sw1", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picSecondarySwellWaveHeight'), "hs_sw2", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picWindSeaPeakPeriod'), "tp_ws", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picPrimarySwellPeakPeriod'), "tp_sw1", sForecastType, nHourFactor, false);
    DisplayNOAA3Picture(getID('picSecondarySwellPeakPeriod'), "tp_sw2", sForecastType, nHourFactor, false);

}

function DisplayNOAA3Picture(oPictureObject, sRequestedPic, sForecastType, nHourFactor, bAnimation) {

    if (bAnimation == true) {
        oPictureObject.src = sRoot + sRegionCode + sRequestedPic + "." + sForecastType + nHourFactor + "h.png";
        return;
    }

    oPictureObject.src = sRoot + sRegionCode + sRequestedPic + "." + sForecastType + nHourFactor + "h.png";
}


function GetMax() {

    DisplayNOAA3Picture(getID('picWavePeakPeriod'), "tp", "f", "180", false);
    DisplayNOAA3Picture(getID('picSigWaveHeight'), "hs", "f", "180", false);
    DisplayNOAA3Picture(getID('picWindSpeed'), "u10", "f", "180", false, false);
    DisplayNOAA3Picture(getID('picWindSeaWaveHeight'), "hs_ws", "f", "180", false);
    DisplayNOAA3Picture(getID('picPrimarySwellWaveHeight'), "hs_sw1", "f", "180", false);
    DisplayNOAA3Picture(getID('picSecondarySwellWaveHeight'), "hs_sw2", "f", "180", false);
    DisplayNOAA3Picture(getID('picWindSeaPeakPeriod'), "tp_ws", "f", "180", false);
    DisplayNOAA3Picture(getID('picPrimarySwellPeakPeriod'), "tp_sw1", "f", "180", false);
    DisplayNOAA3Picture(getID('picSecondarySwellPeakPeriod'), "tp_sw2", "f", "180", false);

};

function getID(vObjectID) {
    return document.getElementById(vObjectID);
};

function colourCells(nDayFactor) {

    var onColour = "black";
    var offColour = ""

    if (nDayFactor == 0)
        getID('day1').bgColor = onColour;
    else
        getID('day1').bgColor = "";

    if (nDayFactor == 1)
        getID('day2').bgColor = onColour;
    else
        getID('day2').bgColor = offColour;

    if (nDayFactor == 2)
        getID('day3').bgColor = onColour;
    else
        getID('day3').bgColor = offColour;

    if (nDayFactor == 3)
        getID('day4').bgColor = onColour;
    else
        getID('day4').bgColor = offColour;

    if (nDayFactor == 4)
        getID('day5').bgColor = onColour;
    else
        getID('day5').bgColor = offColour;

    if (nDayFactor == 5)
        getID('day6').bgColor = onColour;
    else
        getID('day6').bgColor = offColour;

    if (nDayFactor == 6)
        getID('day7').bgColor = onColour;
    else
        getID('day7').bgColor = offColour;

    if (nDayFactor == 7)
        getID('day8').bgColor = onColour;
    else
        getID('day8').bgColor = offColour;

//    if (nDayFactor == 8)
//        //getID('anim').bgColor = onColour;
//    else
//        //getID('anim').bgColor = offColour;

    if (nDayFactor == 9)
        getID('maxfore').bgColor = onColour;
    else
        getID('maxfore').bgColor = offColour;

}
