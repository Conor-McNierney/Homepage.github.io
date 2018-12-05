/*
  Conor McNierney
  For use in GUi 1 assignment 8
  changing assignment 7 so that you can save the tables to view later
*/
var tabIndex = 1;
function auto_submit() {
  if( $("form#mult_form").valid() == true ) {
    $("form#mult_form").submit();
  }
}

function save_tab() {
  var tabCount = $("#tabs li").length + 1;
  console.log("Current tab count is: " + tabCount);

  if(tabCount > 24) {
    alert("Maximum tab count reached, please delete one and try again");
    return false;
  }
  $( "#tabs" ).tabs();
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  tabIndex++;
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + hor_start +
              " to " + hor_end + " by " + vert_start + " to " + vert_end + "</a>" +
              "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
  $( "div#tabs ul" ).append( title );
  $( "div#tabs" ).append('<div id="tab-' + tabIndex + '">' + $("#multiplication_table").html() + '</div>');
  $( "#tabs" ).tabs("refresh");
  $( "#tabs" ).tabs("option", "active", -1);
  $( "#tabs" ).delegate( "span.ui-icon-close", "click", function() {
      var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelID ).remove();
      try {
        $( "#tabs" ).tabs("refresh");
      }
      catch (e) {
        //console.log(e);
      }
      if( $('div#tabs ul li.tab').length == 0) {
        try {
          $("#tabs").tabs("destroy");
        }
        catch (e) {
          //console.log(e);
        }

        return false;
      }
  });
}
function slider() {
  $("#slider_hor_start").slider({
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("#horiz_start").val(ui.value);
      auto_submit();
    }
  });
  $("#horiz_start").on("keyup", function() {
    $("#slider_hor_start").slider("value", this.value);
    auto_submit();
  });

  // Horizontal End Slider
  $("#slider_hor_end").slider({
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("#horiz_end").val(ui.value);
      auto_submit();
    }
  });
  $("#horiz_end").on("keyup", function() {
    $("#slider_hor_end").slider("value", this.value);
    auto_submit();
  });

  // Vertical Start Slider
  $("#slider_vert_start").slider({
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("#vert_start").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_start").on("keyup", function() {
    $("#slider_vert_start").slider("value", this.value);
    auto_submit();
  });

  // Vertical End Slider
  $("#slider_vert_end").slider({
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("#vert_end").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_end").on("keyup", function() {
    $("#slider_vert_end").slider("value", this.value);
    auto_submit();
  });
}


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

    // Messages that appear if a rule isn't valid.
    messages: {
      horiz_start: {
        number: "ERROR: Non-valid number. the range is -12 to 12",
        min: "ERROR: Number is below minimum, current minimum is -12",
        max: "ERROR: Number is too large, current max is 12",
        required: "ERROR: No number has been entered, please enter a nuumber"
      },
      horiz_end: {
        number: "ERROR: Non-valid number. the range is -12 to 12",
        min: "ERROR: Number is below minimum, current minimum is -12",
        max: "ERROR: Number is too large, current max is 12",
        required: "ERROR: No number has been entered, please enter a nuumber"
      },
      vert_start: {
        number: "ERROR: Non-valid number. the range is -12 to 12",
        min: "ERROR: Number is below minimum, current minimum is -12",
        max: "ERROR: Number is too large, current max is 12",
        required: "ERROR: No number has been entered, please enter a nuumber"
      },
      vert_end: {
        number: "ERROR: Non-valid number. the range is -12 to 12",
        min: "ERROR: Number is below minimum, current minimum is -12",
        max: "ERROR: Number is too large, current max is 12",
        required: "ERROR: No number has been entered, please enter a nuumber"
      }
    },
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
    },

    onkeyup: function( element, event ) {
      auto_submit();
    }
  });
}


// This function calculates the multiplication table.
function table_calc() {
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);
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

  /*  Using a object to store each row's array
      matrix {
        row1: [1, 2, 3,  4,  5],
        row2: [3, 6, 9, 12, 15],
        row3: [etc],
        row4: [etc]
      }
  */
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
