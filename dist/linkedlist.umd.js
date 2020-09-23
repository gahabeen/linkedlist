/*!
  * @gahabeen/linkedlist v0.1.1
  * (c) 2020 Gabin Desserprit
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.GahabeenLinkedlist = factory());
}(this, (function () { 'use strict';

  class LinkedList {
    constructor(options = {}) {
      const { getId = (item) => item.id } = options;
      const { getNextId = (item) => item.next } = options;
      const { setNextId = (item, nextId) => (item.next = nextId) } = options;

      this._list = [];
      this._lost = [];

      this._getId = getId;
      this._getNextId = getNextId;
      this._setNextId = setNextId;
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

    _init(list) {
      const ids = list.map(this._getId);
      const registry = new Map();
      const sorted = [];
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
      const lost = [...Array.from(registry), ...Array.from(unsorted)].map(([_, idx]) => {
        this._defaultNextId(list[idx]);
        return list[idx]
      });

      return {
        list: sorted.reverse(),
        lost,
      }
    }

    _referencePreviousItem(item, previous) {
      this._setNextId(previous, this._getId(item));
    }

    _referenceNextItem(item, next) {
      this._setNextId(item, this._getId(next));
    }

    init(items = []) {
      const { list, lost } = this._init(items.length > 0 ? items : this._list);
      this._list = list;
      this._lost = lost;
      return this
    }

    push(item) {
      const lastItem = this._list[this._list.length - 1];
      this._defaultNextId(item);
      this._referencePreviousItem(item, lastItem);
      this._list.push(item);
      return this
    }

    unshift(item) {
      const firstItem = this._list[0];
      this._defaultNextId(item);
      this._referenceNextItem(item, firstItem);
      this._list.unshift(item);
      return this
    }

    insert(item, index) {
      const previousItem = this._list[index - 1];
      const nextItem = this._list[index];

      this._defaultNextId(item);

      if (previousItem) {
        this._referencePreviousItem(item, previousItem);
      }

      if (nextItem) {
        this._referenceNextItem(item, nextItem);
      }

      this._list.splice(index, 0, item);
      return this
    }

    move(oldIndex, newIndex) {
      const item = this._list[oldIndex];
      this.remove(oldIndex);
      this.insert(item, newIndex);
      return this
    }

    remove(index) {
      const previousItem = this._list[index - 1];
      const nextItem = this._list[index + 1];

      if (previousItem) {
        this._referencePreviousItem(nextItem, previousItem);
      }

      this._list.splice(index, 1);
      return this
    }
  }

  return LinkedList;

})));
