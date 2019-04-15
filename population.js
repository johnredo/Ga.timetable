
let totalPopulation = 50;
let mutationRatio = 0.2;
let matingPool = Array();
let maxFitness = 0;
let maxFitnessGeneration;
let totalAverage=0;



function getAllIndexesByName(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i].subjectName === val)
            indexes.push(i);
    return indexes;
}
function getAllIndexesByCoord(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i].coord === val)
            indexes.push(i);
    return indexes;
}

//Calls a function n times
var timesFunction = function(callback) {
  if (typeof callback !== "function" ) {
    throw new TypeError("Callback is not a function");
  } else if( isNaN(parseInt(Number(this.valueOf()))) ) {
    throw new TypeError("Object is not a valid number");
  }
  for (var i = 0; i < Number(this.valueOf()); i++) {
    callback(i);
  }
};
Number.prototype.times = timesFunction;

totalPopulation.times( (i) => createTimeTable() );
totalPopulation.times( (i) => population[i].fitness=calcFitness(population[i].data) );

//gets the fitness of x object
function getFitness(position){
  return population[position].fitness;
}

//gets average fitness
function averageFitness(){
  var pile=0;
  for(let i=0;i<population.length;i++){
    pile+=getFitness(i);
  }
  return (pile/population.length);
}

//push an object into the Mating pool n times where n is the fitness
function fillMatingPool(){
  matingPool=[];
  for(let i=0;i<totalPopulation;i++){
    let fillTimes = getFitness(i);
    if(fillTimes>1){
      fillTimes.times( (j) => matingPool.push(population[i]));
    }else{
      matingPool.push(population[i]);
    }
  }
}

console.log(matingPool.length);

//Returns the index of the timetable with the maximum fitness score
function getIndexMax(){
  let maxFitness = Math.max.apply(Math, population.map(function(o) {return o.fitness}));
  var indexMax = population.map(function(e) {return e.fitness;}).indexOf(maxFitness);
  return indexMax;
}

//gets the most fittable object
function getSurvivor(){
  return population[getIndexMax()].data;
}

//Returns a random timetable from the matingPool based on probability
function getPartner(){
  let r = Math.floor(Math.random() *(matingPool.length -1));
  let partner = matingPool[r];
  //alert(partner+" ////// "+r+" ////// "+matingPool.length);
  return partner;
}

//Compares and return the longest between to arrays
function getLongest(a,b){
  return a>b ? "a":"b";
}

//Takes two parents and cross them
function crossover(){
  var child = Array();
  let partnerA = Array();
  let partnerB = Array();
  let couple= Array();
  let coordSubj=Array();
  let array=Array();
  array=[];
  child=[];
  couple=[];
  //partnerA.data.sort(function(a,b) {return (a.coord > b.coord) ? 1 : ((b.coord > a.coord) ? -1 : 0);} );
  //partnerB.data.sort(function(a,b) {return (a.coord > b.coord) ? 1 : ((b.coord > a.coord) ? -1 : 0);} );
  partnerA=getPartner();
  partnerB=getPartner();
  for(let i=0;i<SubjectClone.length;i++){
    coordSubj=[];
    let cont=0;
    let coordsA=getAllIndexesByName(partnerA.data,SubjectClone[i].name);
    let coordsB=getAllIndexesByName(partnerB.data,SubjectClone[i].name);
    console.log("A: "+coordsA.toString());
    console.log("B: "+coordsB.toString());
    for(let j=0;j<coordsA.length;j++){
      coordSubj.push(partnerA.data[coordsA[j]]);
    }
    for(let y=0;y<coordsB.length;y++){
      coordSubj.push(partnerB.data[coordsB[y]]);
    }
    uniCoordSubj=coordSubj.map(f => f.coord);
    for(let k=0;k<uniCoordSubj.length;k++){
      console.log("k :"+k);
      uniCoords=child.map(e => e.coord);
      //alert(uniCoords.join());
      if(!((uniCoords).includes(uniCoordSubj[k])) && cont<2){
        child.push(coordSubj[k]);
        //debugger;
        cont++;
      }
    }
      
    //alert((child.map(e => e.coord)).includes(coordSubj[k].coord) +" "+k);
  }
  //debugger;
  mutate(child,mutationRatio);
  //debugger;
  //alert(child.join());
  return child;
  //.filter((set=> f => !set.has(f.coord) && set.add(f.coord))(new Set));
  //alert(Test.map(function(obj){return obj.coord;}).join(", "));
  //alert(partnerA.concat(partnerB).unique());
}
//Creates a whole new generation
function newGeneration(){
  fillMatingPool();
  //population[0].data=getSurvivor();
  for(let i=0;i<population.length;i++){
    let newBorn=crossover();
    console.log(population[i].data);
    population[i].data=newBorn;
    population[i].fitness=calcFitness(newBorn);
    console.log(population[i].data);
  }
  console.log(matingPool.length);
}

//Fills the linechart canvas with data and style
createChart = function(){
  const CHART = document.getElementById("lineChart");
  var lineChart = new Chart(CHART, {
  type: 'line',
  data: {
    responsive: false,
    maintainAspectRatio: true,
    datasets: [
        {
            label: "Fitness",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(107, 91, 149, 0.8)",
            borderColor: "rgba(107, 91, 149, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(107, 91, 149, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(107, 91, 149, 0.3)",
            pointHoverBorderColor: "rgba(107, 91, 149, 0.3)",
            pointHoverBorderWidth: 2,
            pointRadius: 2.5,
            pointHitRadius: 10,
            data: [],
        },
        {
          label: "Average",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(245, 0, 0, 0.4)",
          borderColor: "rgba(245, 0, 0, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(245, 0, 0, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(245, 0, 0, 0.3)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 2.5,
          pointHitRadius: 10,
          data: [],
        }
      ]
    }
  });
  adddata = function (fitness, iteration,dataset){
    lineChart.data.datasets[dataset].data[iteration] = fitness;
    lineChart.data.labels[iteration] = "Generation #"+iteration;
    lineChart.update();
  }
}
 
//Variable that store the current generation
let generation=0;
//This function will be executed at soon as the page loads
function setup(){
  //canvas = createCanvas(400, 250);
  display1=createP();
  display2=createP();
  display3=createP();
  display4=createP();
  display5=createP();
  //display6=createP();
  display1.position(1100,0);
  display2.position(1100,20);
  display3.position(1100,40);
  display4.position(1100,60);
  display5.position(1100,80);
  //display6.position(1100,100);
  createChart();
}

//This function will iterate until noFill() is called
function draw(){
  emptyTable();
  if(population[getIndexMax()].fitness > maxFitness){
    maxFitness = population[getIndexMax()].fitness;
    maxFitnessGeneration = generation;
  }
  
  for (i=0; i<population[getIndexMax()].data.length;i++){
    document.getElementById(population[getIndexMax()].data[i].coord).innerHTML = population[getIndexMax()].data[i].subjectName + '<br>' + population[getIndexMax()].data[i].teacherName + '<br>' + population[getIndexMax()].data[i].roomPlace + "-" + population[getIndexMax()].data[i].roomNum;
  }
  totalAverage=(totalAverage + averageFitness());
  display1.html("Actual generation: " + generation);
  display2.html("Highest fitness score: " + maxFitness + " at generation # " + maxFitnessGeneration);
  display3.html("Actual fitness value: " + population[getIndexMax()].fitness);
  display4.html("Pool length: " + matingPool.length);
  display5.html("Average fitness on current generation: "+ averageFitness());
  //display6.html("Average: "+totalAverage);
  adddata(population[getIndexMax()].fitness ,generation, 0);
  adddata(averageFitness() ,generation, 1);
  newGeneration();
  if (/*population[getIndexMax()].fitness >= 200*/generation==25) noLoop();
  generation++;
}
