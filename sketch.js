let table;
let factors = [];
let maxRows = 6000;

function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  createCanvas(900, 600);
  textFont("sans-serif");
  processData();
}

function draw() {
  background(10, 14, 24);
  drawTitle();
  drawMandala();
}

function processData() {
  let mapFactor = {};
  let rowCount = table.getRowCount();
  let step = max(1, floor(rowCount / maxRows));

  for (let r = 0; r < rowCount; r += step) {
    let factor = table.getString(r, "PRIMARY FACTOR");
    if (!factor) factor = "Unknown";
    let injury = int(table.get(r, "INJURY") || 0);
    let fatal = int(table.get(r, "FATALITY") || 0);
    let hitRun = int(table.get(r, "HIT AND RUN") || 0) > 0;
    let severity = 0;
    if (injury > 0) severity = 1;
    if (fatal > 0) severity = 2;
    if (!mapFactor[factor]) mapFactor[factor] = [];
    mapFactor[factor].push({ severity, hitRun });
  }

  for (let name in mapFactor) {
    factors.push({ name, crashes: mapFactor[name] });
  }

  factors.sort((a, b) => b.crashes.length - a.crashes.length);
  factors = factors.slice(0, 8);
}

function drawTitle() {
  fill(240);
  noStroke();
  textSize(26);
  textAlign(CENTER, TOP);
  text("Crash Mandala", width / 2, 20);
}

function drawMandala() {
  if (factors.length === 0) return;
  let cx = width / 2;
  let cy = height / 2 + 20;
  let innerR = 40;
  let outerR = min(width, height) * 0.42;
  let ringCount = factors.length;

  for (let i = 0; i < ringCount; i++) {
    let f = factors[i];
    let radius = map(i, 0, ringCount - 1, innerR, outerR);
    stroke(60, 80, 120, 70);
    strokeWeight(1);
    noFill();
    ellipse(cx, cy, radius * 2, radius * 2);

    let n = f.crashes.length;
    noStroke();
    for (let j = 0; j < n; j++) {
      let c = f.crashes[j];
      let a = TWO_PI * (j / n);
      let x = cx + cos(a) * radius;
      let y = cy + sin(a) * radius;

      if (c.severity === 0) fill(120, 200, 255);
      else if (c.severity === 1) fill(255, 220, 120);
      else fill(255, 90, 90);

      let s = 4 + c.severity;
      ellipse(x, y, s, s);

      if (c.hitRun) {
        noFill();
        stroke(255, 100, 220);
        strokeWeight(1);
        ellipse(x, y, s + 3, s + 3);
        noStroke();
      }
    }
  }
}
