class Tetris {
	constructor(canvas, scale, scoreEl)
	{
		this.scoreEl = scoreEl;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.arena = new Arena(canvas.width / SCALE, canvas.height / SCALE);
		this.player = new Player(this);

		this.ctx.scale(scale, scale);


		this.colors = [
			null,
			'#00E640',
			'#19B5FE',
			'#F89406',
			'#F4D03F',
			'#003171',
			'#F62459',
			'#763568'
		];

		let lastTime = 0;
		const update = (time = 0) => {
			const deltaTime = time - lastTime;
			lastTime = time;

			this.player.update(deltaTime);

			this.draw();
			requestAnimationFrame(update);
		}

		this.player.updateScore();
		update();
	}

	draw()
	{ 
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawMatrix(this.arena.matrix, {x: 0, y:0});
		this.drawMatrix(this.player.matrix, this.player.pos);
	}


	drawMatrix(matrix, offset)
	{
		matrix.forEach((row, y) => {
			row.forEach((value, x) => {
				if(value !== 0){
					this.ctx.fillStyle = this.colors[value];
					this.ctx.fillRect(x + offset.x,
								 y + offset.y,
								 1, 1);
				}
			});
		});
	}

	gameOver(){
		this.arena.clear();
		this.player.score = 0;
		this.player.dropInterval = 1000;
		this.player.updateScore();
	}

	randomPiece()
	{
		const pieces = 'ILJOTSZ';
		const type = pieces[pieces.length * Math.random() | 0];

		if (type === 'T') {
			return [
				[0, 0, 0],
				[1, 1, 1],
				[0, 1, 0],
			];
		} else if (type === 'J') {
			return [
				[0, 2, 0],
				[0, 2, 0],
				[2, 2, 0],
			];
		} else if (type === 'L') {
			return [
				[0, 3, 0],
				[0, 3, 0],
				[0, 3, 3],
			];
		} else if (type === 'S') {
			return [
				[0, 0, 0],
				[0, 4, 4],
				[4, 4, 0],
			];
		} else if (type === 'Z') {
			return [
				[0, 0, 0],
				[5, 5, 0],
				[0, 5, 5],
			];
		} else if (type === 'I') {
			return [
				[0, 6, 0, 0],
				[0, 6, 0, 0],
				[0, 6, 0, 0],
				[0, 6, 0, 0],
			];
		} else if (type === 'O') {
			return [
				[7, 7],
				[7, 7],
			];
		}
	}

	
}
