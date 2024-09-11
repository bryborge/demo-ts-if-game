import readline from 'readline';
import { Command, CommandParser } from './CommandParser';

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

export class Game {
  running: boolean;
  parser: CommandParser;

  /**
   * Initializes a new instance of Game.
   */
  constructor() {
    this.running = true;
    this.parser = new CommandParser();
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
      const command      = this.parser.parse(commandInput);

      this.handleCommand(command);
    }
  }

  /**
   * Handles a given command.
   *
   * @param command The command to handle.
   */
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

  /**
   * Move the player in a given direction.
   *
   * @param target The direction to move (e.g. 'north', 'south', etc.). If this
   * is null, no action is taken.
   */
  movePlayer(target: string | null) {
    console.log(`You moved direction: ${target}.`);
  }

  
  /**
   * Take an item at a given location..
   *
   * @param target The name of the item to take. If this is null, no action is
   * taken.
   */
  takeItem(target: string | null) {
    console.log(`You took the item: ${target}.`);
  }
}
