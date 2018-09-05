'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 145;
var CLOUD_Y = 250;
var GAP = 50;
var FONT_HEIGHT = 15;
var BAR_WIDTH = 40;
var MAX_BAR = 150;
var barHeight;
var maxTime = 0;
var time = 0;
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

window.renderStatistics = function (ctx, names, times) {
  var getMaxTime = function () {
    maxTime = times[0];
    for (var i = 1; i < times.length; i++) {
      if (times[i] > maxTime) {
        maxTime = times[i];
      }
    }
    return maxTime;
  };
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X, FONT_HEIGHT * 2);
  ctx.fillText('Список результатов:', CLOUD_X, FONT_HEIGHT * 3);

  for (var i = 0; i < names.length; i++) {
    var barColor = 'rgba(255, 0, 0, 1)';
    if (names[i] !== 'Вы') {
      var alpha = Math.random();
      if (alpha < 0.2) {
        alpha += 0.2;
      }
      barColor = 'rgba(0, 0, 255, ' + alpha + ')';
    }
    maxTime = getMaxTime(times);
    time = parseInt(times[i], 10);
    barHeight = MAX_BAR * times[i] / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + i * (GAP + BAR_WIDTH), CLOUD_Y);
    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + i * (GAP + BAR_WIDTH), CLOUD_Y - FONT_HEIGHT * 0.5, BAR_WIDTH, -barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(time, CLOUD_X + i * (GAP + BAR_WIDTH), CLOUD_Y - barHeight - FONT_HEIGHT * 1.6);
  }
};
