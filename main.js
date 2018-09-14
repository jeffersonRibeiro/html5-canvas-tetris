const SCALE = 20

const playerElements = document.querySelectorAll('.player');

const tetri = [];

[...playerElements].forEach(el => {
	const canvas = el.querySelector('canvas');
	const scoreEl = el.querySelector('.score');
	tetri.push( new Tetris(canvas, SCALE, scoreEl) );
});

const keyListener =  (e) => {
	[
		{
			left: 65,
			right: 68,
			drop: 83,
			rotateR: 81,
			rotateL: 69,
		},
		{
			left: 37,
			right: 39,
			drop: 40,
			rotateR: 188,
			rotateL: 190,
		}
	].forEach( (key, index) => {
		const p = tetri[index].player;
		if(e.type === 'keydown') {
			if(e.keyCode === key.left){
				p.move(-1);
			} else if (e.keyCode === key.right){
				p.move(1);
			} else if (e.keyCode === key.rotateR){
				p.rotate(-1);
			} else if (e.keyCode === key.rotateL){
				p.rotate(1);
			}	
		}

		if (e.keyCode === key.drop){
			if(e.type === 'keydown'){
				if(p.dropInterval !== p.DROP_FAST){
					p.drop();
					p.dropInterval = p.DROP_FAST;
					console.log(p.dropInterval);
				}
			}else {
				p.dropInterval = p.DROP_SLOW;
			}
			
		}
	})
}


document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);


function flood(tetri, rows){
	console.log(tetri.arena.matrix);
	for(let i = tetri.arena.matrix.length -1; i > (tetri.arena.matrix.length -1) - rows; i--){
		tetri.arena.matrix[i].fill(1);
	}	
}
