import readline from 'readline';
import { Command, GameInterface } from './common/interfaces';
import { CommandParser } from './CommandParser';
import { Player } from './Player';
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
    rl.question(command, (response) => {
      resolve(response.trim());
      rl.close();
    });
  });
}

export class Game implements GameInterface {
  running: boolean;
  parser: CommandParser;
  player: Player;
  world: World;

  /**
   * Initializes a new instance of Game.
   */
  constructor() {
    this.running = true;
    this.parser  = new CommandParser();
    this.world   = WorldFactory.createDefaultWorld();
    this.player  = new Player('Player 1', this.world.startingRoom);
  }

  /**
   * The main game loop. This will continue to run until the user types 'quit'
   * and confirms that choice.
   * 
   * @returns Promise<void>
   */
  async gameLoop(): Promise<void> {
    console.log('Mind Palace');
    console.log('');

    while (this.running) {
      console.log(this.player.describeCurrentLocation());

      const commandInput = await userCommand('> ');
      const command      = this.parser.parse(commandInput);

      this.handleCommand(command);
    }
  }

  /**
   * Handles a given command.
   *
   * @param command The command to handle.
   * @returns void
   */
  handleCommand(command: Command): void {
    const { action, target } = command;

    console.log('');

    if (action === 'quit') {
      console.log('Thanks for playing! Goodbye.')
      this.running = false;
    } else if (action === 'move' || action === 'go') {
      this.handleMovement(target);
    } else if (action === 'look' || action === 'take') {
      this.handleInteraction(target);
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
   * @returns void
   */
  handleMovement(direction: string | null): void {
    if (direction) {
      console.log(this.player.move(direction));
    } else {
      console.log("You can't go that way.");
    }
  }

  /**
   * Handles an interaction command, given as a target string (or null if not
   * a valid interaction command).
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleInteraction(target: string | null): void {
    if (target) {
      console.log(this.player.interact(target));
    } else {
      console.log("You can't do that.");
    }
  }
}
