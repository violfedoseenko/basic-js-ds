const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootN = null;
  }
  root() {
    return this.rootN ;
  }

  add(data) {
    this.rootN = addWithin(this.rootN, data);
    function addWithin(node, data) {
      // если проверка выдала null, значит место вакантно и можно добавлять новый узел
      if (!node) {
        return new Node(data);
      }
      //если такое элемент существует - ничего не делаем и возвращаем просто текущий узел
      //одинаковых узлов быть в делеве не может
      if (node.data === data) {
        return node;
      }
      // если значение, которое хотим добавить меше значения в текущем узле, то левый потомок
      // будет името то значение, которое вернет функция addWithin : 
      // - либо новый узел, если в нем ничего не было
      // - либо самого себя, если значение совпадает
      // - либо снова вызовем addWithin с новым корнем и по сути положим всю структуру обратно
      if (data < node.data) {
        node.left = addWithin(node.left, data)
      } else {
        node.right = addWithin(node.right, data)
      }
      return node;
      // таким образом addWithin будет постеренно обновлять все узлы, пока не дойдет до вакантного 
      // места. Тогда он добавит новый узел( он будет лиюо левым, либо правым потомком 
      // для существующего узла)
    }
  }

  has(data) {
    return searchWithin(this.rootN, data);
    function searchWithin(node, data) {
      //щли по верному направлению но пришли на пустую позицию( на null)
      if (!node) {
        return false;
      }
      //значение  в искосом узле совпадает с искомым
      if (node.data === data){
        return true;
      }
      //узел есть, но значение в узле не равняется искомому. Проверяем, если значение 
      //меньше искомого, то пробуем поискать внутри левого узла. иначе, пробуем искать внутри правого
      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  find(data) {
    return findWithin(this.rootN, data);
    function findWithin(node, data) {
      //щли по верному направлению но пришли на пустую позицию( на null)
      if (!node) {
        return null;
      }
      //значение  в искосом узле совпадает с искомым
      if (node.data === data){
        return node;
      }
      //узел есть, но значение в узле не равняется искомому. Проверяем, если значение 
      //меньше искомого, то пробуем поискать внутри левого узла. иначе, пробуем искать внутри правого
      return data < node.data ?
        findWithin(node.left, data) :
        findWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootN = removeNode(this.rootN, data);

    function removeNode(node, data) {
      // ТОЧКА ОСТАНОВКИ РЕКУРСИИ
      //если узла нет (null), то null мы там и оставляем
      if (!node) {
        return null;
      }
      // определяем в какую сторону нам пойти:
      // если искомое значеие меньше, чем в текщем узле => 
      // идем к левому узлу и просим удалить из левого поддерева искомое data 
      // и положить в левое поддерево результат уже без удпленного элемента
      // и вернем текущий узел node наверх, чтобы мы положили его в наш корень дерева

      // все наши преобразования о рекурсии возвращаются все выше и выше (благодаря return node)
      // и мы в каждом шаге рекурсии получаем обновленное поддерево целиком

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // equal - should remove this item
        // но сначала проверим, является ли текущий узел ЛИСТОМ?если так, то его можно безопасно удалить
        //  и вернуть null, как-будто его и не было
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }
        // если нет легого потомка, значит есть правый, и мы вместо нашего удаляемого элемента помещаем 
        // его правого потомка, и возвращаем обновленный узел в качестве результата
        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }
        // есть и правй и левый потомки, тогда начинаем искать минимум среди правого поддерева: начинаем с корня правого подерева
        // both children exists for this item
        let minFromRight = node.right;
        // пока элемент слева есть - сдвигаемся  к нему
        // как только найден минимум в правом поддереве, мы  его значение помещаем в
        // значение удаляемого узла(скопировали его)
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        // теперь необходимо удалить узел с мин.значением из правого поддерева. Делаем это с помощью
        // рекурсивного вызова текущей функции removeNode.
        // говорим обновить правое поддерево  в соответствии с тем , что вернет улаление из
        // правого поддерева node.right этого minFromRight.data минимального значения
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    // проверяем есть ли корень?нет элементов - нечего возвращать, вернет undefind
    if (!this.rootN) {
      return;
    }
    // Есть элемент меньше? если есть - переходим к нему. как только дошли до свмого меньшего , 
    // останавливаем  while и возвращаем его значение
    let node = this.rootN;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootN) {
      return;
    }
    let node = this.rootN;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};