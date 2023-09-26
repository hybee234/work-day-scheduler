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

//Current hour in 24 hour format
const currentHour = (new Date().getHours()+12);    
console.log ("Current hour: " + (currentHour));
console.log ("Format 'h' " + dayjs().format('h'))

var a = dayjs().hour()+7
console.log("Hour test " + a)

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

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
  console.log("> assignCLass() Called") 
   // console.log($('#workDay').children().eq(0))
  console.log ("Value of a is: " + a)
    for (var i=9; i<17; i++) {
     if (i < a) {
      console.log ("i< a, no action");
     } else if (i=a) {
      $('#workDay').children().eq(i).addClass('present');
     }
     // else if (i > a) {
     // $('#workDay').children().eq(i).addClass('future');
    };
  };     
      
  






  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //


    // Assign style to the button
//[HL]     letterBtn.addClass('letter-button btn btn-info');


//------------------------------------------------------------------//
//-- Render Today's Date in header paragraph with ID 'currentDay' --//
//------------------------------------------------------------------//
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMM D, YYYY')); 

//-------------------------------------------------------------------//
//-- Render Current Time in header paragraph with ID 'currentTime' --//
//-------------------------------------------------------------------//
// [HL] Not a requirement of this challenge
var now = dayjs();
$('#currentTime').text(now.format('h:mm:ss A'));

retrieveStorage();
assignClass();
});

