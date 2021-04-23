$(document).ready(function() {
  let dateTime = $(".need_to_be_rendered").attr("datetime");

  let formattedDate = timeago.format(dateTime);
  $(".need_to_be_rendered").append(formattedDate);
});
