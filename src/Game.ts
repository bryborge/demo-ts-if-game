import readline from 'readline';
import { Command, GameInterface } from './common/interfaces';
import { CommandParser } from './CommandParser';
import { Player } from './Player';
import { World } from './World';
import { WorldFactory } from './WorldFactory';
import { GameObject } from './GameObject/GameObject';

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
    this.parser = new CommandParser();
    this.world = WorldFactory.createDefaultWorld();
    this.player = new Player('Player 1', this.world.startingRoom);
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
    console.log(this.player.describeCurrentLocation());
    console.log('');

    while (this.running) {
      const commandInput = await userCommand('> ');
      const { action, target } = this.parser.parse(commandInput);

      this.handleCommand({ action, target });
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

    switch (action) {
      case 'quit':
        console.log('Thanks for playing! Goodbye.');
        this.running = false;
        break;
      case 'move':
        this.handleMovement(target);
        break;
      case 'examine':
        this.handleExamine(target);
        break;
      case 'open':
        this.handleOpen(target);
        break;
      case 'close':
        this.handleClose(target);
        break;
      case 'take':
        this.handleTake(target);
        break;
      case 'drop':
        this.handleDrop(target);
        break;
      case 'inventory':
        this.handleShowInventory();
        break;
      default:
        console.log(`I don't understand the command: ${action}`);
    }

    console.log('');
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
    }
  }

  /**
   * Handles an examine command, given as a target string.
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleExamine(target: string | null): void {
    const targetObject = this.player.location.getObject(target) || this.player.getItemFromInventory(target);

    if (targetObject) {
      console.log(this.player.examineObject(targetObject));
    } else {
      console.log(this.handleNoTarget(target));
    }
  }

  /**
   * Handles an open command, given as a target string.
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleOpen(target: string | null): void {
    const targetObject = this.player.location.getObject(target);

    if (targetObject) {
      const { message, contents } = targetObject.open();
      console.log(message);

      if (contents.length > 0) {
        contents.forEach((item: GameObject) => {
          this.player.location.addObject(item); // add the newly opened item's contents to the room
          targetObject.removeContent(item);     // remove the item's contents from itself
        });
      }
    } else {
      console.log(this.handleNoTarget(target));
    }
  }

  /**
   * Handles a close command, given as a target string.
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleClose(target: string | null): void {
    const targetObject = this.player.location.getObject(target);

    if (targetObject) {
      console.log(targetObject.close());
    } else {
      console.log(this.handleNoTarget(target));
    }
  }

  /**
   * Handles a take command, given as a target string.
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleTake(target: string | null): void {
    const targetObjectInRoom = this.player.location.getObject(target);
    const targetObjectInInventory = this.player.getItemFromInventory(target);

    if (targetObjectInInventory) {
      console.log(`You already have the ${targetObjectInInventory.name}.`);
    } else {
      if (targetObjectInRoom) {
        console.log(this.player.takeObject(targetObjectInRoom));
      } else {
        console.log(this.handleNoTarget(target));
      }
    }
  }

  /**
   * Handles a drop command, given as a target string.
   *
   * @param target The target of the interaction, or null if not a valid interaction
   * command. If null, a message is printed to the user that they can't do that.
   * @returns void
   */
  handleDrop(target: string | null): void {
    const targetObject = this.player.getItemFromInventory(target);

    if (targetObject) {
      this.player.location.addObject(targetObject);
      this.player.dropObject(targetObject);
      console.log(`You drop the ${targetObject.name}.`);
    } else {
      console.log(`You can't drop the ${target}.`);
    }
  }

  /**
   * Handles the command to show the player's inventory.
   *
   * If the player is not carrying anything, prints "You are not carrying anything.".
   * Otherwise, prints "You are carrying:" followed by a list of the items the player
   * is carrying.
   *
   * @returns void
   */
  handleShowInventory(): void {
    const inventory = this.player.getInventoryItems();

    if (inventory.length > 0) {
      console.log("You are carrying:");

      inventory.forEach((item: GameObject) => {
        console.log(`- ${item.name}`);
      });
    } else {
      console.log("You are not carrying anything.");
    }
  }

  /**
   * A helper function that returns a string that is used when the user tries to interact with something
   * that doesn't exist in the current room.
   *
   * @param target The target of the interaction, which doesn't exist in the current room.
   * @returns A string indicating that the target doesn't exist in the current room.
   */
  handleNoTarget(target: string | null): string {
    return `There is no ${target} here.`
  }
}
