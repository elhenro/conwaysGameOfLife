// Conways Game of Life
// golang implementation of the game of life on the command line
// https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

package main

import (
	"fmt"
	"math/rand"
	"time"
)

// Cell is a single cell in the game of life
type Cell struct {
	alive bool
}

// Grid is a 2d array of cells
type Grid struct {
	cells [][]Cell
}

// NewGrid creates a new grid of cells
func NewGrid(width, height int) *Grid {
	cells := make([][]Cell, height)
	for i := range cells {
		cells[i] = make([]Cell, width)
	}
	return &Grid{cells}
}

// Randomize sets the cells in the grid to a random state
func (g *Grid) Randomize() {
	for i := range g.cells {
		for j := range g.cells[i] {
			g.cells[i][j].alive = rand.Intn(2) == 1
		}
	}
}

// Print prints the grid to the console
func (g *Grid) Print() {
	for i := range g.cells {
		for j := range g.cells[i] {
			if g.cells[i][j].alive {
				fmt.Print("️X")
			} else {
				fmt.Print(" ")
			}
		}
		fmt.Println()
	}
}

// Next returns the next state of the grid
func (g *Grid) Next() *Grid {
	next := NewGrid(len(g.cells[0]), len(g.cells))
	for i := range g.cells {
		for j := range g.cells[i] {
			next.cells[i][j].alive = g.nextCellState(i, j)
		}
	}
	return next
}

// nextCellState returns the next state of a cell
func (g *Grid) nextCellState(x, y int) bool {
	alive := g.cells[x][y].alive
	neighbors := g.countNeighbors(x, y)
	if alive {
		return neighbors == 2 || neighbors == 3
	}
	return neighbors == 3
}

// countNeighbors counts the number of neighbors a cell has
func (g *Grid) countNeighbors(x, y int) int {
	count := 0
	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			if i == 0 && j == 0 {
				continue
			}
			if g.isAlive(x+i, y+j) {
				count++
			}
		}
	}
	return count
}

// isAlive returns true if the cell at x,y is alive
func (g *Grid) isAlive(x, y int) bool {
	if x < 0 || x >= len(g.cells) {
		return false
	}
	if y < 0 || y >= len(g.cells[x]) {
		return false
	}
	return g.cells[x][y].alive
}

// clearScreen clears the console
func clearScreen() {
	fmt.Print("\033[H\033[2J")
}

func main() {
	rand.Seed(time.Now().UnixNano())
	grid := NewGrid(200, 30)
	grid.Randomize()
	for {
		grid.Print()
		fmt.Println()
		grid = grid.Next()
		time.Sleep(time.Second)
		clearScreen()
	}
}
