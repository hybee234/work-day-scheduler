
//Determine the current hour in 24 hour format
const currentHour = (new Date()).getHours();    //Current hour in 24 hr format
console.log ("Current hour: " + currentHour);

//Delcare array to store data
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

var workDayEl = $("#workDay");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function (init) {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. **HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?




/**************************/
/* Save textarea to array */
/**************************/

// [HL] listen for click even on workDay schedule
workDayEl.on("click", function(event) {     // jQuery listener
  console.log("")
  console.log("! workDayEl Clicked") 
  var element = event.target;               //declare var element = element that was clicked by user
  console.log(element);
  //If 'button' is clicked
  if (element.matches("button") === true) { 
    console.log("! Button element clicked") 
    var index = element.parentElement.getAttribute("data-index"); // declare var index = store the data-index number (important for workDayArray)
    console.log("Index number on array is: " + index);   
    let saveBtn = Number.parseInt(index) + 9;                     //Add 9 to index to determine hour in 24 hour format (purely to make this human readable)
    console.log("Save button clicked on hour: " + saveBtn);       
    console.log("Task description in workDayArray Before update: " + workDayArray[index].task) // Log task value from from workDayArray before up dtea
    console.log("Task description on Page: " + $('#workDay').children().eq(index).children().eq(1).val());     //DOM traversal to obtain "textarea" value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val() //Store "textarea" value in workDayArray
    console.log("Task description in workDayArray After update: " + workDayArray[index].task)
  }

//Once logic sorted for the save button - need to work out what to do with the save ICON (as parent elements are different between save icon and button)

  //If 'i' is clicked (save icon), return parent's parent data-index value against the hour...
  if (element.matches("i") === true) {
    console.log("! clicked area = i element") 
    var index = element.parentElement.parentElement.getAttribute("data-index");
    console.log(index);
    
    //    todos.splice(index, 1);  //[HL] might not need this in my project   
  }
  submitStorage();
});

//-------------------------------------------------------------------------------//
// Submit workDayArray object array for local storage under key "WorkDayArray" //
//-------------------------------------------------------------------------------//
function submitStorage() {
  console.log("")
  console.log("> submitStorage() Called") 
  localStorage.setItem("WorkDayArray", JSON.stringify(workDayArray));
  console.log("    Object array stored in local storage");
  console.log("    WorkDayArray: ");
  console.log(     workDayArray);
  return;
};

//---------------------------------------------------------------------------------//
// Retrieve workDayArray object array from local storage under key "WorkDayArray" //
//---------------------------------------------------------------------------------//

function retrieveStorage() {
  console.log("")
  console.log("> retrieveStorage() Called") 
//Retrieve Array from local storage if doesn't exist then set as blank array
  workDayArray = JSON.parse(localStorage.getItem("WorkDayArray")) ?? []; 
  console.log("    WorkDayArray: ");
  console.log(     workDayArray);
  
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
        ($('#workDay').children().eq(i).children().eq(1).val(workDayArray[i].task));  //populate tasks based on HTML structure
        console.log("Hour " + workDayArray[i].id + ", Task: " + $('#workDay').children().eq(i).children().eq(1).val());      //Console log the tasks that are being populated (Delete at end)
    }
}

//Render Data to page


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //


    // Assign style to the button
//[HL]     letterBtn.addClass('letter-button btn btn-info');


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //



  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D, YYYY')); 

  // [HL] Only to keep traack of the time in the browser
  var now = dayjs();
  $('#currentTime').text(now.format('h:mm:ss A'));

  retrieveStorage();
});

