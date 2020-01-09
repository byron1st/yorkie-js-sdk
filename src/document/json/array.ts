import { logger } from '../../util/logger';
import { TimeTicket } from '../time/ticket';
import { JSONElement } from './element';
import { RGA } from './rga';

/**
 * JSONArray represents JSON array data structure including logical clock.
 */
export class JSONArray extends JSONElement {
  private elements: RGA;

  constructor(createdAt: TimeTicket, elements: RGA) {
    super(createdAt);
    this.elements = elements;
  }

  public static create(createdAt: TimeTicket): JSONArray {
    return new JSONArray(createdAt, RGA.create());
  }

  public insertAfter(prevCreatedAt: TimeTicket, value: JSONElement): void {
    this.elements.insertAfter(prevCreatedAt, value);
  }

  public remove(createdAt: TimeTicket): JSONElement {
    return this.elements.remove(createdAt);
  }

  public removeByIndex(index: number): JSONElement {
    return this.elements.removeByIndex(index);
  }

  public toJSON(): string {
    const json = []
    for (const v of this.elements) {
      json.push(v.toJSON());
    }
    return `[${json.join(',')}]`;
  }

  public deepcopy(): JSONArray {
    const copy = JSONArray.create(this.getCreatedAt());
    for (const v of this.elements) {
      copy.insertAfter(copy.getLastCreatedAt(), v.deepcopy());
    }
    return copy;
  }

  public getLastCreatedAt(): TimeTicket {
    return this.elements.getLastCreatedAt();
  }
}
