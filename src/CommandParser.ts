import { Command } from './common/interfaces';

export class CommandParser {
  /**
   * Parses a command string into a Command object.
   *
   * @param command The string to parse.
   * @returns A Command object with the action and target.
   */
  parse(command: string): Command {
    const words  = command.split(' ');
    const action = words[0];
    const target = words[1] || null;

    return { action, target };
  }
}
