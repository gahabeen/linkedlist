/*!
  * @gahabeen/linkedlist v0.1.3
  * (c) 2020 Gabin Desserprit
  * @license MIT
  */
class LinkedList {
  constructor(options = {}) {
    const { getId = (item) => item.id } = options;
    const { getNextId = (item) => item.next } = options;
    const { setNextId = (item, nextId) => (item.next = nextId) } = options;

    this._list = [];
    this._lost = [];

    this._getId = getId;
    this._hasId = (item) => typeof this._getId(item) === 'string';
    this._getNextId = getNextId;
    this._setNextId = setNextId;
    this._watch = () => null;
  }

  get list() {
    return this._list
  }

  get lost() {
    return this._lost
  }

  _defaultNextId(item) {
    if (!this._getNextId(item)) {
      this._setNextId(item, null);
    }
  }

  _inspectListLength() {
    let length = this._list.length;
    return () => {
      return this._list.length - length
    }
  }

  _init(list) {
    const ids = list.map((item) => {
      this._checkItem(item);
      return this._getId(item)
    });
    const registry = new Map();
    let sorted = [];
    const unsorted = new Map();
    let cursor = null;

    // prepare the items
    for (let idx = 0; idx < list.length; idx++) {
      const item = list[idx];
      if (this._getNextId(item) == undefined || !ids.includes(this._getNextId(item))) {
        item.next = null;
        unsorted.set(this._getId(item), idx);
      } else {
        registry.set(this._getNextId(item), idx);
      }
    }

    // select the starter
    for (let [id] of Array.from(unsorted)) {
      if (registry.has(id)) {
        cursor = id;
        const _item = list[unsorted.get(id)];
        this._defaultNextId(_item);
        sorted.push(_item);
        unsorted.delete(id);
        break
      }
    }

    // sort the list
    while (cursor) {
      const nextItem = list[registry.get(cursor)];
      if (nextItem) {
        this._defaultNextId(nextItem);
        sorted.push(nextItem);
        registry.delete(cursor);
        cursor = this._getId(nextItem);
      } else {
        cursor = null;
      }
    }

    // retrieve remaining unsorted
    let lost = [...Array.from(registry), ...Array.from(unsorted)].map(([_, idx]) => {
      this._defaultNextId(list[idx]);
      return list[idx]
    });

    if (sorted.length === 0 && lost.length > 0) {
      sorted = [lost.pop()];
    }

    return {
      list: sorted.reverse(),
      lost,
    }
  }

  _checkItem(item) {
    if (item && !this._hasId(item)) {
      /* istanbul ignore next */
      throw new Error(`Provided item doesn't contain a proper id field.`)
    }
  }

  _referencePreviousItem(item, previous) {
    this._checkItem(item);

    this._setNextId(previous, this._getId(item));
  }

  _referenceNextItem(item, next) {
    this._checkItem(item);

    this._setNextId(item, this._getId(next));
  }

  // This is actually covered
  /* istanbul ignore next*/
  watch(callback = ({ list: [], lost: [] }) => null, { immediate = true } = {}) {
    this._watch = callback;
    if (immediate) this.emit();
    return this
  }

  emit() {
    this._watch({ list: this._list, lost: this._lost });
  }

  init(items = []) {
    const { list, lost } = this._init(items.length > 0 ? items : this._list);
    this._list = list;
    this._lost = lost;
    this.emit();

    return this
  }

  insert(item, index) {
    const inspectListLength = this._inspectListLength();

    this._checkItem(item);

    const previousItem = this._list[index - 1];
    const nextItem = this._list[index];

    if (previousItem) {
      this._referencePreviousItem(item, previousItem);
    }

    if (nextItem) {
      this._referenceNextItem(item, nextItem);
    } else {
      this._setNextId(item, null);
    }

    this._list.splice(index, 0, item);

    const difference = inspectListLength();
    if (difference <= 0) {
      /* istanbul ignore next */
      console.warn(`insert() should have added a new item to the list (+1), instead the difference is '${difference}'`);
    }

    this.emit();

    return this
  }

  remove(index) {
    const inspectListLength = this._inspectListLength();

    const previousItem = this._list[index - 1];
    const nextItem = this._list[index + 1];

    if (previousItem) {
      this._setNextId(previousItem, null);
      if (nextItem) {
        this._referencePreviousItem(nextItem, previousItem);
      }
    }

    this._list.splice(index, 1);

    const difference = inspectListLength();
    if (difference >= 0) {
      /* istanbul ignore next */
      console.warn(`remove() should have removed an item from the list (-1), instead the difference is '${difference}'`);
    }

    this.emit();

    return this
  }

  move(oldIndex, newIndex) {
    const inspectListLength = this._inspectListLength();

    const item = this._list[oldIndex];
    this.remove(oldIndex);
    this.insert(item, newIndex);

    const difference = inspectListLength();
    if (difference !== 0) {
      /* istanbul ignore next */
      console.warn(`move() should have moved an item within the list (0), instead the difference is '${difference}'`);
    }

    return this
  }

  push(item) {
    this.insert(item, this._list.length);
    return this
  }

  unshift(item) {
    this.insert(item, 0);
    return this
  }

  pop() {
    const lastIndex = this._list.length - 1;
    const item = this._list[lastIndex];
    this.remove(lastIndex);
    return item
  }

  shift() {
    const item = this._list[0];
    this.remove(0);
    return item
  }
}

export default LinkedList;
