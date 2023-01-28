// Conway's Game of Life
// in node.js, rendered in the terminal
// very basic implementation

// import modules
var blessed = require('blessed');

// create screen
var screen = blessed.screen();

// set label
map.setLabel('Conway\'s Game of Life');

// generation counter
var generation = 0;

// create cells
var cells = [];

// initialize cells
for (var i = 0; i < map.height; i++) {
    cells[i] = [];
    for (var j = 0; j < map.width; j++) {
        cells[i][j] = Math.round(Math.random());
    }
}

// game 
class game {
    constructor() {
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
        // update cells every 100ms
        setInterval(() => {
            this.update();
            this.render();
        }, 100);
    }

    update() {
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

    render() {
        var data = {};
        for (var i = 0; i < this.map.height; i++) {
            for (var j = 0; j < this.map.width; j++) {
                if (this.cells[i][j] == 1) {
                    data[i + ',' + j] = { color: 'green', char: '█' };
                } else {
                    data[i + ',' + j] = { color: 'black', char: ' ' };

                }
            }
        }
        // this.map.setData({ data: data, special: {} });
        // this.map.setContent({ data: data, special: {} });
        screen.render();
        this.generation++;
        this.map.setLabel('Conway\'s Game of Life - Generation ' + this.generation);
    }

    // get neighbors
    getNeighbors(i, j) {
        var neighbors = 0;
        for (var x = Math.max(0, i - 1); x <= Math.min(this.map.height - 1, i + 1); x++) {
            for (var y = Math.max(0, j - 1); y <= Math.min(this.map.width - 1, j + 1); y++) {
                neighbors += this.cells[x][y];
            }
        }
        neighbors -= this.cells[i][j];
        return neighbors;
    }
}

// exit on escape, q, or control-c
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
})

// render screen
screen.render();

new game();
// end of file