//arrays of
var Teachers=Array();
var Rooms=Array();
var Subjects=Array();
var Blocks=Array();
var goodBlocks=Array();
var population=Array();
var SubjectClone =Array();
  

//Object Teacher
function teacher(name,pref,topics){
if (topics === undefined) {
          alert("undefinido");
    }
  this.name = name;
  this.pref = pref;
  this.topics=topics;
  this.getInfo= function () {
        return this.name + ' '+ this.topic +' '+ this.pref + '.';
    }
}

//Object Room
function room(num, place, access, type, cap){
  this.num=num;
  this.place=place;
  this.access=access;
  this.type= type;
  this.cap=cap;
}

//Object Subject
function subject(name,students,need,doubleBlock){
  this.name=name;
  this.students=students;
  this.need=need;
  this.doubleBlock=doubleBlock;
}

//Object Block
function block(subjectName,subjectCapacity,subjectNeed,subjectDoubleBlock,teacherName,teacherTopics,teacherPref,roomNum,roomPlace,roomAccess,roomType,roomCap){
  this.subjectName=subjectName;
  this.subjectCapacity=subjectCapacity;
  this.subjectNeed=subjectNeed;
  this.subjectDoubleBlock=subjectDoubleBlock;
  this.teacherName=teacherName;
  this.teacherTopics=teacherTopics;
  this.teacherPref=teacherPref;
  this.roomNum=roomNum;
  this.roomPlace=roomPlace;
  this.roomAccess=roomAccess;
  this.roomType=roomType;
  this.roomCap=roomCap;
  this.hour;
  this.day;
  this.fitness;
  this.coord;
}

//Object TimeTable
function timeTable(goodBlock){
  this.data = goodBlock;
  this.fitness;
}

//This function returns the unique values of an array, it does not modify the original
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//Put every digit of a number in an array
function digitArray(coordinate){
  this.coordinate=coordinate;
  return (coordinate).toString().split("").map(function(t){return parseInt(t)});
}
//Remove duplicates in an Array based on a key
function removeDuplicatesBy(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(x) {
    var key = keyFn(x), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

//Returns minimum value on an array
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

//Returns maximum value on an array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

//Creates an array full of coordinates
function createCoordArray(){
  let coords=Array();
    for(j=1;j<=8;j++){
      for(k=1;k<=6;k++){
        coords.push(parseInt(""+j+k));
      }
    }
  //console.log(coords.toString());
  return coords;
}

//Returns a random coordinate
function createCoordinate(){
  let coords=createCoordArray();
  let rCoord=Math.floor(Math.random() *coords.length);
  return coords[rCoord];
}

//Generates a random day of the week
function dayGenerator(){
  var week=["monday","tuesday", "wednesday", "thursday", "friday", "saturday"];
  var rday= Math.floor(Math.random() * week.length);
  return week[rday];
}

//Generates a random hour
function hourGenerator(){
  var rhour = Math.floor((Math.random() * 14)+6);
  if (rhour%2===1){
    rhour++;
  }
  return rhour;
}


function coordToHour(x){
  return (2*x)+4;
}
function coordToDay(y){
  switch(y){
    case 1:
      return 'monday';
    case 2:
      return 'tuesday';
    case 3:
      return 'wednesday';
    case 4:
      return 'thursday';
    case 5:
      return 'friday';
    case 6:
      return 'saturday';
    default:
     return null;
  }
}

function hourToPref(hour){
  if(hour<12){
    return "morning";
  }
  else if(hour<18){
    return "afternoon";
  }
  else {
    return "night";
  }
}

//creates a timetable
function createTimeTable(){
  fillInfo();
  while(goodBlocks.length<12){
      blockCreate();
  };
  //alert(goodBlocks.length);
  assignCoord();
  
  var newtimetable = new timeTable(goodBlocks);
  goodBlocks=[];
  population.push(newtimetable);
  //alert(newtimetable.data.length);
}


function blockCreate(){ //fills block with random possibilities
  var rTeacher= Math.floor(Math.random() * Teachers.length); //random array position
  var posTeacher = Teachers[rTeacher].name; //get the name of the winner
  var posTopics = Teachers[rTeacher].topics; //get topics of the winner
  var posPref = Teachers[rTeacher].pref; //get preferences of the winner
  
  var rRoom= Math.floor(Math.random() * Rooms.length); //random array position
  var posRoom = Rooms[rRoom].num; //get the number of the winner
  var posPlace = Rooms[rRoom].place; //get the place of the winner
  var posAccess = Rooms[rRoom].access; //get the accesibility of the winner
  var posType = Rooms[rRoom].type; //get the type of the winner
  var posCap = Rooms[rRoom].cap; //get the capacity of the winner
  
  var rSubject= Math.floor(Math.random() * Subjects.length); //random array position
  //alert(subjectClone.length);
  var posSubject = Subjects[rSubject].name; //get the name of the winner
  var posCapacity = Subjects[rSubject].students; //get the number of students of the winner
  var posNeed = Subjects[rSubject].need; //get the needs of the winner
  var posDoubleBlock = Subjects[rSubject].doubleBlock; //get info about length of subject
  
  
  var newBlock1 =new block(posSubject,posCapacity,posNeed,posDoubleBlock,posTeacher,posTopics,posPref,posRoom,posPlace,posAccess,posType,posCap);
  var newBlock2 =new block(posSubject,posCapacity,posNeed,posDoubleBlock,posTeacher,posTopics,posPref,posRoom,posPlace,posAccess,posType,posCap);
  if(fitnessBlock(newBlock1) ==1){
    Subjects.splice(findWithAttr(Subjects,'name',posSubject),1);
  }
  fitnessBlock(newBlock2);
  //alert(Subjects.length);
  //Blocks=removeDuplicatesBy(x => x.coord, Blocks);
  newBlock1 = 0;
  newBlock2 = 0;
  //document.getElementById("last_block").innerHTML = "equis";
}

function fillInfo(){
Teachers=[];
Rooms=[];
Subjects=[];
SubjectClone=[];
var topics=["Logica matematica","Ingles I"];
var topics2=["Introduccion al desarrollo de software", "Sistemas de informacion y herramientas", "Introduccion al area profesional"];
var topics3=["Introduccion al area profesional","Introduccion al desarrollo de software"];
var topics4=["Ingles I", "Lengua materna","Introduccion al area profesional"];
var teacher1 = new teacher("Adolfo Gonzales","night",topics);
var teacher2 = new teacher("Gildardo Rigoberto", "afternoon", topics2);
var teacher3 = new teacher("Gumersindo Alvarez","morning",topics3);
var teacher4 = new teacher("Abelardo Burdeles", "morning",topics4);
Teachers.push(teacher1,teacher2,teacher3,teacher4);

var room1 = new room (101,13,"yes","lab",40);
var room2 = new room (206,7,"no","computer",22);
var room3 = new room (108,7,"no","room",45);
var room4 = new room (402,9,"no","room",28);
var room5 = new room (208,8,"yes","computer",35);
var room6 = new room (102,8,"yes","lab", 70);
var room7 = new room (203,1,"yes","lab",20);
Rooms.push(room1, room2, room3,room4,room5,room6);

var subj1 = new subject("Sistemas de informacion y herramientas",5,"room", "no");
var subj2 = new subject("Logica matematica",12,"room","no");
var subj3 = new subject("Lengua materna", 5,"room","no");
var subj4 = new subject("Introduccion al desarrollo de software", 3,"computer","yes");
var subj5 = new subject("Introduccion al area profesional",20,"lab","no");
var subj6 = new subject("Ingles I",15,"room","yes");
Subjects.push(subj1,subj2,subj3,subj4,subj5,subj6);
SubjectClone.push(subj1,subj2,subj3,subj4,subj5,subj6);
}

function fitnessBlock(Block){
    let score=0;
    //alert(Block.roomType == Block.subjectNeed);
    if (Block.subjectCapacity <= Block.roomCap){
      score++;
    }
    if (Block.roomType == Block.subjectNeed){
      score++;
    }
    for (j=0;j<Block.teacherTopics.length;j++){
      if (Block.teacherTopics[j] == Block.subjectName){
        score++;
      }
    }
    if(score == 3){
      
      Block.fitness=score;
      goodBlocks.push(Block);
      //alert("Goodblocks: "+goodBlocks.length);
      return 1;
    }
}

function assignCoord(){
  let coords= [];
  coords=createCoordArray();
  let rCoord=0;
  var coordinate=0;
  for(let i=0;i<goodBlocks.length;i++){
    rCoord=Math.floor(Math.random() *coords.length);
    coordinate=coords[rCoord];
    goodBlocks[i].coord = coordinate;
    //alert(goodBlocks[i].coord+"  "+i);
    let separatedCoord=digitArray(coordinate);
    goodBlocks[i].day=coordToDay(separatedCoord[1]);
    goodBlocks[i].hour=coordToHour(separatedCoord[0]);
    coords.splice(rCoord,1);
  }
  let str="";
  for(let i=0;i<goodBlocks.length;i++){
    str=str+goodBlocks[i].coord+"  ";
  }
  //alert(str);
}



//gives score if the subject appears two times
function checkSubjectTwoTimes(data,subjects){
  let score = 0;
  for (j=0;j<subjects.length;j++){
    let subjTimes = 0;
    for (k=0;k<data.length;k++){
      if (subjects[j] == data[k].subjectName){
        subjTimes++;
      }
    }
    if(subjTimes==2){
      score+= 10;
    }else{
      score--;
    }
  }
  console.log("Subjects appear two times: "+score);
  return score;
}

//check if a subject is on double block
function checkDoubleBlock(data){
  let score=0;
  for (j=0;j<data.length;j++){
    if (data[j].subjectDoubleBlock == "yes"){
      let subjName = data[j].subjectName;
      let subDay = data[j].day;
      let subHour = data[j].hour;
      let subTeacher = data[j].teacherName;
      let subPlace = data[j].roomPlace;
      let subRoom = data[j].roomNum;
      for (k=0;k<data.length;k++){
        if(data[k].subjectName == subjName){
          if (data[k].day == subDay){
            if(data[k].hour == (subHour +2)){
              if(data[k].teacherName == subTeacher){
                score+= 2;
                console.log("Blocks with same teacher: "+score);
                if(data[k].roomPlace == subPlace){
                  if(data[k].roomNum == subRoom){
                    score+= 8;
                    console.log("Perfect Blocks: "+(score-1));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.log("DoubleBlock score: "+score);
  return score;
}

//checks if a subject has only one teacher
function checkTeacherOnSubject(data,subjects){
  let score=0;
  for (j=0;j<subjects.length;j++){
    let teachersperSubj = Array();
    for (k=0;k<data.length;k++){
      if(subjects[j]==data[k].subjectName){
        teachersperSubj.push(data[k].teacherName);
      }
    }
    if(teachersperSubj.unique().length == 1){
      score+= 10;
    }else{
      score--;
    }
  }
  console.log("Subjects with only one teacher: "+score);
  return score;
}

//checks if lunch block is empty
function checkLunchTime(data){
  let score=0;
  let twelve = 0;
  for (j=0;j<data.length;j++){
    if(data[j].hour == 12){
      twelve++;
    }
  }
  if(twelve == 0){
    score++;
  }
  console.log("Lunchtime free: "+score);
  return score;
}

//checks if there are more than one subject per day
function checkNonSingleDays(data,days){
  let score=0;
  let hoursByDay = Array();
  for (j=0;j<days.length;j++){
    hoursByDay=[];
    for (k=0;k<data.length;k++){
        if(days[j] == data[k].day){
          hoursByDay.push(data[k].hour);
        }
    }
    if(hoursByDay.length >1){
      score++;
    }else{
      score--;
    }
  }
  console.log("Days with more than one subject: "+score);
  return score;
}

//checks if subjects on the same day are consecutive
function checkConsecutives(data,days){
  let score=0;
  for (j=0;j<days.length;j++){
    hoursByDay=[];
    for (k=0;k<data.length;k++){
      if(days[j] == data[k].day){
        hoursByDay.push(data[k].hour);
      }
    }
    hoursByDay.sort(function(a, b){return a-b});
    for (k=0;k<hoursByDay.length;k++){
      if(hoursByDay[k]+2 == hoursByDay[k+1]){
        score++;
      }
    }
  }
  console.log("Total consecutive score: "+score);
  return score;
}

//checks if the rooms on the same day are close
function checkRoomsAreClose(data,days){
  let buildings = Array();
  let score=0;
  for (j=0;j<days.length;j++){
    buildings=[];
    for (k=0;k<data.length;k++){
      if(days[j] == data[k].day){
        buildings.push(data[k].roomPlace);
      }
    }
    for(k=0;k<buildings.length;k++){
      if(buildings[k]+1 == buildings[k+1] || buildings[k] == buildings[k+1] || buildings[k]-1 == buildings[k+1]){
        score++;
      }else{
        //score--;
      }
    }
  //console
  }
  console.log("Total Rooms score: "+score);
  return score;
}

//checks if teacher preferences are respected
function checkTeacherPref(data,teachers){
  let score=0;
  for(let i=0;i<teachers.length;i++){
    for(let j=0;j<data.length;j++){
      if(teachers[i]==data[j].teacherName){
        if(hourToPref(data[j].hour)===data[j].teacherPref){
          score+=2;
        }
      }
    }
  }
  console.log("Total teachers' preferences score: "+ score)
  return score;
}

//checks if there's no class on saturday after 4pm
function checkOnSaturday(data){
  let score=0;
  let forbidden = [66,76,86];
  let usedCoords = data.map(a => a.coord);
  for(let i=0;i<usedCoords.length;i++){
    if(!(forbidden.includes(usedCoords[i]))){
      score+=5;
    }
  }
  console.log("Total Saturday late-hours score: "+score);
  return score;
}

function calcFitness(data){
  this.data=data;
  var subjects = Array();
  var days = Array();
  var teachers = Array();
  var score = 0;
  subjects = data.map(a => a.subjectName).unique();
  days = data.map(a => a.day).unique();
  teachers = data.map(a => a.teacherName).unique();
  console.log("Subject On Display: "+data.length);
  if(data.length<12){
   // alert("alerta");
  }
  score += checkSubjectTwoTimes(data,subjects);
  score += checkDoubleBlock(data);
  score+=checkTeacherOnSubject(data,subjects);
  score+=checkLunchTime(data);
  score+=checkNonSingleDays(data,days);
  score+=checkConsecutives(data,days);
  score+=checkRoomsAreClose(data,days);
  score+=checkTeacherPref(data,teachers);
  score+=checkOnSaturday(data);
  console.log("Total score of the schedule: "+score);
  console.log("///////////////////////////////////////////////");
  return score;
}

function emptyTable(){ //Takes all the blocks in the array to the HTML template
  let emptyCoords=createCoordArray();
  for (i=0; i<emptyCoords.length;i++){
     document.getElementById(emptyCoords[i]).innerHTML = "";
  }
}

/*
document.getElementById(population[0].data[i].coord).innerHTML = population[0].data[i].subjectName + '<br>' + population[0].data[i].teacherName + '<br>' + population[0].data[i].roomPlace + "-" + population[0].data[i].roomNum;
    //document.getElementById("demo").innerHTML = "score: " + population[0].data[i].coord;
    */


//How to fill a timetable ex.
/*function myFunction() {
	var mate = ['2323','kjfhks3','hdidh'];
    var rand = Math.floor((Math.random() * mate.length));
    document.getElementById("demo").innerHTML = 'El resultado es: <b>' + mate[rand] + '</b><br><i> N&uacute;mero aleatorio generado fue: <b>' +rand+'</b></i>';
    var y = Math.floor((Math.random() * 6)+1);
    var x = Math.floor((Math.random() * 3)+1);
    var coord = x.toString() + y.toString();
    document.getElementById(coord).innerHTML = mate[rand];
}*/