$(document).ready(function() {
  $("#tweet-text").keyup(function(event) {
    const counter = $(this).closest("form").find(".counter");//=>extracting counter value from index.html
    let len = $(this).val().length;

    let newCounter = 140 - len;
    console.log(newCounter);

    if (newCounter < 0) {//=> counter validation
      console.log(newCounter);
      counter.addClass("counter-red");
    } else {
      $("#errNoValue").slideUp();
      $("#errExceededValue").slideUp();
      counter.removeClass("counter-red");
    }

    counter.html(newCounter);
  });
});
