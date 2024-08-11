document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const rows = 8;
  const cols = 8;
  let selectedPiece = null;
  let selectedSquare = null;

  // Initialize the board:

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = row;
      square.dataset.col = col;
      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");
        if (row < 3) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "black");
          square.appendChild(piece);
        } else if (row > 4) {
          const piece = document.createElement("div");
          piece.classList.add("piece", "red");
          square.appendChild(piece);
        }
      }
      board.appendChild(square);
    }
  }

  // Add event listeners for piece movement:

  board.addEventListener("click", (event) => {
    const target = event.target;

    // If a piece is clicked:

    if (target.classList.contains("piece")) {
      if (selectedPiece) {
        selectedPiece.classList.remove("selected");
      }
      selectedPiece = target;
      selectedPiece.classList.add("selected");
      selectedSquare = target.parentElement;
    }

    // If a square is clicked:
    else if (target.classList.contains("square") && selectedPiece) {
      const targetSquare = target;
      const targetRow = parseInt(targetSquare.dataset.row);
      const targetCol = parseInt(targetSquare.dataset.col);
      const selectedRow = parseInt(selectedSquare.dataset.row);
      const selectedCol = parseInt(selectedSquare.dataset.col);

      const isKing = selectedPiece.classList.contains("king");
      const isForwardMove = selectedPiece.classList.contains("black")
        ? targetRow > selectedRow
        : targetRow < selectedRow;

      // Check if the move is valid:

      if (
        Math.abs(targetRow - selectedRow) === 1 &&
        Math.abs(targetCol - selectedCol) === 1 &&
        (isKing || isForwardMove)
      ) {
        targetSquare.appendChild(selectedPiece);
        selectedPiece.classList.remove("selected");

        // Promote to king if reaching the opposite end:

        if (
          (selectedPiece.classList.contains("black") && targetRow === 7) ||
          (selectedPiece.classList.contains("red") && targetRow === 0)
        ) {
          selectedPiece.classList.add("king");
        }

        selectedPiece = null;
        selectedSquare = null;
      } else if (
        Math.abs(targetRow - selectedRow) === 2 &&
        Math.abs(targetCol - selectedCol) === 2
      ) {
        const middleRow = (targetRow + selectedRow) / 2;
        const middleCol = (targetCol + selectedCol) / 2;
        const middleSquare = document.querySelector(
          `[data-row="${middleRow}"][data-col="${middleCol}"]`
        );
        const middlePiece = middleSquare.querySelector(".piece");

        // Check if there is an opponent piece to capture:

        if (
          middlePiece &&
          middlePiece.classList.contains("piece") &&
          middlePiece.classList.contains(
            selectedPiece.classList.contains("black") ? "red" : "black"
          )
        ) {
          middleSquare.removeChild(middlePiece);
          targetSquare.appendChild(selectedPiece);
          selectedPiece.classList.remove("selected");

          // Promote to king if reaching the opposite end:

          if (
            (selectedPiece.classList.contains("black") && targetRow === 7) ||
            (selectedPiece.classList.contains("red") && targetRow === 0)
          ) {
            selectedPiece.classList.add("king");
          }

          selectedPiece = null;
          selectedSquare = null;
        }
      }
    }
  });
});
