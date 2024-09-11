import readline from 'readline';
import { Command, CommandParser } from './CommandParser';
import { World } from './World';
import { WorldFactory } from './WorldFactory';

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
  world: World;

  /**
   * Initializes a new instance of Game.
   */
  constructor() {
    this.running = true;
    this.parser = new CommandParser();
    this.world = WorldFactory.createDefaultWorld();
  }

  /**
   * The main game loop. This will continue to run until the user types 'quit'
   * and confirms that choice.
   */
  async gameLoop() {
    console.log('Bork I: The Tiny Subterranean Syndicate');
    console.log('');

    while (this.running) {
      console.log(this.world.describeCurrentRoom());

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
    } else if (action === 'move' || action === 'go') {
      this.handleMovement(target);
    } else if (action === 'take') {
      this.takeItem(target);
    } else {
      console.log(`I don't understand the command: ${action}`);
    }
  }

  /**
   * Handles a movement command, given as a direction string (or null if not
   * a valid movement command).
   *
   * @param direction The direction to move, or null if not a valid movement
   * command. If null, a message is printed to the user that they can't go that
   * way.
   */
  handleMovement(direction: string | null) {
    if (direction) {
      console.log(this.world.movePlayer(direction));
    } else {
      console.log('You can\'t go that way.');
    }
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
