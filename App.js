import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPlayer: 1,
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    }
  }

  handleClick = (row,col) => {
    let player = this.state.currentPlayer;
    let grid = this.state.grid;

    // if cell at row, col is not 0, return
    if (grid[row][col] !== 0) {return; }

    // set the grid at row, col to either 1 or -1 to display icon
    grid[row][col] = (player === 1) ? 1 : -1;
    this.setState({ grid });

    // switch player
    player = (player === -1) ? 1 : -1;
    this.setState({ currentPlayer: player });

    //  check win condition
    let winner = this.checkWinner();

    if (winner === 1) {
      alert('Player 1 wins!');
      this.resetGame();
    } else if (winner === -1) {
      alert('Player 2 wins!');
      this.resetGame();
    }

    // check tie condition
    let tie = this.checkTie();

    if (tie === true) {
      alert('No more moves left, you have tied!');
      this.resetGame();
    }
  }

  displayCell = (row, col) => {
    let value = this.state.grid[row][col];

    switch(value) {
      case 1: return <Icon name="close" style={styles.tileX} />;
      case -1: return <Icon name="circle-outline" style={styles.tileO} />;
      default: return <View />;
    }
  }

  checkTie = () => {
    let grid = this.state.grid;

    //  0 represents empty cell to click on, no 0 means no more cells
    for (let i in grid) {
      for (let j in grid[i]) {
        if (grid[i][j] === 0) { return false; }
      }
    }

    return true;
  }

  checkWinner = () => {
    let grid = this.state.grid;

    {console.log(grid)};
    // check rows for winner, return player number
    for (let i in grid) {
      let value = grid[i][0] + grid[i][1] + grid[i][2];


      switch(value) {
        case 3: return 1;
        case -3: return -1;
      }
    }

    // check cols for winner, return player number
    for (let i in grid) {
      let value = grid[0][i] + grid[1][i] + grid[2][i];


      switch(value) {
        case 3: return 1;
        case -3: return -1;
      }
    }

    // check diag for winner, return player number
      let diag1 = grid[0][0] + grid[1][1] + grid[2][2];
      let diag2 = grid[0][2] + grid[1][1] + grid[2][0];

      if (diag1 === 3 || diag2 === 3) {return 1; }
      else if (diag1 === -3 || diag2 === -3) {return -1; }

    // otherwise return 0
    return 0;

  }

  resetGame = () => {
    this.setState({
      currentPlayer:1,
      grid: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    })
  }

  render() {
    return (
      <View style={styles.container}>

      {/* show current players turn */}

      <View style={{ paddingBottom: 50 }}>
        <Text style={styles.turnHeader}>
          Turn: Player {(this.state.currentPlayer === 1) ? 1 : 2}
        </Text>
      </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
          onPress={() => this.handleClick(0,0)}
          style={[styles.col, { borderTopWidth: 0, borderLeftWidth: 0}]}
          >
          {this.displayCell(0,0)}

          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.handleClick(0,1)}
          style={[styles.col, { borderTopWidth: 0}]}
          >
          {this.displayCell(0,1)}

          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.handleClick(0,2)}
          style={[styles.col, { borderTopWidth: 0, borderRightWidth: 0}]}
          >
          {this.displayCell(0,2)}
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.handleClick(1,0)}
            style={[styles.col, { borderLeftWidth: 0}]}
            >
            {this.displayCell(1,0)}

            </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.handleClick(1,1)}
           style={[styles.col]}
           >
           {this.displayCell(1,1)}

           </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.handleClick(1,2)}
          style={[styles.col, { borderRightWidth: 0}]}
          >
          {this.displayCell(1,2)}

          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
          onPress={() => this.handleClick(2,0)}
          style={[styles.col, { borderBottomWidth: 0, borderLeftWidth: 0}]}
          >
          {this.displayCell(2,0)}

          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.handleClick(2,1)}
          style={[styles.col, { borderBottomWidth: 0}]}
          >
          {this.displayCell(2,1)}

          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.handleClick(2,2)}
          style={[styles.col, { borderBottomWidth: 0, borderRightWidth: 0}]}
          >
          {this.displayCell(2,2)}

          </TouchableOpacity>
        </View>

        {/* Create view with padding for reset button */}
        <View style={{ paddingTop: 50, width: 200 }}>
        <Button
          title="Reset Game"
          onPress={this.resetGame}
        />
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    width: 100,
    height: 100,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 70,
  },
  tileO: {
    color: 'green',
    fontSize: 70,
  },
  turnHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
