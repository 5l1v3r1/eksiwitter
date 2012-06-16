// ==UserScript==
// @name           Eksiwitter
// @namespace      http://iyiuykular.net/apps
// @description    Eksisozluk'te Twitter gostergeci
// @include        http://*/
// @include        http://*/*
// @version        0.8
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = window.document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = window.document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    window.document.body.appendChild(script);
  }, false);
  window.document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  (function(d, script) {
      script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;

      script.onload = function(){
          jQuery(function($){
              $("<style type='text/css'> .tweet_list{ font-size:12px; list-style-type:none; } .tweet_list li{ margin-bottom:10px;margin-left:0px;width:110px;} #ticker ul.tweet_list {height:4em;overflow-y:hidden;padding-left:0px;}#ticker .tweet_list li {margin-bottom:10px;height: 4em;width:110px;}</style>").appendTo("head");

              var turkish = {"ç":"c", "ş":"s", "ğ":"g", "ü":"u", "ö":"o", "ı":"i", "Ü":"u", "Ğ":"g", "Ç":"c", "Ş":"s", "Ö":"o", "İ":"i"};


              var title = window.window.document.title.split(" - ")[0];

              $.each(turkish, function(key, value) {
                  title = title.replace(/key/g, value);
                  });

              var d = window.document.createElement("div");
              d.setAttribute("id", "twitterWidget");
              d.setAttribute("style", "overflow-y:hidden");
              //d.setAttribute("class", "eol");
              d.setAttribute("style", "line-height:14pt;width:110px;word-wrap:break-word;overflow-y:hidden;");
              window.document.getElementsByClassName("rightcol")[0].appendChild(d)
              $("#twitterWidget").tweet({
                  avatar_size: 12,
                  count: 4,
                  query: title + " lang:tr",
                  loading_text: "tweetler yolda...",
                  filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
                  template: "{avatar}{user} {join}{text}"
              }).bind("loaded", function() {
                if ((document.height - (window.pageYOffset + window.innerHeight)) > 0) {
                  $('body').css('overflow-y', 'scroll');
                }
                var ul = $(this).find(".tweet_list");
                ul.css("padding-left", 0);
                if(ul.children().size() > 1) {
                  var myHeight = $("#twitterWidget").height();
                  var ticker = function() {
                    setTimeout(function() {
                      var firstItem = ul.find("li:first");
                      firstItem.animate( {marginTop: -1*firstItem.height()}, 500, function() {
                        $(this).detach().appendTo(ul).removeAttr('style');
                      });
                      ticker();
                    }, 5000);
                  };
                  ticker();
                }
              });
          });
      };
      script.src = 'https://raw.github.com/samet/eksiwitter/master/jquery.tweet.min.js';
      d.getElementsByTagName('head')[0].appendChild(script);
  }(window.document));
};

if(window.document.URL.indexOf("www.eksisozluk.com/show.asp") >= 0){
    // load jQuery and execute the main function
    addJQuery(main);
}
