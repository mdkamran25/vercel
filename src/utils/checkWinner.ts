export const checkWinner = (board: string[]) => {
    
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];
  
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if(board.every((square) => square === "X" || square === "O")){
      return "Match Draw";
    }
  
    return null;
  }
  