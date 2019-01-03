var mazeGenerator = function() 
{
	var maze = [];

	for (var i = 0; i < mazeHeight * 2 + 1; ++i) 
	{
		var temp = [];
		for (var j = 0; j < mazeWidth * 2 + 1; ++j) 
		{
			if (i % 2 == 0 || j % 2 == 0) 
			{
				temp.push(wallEdge);
			} 
			else 
			{
				temp.push(unknownSquares);
			}
		}
		maze.push(temp);
	}

	var wallsAdded = [];

	function addWalls(x, y) 
	{
		if (x > 1 && maze[x - 1][y] == wallEdge) 
		{
			wallsAdded.push({
				x: x - 1,
				y: y
			});
		}
		if (y > 1 && maze[x][y - 1] == wallEdge) 
		{
			wallsAdded.push({
				x: x,
				y: y - 1
			});
		}
		if (x < maze[0].length - 2 && maze[x + 1][y] == wallEdge) 
		{
			wallsAdded.push({
				x: x + 1,
				y: y
			});
		}
		if (y < maze.length - 2 && maze[x][y + 1] == wallEdge) 
		{
			wallsAdded.push({
				x: x,
				y: y + 1
			})
		}
		return;
	}

	maze[1][1] = pathSquare;
	addWalls(1, 1);

	while (!(wallsAdded.length == 0)) 
	{
		var rand = Math.floor(Math.random() * wallsAdded.length);
		var u = wallsAdded.splice(rand, 1).pop();

		if (u.x > 1 && maze[u.x - 1][u.y] == unknownSquares) 
		{
			maze[u.x][u.y] = pathSquare;
			maze[u.x - 1][u.y] = pathSquare;
			addWalls(u.x - 1, u.y);
		}
		if (u.y > 1 && maze[u.x][u.y - 1] == unknownSquares) 
		{
			maze[u.x][u.y] = pathSquare;
			maze[u.x][u.y - 1] = pathSquare;
			addWalls(u.x, u.y - 1);
		}
		if (u.x < maze[0].length - 2 && maze[u.x + 1][u.y] == unknownSquares) 
		{
			maze[u.x][u.y] = pathSquare;
			maze[u.x + 1][u.y] = pathSquare;
			addWalls(u.x + 1, u.y);
		}
		if (u.y < maze.length - 2 && maze[u.x][u.y + 1] == unknownSquares) 
		{
			maze[u.x][u.y] = pathSquare;
			maze[u.x][u.y + 1] = pathSquare;
			addWalls(u.x, u.y + 1);
		}
	}
	return maze;
};