//  Conor McNierney
//  homework 7
//  using jquery to validate the input of user for the mult table
function validate() {

  $("#mult_form").validate({
    rules: {
      horiz_start: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      horiz_end: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      vert_start: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      vert_end: {
        number: true,
        min: -12,
        max: 12,
        required: true
      }
    },

    messages: {
      horiz_start: {
        number: "ERROR: you did not enter a valid number.<br/>Please enter a number between -12 and 12 for the Horizontal start.",
        min: "ERROR: number entered is too small.<br/>Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "ERROR: number entered is too large.<br/>Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "ERROR: no number was entered.<br/>A number between -12 and 12 is required for the Horizontal start."
      },
      horiz_end: {
        number: "ERROR: you did not enter a valid number.<br/>Please enter a number between -12 and 12 for the Horizontal start.",
        min: "ERROR: number entered is too small.<br/>Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "ERROR: number entered is too large.<br/>Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "ERROR: no number was entered.<br/>A number between -12 and 12 is required for the Horizontal start."
      },
      vert_start: {
        number: "ERROR: you did not enter a valid number.<br/>Please enter a number between -12 and 12 for the Horizontal start.",
        min: "ERROR: number entered is too small.<br/>Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "ERROR: number entered is too large.<br/>Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "ERROR: no number was entered.<br/>A number between -12 and 12 is required for the Horizontal start."
      },
      vert_end: {
        number: "ERROR: you did not enter a valid number.<br/>Please enter a number between -12 and 12 for the Horizontal start.",
        min: "ERROR: number entered is too small.<br/>Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "ERROR: number entered is too large.<br/>Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "ERROR: no number was entered.<br/>A number between -12 and 12 is required for the Horizontal start."
      }
    },

    // This gets called when the form is submitted and valid.
    submitHandler: function() {
      table_calc();
      return false;
    },

    invalidHandler: function() {
      $("#warning_msg").empty();
      $("#multiplication_table").empty();
    },
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    }
  });
}

function table_calc() {
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  console.log("Horizontal start: ", hor_start, "Horizontal end: ", hor_end),
  console.log("Vertical start: ", vert_start, "Vertical end: ", vert_end);

  $("#warning_msg").empty();

  if (hor_start > hor_end) {

    $("#warning_msg").append("<p class='warning_class'>Swapping the Horizontal start and Horizontal end.</p>");

    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }

  if (vert_start > vert_end) {

    $("#warning_msg").append("<p class='warning_class'>Swapping the Vertical start and Vertical end.</p>");

    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  var matrix = {};

  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);
  var horz = hor_start;
  var vert = vert_start;

  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    matrix["row" + x] = tmp_arr;

    horz = hor_start;
    vert++;
  }

  var content = "";

  content += "<table>";

  content += "<tr><td></td>";

  for (var a = hor_start; a <= hor_end; a++) {
    content += "<td>" + a + "</td>";
  }

  content += "</tr>";

  var vert = vert_start;

  for (var x = 0; x <= columns; x++) {
    content += "<tr><td>" + vert + "</td>";

    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;

    content += "</tr>";
  }

  content += "</table>";

  $("#multiplication_table").html(content);

  return false;
}
