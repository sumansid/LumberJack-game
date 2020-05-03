//Set default score to 0.
if (localStorage.getItem('score') == null ) {
  localStorage.setItem('score', 0);
}
//Set default sound to on.
if (localStorage.getItem('sound') == null) {
  localStorage.setItem('sound', 1);
}

//Generate random number
function getrand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Change color, according to values.
if (localStorage.getItem('sound') == 1) {
  $("#sound").css('color', 'green');
} else {
  $("#sound").css('color', 'red');
}

//Handel sound turn, on/off.
$("#sound").click(f => {
  f.preventDefault();
  var sP = localStorage.getItem('sound');
  if (sP == 1) {
    $("#sound").css('color', 'red');
    localStorage.setItem('sound', 0);
  } else {
    beep(540, 100);
    $("#sound").css('color', 'green');
    localStorage.setItem('sound', 1);
  }
});

//Default width of screen.
var width = $("#convas").width();
var height = $("#convas").height();

var bodyWidth = $(".body").width();
var bodyHeight = $("body").height();

console.log(bodyHeight);

//Get the ball size.
ballSize = parseInt($("#ball").css('width'), 10);
characterMarginLeft = 25;

//Default & Global vars
var x = 10, y = 230, zX = 15 , zY = 5;
speed = 50;
max_x = width - ballSize;
max_y = height - ballSize;
T = 0;
industry = '';
FIRST_MOVE = 0;

TREEAllowed = height;

//Get default dynamic timer, based on timer in init file.
$("#timer").text(Timer / 1000);
ONETREE = 0;
margin = '';
TreeBroken = 0;
TreePlanted = 0;
TreeRealBroken = 0;
FIRST = 0;
FirstIndustry = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Handle the click event on ball.
$("#ball").click(function(){
  if (FIRST == 0) {
    character_move_func();
  }
  //If sound on, then produce beep.
  if (localStorage.getItem('sound') == 1) {
    beep(540, 100);
  }
  if (ONETREE == 0) {
    margin = '';//"margin-bottm: "+speed+"px;";
    ONETREE = 1;
  } else {
    margin = '';//"margin-top: "+speed+"px;";
    ONETREE = 0;
  }

  //Broke the tree
  r = getrand(1, 3);
  //Plant three trees.
  for (i = 1; i <= 3; i++) {
    TreeTopPosition = getrand(1, bodyHeight) - 30;
    TreeLeftPosition = getrand(1, bodyWidth) - 100;
    TreePlanted += 1;
    id = "id='"+TreePlanted+"'";
    if (FIRST == 0 && TreePlanted == 1) {
      FIRST = 1;
      leftMargin = '';//'margin-left: 90px;';
    } else {
      leftMargin = '';
    }

    //margin-top: 190px;
    $('#TREES').prepend('<img class="tree" src="assets/img/tree.jpg"'+id+' style="margin-top:'+TreeTopPosition+'px;margin-left:'+TreeLeftPosition+';margin-bottom: 50px;">');
  }

  //Get 15% from ball size.
  fivePercent = (15 / ballSize) * 100;
  //Set the values.
  max_x += fivePercent;
  max_y += fivePercent;
  ballSize -= fivePercent;

  //Move the character

  /*if (TreePlanted >= TreeBroken) {
    character_move_func();
    $("#character").show();
  }*/
  //scores. 
  s = parseInt(localStorage.getItem('score')); 
  s += 3;
  localStorage.setItem('score', s); 
  $("#score").text(s); 
  $(this).css('width', ballSize+'px');

  //Handle the speed.
  zX = Math.abs(zX);
  zY = Math.abs(zY);
  zX += 5;
  zY += 5;
  speed -= 2;
  

});

async function character_move_func()
{
  if (FIRST_MOVE == 1) {
    characterMarginLeft += 80;
    offset = $("#"+TreeBroken).offset();
    left = offset.left;
    top = offset.top;


      CharacterTop = 600;

    if (TreePlanted >= 16) {
      CharacterTop = 800;
    }
    $("#theCharacter").append(' <div id="tree_hater" style="margin-top:-350px;margin-bottom: 50px;margin-left:'+left+'px;margin-top:'+(offset.top - CharacterTop)+'px;" class="convas"><img src="assets/img/character_stand.png" id="character" class="circle" style="">');
    //Note just for making top -600 to move character in position of tree planting posotion.
    } 
  character_move = window.setTimeout('character_move_func()', 3000);
  //Tree broken
    localStorage.setItem('TreeBroken', TreeBroken);
    TreeRealBroken++;
    $("#character").attr('src', 'assets/img/guy.gif');
    await sleep(1000);
    
    //If sound on, then produce beep.
    if (SOUNDONCUTS == true && localStorage.getItem('sound') == 1) {
      beep(300, 100);
    }
    $("#"+TreeBroken).attr('src','assets/img/tree-broken.png'); 
    $("#character").attr('src', 'assets/img/character_stand.png');
    s = parseInt(localStorage.getItem('score')); 
    if (s >= 1 ) {
      s -= 1;
      localStorage.setItem('score', s); 
    }
    TreeBroken +=1;
    $("#score").text(s);

    //Let stop and disapear when there is no trees found
    /*if (TreePlanted == TreeBroken) {
      clearInterval(character_move);
      $("#character").hide();
    }*/

  FIRST_MOVE = 1;

  $("#theCharacter").empty();
}

//Over the game.
function over()
{
  $("#TREES").remove();
  $("#theCharacter").remove();
  $(".board").remove();
  $("#timer").hide();
  $(".area").fadeOut();
  $("#score").fadeOut();
  $("#form").fadeIn();
  if (localStorage.getItem('score') == 0) {
    $(".zeroSecore").hide();
    $(".youLose").text(LOSETEXT);
  }
  $("#scores").text(localStorage.getItem('score'));
  localStorage.setItem('score', 0);
}

//Play the game.
function play()
{
  start();
}


function tree_hater()
{

}

/**
  * Industry
*/
function industryPlace()
{

  //Make insudtry decent looks..
  /*if (FirstIndustry = 0) {
    industryMargin = 'margin-top:30px';
    FirstIndustry = 1;
  } else {
    industryMargin = 'margin-top: 40px';
    FirstIndustry = 0;
  }

  $("#trees").append('<img class="tree" src="assets/img/factory.png" style="'+industryMargin+'">');
  industry = window.setTimeout('industryPlace()', 8000);*/
}

//Update the timer on screen.
function timer()
{
  var t = $("#timer").text();
  $("#timer").text(--t);
}


//Start the game.
function start() {

  x = x + zX;
  y = y + zY;
 $("#convas").css({
    'top' : y + 'px',
    'left': x + 'px',
  });


  //Handel movement.
  if ((x+zX > max_x) || (x+zX < 0))
    zX *=-1;
  if ((y+zY > max_y) || (y+zY < 0))
    zY *=-1;

  //Set the interval.
  var interval = window.setTimeout('start()',speed);
  
  T += speed;

  var treehater = window.setTimeout('tree_hater()',speed);

  if (Timer <= 7500 && Timer >= 7400 ) {
    
  }
  
  if (T >= 1000) {
    T = 0;
    timer();
  }
  Timer -= speed;
  //If time end, over game.
  if (Timer <= 0) {
    clearInterval(interval);
    clearInterval(treehater);
    clearInterval(industry);
    over();
  }
}

//Submit the form.
$("#submit").click(function(e) {
  const name = $("#name").val();
  //Name field should not be empty.
  if (name != '') {
    score = $("#scores").text();
    const scores = firebase.database().ref().child('scores');
    scores.child(Date.now()).set({
      name: name,
      score: score,
    });
    $(this).css('opacity', 0.5);
    $(this).hide();
    $("#name").hide();
    localStorage.setItem('score', 0);
 } else {
  $("#name").css('border','1px solid red');
 }
});


//Get the array size/length
FactSize = Facts.length;

//get random fact number
fact = getrand(0, FactSize - 1);

//get the random fact
randomFact = Facts[fact];

$("#fTitle").text(randomFact[1]);
$("#fP").text(randomFact[0]);
