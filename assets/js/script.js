$(function () {
  var workDayEl = $("#workDay");  //Target container for all work hours and tasks
  var workDayArray = [];

  //Current hour in 24 hour format parsed as an integer to be compatible with if/else logic in function assignClass ()
  var currentHour = parseInt(dayjs().format("HH"));     //format("HH") requests only the hours, capital HH is for 24 hour time (2 digit)
  //var currentHour = parseInt(dayjs("2023-09-27 02:00:00 PM").format("HH"));   //Use this to define the time in the process of troubleshooting
  console.log ("Current hour: " + (currentHour));

//------------------------------------------//
//- Listener to save tasks to workDayArray -//
//------------------------------------------//
workDayEl.on("click", function(event) {         // jQuery listener
  console.log("");
  console.log("! workDayEl Clicked"); 
  var element = event.target;                   //declare var element = element that was clicked by user
  //console.log("  Element clicked: ");
  //console.log(element);                       //Use to troubleshoot if needed (tells you what html element was clicked)
  //If 'button' is clicked
  if (element.matches("button") === true) { 
    var index = element.parentElement.getAttribute("data-index");                                                 //Traverse 1 level up to obtain "data-index" attribute from div (Important to update workDayArray)
    console.log("  ! Button element clicked");        
    let saveBtn = Number.parseInt(index) + 9;                                                                     //Add 9 to index to determine hour in 24 hour format (purely to make this human readable in console.log)
    console.log("    Index number: " + index + ", Save button hour: " + saveBtn);    
    console.log("    workDayArray.task before: '" + workDayArray[index].task + "'");                                     // Log task value from from workDayArray before up dtea
    console.log("    textarea on page:         '" + $('#workDay').children().eq(index).children().eq(1).val() + "'");    //DOM traversal to obtain "textarea" value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val();                         //Store "textarea" value in workDayArray
    console.log("    workDayArray.task after:  '" + workDayArray[index].task + "'");
    submitStorage();
  } 
  //If 'i' is clicked (save icon on button)
  else if (element.matches("i") === true) {
    var index = element.parentElement.parentElement.getAttribute("data-index");                                   //Traverse 2 levels up to obtain "data-index" attribute from div (Important to update workDayArray)
    console.log("  ! i element clicked"); 
    let saveBtn = Number.parseInt(index) + 9;                                                                     //Add 9 to index to determine hour in 24 hour format (purely to make this human readable in cosnole.log)
    console.log("    Index number: " + index + ", Save button hour: " + saveBtn);       
    console.log("    workDayArray.task before: '" + workDayArray[index].task + "'");                                     // Log task value from from workDayArray before up dtea
    console.log("    textarea on page:         '" + $('#workDay').children().eq(index).children().eq(1).val() + "'");    //DOM traversal to obtain "textarea" value
    workDayArray[index].task = $('#workDay').children().eq(index).children().eq(1).val();                         //Store "textarea" value in workDayArray
    console.log("    workDayArray.task after:  '" + workDayArray[index].task + "'");
    submitStorage();
  } else {
 console.log("  No action taken - not save button");                                                              // Clicked element isn't a button (or icon on button)
  };
 return;
});

//-------------------------------------------------------------------------------//
//- Submit workDayArray object array for local storage under key "WorkDayArray" -//
//-------------------------------------------------------------------------------//
function submitStorage() {
  console.log("");
  console.log("> submitStorage() Called"); 
  localStorage.setItem("WorkDayArrayTasks", JSON.stringify(workDayArray));
  console.log("    Object array stored in local storage. Key = 'WorkDayArrayTasks'");
  //console.log("    WorkDayArray: ");                                        //For troubleshooting
  //console.log(     workDayArray);                                           //For troubleshooting
  return;
};

//--------------------------------------------------------------------------------------//
//- Retrieve workDayArray object array from local storage under key "WorkDayArrayTask" -//
//--------------------------------------------------------------------------------------//
function retrieveStorage() {
  console.log("");
  console.log("> retrieveStorage() Called"); 
  workDayArray = JSON.parse(localStorage.getItem("WorkDayArrayTasks")) ?? [] ; //Retrieve Array from local storage if doesn't exist then set as blank array
  
  if (workDayArray.length === 0) {                              // If workDayArray.length is zero then this will result in errors as the application expects placeholders for each hour
    console.log("    workDayArray.length is zero. Creating array placeholders to prevent errors") 
    workDayArray = [                                            // Create workDayArray as placeholder for data (application will error out without placeholders)
      {id: "9AM", task: ""},                                    // Note that the ID value in the array isn't used in any part of this application
      {id: "10AM", task: ""},
      {id: "11AM", task: ""},
      {id: "12PM", task: ""},
      {id: "1PM", task: ""},
      {id: "2PM", task: ""},
      {id: "3PM", task: ""},
      {id: "4PM", task: ""},
      {id: "5PM", task: ""},  
    ]
    console.log ("    Sacving workDayArray to local storage. Key = 'WorkDayArrayTasks'");
    localStorage.setItem("WorkDayArrayTasks", JSON.stringify(workDayArray));   //Then push workDayArray into local storage under key "WorkDayArrayTasks"
    } else {
      console.log ("    workDayArray.length OK")
    };  
  console.log("    workDayArray after retrieveStorage():");
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
    console.log("  workDayArray before rendering tasks: ");
    console.log(workDayArray);
    console.log("  For loop in progress, rendering from workDayArray to page:");
    for (var i=0; i < 9; i++) {
      hourNumber=parseInt(i)+9;                                                                  //hourNumber = the ID selector to target (e.g. hour-9, hour-10 ...)
      $("#hour-"+hourNumber).children().eq(1).val(workDayArray[i].task);                         //loop through targetting "hour-#" ID on each slot and assign workDayArray task values to "textrea"
      console.log("  i = " + i +", hourNumber = " + hourNumber + ", Task(s): " + $("#hour-"+hourNumber).children().eq(1).val());  //Console log the tasks that are being populated onto page        
      // ($('#workDay').children().eq(i).children().eq(1).val(workDayArray[i].task));                                   //Only storing as example - another way of targetting textarea
      // console.log("Hour " + workDayArray[i].id + ": " + $('#workDay').children().eq(i).children().eq(1).val());      //Only storing as example - another way of targetting textarea            
    }
    return;
};

//--------------------------------//
//-- Assign class based on time --//
//--------------------------------//
function assignClass () {
  console.log("")
  console.log("> assignClass() Called") 
  console.log ("  currentHour = " + currentHour + " (Note 24 hour format)")  
  for (var i = 9; i < 18; i++) {                                    // For loop between i=9 nd 18 (i representing hours of the work day)
    if (i < currentHour) {                                          // If i is in the past then no action - all have default class of "past"
      //console.log ("i < currentHour, no action. i=" +i);          // Use for troubleshooting if necessary
    } else if (i === currentHour) {                                 // If i equals current hour - add class "present", css will style 
      $('#hour-'+[i]).addClass('present');
      //console.log ("i === currentHour, set to present. i=" + i);  // Use for troubleshooting if necessary
    }
     else if (i > currentHour) {                                     // If i is in the future - add class "future", css to style
      $('#hour-'+[i]).addClass('future');
      //console.log ("i > currentHour, set to future. i=" + i);      // Use for troubleshooting if necessary
    } else {
      //console.log (i + " slipped through?")                          //For troubleshooting, to catch any hours that slip through
    };
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
// Readme
// Screenshots
