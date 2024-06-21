"use strict";

/* 
 * ------------------------- SortableTableUtils --------------------------------------
 * 
 * All the public methods of SortableTableUtils return an HTML "td" tag (table data), 
 * formatted and aligned nicely, depending on the type of data being passed in.
 * 
 */

var SortableTableUtils = {};

SortableTableUtils.makeText = function (text) {
    var tableData = document.createElement('td');
    text = text || ""; // set it to empty string if the input parameter does not exist
    if (text === "") {
        tableData.sortOrder = -1;  // put empty entries at top if sorting by this column
    } else {
        tableData.sortOrder = text.toUpperCase();
    }
    tableData.innerHTML = text;
    tableData.style.textAlign = "left"; // text elements usually align left

    return tableData;
};

SortableTableUtils.makeNumber = function (num, isFormatCurrency) {

    var tableData = document.createElement('td');

    if (!num) { // empty data
        num = "";
        tableData.sortOrder = -1; // put empty entries at top if sorting by this column

    } else { // non empty data

        var tmp = num + ""; // tmp will be num but converted to string.

        // In case the number is already formatted, remove the formatting characters.
        tmp = tmp.replace(" ", "");
        tmp = tmp.replace(",", "");
        tmp = tmp.replace("$", "");

        if (isNaN(tmp)) { // non numeric data
            tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
            num = "Not numeric " + num; // preserve the original data when added this error msg.
        } else { // numeric data
            var convertedNum = Number(tmp);
            tableData.sortOrder = convertedNum; // put empty entries at top if sorting by this column
            if (isFormatCurrency) {
                num = convertedNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
            }
        }
    }

    tableData.innerHTML = num;
    tableData.style.textAlign = "right"; // text elements usually align left
    return tableData;
};


SortableTableUtils.makeDate = function (dateString) {

    var tableData = document.createElement('td');

    if (!dateString) { // empty data
        dateString = "";
        tableData.sortOrder = -1; // put empty entries at top if sorting by this column
        
    } else { // check if it's a date

        // if dateString contains something that can be converted to a date, 
        // then Date.parse(dateString) returns the number of milliseconds from Jan 1, 1970.
        var parsedDate = Date.parse(dateString);
        if (isNaN(dateString) && !isNaN(parsedDate)) {
            //console.log(s + " is a Date ");
            
            // We are not interested in milliseconds. We just want the days. 
            // So, convert the milliseconds to days.  
            parsedDate=parsedDate/1000; // changed milliseconds to seconds.
            parsedDate=parsedDate/60; // changed seconds to minutes
            parsedDate=parsedDate/60; // changed minutes to hours
            parsedDate=parsedDate/24; // changed hours to days (from Jan 1 1970). 

            // But I also want to be able to effectively sort days (even those prior to Jan 1 1970)
            // and I want empty dates to be before all other values. 
            // So, I want to add in the days between Jan 1st, 0000 and Jan 1st 1970. 
            var years = 1970; // want to start from Jan 1, 0000, not Jan 1, 1970
            var daysTo1970 = years * 365;
            parsedDate+= daysTo1970;
            
            tableData.sortOrder = parsedDate;
        } else {
            tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
            dateString = "Not a Date "+dateString;
        }
    }

    tableData.innerHTML = dateString;
    tableData.style.textAlign = "center"; // center the dates
    return tableData;
};


SortableTableUtils.makeImage = function (imageFileName, width) {

    var tableData = document.createElement('td');
    var img = document.createElement("img");
    if (imageFileName && imageFileName !== "") {
        img.src = imageFileName;
    }
    img.style.width = width;

    tableData.appendChild(img);
    tableData.style.textAlign = "center"; // center the images 
    tableData.sortOrder = null; // should not be sorting on image columns
    return tableData;
};

SortableTableUtils.makeLink = function (innerHTML, href) {
    //console.log("makeLink inner is "+innerHTML + " and href is "+href);

    var tableData = document.createElement('td');
    var aTag = document.createElement("a");
    aTag.innerHTML = innerHTML;
    aTag.href = href;
    tableData.appendChild(aTag);
    tableData.style.textAlign = "center"; // center the links 
    tableData.sortOrder = innerHTML;
    return tableData;
};