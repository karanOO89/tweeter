$(document).ready(function () {
  $("#tweet-text").keyup(function (event) {
    //element
    const counter = $(this).closest("form").find(".counter");
    let color = $(this).closest("form").find(".counter");
    let len = $(this).val().length;

    let newCounter = 140 - len;
    console.log(newCounter);

    if (newCounter < 0) {
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
