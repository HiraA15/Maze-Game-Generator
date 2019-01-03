var solveMaze = function(maze, current, goal) 
{
	var solveRecursively = function(maze, current, goal) 
	{
		var x = current.x;
		var y = current.y;
		var dX = goal.x;
		var dY = goal.y;
		var original = maze[x][y];

		maze[x][y] = solvedTrail;

		if (x == dX && y == dY) 
		{
			maze[x][y] = original;
				return true;
		}

		if (maze[x - 1][y] != wallEdge && maze[x - 1][y] != solvedTrail) 
		{ 
			if(solveRecursively(maze, {x:current.x - 1, y:current.y}, goal)) 
			{
				path.push({x:current.x - 1, y:current.y});
				maze[x][y] = original;
					return true;
			} 
		}
		if (maze[x][y - 1] != wallEdge && maze[x][y - 1] != solvedTrail) 
		{ 
			if(solveRecursively(maze, {x:current.x, y:current.y - 1}, goal)) 
			{
				path.push({x:current.x, y:current.y - 1});
				maze[x][y] = original;
					return true;
			} 
		}
		if (maze[x + 1][y] != wallEdge && maze[x + 1][y] != solvedTrail) 
		{ 
			if(solveRecursively(maze, {x:current.x + 1, y:current.y}, goal)) 
			{
				path.push({x:current.x + 1, y:current.y});
				maze[x][y] = original;
					return true;
			} 
		}
		if (maze[x][y + 1] != wallEdge && maze[x][y + 1] != solvedTrail) 
		{ 
			if(solveRecursively(maze, {x:current.x, y:current.y + 1}, goal)) 
			{
				path.push({x:current.x, y:current.y + 1});
				maze[x][y] = original;
					return true;
			} 
		}
		maze[x][y] = original;
			return false;
	}

	var path = [];
	solveRecursively(maze, current, goal);
		return path;
}