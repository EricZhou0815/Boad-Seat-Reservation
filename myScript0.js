function calendarTableShow() {
  document.getElementById('timeSelect').style.visibility = "hidden";
  document.getElementById('boatSelect').style.visibility = "hidden";
  document.getElementById('theCalendar').style.visibility = "visible";
  document.getElementById('theCover').style.visibility = "visible";
  document.addEventListener("mousedown", menuClose);
}

function timeTableShow() {
  document.getElementById('theCalendar').style.visibility = "hidden";
  document.getElementById('boatSelect').style.visibility = "hidden";
  document.getElementById('timeSelect').style.visibility = "visible";
  document.getElementById('theCover').style.visibility = "visible";
  document.addEventListener("mousedown", menuClose);
}

function boatTableShow() {
  document.getElementById('theCalendar').style.visibility = "hidden";
  document.getElementById('timeSelect').style.visibility = "hidden";
  document.getElementById('boatSelect').style.visibility = "visible";
  document.getElementById('theCover').style.visibility = "visible";
  document.addEventListener("mousedown", menuClose);
}

function selectDate(event) {
  var target = event.target || event.srcElement;
  var date = target.textContent;
  document.getElementById('dates').innerHTML = date + " June 2018";
  document.getElementById('theCalendar').style.visibility = "hidden";
  document.getElementById('theCover').style.visibility = "hidden";
  seatsShow();
}

function selectTime(event) {
  var target = event.target || event.srcElement;
  var time = target.textContent;
  document.getElementById('time').innerHTML = time;
  document.getElementById('timeSelect').style.visibility = "hidden";
  document.getElementById('theCover').style.visibility = "hidden";
  console.log(time);
  seatsShow();
}

function selectBoat(event) {
  var target = target || event.srcElement;
  var boatName = event.target.textContent;
  document.getElementById('boat').innerHTML = boatName;
  document.getElementById('boatSelect').style.visibility = "hidden";
  document.getElementById('theCover').style.visibility = "hidden";
  seatsShow();
}

function menuClose(event) {
  var x = event.clientX;
  var y = event.clientY;
  if (x < 86 || x > 486 || y < 120 || y > 520) {
    document.getElementById('theCalendar').style.visibility = "hidden";
    document.getElementById('theCover').style.visibility = "hidden";
  }
  if (x < 290 || x > 690 || y < 120 || y > 320) {
    document.getElementById('timeSelect').style.visibility = "hidden";
    document.getElementById('theCover').style.visibility = "hidden";
  }
  if (x < 496 || x > 896 || y < 120 || y > 320) {
    document.getElementById('boatSelect').style.visibility = "hidden";
    document.getElementById('theCover').style.visibility = "hidden";
  }
}

function seatsInfoShow(event) {
  var x = event.clientX + 50;
  var y = event.clientY;
  var seatsInformation = document.getElementById("seatsInformation");
  seatsInformation.style.top = y + "px";
  seatsInformation.style.left = x + "px";
  var target = event.target || event.srcElement;
  var ele = target.innerHTML;
  if (target.className == "visible available" || target.className == "visible selected") {
    seatsInformation.style.visibility = "visible";
    document.getElementById('siId').innerHTML = "Seat Number: " + ele;
    document.getElementById('siBoatName').innerHTML = "Boat Name: " + "The Rose"; //document.getElementById('boat').innerHTML;
    document.getElementById('siDate').innerHTML = "Date: " + document.getElementById('dates').innerHTML;
    document.getElementById('siPrice').innerHTML = "Price: $" + dict[ele].Price; //need to lookup
    //document.getElementById('siStatus').innerHTML = "Status: "+dict[ele].Status; //need to lookup
  }
}

function seatsInfoHide() {
  document.getElementById("seatsInformation").style.visibility = "hidden";
}

function bookSeat(event) {
  var target = event.target || event.srcElement;
  var selectedSeatId = target.innerHTML;
  if (target.className == "visible available" || target.className == "visible selected") {
    //get seats information to bookedTicket;
    var ticketBookSeatId = selectedSeatId;
    var ticketBookPrice = dict[ticketBookSeatId].Price;
    var ticketBookBoatName = document.getElementById('boat').innerHTML;
    var ticketBookTime = document.getElementById('time').innerHTML;
    var ticketBookDate = document.getElementById('dates').innerHTML;
    var tktBkInfor = new bookedTicket(ticketBookBoatName, ticketBookDate, ticketBookTime, ticketBookSeatId, ticketBookPrice);
    if (target.className == "visible available") {
      ticketDict[tktBkInfor.SeatId] = tktBkInfor;
      showTickets();
    } else if (target.className == "visible selected") {
      delete ticketDict[tktBkInfor.SeatId];
      showTickets();
    }
    target.classList.toggle('available');
    target.classList.toggle('selected');
  }
}

function seatsShow() {
  var date = document.getElementById('dates').innerHTML;
  var time = document.getElementById('time').innerHTML;
  var boat = document.getElementById('boat').innerHTML;
  if ((date != "Dates") && (time != "Time") && (boat != "Boat")) {
    seatsTableShow();
  }
}

function deteTicket(event) {
  var target = event.target || event.srcElement;
  //delete selected object in bookedTicket
  var deleteId = target.id.substring(6, 8); //get the seatId from the div id substring (last two char)
  console.log(deleteId);
  document.getElementById(deleteId).className = "visible available";
  delete ticketDict[deleteId];
  showTickets();
  if (Object.keys(ticketDict).length == 0) {
    document.getElementById("theTicketsInformation").style.visibility = "hidden";
  }
  //show the table accroding to the bookedTicket again
}


var ticketDict = new Object();

function showTickets() {
  var ticketString = "";
  //show accroding to bookedTicket objects
  var totalCost = 0;
  //caculate total price
  for (var key in ticketDict) {
    totalCost = totalCost + Math.floor(ticketDict[key].Price);
    ticketString = ticketString + "<div id=\"ticket" + ticketDict[key].SeatId + "\" class=\"info-item\"><span>" + ticketDict[key].BoatName + " " + ticketDict[key].bookDate + " " + ticketDict[key].bookTime + " " + ticketDict[key].SeatId + " $" + ticketDict[key].Price + "</span><button class=\"deleteTicket\" id=\"button" + ticketDict[key].SeatId + "\" onclick=\"deteTicket(event)\">-</button></div>";
  }
  document.getElementById('bookedTicketInformation').innerHTML = ticketString;
  document.getElementById('totalCost').innerHTML = totalCost;
  //show information
  document.getElementById("theTicketsInformation").style.visibility = "visible";
}


function bookTicket() {
  document.getElementById("theTicketsInformation").style.visibility = "hidden";
  document.getElementById('bookedTicketInformation').innerHTML = "";
  document.getElementById('totalCost').innerHTML = "";
  for (var key in ticketDict) {
    document.getElementById(ticketDict[key].SeatId).className = "visible unavailable";
  }
  localStore();
  console.log(localStorage);
  ticketDict = {};
}


function localStore() {
  if (typeof(Storage) !== "undefined") {
    // Store
    for (var key in ticketDict) {
      var string = ticketDict[key].SeatId + "@" + ticketDict[key].bookTime + "@" + ticketDict[key].bookDate + "@" + ticketDict[key].BoatName;
      localStorage.setItem(key,string);
    }
  } else {
    console.log("your website does not support web storage.");
  }
}




function deleteLocalStorage() {
  for (var key in localStorage) {
    localStorage.removeItem(key);
  }
}
//deleteLocalStorage();


function cancelTicket() {
  document.getElementById("theTicketsInformation").style.visibility = "hidden";
  document.getElementById('bookedTicketInformation').innerHTML = "";
  document.getElementById('totalCost').innerHTML = "";
  for (var key in ticketDict) {
    document.getElementById(ticketDict[key].SeatId).className = "visible available";
  }
  ticketDict = {};
}

function bookedTicket(BoatName, bookDate, bookTime, SeatId, Price) {
  this.BoatName = BoatName;
  this.bookDate = bookDate;
  this.bookTime = bookTime;
  this.SeatId = SeatId;
  this.Price = Price;
}

//Create an object to store the content load from XML file.
function dataContainer(Row, Column, Price, Status, Visibility, SeatId) {
  this.Row = Row;
  this.Column = Column;
  this.Price = Price;
  this.Status = Status;
  this.Visibility = Visibility;
  this.SeatId = SeatId;
}

function loadXMLFile(xmlFile) {
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //Load the XML file and return an XML object
  xmlhttp.open("GET", xmlFile, false);
  xmlhttp.send();
  return (xmlhttp.responseXML);
}


var xmlDoc = loadXMLFile("seatsNEW.xml");

//store xml Content
var dataContainers = [];
var tableString;
var seatString;
var dict = new Object();
var myStorage = new Object();
var seatString;


function seatsTableShow() {
  tableString = "";
  seatString = "";
  var x;
  var rose = xmlDoc.getElementsByTagName("Rose")[0];
  var princess = xmlDoc.getElementsByTagName("Princess")[0];
  var boatName = document.getElementById("boat").innerHTML;
  var irow = 0;
  if (boatName == "The Rose") {
    x = rose.getElementsByTagName("Seat");
    irow = 9;
  } else if (boatName == "The Princess") {
    x = princess.getElementsByTagName("Seat");
    irow = 12;
  }
  var i;
  var seatChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  var table = document.getElementsByClassName('seats')[0].getElementsByTagName('table')[0];
  for (i = 0; i < irow; i++) {
    tableString = tableString + "<tr>";
    seatString = seatChar[i];
    var k = 0;
    for (j = 0; j < 8; j++) {
      var seatId = "";
      var row = x[i * 8 + j].getElementsByTagName("Row")[0].childNodes[0].nodeValue; //status tage is the 2st childNode;
      var column = x[i * 8 + j].getElementsByTagName("Column")[0].childNodes[0].nodeValue; //status tage is the 2st childNode;
      var status = x[i * 8 + j].getElementsByTagName("Status")[0].childNodes[0].nodeValue; //status tage is the 2st childNode
      var price = x[i * 8 + j].getElementsByTagName("Price")[0].childNodes[0].nodeValue; //price tage is the 3rd childNode
      var visibility = x[i * 8 + j].getElementsByTagName("Visibility")[0].childNodes[0].nodeValue; //status tage is the 5th childNode
      var displaySeatId = "";
      if (visibility == "visible") {
        k++;
        seatId = seatString + k;
        displaySeatId = seatId;
      }
      if (j == 4) {
        tableString = tableString + "<td><div class=\"invisible\"></div></td><td><div id=\"" + displaySeatId + "\" class=\"" + visibility + " " + status + "\" onclick=\"bookSeat(event)\" onmouseout=\"seatsInfoHide()\" onmouseover=\"seatsInfoShow(event)\">" + displaySeatId + "</div></td>";
      } else {
        tableString = tableString + "<td><div id=\"" + displaySeatId + "\" class=\"" + visibility + " " + status + "\" onclick=\"bookSeat(event)\" onmouseout=\"seatsInfoHide()\" onmouseover=\"seatsInfoShow(event)\">" + displaySeatId + "</div></td>";
      }
      var dc = new dataContainer(row, column, price, status, visibility, displaySeatId);
      dataContainers[i * 8 + j] = dc;
      if (displaySeatId != "") {
        dict[dc.SeatId] = dc;
      }
    }
    tableString = tableString + "</tr>";
  }
  document.getElementById("theLegendTable").style.visibility = "visible";
  table.innerHTML = tableString;
  document.getElementById("theTicketsInformation").style.visibility = "hidden";
  document.getElementById('bookedTicketInformation').innerHTML = "";
  document.getElementById('totalCost').innerHTML = "";
  ticketDict = {};
  //var selectedTicket = localStorage.selected;
  //if (Object.keys(selectedTicket).length != 0) {
  //console.log(selectedTicket);
  //}
  //TODO ADD read localstorage and redisplay the seats layout
  readStoredData();
}



function readStoredData(){
  var theTime=document.getElementById('time').innerHTML;
  var theDate=document.getElementById('dates').innerHTML;
  var theBoat=document.getElementById('boat').innerHTML;
  for (var i = 0; i < localStorage.length; i++) {
   //seatString=localStorage.key(i);
  seatString = localStorage.getItem(localStorage.key(i));
    var res = seatString.split("@");
    myStorage[res[0]] = res;
  }
  for (var key in myStorage) {
    if (theTime==myStorage[key][1]&&theDate==myStorage[key][2]&&theBoat==myStorage[key][3]) {
      document.getElementById(key).className="visible unavailable";
    }
  }

}
