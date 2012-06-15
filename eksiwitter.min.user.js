// ==UserScript==
// @name           Eksiwitter
// @namespace      http://iyiuykular.net/apps
// @description    Eksisozluk'te Twitter gostergeci
// @include        http://*/
// @include        http://*/*
// @version        0.8
// ==/UserScript==


function addJQuery(b){var a=window.document.createElement("script");a.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");a.addEventListener("load",function(){var a=window.document.createElement("script");a.textContent="("+b.toString()+")();";window.document.body.appendChild(a)},!1);window.document.body.appendChild(a)}
function main(){(function(b,a){a=b.createElement("script");a.type="text/javascript";a.async=!0;a.onload=function(){jQuery(function(a){a("<style type='text/css'> .tweet_list{ font-size:12px;} .tweet_list li{ margin-bottom:10px} #ticker ul.tweet_list {height:4em;overflow-y:hidden;}#ticker .tweet_list li {height: 4em;}</style>").appendTo("head");var b=window.window.document.title.split(" - ")[0];a.each({"\u00e7":"c","\u015f":"s","\u011f":"g","\u00fc":"u","\u00f6":"o","\u0131":"i","\u00dc":"u","\u011e":"g",
"\u00c7":"c","\u015e":"s","\u00d6":"o","\u0130":"i"},function(a,c){b=b.replace(/key/g,c)});var c=window.document.createElement("div");c.setAttribute("id","twitterWidget");c.setAttribute("style","overflow:hidden");c.setAttribute("class","eol");window.document.getElementsByClassName("rightcol")[0].appendChild(c);a("#twitterWidget").tweet({avatar_size:12,count:4,query:b+" lang:tr",loading_text:"hayirlisiyla geliyor tweetler...",filter:function(a){return!/^@\w+/.test(a.tweet_raw_text)},template:"{avatar}{user} {join}{text}"}).bind("loaded",
function(){var b=a(this).find(".tweet_list");b.css("padding-left",0);if(1<b.children().size()){var c=function(){setTimeout(function(){var d=b.find("li:first");d.animate({marginTop:-1*d.height()},500,function(){a(this).detach().appendTo(b).removeAttr("style")});c()},5E3)};c()}})})};a.src="https://raw.github.com/samet/eksiwitter/master/jquery.tweet.js";b.getElementsByTagName("head")[0].appendChild(a)})(window.document)}0<=window.document.URL.indexOf("www.eksisozluk.com/show.asp")&&addJQuery(main);
