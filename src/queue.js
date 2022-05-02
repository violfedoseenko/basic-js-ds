const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 * */
//
 
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
 
class Queue {

  constructor() {
    this.head = null;
    this.nextEl = null;
    this.length = 0;
  }


  getUnderlyingList() {
    return this.head;
  }

  enqueue(value) {
    const node = new Node(value);

    // если же у нас элементы есть, то мы должны получить ссылку на наш текущий 
    // элемент(начало нашего списка)
    if (this.head) {
      let nextEl = this.head;
      // пока у текущего элемента есть кто-то за ним,меняем ссылку на текщий элемент двигаясь к концу
      while(nextEl.next) {
        nextEl = nextEl.next;
      }
      this.nextEl.next = node;
    }

    //если нет головы(значит нет списка) мы создаем его. Теперь head равняется этому новому узлу и помещает элемент в конец очереди
    if (!this.head) this.head = node;
    this.nextEl = node;

  }

  dequeue() {
    const currentHead = this.head.value;
    this.head = this.head.next;
    this.length--;
    return currentHead;
  }

}

module.exports = {
  Queue
};
