
function mutate(data,ratio){
  let allCoords=Array();
  let days=Array();
  let teachers=Array();
  for(let i=0;i<3;i++){
    allCoords = data.map(a => a.coord);
    days = data.map(a => a.day).unique();
    teachers = data.map(a => a.teacherName).unique();
    switch(i){
      case 0: mutateBlockUp(data,allCoords);
      break;
      case 1: mutateLunch(data,allCoords);
      break;
      case 2: mutateDoubleBlock(data);
      break;
    }
  }
  allCoords = data.map(a => a.coord);
  days = data.map(a => a.day).unique();
  teachers = data.map(a => a.teacherName).unique();
    let rand = Math.floor(Math.random() *2);
    switch(rand){
      case 0:
        mutateNonSingleDay(data,days,allCoords);
      break;
      case 1:
        mutateOnSaturday(data,allCoords);
      break;
    }
  /*
  mutateDoubleBlock(data);
  mutateLunch(data,allCoords);
  mutateNonSingleDay(data,days,allCoords);
  mutateOnSaturday(data,allCoords);
  mutateBlockUp(data,allCoords);
  */
  /*if(Math.random()<ratio){
    mutateDoubleBlock(data);
  }
  if(Math.random()<ratio){
    mutateLunch(data,allCoords);
  }
  if(Math.random()<ratio){
   mutateNonSingleDay(data,days,allCoords);
  }
  if(Math.random()<ratio){
   mutateSubjectToPref(data,teachers,allCoords);
  }
  if(Math.random()<ratio){
   mutateOnSaturday(data,allCoords);
  }
  if(Math.random()<ratio){
   mutateBlockUp(data,allCoords);
  }*/
}
//Makes equal teachers on a double block
function mutateDoubleBlock(data){
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
              if(data[k].teacherName != subTeacher){
                data[j].teacherName=data[k].teacherName;
              }
            }
          }
        }
      }
    }
  }
}

//Moves all blocks from lunch time
function mutateLunch(data,allCoords){
  for (let i=0;i<data.length;i++){
    if(between(data[i].coord,40,46)){
      if (!(allCoords.includes(data[i].coord -10))){
        data[i].coord-=10;
        data[i].hour = coordToHour(digitArray(data[i].coord)[1]);
      }
      else if (!(allCoords.includes(data[i].coord +10))){
        data[i].coord+=10;
        data[i].hour = coordToHour(digitArray(data[i].coord)[1]);
      }
    }
  }
}

//Moves a block alone on a single day to another day
function mutateNonSingleDay(data,days,allCoords){
  let hoursByDay = Array();
  let coordinate;
  for (let j=0;j<days.length;j++){
    hoursByDay=[];
    for (k=0;k<data.length;k++){
        if(days[j] == data[k].day){
          hoursByDay.push(data[k].hour);
        }
    }
    if(hoursByDay.length==1){
      do{
        coordinate=createCoordinate();
      }while(allCoords.includes(coordinate));
      data[j].coord=coordinate;
      data[j].day=coordToDay(digitArray(data[j].coord)[1]);
      data[j].hour=coordToHour(digitArray(data[j].coord)[0]);
    }
  }
}

//Moves a block to a teacher prefered time
function mutateSubjectToPref(data,teachers,allCoords){
  let rPos = Math.floor(Math.random()* allCoords.length);
  let rHour = data[rPos].hour;
  let coordinate;
  if(hourToPref(rHour) != data[rPos].teacherPref){
    do{
        coordinate=createCoordinate();
      }while(allCoords.includes(coordinate));
    data[rPos].coord=coordinate;
    data[rPos].day=coordToDay(digitArray(data[rPos].coord)[1]);
    data[rPos].hour=coordToHour(digitArray(data[rPos].coord)[0]);
  }
  //alert(hourToPref(rHour) != data[rPos].teacherPref);
}

//Moves a block from Saturday late-hours
function mutateOnSaturday(data,allCoords){
  let coordinate;
  let forbidden = [66,76,86];
  let usedCoords = allCoords;
  for(let i=0;i<usedCoords.length;i++){
    if(forbidden.includes(usedCoords[i])){
      do{
        coordinate=createCoordinate();
      }while(allCoords.includes(coordinate));
    data[i].coord=coordinate;
    data[i].day=coordToDay(digitArray(data[i].coord)[1]);
    data[i].hour=coordToHour(digitArray(data[i].coord)[0]);
    }
  }
}

//Moves a block two hours earlier
function mutateBlockUp(data,allCoords){
  let upper=[11,12,13,14,15,16];
  let rPos = Math.floor(Math.random()* allCoords.length);
  let rCoord = data[rPos].coord;
  if(!(upper.includes(rCoord))){
    if(!(allCoords.includes(rCoord-10))){
      data[rPos].coord-=10;
      data[rPos].day=coordToDay(digitArray(data[rPos].coord)[1]);
      data[rPos].hour=coordToHour(digitArray(data[rPos].coord)[0]);
    }
  }
}

function between(x, min,max){
  return x >= min && x <= max;
}