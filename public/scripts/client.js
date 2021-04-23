const validation = (val) => {//=> function for validation check
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
//--------------------Jquery--------------------------
$(document).ready(function() {//=> jquery event fired
  loadTweets();
  $(".arrow ").click(function(event) {//=> jquery event fired
    $("#tweetForm").slideToggle();
  });

  $("#tweetForm").submit(function(event) {//=> jquery event fired
    let txtVal = $("#tweet-text").val();
    event.preventDefault();
    if (validation(txtVal)) {
      $.post("/tweets", $("#tweet-text").serialize()).then((res) => {//=> method to post the data on page
        loadTweets();
      });
      $("textarea").val("");
      $(".counter").val("140");
    }
  });
});

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET", dataType: "json" }).then((result) => {//=> method to get the data from back end
    renderTweets(result);
  });
};
//----------------------Supporting functions-----------------------------------------
const renderTweets = function(tweets) {
   console.log(tweets);
  for (let user of tweets) {
    $(".tweetsBox").append(createTweetElement(user)); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};
const escape = function(str) {//=>function to avoid data being deleted from body 
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {//=>function to get value user details and tweet from user
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
