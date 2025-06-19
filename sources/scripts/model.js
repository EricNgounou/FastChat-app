'use strict';

export default class NewMessage {
  constructor(index, message, next = null) {
    this.index = index;
    this.message = message;
    this.next = next;
  }
}
