var unknownSquares = -1;
var pathSquare = 0;
var wallEdge = 1;
var playerEdge = 2;
var finishEdge = 3;
var playerTrail = 4;
var endTrail = 5;
var solvedTrail = 6;
var mazeWidth = 5;
var mazeHeight = 5;

function changeMazeSize(option) 
{
	mazeWidth = parseInt(option.value);
	mazeHeight = mazeWidth;
	option.blur();
}