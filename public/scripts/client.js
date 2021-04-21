/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
  $(".tweetsBox").append(createTweetElement(tweetData)); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac",
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants",
  },
  created_at: 1461116232227,
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = function (tweet) {
  // let  $tweet = $(`<article class="tweet">Hello world</article>`);
  let $tweet = $(`
    <article class="old-tweet ">
    <header class="tweeterBoxHeader">
      <div>
      <img src=${tweet["user"]["avatars"]}><p>${tweet["user"]["name"]}</p>
    </div>
    <p id="tweetHandle">${tweet["user"]["handle"]}</p>
    </header>
    <div class="flex-border">
    <h3>${tweet["content"]["text"]}</h3>
    </div>
    <footer class="tweeterBoxFooter">
      <div><span class="need_to_be_rendered" datetime=${tweet["created_at"]}></span></div>
      <div> 
        <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
      </div>
    </footer>  
   </article>
    `);
  return $tweet;
};

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
