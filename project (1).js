const width = 125;
const height = 125;
const t = new bt.Turtle();

setDocDimensions(width, height);

const screens



















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

const finalLines = [];

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
