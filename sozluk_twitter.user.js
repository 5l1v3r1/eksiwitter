// ==UserScript==
// @name           Sozluk_Twitter
// @namespace      http://iyiuykular.net/apps
// @description    Eksisozluk twitter widget
// @include        http://*/
// @include        http://*/*
// @version        0.1
// ==/UserScript==





// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = window.document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
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
        (function(d, script) {
            script = d.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = function(){
                jQuery(function($){
                    $("<style type='text/css'> .tweet_list{ font-size:12px;} .tweet_list li{ margin-bottom:10px} #ticker ul.tweet_list {height:4em;overflow-y:hidden;}#ticker .tweet_list li {height: 4em;}</style>").appendTo("head");

                    var turkish = {"ç":"c", "ş":"s", "ğ":"g", "ü":"u", "ö":"o", "ı":"i", "Ü":"u", "Ğ":"g", "Ç":"c", "Ş":"s", "Ö":"o", "İ":"i"};


                    var title = window.window.document.title.split(" - ")[0];

                    $.each(turkish, function(key, value) {
                        title = title.replace(/key/g, value);
                        });
                    //title = title.replace(/ /g, "");

                    var d = window.document.createElement("div");
                    d.setAttribute("id", "twitterWidget");
                    d.setAttribute("style", "overflow:hidden");
                    d.setAttribute("class", "eol");
                    window.document.getElementsByClassName("rightcol")[0].appendChild(d)
                    $("#twitterWidget").tweet({
                        avatar_size: 12,
                        count: 4,
                        query: title + " lang:tr",
                        loading_text: "hayirlisiyla geliyor tweetler...",
                        filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
                        template: "{avatar}{user} {join}{text}"
                    }).bind("loaded", function() {
                      var ul = $(this).find(".tweet_list");
                      ul.css("padding-left", 0);
                      var ticker = function() {
                        setTimeout(function() {
                          ul.find('li:first').animate( {marginTop: '-1em'}, 400, function() {
                            $(this).detach().appendTo(ul).removeAttr('style');
                          });
                          ticker();
                        }, 5000);
                      };
                      ticker();
                    });
                });
            };
            //script.src = 'http://tweet.seaofclouds.com/jquery.tweet.js';
            script.src = 'http://yxy.in/dir/jquery.tweet.js';
            d.getElementsByTagName('head')[0].appendChild(script);
        }(window.document));
    };
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(window.document));

}

if(window.document.URL.indexOf("www.eksisozluk.com/show.asp") >= 0){
    // load jQuery and execute the main function
    addJQuery(main);
}
