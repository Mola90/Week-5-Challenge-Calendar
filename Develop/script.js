// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  
  
//   // TODO: Add a listener for click events on the save button. This code should
//   // use the id in the containing time-block as a key to save the user input in
//   // local storage. HINT: What does `this` reference in the click listener
//   // function? How can DOM traversal be used to get the "hour-x" id of the
//   // time-block containing the button that was clicked? How might the id be
//   // useful when saving the description in local storage?
//   //
//   // TODO: Add code to apply the past, present, or future class to each time
//   // block by comparing the id to the current hour. HINTS: How can the id
//   // attribute of each time-block be used to conditionally add or remove the
//   // past, present, and future classes? How can Day.js be used to get the
//   // current hour in 24-hour time?
//   //
//   // TODO: Add code to get any user input that was saved in localStorage and set
//   // the values of the corresponding textarea elements. HINT: How can the id
//   // attribute of each time-block be used to do this?
//   //
//   // TODO: Add code to display the current date in the header of the page.
// });



$(document).ready(function() {

  var timeContainerEl = $("#time-container");
  var mainheadingEl = $(".main-heading");
  var headingParagraphEl = $(".head-paragraph");
  var currentDayEl = $("#currentDay");

  var tense = "";


  mainheadingEl.addClass("text-center");
  headingParagraphEl.addClass("text-center");

  var date = dayjs().format("dddd, MMMM D");
  currentDayEl.text(date);
  currentDayEl.addClass("text-center");

  var currentHour = dayjs().format("H");

  function addTimeBlocks (){
    
    for (var i = 9; i < 13; i++){
      
      var meridiemIndicator = "AM";

      if(i == 12){
        meridiemIndicator ="PM";
      }

      if(i > currentHour){
        tense = "future";
      }

      if(i == currentHour){
        tense = "present"
      }

      if(i < currentHour){
        tense = "past"
      }
  

      var hourEl = $("<div>");    
      hourEl.addClass("row time-block " + tense);
      var hourIdName = "hour" + i;
      hourEl.attr("id", hourIdName);
      // add id 

      var innerHourEl = $("<div>");
      innerHourEl.addClass("col-2 col-md-1 hour text-center py-3");
      innerHourEl.text(i + meridiemIndicator);
      
  
      var textEl = $("<textarea>");
      textEl.addClass("col-8 col-md-10 description");
      textEl.attr("id", hourIdName + "textArea");
      textEl.attr("rows", "3");
  
      var saveButtonEl = $("<button>");
      saveButtonEl.addClass("btn saveBtn col-2 col-md-1");
      //saveButtonEl.attr("id", i + "saveButton");
      saveButtonEl.attr("aria-label","save");

     

  
      var saveIconeEl = $("<i>");
      saveIconeEl.addClass("fas fa-save");
      saveIconeEl.attr("aria-hidden","true");
  
      saveButtonEl.append(saveIconeEl);
      hourEl.append(innerHourEl,textEl, saveButtonEl);
      timeContainerEl.append(hourEl);  
    }

    for (var i = 1; i < 6; i++){
      
      var meridiemIndicator = "PM";
      currentHour = currentHour - 12;

      if(i > currentHour){
        tense = "future";
      }

      if(i == currentHour){
        tense = "present"
      }

      if(i < currentHour){
        tense = "past"
      }

      
      var hourEl = $("<div>");    
      hourEl.addClass("row time-block " + tense);
      var hourIdName = "hour" + i;
      hourEl.attr("id", hourIdName);
     
  
      var innerHourEl = $("<div>");
      innerHourEl.addClass("col-2 col-md-1 hour text-center py-3");
      innerHourEl.text(i + meridiemIndicator);
      
  
      var textEl = $("<textarea>");
      textEl.addClass("col-8 col-md-10 description");
      textEl.attr("id", hourIdName + "textArea");
      textEl.attr("rows", "3");
  
      var saveButtonEl = $("<button>");
      saveButtonEl.addClass("btn saveBtn col-2 col-md-1");
      saveButtonEl.attr("id", i + "saveButton");
      saveButtonEl.attr("aria-label","save");
  
      var saveIconeEl = $("<i>");
      saveIconeEl.addClass("fas fa-save");
      saveIconeEl.attr("aria-hidden","true");
  
      saveButtonEl.append(saveIconeEl);
      hourEl.append(innerHourEl,textEl, saveButtonEl);
      timeContainerEl.append(hourEl);
    }
 }

 function timeStatus(){

 }



  
  addTimeBlocks();

  $(".saveBtn").on("click", function(){
    var clickedButton = $(this);
    var timeId = clickedButton.parent().attr("id");

    var textAreaId = timeId + "textArea";

    var capturedText = $("#" + textAreaId).val();

    localStorage.setItem(timeId, capturedText);
    
  })

  $(".time-block").each(function(){
    var timeBlockId = $(this).attr("id");
    var textAreaId = timeBlockId + "textArea";
    var savedText = localStorage.getItem(timeBlockId);

    $("#" + textAreaId).val(savedText);


  });




 
});