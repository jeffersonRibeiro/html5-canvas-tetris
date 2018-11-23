class Arena {
	constructor(width, height) {
		const matrix = [];
		while(height--) {
			matrix.push(new Array(width).fill(0));
		}
		this.matrix = matrix;
	}
  
	clear() {
		this.matrix.forEach(row => row.fill(0));
	}
  
	collide(player) {
		const [m, o] = [player.matrix, player.pos];
		for(let y = 0; y < m.length; y++) {
			for(let x = 0; x < m[y].length; x++) {
				if(m[y][x] !== 0 && (this.matrix[y + o.y] && this.matrix[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }
      
  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }
      
  sweep() {
    let rowCount = 0;
    outer: for(let y = this.matrix.length - 1; y >= 0; y--) {
      for(let x = 0; x < this.matrix[y].length; x++) {
        if(this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      
      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      y++;
      
      rowCount++;
    }
    
    return rowCount;
  }
}
    
