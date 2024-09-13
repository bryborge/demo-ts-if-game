import { Command } from './common/interfaces';

export class CommandParser {
  /**
   * Parses a command string into a Command object.
   *
   * @param command The string to parse.
   * @returns A Command object with the action and target.
   */
  parse(input: string): Command {
    const normalizedAction = input.trim().toLowerCase();

    if (normalizedAction === 'i' || normalizedAction === 'inventory') {
      return { action: 'inventory', target: null };
    }

    // TODO: support cases where the actions mean the same thing (e.g. walk, go, move; or examine, look, etc.)
    const [action, target] = normalizedAction.split(' ', 2);
    return { action, target: target || null };
  }
}
