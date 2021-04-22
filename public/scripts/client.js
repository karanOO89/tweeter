/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  loadTweets();
  $("#tweetForm").submit(function (event) {
      //element
      event.preventDefault();
      
      let txtVal = $("#tweet-text").val();
      console.log(txtVal);
      if (txtVal.length === 0){
          alert("That hum.... had no decibel!!!")
        }
        if (txtVal.length > 140){
            alert("Ooooo!!! too loud , try to keep it under 140 decibels")
        }
        if (txtVal.length > 0 && txtVal.length <= 140) {
            $.ajax("/tweets", {
                method: "POST",
                dataType: "json",
                data: { text: txtVal },
            });
            location.reload();
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
    
    for (let user in tweets) {
        $(".tweetsBox").append(createTweetElement(tweets[user])); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
};
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
const createTweetElement = function (tweet) {
    
    
    const newTxt= escape(tweet["content"]["text"]);
    let date = timeago.format(new Date(tweet.created_at))
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
