
//Determine the current hour in 24 hour format
const currentHour = (new Date()).getHours();    //Current hour in 24 hr format
console.log ("Current hour: " + currentHour);

//Delcare array to store data
var workDayArray = [
  {id: "9", task: "task 9 testabc"},
  {id: "10", task: "task 10 testabc"},
  {id: "11", task: "task 11 testabc"},
  {id: "12", task: "task 12 testabc"},
  {id: "13", task: "task 13 testabc"},
  {id: "14", task: "task 14 testabc"},
  {id: "15", task: "task 15 testabc"},
  {id: "16", task: "task 16 testabc"},
  {id: "17", task: "task 17 testabc"},
]

console.log ("Work Day Array");
console.log (workDayArray);

var workDayEl = $("#workDay");


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. **HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


});

// [HL] listen for click even on workDay schedule
workDayEl.on("click", function(event) {     // jQuery listener
  console.log("")
  console.log("! workDayEl Clicked") 
  var element = event.target;
  console.log(element);
  
  //If button is clicked return daata-index value against the hour
  if (element.matches("button") === true) {
    console.log("! Button element clicked") 
    var index = element.parentElement.getAttribute("data-index");
    console.log("Index number on array is: " + index);
   
    let saveBtn = Number.parseInt(index) + 9;  //Add 9 to index to determine hour in 24 hour format 
    console.log("Save button clicked on hour: " + saveBtn); 
    console.log("Task description Before update: " + workDayArray[index].task) // Pull value task value from workDayArray
    console.log($('#workDay').children().eq(index).children().eq(1).val()); //DOM Traversal to get task value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val() //Set value in Field to the value in array
    console.log("Task description After update: " + workDayArray[index].task)
  
  }
//Note to Hy
//I have now successfully pulled the value out of the task to store aagainst the array
//The next steps is to push the array into local storage
//After that ... set the webpage up so that when the page refreshes, the data is retrieved and populated


//Once logic sorted for the save button - need to work out what to do with the save ICON (as parent elements are different between save icon and button)

  //If 'i' is click (save icon), return parent's parent data-index value against the hour...
  if (element.matches("i") === true) {
    console.log("! clicked area = i element") 
    var index = element.parentElement.parentElement.getAttribute("data-index");
    console.log(index);
    
    //    todos.splice(index, 1);  //[HL] might not need this in my project   
  }


//Store Data




//Retrieve Data




//Render Data to page


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
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

});
