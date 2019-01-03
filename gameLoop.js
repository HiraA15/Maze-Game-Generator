var bestScores = [];
var MazeGame = function() 
{
	var pTime = document.getElementById('playerTime');
	var pScore = document.getElementById('playerScore');
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
		context.imageSmoothingEnabled = false;
	var maze = [];
	var startPosition = {x:1, y:1};
	var pPosition = {};
	var goalPosition = {};
	var goalPath = [];
	var score = 0;
	var sTime = undefined;
	var dBreadcrumbs = true;
	var dPath = false;
	var dHint = false;
	var dScore = true;

	function getInput(keyEvent) 
	{
		switch(keyEvent.keyCode) 
		{
			case 74: // j
			case 65: // a
			case 37: // left arrow
				if (maze[pPosition.x - 1][pPosition.y] != wallEdge) 
				{
					pPosition.x--;
				}
				keyEvent.preventDefault();
				break;
			case 73: // i
			case 87: // w
			case 38: // up arrow	
				if (maze[pPosition.x][pPosition.y - 1] != wallEdge) 
				{
					pPosition.y--;
				}
				keyEvent.preventDefault();
				break;
			case 76: // l
			case 68: // d
			case 39: // right arrow	
				if (maze[pPosition.x + 1][pPosition.y] != wallEdge) 
				{
					pPosition.x++;
				}
				keyEvent.preventDefault();
				break;
			case 75: // k
			case 83: // s
			case 40: // down arrow	
				if (maze[pPosition.x][pPosition.y + 1] != wallEdge) 
				{
					pPosition.y++;
				}
				if (pPosition.y > maze.length - 1) 
				{
					pPosition.y	 = 0;
				}
				keyEvent.preventDefault();
				break;
			case 66: // b
				dBreadcrumbs = !dBreadcrumbs;
				keyEvent.preventDefault();
				break;	
			case 80: // p
				dPath = !dPath;
				keyEvent.preventDefault();
				break;
			case 72: // h
				dHint = !dHint;
				keyEvent.preventDefault();
				break;
			case 89: // y
				dScore = !dScore;
				keyEvent.preventDefault();
				break;
		}
	}

	function mazeReset() 
	{
		maze = mazeGenerator();
		pPosition = {x:startPosition.x, y:startPosition.y};
		goalPosition = {x: maze[0].length - 2, y: maze.length - 2};
		sTime = undefined;
		playerTime.innerHTML = '00:00:000';
		score = 10000;
			return;
	}

	function update(currentTime) 
	{
		if (sTime === undefined && (pPosition.x != startPosition.x || pPosition.y != startPosition.y)) 
		{
			sTime = performance.now();
		}
		if (sTime !== undefined) 
		{
			var duration = currentTime - sTime;
			var seconds = Math.floor(duration / 1000 % 60);

			if (seconds < 10 && seconds >= 0) 
			{
				seconds = '0' + seconds;
			}
			else 
			{
				seconds += '';
			}

			var minutes = Math.floor(duration / 1000 / 60) + '';
			if (minutes < 10 && minutes >= 0) 
			{
				minutes = '0' + minutes;
			}
			else 
			{
				minutes += '';
			}

			var milliseconds = Math.floor(duration % 1000).toFixed(0) + '';

			pTime.innerHTML = minutes + ':' + seconds + ':' + milliseconds;
			score -= 1;
		}

		if (maze.length != mazeHeight * 2 + 1) 
		{
			mazeReset();
		}
		maze[pPosition.x][pPosition.y] = playerTrail;
		if (dPath || dHint) 
		{
			goalPath = solveMaze(maze, goalPosition, pPosition);
		}
		if (pPosition.x == goalPosition.x && pPosition.y == goalPosition.y) 
		{
			goalPath = solveMaze(maze, goalPosition, startPosition);

			for (var i = 0; i < maze[0].length; ++i) 
			{
				for (var j = 0; j < maze.length; ++j) 
				{
					if (maze[i][j] == playerTrail) 
					{
						score -= 200;
					}
					for (var k = 0; k < goalPath.length; ++k) 
					{
						if (i == goalPath[k].x && j == goalPath[k].y) 
						{
							score += 200
						}
					}					
				}
			}
			bestScores.push(score);
			document.getElementById('playerBestScores').innerHTML += (score + '<br>');
			mazeReset();
		}
	}

	function render() 
	{
		var xWidth = (canvas.width / (maze[0].length));
		var xHeight = (canvas.height / (maze.length));

		context.clearRect(0, 0, canvas.width, canvas.height);

		for (var i = 0; i < maze[0].length; ++i) 
		{
			for (var j = 0; j < maze.length; ++j) 
			{
				context.fillStyle = 'white';
				if (maze[i][j] == wallEdge) 
				{
					context.fillStyle = 'black';
				}
				if (maze[i][j] == playerTrail && dBreadcrumbs) 
				{
					context.fillStyle = '#1aff8c';
				}
				if (dPath) 
				{
					for (var k = 0; k < goalPath.length; ++k) 
					{
						if (i == goalPath[k].x && j == goalPath[k].y) 
						{
								context.fillStyle = '#00802b';		
						}
					}					
				}
				else if (dHint && goalPath.length > 1) 
				{
					if (i == goalPath[1].x && j == goalPath[1].y) 
					{
						context.fillStyle = '#00802b';
					}
				}
				if (maze[i][j] == solvedTrail) 
				{
					context.fillStyle = 'yellow';
				}

				context.fillRect(i * xWidth, j * xHeight, xWidth + 0.5, xHeight + 0.5);
			}
		}

		pScore.innerHTML = score;

		if (dScore) 
		{
			document.getElementById('scoreDisplay').style.visibility = "visible";
		}
		else 
		{
			document.getElementById('scoreDisplay').style.visibility = "hidden";
		}

		context.fillStyle = 'purple';
		context.fillRect(goalPosition.x * xWidth, goalPosition.y * xHeight, xWidth, xHeight);
		context.fillStyle = 'magenta';
		context.fillRect(pPosition.x * xWidth, pPosition.y * xHeight, xWidth, xHeight);
	}

	function gameLoop(currentTime) 
	{
		update(currentTime);
		render();
		requestAnimationFrame(gameLoop);
	}

	mazeReset();
	document.addEventListener('keydown', getInput);
	requestAnimationFrame(gameLoop);
};