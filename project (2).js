const width = 125;
const height = 125;
const t = new bt.Turtle();

setDocDimensions(width, height);


const finalLines = [];


// the channels but broken for now
const displayMode = 2; // Set to 1, 2, or 3


const createStaticLines = (x, y, w, h, numLines) => {
  const lines = [];
  for (let i = 0; i < numLines; i++) {
    const x1 = x + Math.floor(Math.random() * w);
    const y1 = y + Math.floor(Math.random() * h);
    const angle = Math.random() * 2 * Math.PI;
    const length = Math.random() * 5 + 1; 
    const x2 = x1 + Math.cos(angle) * length;
    const y2 = y1 + Math.sin(angle) * length;
    lines.push([[x1, y1], [x2, y2]]);
  }
  return lines;
};


const createStickmanScene = (x, y, w, h) => {
  const lines = [];
  const fillColors = [];


  const hillHeight = h / 2;
  lines.push([[x, y + h - hillHeight], [x + w, y + h]]);
  fillColors.push("green");


  const boulderRadius = 10;
  const boulderCenterX = x + w / 2;
  const boulderCenterY = y + h - hillHeight / 2;
  const boulderPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const x1 = boulderCenterX + boulderRadius * Math.cos(angle);
    const y1 = boulderCenterY + boulderRadius * Math.sin(angle);
    boulderPoints.push([x1, y1]);
  }
  lines.push(boulderPoints);
  fillColors.push("gray");


  const stickmanX = x + w / 2 - 15;
  const stickmanY = y + h - hillHeight / 2;


  const headRadius = 5;
  const headPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const x1 = stickmanX + headRadius * Math.cos(angle);
    const y1 = stickmanY - headRadius + headRadius * Math.sin(angle);
    headPoints.push([x1, y1]);
  }
  lines.push(headPoints);
  fillColors.push("black");


  lines.push([[stickmanX, stickmanY - headRadius], [stickmanX, stickmanY - 15 - headRadius]]);


  lines.push([[stickmanX, stickmanY - 10 - headRadius], [stickmanX + 10, stickmanY - 15 - headRadius]]);
  lines.push([[stickmanX, stickmanY - 10 - headRadius], [stickmanX - 10, stickmanY - 15 - headRadius]]);


  lines.push([[stickmanX, stickmanY - 15 - headRadius], [stickmanX + 10, stickmanY - 25 - headRadius]]);
  lines.push([[stickmanX, stickmanY - 15 - headRadius], [stickmanX - 10, stickmanY - 25 - headRadius]]);

  return { lines, fillColors };
};


const createRandomDots = (x, y, w, h, numDots) => {
  const dots = [];
  for (let i = 0; i < numDots; i++) {
    const dotX = x + Math.floor(Math.random() * w);
    const dotY = y + Math.floor(Math.random() * h);
    dots.push([[dotX, dotY], [dotX, dotY]]);
  }
  return dots;
};


const innerX = 32;
const innerY = 32;
const innerWidth = width - 55;
const innerHeight = height - 60;
const numberOfLines = 100; 
const numberOfDots = 50;

const fillColors = [];

if (displayMode === 1) {
  
  const staticLines = createStaticLines(innerX, innerY, innerWidth, innerHeight, numberOfLines);
  staticLines.forEach(line => finalLines.push(line));
} else if (displayMode === 2) {
 
  const { lines: stickmanSceneLines, fillColors: sceneColors } = createStickmanScene(innerX, innerY, innerWidth, innerHeight);
  stickmanSceneLines.forEach(line => finalLines.push(line));
  sceneColors.forEach(color => fillColors.push(color));
} else if (displayMode === 3) {

  const randomDots = createRandomDots(innerX, innerY, innerWidth, innerHeight, numberOfDots);
  randomDots.forEach(dot => finalLines.push(dot));
}

finalLines.forEach((line, index) => {
  drawLines([line], { fill: fillColors[index] || "black" });
});

//tv
const RoundedRectangle = (x, y, w, h, cornerRadius) => {
  const points = [];

  points.push([x + cornerRadius, y]);

  points.push([x + w - cornerRadius, y]);

  points.push(...Corners(x + w - cornerRadius, y + cornerRadius, 1.5 * Math.PI, 2 * Math.PI, cornerRadius));

  points.push([x + w, y + h - cornerRadius]);

  points.push(...Corners(x + w - cornerRadius, y + h - cornerRadius, 0, 0.5 * Math.PI, cornerRadius));

  points.push([x + cornerRadius, y + h]);

  points.push(...Corners(x + cornerRadius, y + h - cornerRadius, 0.5 * Math.PI, Math.PI, cornerRadius));

  points.push([x, y + cornerRadius]);

  points.push(...Corners(x + cornerRadius, y + cornerRadius, Math.PI, 1.5 * Math.PI, cornerRadius));

  return points;
};

const Corners = (cx, cy, startAngle, endAngle, radius) => {
  const points = [];
  const segments = 10;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + (i / segments) * (endAngle - startAngle);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
};

const outerCornerRadius = 12;
const outerRectPoints = RoundedRectangle(20, 20, width - 24, height - 40, outerCornerRadius);

const innerCornerRadius = 6;
const innerRectPoints = RoundedRectangle(32, 32, width - 55, height - 60, innerCornerRadius);


finalLines.push(outerRectPoints);

finalLines.push(innerRectPoints);

const createCircle = (cx, cy, radius) => {
  const points = [];
  const segments = 20;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
};

const dial1 = createCircle(110, 80, 6);
const dial2 = createCircle(110, 55, 6);

finalLines.push(dial1);
finalLines.push(dial2);

const Antenna1 = (x1, y1, x2, y2) => {
  const points = [
    [x1, y1],
    [x2, y2]
  ];
  return points;
};

const Antenna2 = (x1, y1, x2, y2) => {
  const points = [
    [x1, y1],
    [x2, y2]
  ];
  return points;
};

const AntennaPoints1 = Antenna1(47, 120, 68, 105); 
const AntennaPoints2 = Antenna2(79, 120, 68, 105); 

finalLines.push(AntennaPoints1);
finalLines.push(AntennaPoints2);

drawLines(finalLines);
