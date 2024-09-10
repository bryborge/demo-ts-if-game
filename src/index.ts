import readline from 'readline';

/**
 * A helper function that wraps `readline.question`.
 *
 * @param command The string to display to the user.
 * @returns A promise that resolves to the user's trimmed input.
 */
const userCommand = (command: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(command, (answer) => {
      resolve(answer.trim());
      rl.close();
    });
  });
}

type Command = {
  action: string;
  target: string | null;
};

class Game {
  running: boolean;

  /**
   * Initializes a new instance of Game.
   */
  constructor() {
    this.running = true;
  }

  parseCommand(command: string): Command {
    const words = command.split(' ');
    const action = words[0];
    const target = words[1] || null;

    return { action, target };
  }

  /**
   * The main game loop. This will continue to run until the user types 'quit'
   * and confirms that choice.
   */
  async gameLoop() {
    console.log('Bork I: The Tiny Subterranean Syndicate');
    console.log('');
    console.log('You are standing in an open field west of an abandoned warehouse.');
    console.log('Your phone *pings* to let you know you have a new email message.');
    console.log('');

    while (this.running) {
      const commandInput = await userCommand('> ');
      const command = this.parseCommand(commandInput);

      this.handleCommand(command);
    }
  }

  handleCommand(command: Command) {
    const { action, target } = command;

    if (action === 'quit') {
      console.log('Thanks for playing! Goodbye.')
      this.running = false;
    } else if (action === 'move') {
      this.movePlayer(target);
    } else if (action === 'take') {
      this.takeItem(target);
    } else {
      console.log(`I don't understand the command: ${action}`);
    }
  }

  movePlayer(target: string | null) {
    console.log(`You moved ${target}.`);
  }

  takeItem(target: string | null) {
    console.log(`You took the item ${target}.`);
  }
}

// Start the game
const game = new Game();
game.gameLoop();
