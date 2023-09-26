var workDayEl = $("#workDay");  //Target container for all work hours and tasks
var workDayArray = [
  {id: "9", task: ""},
  {id: "10", task: ""},
  {id: "11", task: ""},
  {id: "12", task: ""},
  {id: "13", task: ""},
  {id: "14", task: ""},
  {id: "15", task: ""},
  {id: "16", task: ""},
  {id: "17", task: ""},
]

//Current hour in 24 hour format parsed as an integer to be compatible with if/else logic in  function assignClass ()
var currentHour = parseInt(dayjs().format("HH"));     //format("HH") requests only the hours, capital HH is for 24 hour time (2 digit)
//var currentHour = parseInt(dayjs("2023-09-27 03:00:00 PM").format("HH"));   //If needed this is the format to assign date and time
console.log ("Current hour: " + (currentHour));

$(function () {

//------------------------------------------//
//- Listener to save tasks to workDayArray -//
//------------------------------------------//
workDayEl.on("click", function(event) {         // jQuery listener
  console.log("");
  console.log("! workDayEl Clicked"); 
  var element = event.target;                   //declare var element = element that was clicked by user
  console.log("  Element clicked: ");
  console.log(element);
  //If 'button' is clicked
  if (element.matches("button") === true) { 
    var index = element.parentElement.getAttribute("data-index");                  //Traverse 1 level up to obtain "data-index" attribute from div (Important to update workDayArray)
    console.log("! Button element clicked"); 
    console.log("Index number on array is: " + index);   
    let saveBtn = Number.parseInt(index) + 9;                                      //Add 9 to index to determine hour in 24 hour format (purely to make this human readable in console.log)
    console.log("Save button clicked on hour: " + saveBtn);       
    console.log("Task description in workDayArray Before update: " + workDayArray[index].task);               // Log task value from from workDayArray before up dtea
    console.log("Task description on Page: " + $('#workDay').children().eq(index).children().eq(1).val());    //DOM traversal to obtain "textarea" value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val();                     //Store "textarea" value in workDayArray
    console.log("Task description in workDayArray After update: " + workDayArray[index].task);
    submitStorage();
  } 
  //If 'i' is clicked (save icon on button)
  else if (element.matches("i") === true) {
    var index = element.parentElement.parentElement.getAttribute("data-index");   //Traverse 2 levels up to obtain "data-index" attribute from div (Important to update workDayArray)
    console.log("! i element clicked"); 
    console.log("Index number on array is: " + index);   
    let saveBtn = Number.parseInt(index) + 9;                                     //Add 9 to index to determine hour in 24 hour format (purely to make this human readable in cosnole.log)
    console.log("Save button clicked on hour: " + saveBtn);       
    console.log("Task description in workDayArray Before update: " + workDayArray[index].task);                // Log task value from from workDayArray before up dtea
    console.log("Task description on Page: " + $('#workDay').children().eq(index).children().eq(1).val());     //DOM traversal to obtain "textarea" value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val();                      //Store "textarea" value in workDayArray
    console.log("Task description in workDayArray After update: " + workDayArray[index].task);
    submitStorage();    
  } else {
 console.log("  No action taken");                                                // Clicked element isn't a button (or icon on button)
  };
 return;
});

//-------------------------------------------------------------------------------//
//- Submit workDayArray object array for local storage under key "WorkDayArray" -//
//-------------------------------------------------------------------------------//
function submitStorage() {
  console.log("");
  console.log("> submitStorage() Called"); 
  localStorage.setItem("WorkDayArray", JSON.stringify(workDayArray));
  console.log("    Object array stored in local storage");
  console.log("    WorkDayArray: ");
  console.log(     workDayArray);
  return;
};

//----------------------------------------------------------------------------------//
//- Retrieve workDayArray object array from local storage under key "WorkDayArray" -//
//----------------------------------------------------------------------------------//
function retrieveStorage() {
  console.log("");
  console.log("> retrieveStorage() Called"); 
//Retrieve Array from local storage if doesn't exist then set as blank array
  workDayArray = JSON.parse(localStorage.getItem("WorkDayArray")) ?? []; 
  console.log("WorkDayArray: ");
  console.log(workDayArray);  
  renderTask();
  return;
};

//--------------------------------------//
//-- Render workDayArray onto workDay --//
//--------------------------------------//
function renderTask() {
    console.log("")
    console.log("> renderTask() Called") 
    for (var i=0; i < 9; i++) {
        ($('#workDay').children().eq(i).children().eq(1).val(workDayArray[i].task));  //loop through and assign workDayArray task values to "textrea"
        console.log("Hour " + workDayArray[i].id + ": " + $('#workDay').children().eq(i).children().eq(1).val());      //Console log the tasks that are being populated (Delete at end)
    }
    return;
};

//--------------------------------//
//-- Assign class based on time --//
//--------------------------------//
function assignClass () {
  console.log("")
  console.log("> assignClass() Called") 
  //console.log ("Value of a is: " + a)
  
  for (var i = 9; i < 18; i++) {            // For loop between i=9 nd 18 (representing hours of the work day)
    if (i < currentHour) {                            // If past hour then no action all hours have default class of "past"
      console.log ("i < a, no action. i=" +i);
    } else if (i === currentHour) {
    $('#hour-'+[i]).addClass('present');
    console.log ("i === a, set to present. i=" + i);  //If current hour - add class "present", css to style
    }
     else if (i > currentHour) {                      //If future hour - add class "future", css to style
     $('#hour-'+[i]).addClass('future');
     console.log ("i > a, set to future. i=" + i);  
    } else {
      console.log (i + " slipped through?")           //For troubleshooting, to catch any hours that slip through
    }
    ;
    
  };     
};      

//------------------------------------------------------------------//
//-- Render Today's Date in header paragraph with ID 'currentDay' --//
//------------------------------------------------------------------//
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMM D, YYYY')); 

//-------------------------------------------------------------------//
//-- Render Current Time in header paragraph with ID 'currentTime' --//
//-------------------------------------------------------------------//
// [HL] Not a requirement of this challenge
//var now = dayjs();
//$('#currentTime').text(now.format('h:mm:ss A'));

retrieveStorage();
assignClass();
});

// For Hy
// Array is not required ...
// Readme
// Screenshots
// Comments
// Console.log