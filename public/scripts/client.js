/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const validation = (val) => {
  if (val.length === 0) {
    $("#errExceededValue").slideUp();
    $("#errNoValue").slideDown();
    return false;
  }
  if (val.length > 140) {
    $("#errNoValue").slideUp();
    $("#errExceededValue").slideDown();
    return false;
  }
  return true;
};

$(document).ready(function () {
  loadTweets();
  $(".arrow ").click(function (event) {
    $("#tweetForm").slideToggle();
  });

  $("#tweetForm").submit(function (event) {
    let txtVal = $("#tweet-text").val();
    event.preventDefault();
    if (validation(txtVal)) {
      $.post("/tweets", $("#tweet-text").serialize()).then((res) => {
        loadTweets();
      });
    }
  });
});

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET", dataType: "json" }).then((result) => {
    renderTweets(result);
  });
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  console.log(tweets);
  for (let user of tweets) {
    $(".tweetsBox").append(createTweetElement(user)); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
  const newTxt = escape(tweet["content"]["text"]);
  let date = timeago.format(new Date(tweet.created_at));
  let $tweet = $(`
    <article class="old-tweet ">
    <header class="tweeterBoxHeader">
    <div>
    <img src=${tweet["user"]["avatars"]}><p>${tweet["user"]["name"]}</p>
    </div>
    <p id="tweetHandle">${tweet["user"]["handle"]}</p>
    </header>
    <div class="flex-border">
    <h3>${newTxt}</h3>
    </div>
    <footer class="tweeterBoxFooter">
    <div><span class="need_to_be_rendered">${date}</span></div>
    <div> 
    <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
    </div>
    </footer>  
    </article>
    `);
  return $tweet;
};

// renderTweets(data)
// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
