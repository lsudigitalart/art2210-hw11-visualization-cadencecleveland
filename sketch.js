let crashData;


let clearCount = 0;
let cloudyCount = 0;
let rainCount = 0;
let otherCount = 0;

function preload() {

  crashData = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(700, 500);

  let rows = crashData.getRowCount();

 
  for (let i = 0; i < rows; i++) {
    let weather = crashData.getString(i, "WEATHER CONDITION");

    if (!weather) {
      otherCount++;
    } else if (weather == "Clear") {
      clearCount++;
    } else if (weather == "Cloudy") {
      cloudyCount++;
    } else if (weather == "Rain") {
      rainCount++;
    } else {
      otherCount++;
    }
  }
}

function draw() {
  background(240);

  // Title
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text("Crashes by Weather Condition", width / 2, 40);

 
  let labels = ["Clear", "Cloudy", "Rain", "Other"];
  let counts = [clearCount, cloudyCount, rainCount, otherCount];

 
  let maxCount = max(counts);


  let marginLeft = 80;
  let marginRight = 80;
  let marginTop = 80;
  let marginBottom = 80;

  let chartWidth = width - marginLeft - marginRight;
  let chartHeight = height - marginTop - marginBottom;

  let barWidth = chartWidth / counts.length;

 
  stroke(0);
  line(marginLeft, height - marginBottom, width - marginRight, height - marginBottom);
  noStroke();

 
  for (let i = 0; i < counts.length; i++) {
    let value = counts[i];

   
    let barHeight = map(value, 0, maxCount, 0, chartHeight);

    let x = marginLeft + i * barWidth;
    let y = height - marginBottom - barHeight;

    
    if (i == 0) fill(100, 200, 255);      
    else if (i == 1) fill(160, 160, 220); 
    else if (i == 2) fill(80, 120, 255);  
    else fill(220, 140, 160);             

    
    rect(x + 10, y, barWidth - 20, barHeight);

    
    fill(0);
    textSize(14);
    text(labels[i], x + barWidth / 2, height - marginBottom + 20);

    
    text(value, x + barWidth / 2, y - 10);
  }

  
  push();
  translate(30, height / 2);
  rotate(-HALF_PI);
  textAlign(CENTER);
  text("Number of Crashes", 0, 0);
  pop();
}
