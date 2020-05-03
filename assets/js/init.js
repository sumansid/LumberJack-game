Timer = 45000;
LOSETEXT = "You lost! Plant more trees next time !";

//Allow you to add sounds on tree cut!
//if true then works, but if user turn on from
//sound icon.
const SOUNDONCUTS = false;

function jqUpdateSize(){
    var width = $(window).width();
    var height = $(window).height();
    if (width < 1300 || width > 1600) {
    	$(".popup-overlay, .popup-content").addClass("active");
    	$("#hideScreen").hide();
    } else {
    	$(".popup-overlay, .popup-content").removeClass("active");
    	$("#hideScreen").show();
    }
}
$(document).ready(jqUpdateSize);    // When the page first loads
$(window).resize(jqUpdateSize);     // When the browser changes size



var firebaseConfig = {
    apiKey: "AIzaSyBEPTwaqVCzMR6dw6JCGTL7rAXI45jVpvs",
    authDomain: "game-c5fb0.firebaseapp.com",
    databaseURL: "https://game-c5fb0.firebaseio.com",
    projectId: "game-c5fb0",
    storageBucket: "game-c5fb0.appspot.com",
    messagingSenderId: "949926843506",
    appId: "1:949926843506:web:e9e7cacab9a28aff199eeb",
    measurementId: "G-2QV6JEW6DJ"
  };
// Initialize Firebase
firebase = firebase.initializeApp(firebaseConfig);
