/*
    File: ~/js/table.js
    91.461 Assignment 6:Multiplacation table
    Conor McNierney for GUI 1 assignment 6
    used JS to create a simple 4 input boxes to create a multiplacation table based on the min max for x and y that the user inputs
*/

// This gets the values that will be used for the multiplacation
function table_calc() {
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);
  
  //This bit is only needed for debugging, to see if input is the same as the thing that is stored
  //console.log("Horizontal start: ", hor_start, "Horizontal end: ", hor_end,
  //            "---Vertical start: ", vert_start, "Vertical end: ", vert_end);

  // This is used to swap the min and max numbers for the x if min is larger than max. ex min = 5 and max = 1
  if (hor_start > hor_end) {
    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }
  // same as above but used for y axis
  if (vert_start > vert_end) {
    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  // avoiding large numbers for the sake of negating crashes
  if (hor_start < -1000 || hor_end > 1000 || vert_start < -1000 || vert_end > 1000) {
    alert("Please input numbers between -1000 and 1000 in the boxes and try again");
    return;
  }
  var matrix = {};

  // Flip the inputs around if the end is less than the start and use the absolute values
  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);

  // Indexes for the 2D array.
  var horz = hor_start;
  var vert = vert_start;

  /*  Calculate the multiplication table using an object (matrix) and a bunch
      of arrays.*/
  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
      // Calculation
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    // Save the current row in the object.
    matrix["row" + x] = tmp_arr;

    horz = hor_start;        // reset as we move down a row
    vert++;
  }

  table_fill(matrix);
  return false;
}


// This function fills in the multiplication table.
function table_fill(matrix) {
  // Debugging.
  console.log("The array looks like:\n", matrix);
//takes user input and converts to numbers just in case
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  // Check to see if the numbers are read correctly.
  console.log("Horizontal start: ", hor_start, "Horizontal end: ", hor_end,
              "---Vertical start: ", vert_start, "Vertical end: ", vert_end);

  // Swap beginning / ending numbers if the start is larger than the beginning.
  if (hor_start > hor_end) {
    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }
  // Also swap vertical beginning / ending
  if (vert_start > vert_end) {
    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  // Invert inputs incase of start being greater than end
  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);
  var content = "";

  // Opening table tags.
  content += "<table>";

  // First row, and put an empty spot in the top left corner.
  content += "<tr><td></td>";

  // Now fill out the rest of the first row.
  for (var a = hor_start; a <= hor_end; a++) {
    content += "<td>" + a + "</td>";
  }

  // Close the first row.
  content += "</tr>";

  // Print out the left most column using this variable.
  var vert = vert_start;

  // Fill in each row after the first.
  for (var x = 0; x <= columns; x++) {
    // Set the left most column first.
    content += "<tr><td>" + vert + "</td>";

    // Add in all the multiplication for this row.
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;
    content += "</tr>";
  }
  content += "</table>";

  // Now the content gets loaded into the HTML page.
  $("#multiplication_table").html(content);
}
