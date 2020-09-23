import LinkedList from '../src/index'

export default () =>
  new LinkedList({
    getId: (node) => node.id,
    getNextId: (node) => (node.next && node.next.id ? node.next.id : null),
    setNextId: (node, nextId) => {
      if (!node.next) {
        node.next = {}
      }
      node.next.id = nextId
    },
  })
