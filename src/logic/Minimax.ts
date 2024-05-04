type IBoard = (string | number)[];

const huPlayer = "P";
const aiPlayer = "C";
let round = 0;

function Move(
  board: IBoard,
  handleSetValue: (index: number, player: string) => void,
  reset: () => void,
  setTitle: (newValue: string) => void
) {
  round++;
  // console.log(board)
  if (Winning(board, huPlayer)) {
    setTimeout(() => {
      round = 0;
      reset();
    }, 2500);
    setTitle("Победа!");
  } else if (round === 9) {
    setTitle("Ничья!");
    setTimeout(() => {
      round = 0;
      reset();
    }, 2500);
  } else {
    const index: number = Minimax(board, aiPlayer)?.index as number;
    setTimeout(() => {
      handleSetValue(index, aiPlayer);
      round++;
      // console.log(index, round);
      if (Winning(board, aiPlayer)) {
        setTitle("Поражение!");
        setTimeout(() => {
          round = 0;
          reset();
        }, 2500);
      } else if (round === 9) {
        setTimeout(() => {
          round = 0;
          reset();
        }, 2500);
        setTitle("Ничья!");
      }
    }, 400);
  }
}

function Minimax(board: IBoard, player: string) {
  const availSlots: number[] = availSlotsFunc(board);
  // console.log(availSlots)
  if (Winning(board, huPlayer)) {
    return {
      score: -10,
    };
  } else if (Winning(board, aiPlayer)) {
    return {
      score: 10,
    };
  } else if (availSlots.length === 0) {
    return {
      score: 0,
    };
  }

  const moves = [];
  for (let i = 0; i < availSlots.length; i++) {
    const move: { index?: number; score?: number } = {};
    move.index = availSlots[i];
    board[availSlots[i]] = player;

    if (player === aiPlayer) {
      const g = Minimax(board, huPlayer);
      move.score = g?.score;
    } else {
      const g = Minimax(board, aiPlayer);
      move.score = g?.score;
    }

    moves.push(move);
    board[availSlots[i]] = move.index;
    // console.log(moves)
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let elem of moves) {
      if (elem.score != undefined && elem.score > bestScore) {
        bestScore = elem.score;
        bestMove = elem;
      }
    }
  } else {
    let bestScore = 10000;
    for (let elem of moves) {
      if (elem.score != undefined && elem.score < bestScore) {
        bestScore = elem.score;
        bestMove = elem;
      }
    }
  }

  return bestMove;
}

function Winning(board: IBoard, player: string): boolean {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  )
    return true;
  else return false;
}

function availSlotsFunc(board: IBoard): number[] {
  return board.filter((elem) => elem !== "P" && elem !== "C") as number[];
}

export default Move;
