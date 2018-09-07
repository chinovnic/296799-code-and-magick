'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 145;
var CLOUD_Y = 250;
var GAP = 50;
var FONT_HEIGHT = 15;
var BAR_WIDTH = 40;
var MAX_BAR = 150;
var CLOUD_COORDINATES_X = 100;
var CLOUD_COORDINATES_Y = 10;
var shadowCoordinatesX = CLOUD_COORDINATES_X + 10;
var shadowCoordinatesY = CLOUD_COORDINATES_Y + 10;

var renderCloud = function (ctx, x, y, color) {
  var shift = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 4, y + shift);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y);
  ctx.lineTo(CLOUD_WIDTH, y + shift);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - shift, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_WIDTH, y + CLOUD_HEIGHT - shift);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 4, y + CLOUD_HEIGHT - shift);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + shift, y + CLOUD_HEIGHT / 2);
  ctx.fill();
  ctx.closePath();
};
var renderText = function (ctx) {
  var FIRST_LINE_POSITION_RATE = 2;
  var SECOND_LINE_POSITION_RATE = 3;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X, FONT_HEIGHT * FIRST_LINE_POSITION_RATE);
  ctx.fillText('Список результатов:', CLOUD_X, FONT_HEIGHT * SECOND_LINE_POSITION_RATE);
};
var getMaxTime = function (times) {
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxTime) {
      maxTime = times[i];
    }
  }
  return maxTime;
};
var getBarColor = function (currentName) {
  var barColor = 'rgba(255, 0, 0, 1)';
  console.log(currentName);
  if (currentName !== 'Вы') {
    var ALPHA_OPACITY_RATE = 0.2;
    var alpha = Math.random();
    if (alpha < ALPHA_OPACITY_RATE) {
      alpha += ALPHA_OPACITY_RATE;
    }
    barColor = 'rgba(0, 0, 255, ' + alpha + ')';
  }
  return barColor;
};
var renderBar = function (ctx, names, times, index) {
  var TIME_FONT_HEIGHT_RATE = 1.6;
  var NAME_FONT_HEIGHT_RATE = 0.5;
  var time = parseInt(times[index], 10);
  var barHeight = MAX_BAR * times[index] / getMaxTime(times);
  var barIndent = CLOUD_X + index * (GAP + BAR_WIDTH);
  ctx.fillStyle = '#000'; ctx.fillText(names[index], barIndent, CLOUD_Y);
  ctx.fillStyle = getBarColor(names[index]);
  ctx.fillRect(barIndent, CLOUD_Y - FONT_HEIGHT * NAME_FONT_HEIGHT_RATE, BAR_WIDTH, -barHeight);
  ctx.fillStyle = '#000';
  ctx.fillText(time, barIndent, CLOUD_Y - barHeight - FONT_HEIGHT * TIME_FONT_HEIGHT_RATE);
};
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadowCoordinatesX, shadowCoordinatesY, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_COORDINATES_X, CLOUD_COORDINATES_Y, '#fff');
  renderText(ctx);
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, names, times, i);
  }
};
