// Conway's Game of Life
// node.js app that renders conway's game of life in the terminal

// import modules
var blessed = require('blessed');
var contrib = require('blessed-contrib');

// create screen
var screen = blessed.screen();

// create grid
var grid = new contrib.grid({rows: 1, cols: 1, screen: screen});

// create map
var map = grid.set(0, 0, 1, 1, contrib.map, {label: 'Conway\'s Game of Life'});
map.setLabel('Conway\'s Game of Life');

// Start Conway's Game of Life
var Game = function() {
    this.generation = 0;
    this.map = map;
    this.cells = [];
    for (var i = 0; i < this.map.height; i++) {
        this.cells[i] = [];
        for (var j = 0; j < this.map.width; j++) {
            this.cells[i][j] = Math.round(Math.random());
        }
    }
    this.update();
    this.render();
}

// game of life game.js prototype
Game.prototype.update = function() {
    var next = [];
    for (var i = 0; i < this.map.height; i++) {
        next[i] = [];
        for (var j = 0; j < this.map.width; j++) {
        next[i][j] = this.cells[i][j];
        }
    }
    for (var i = 0; i < this.map.height; i++) {
        for (var j = 0; j < this.map.width; j++) {
        var neighbors = this.getNeighbors(i, j);
        if (this.cells[i][j] == 1) {
            if (neighbors < 2 || neighbors > 3) {
            next[i][j] = 0;
            }
        } else {
            if (neighbors == 3) {
            next[i][j] = 1;
            }
        }
        }
    }
    this.cells = next;
}

// game of life game.js prototype
Game.prototype.render = function() {
    var data = {};
    for (var i = 0; i < this.map.height; i++) {
        for (var j = 0; j < this.map.width; j++) {
        if (this.cells[i][j] == 1) {
            data[i + ',' + j] = {color: 'green', char: '█'};
        }
        }
    }
    Game.display.drawWhole(data);
}

Game.prototype.display = {
    drawWhole: function(data) {
        this.map.setData({data: data});
    }
}

// game of life game.js prototype
Game.prototype.getNeighbors = function(x, y) {
    var neighbors = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
        if (i == 0 && j == 0) {
            continue;
        }
        if (this.cells[x + i] && this.cells[x + i][y + j]) {
            neighbors += this.cells[x + i][y + j];
        }
        }
    }
    return neighbors;
}

// create game
var game = new Game();

// update game every 100ms
setInterval(function() {
    game.generation++;
    game.map.setLabel('Conway\'s Game of Life - Generation ' + game.generation);
    game.update();
    game.render();
}, 100);



// render screen
screen.render();
