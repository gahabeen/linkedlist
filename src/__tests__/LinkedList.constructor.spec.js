import LinkedList from './../index'

describe('constructor(options)', () => {
  it('should instanciate with default helper methods - _getId()', () => {
    const LL = new LinkedList({
      getId: (node) => node.id,
      getNextId: (node) => (node.next && node.next.id ? node.next.id : null),
      setNextId: (node, nextId) => {
        if (!node.next) {
          node.next = {}
        }
        node.next.id = nextId
      },
    })
    expect(LL._getId({ id: '1' })).toEqual('1')
  })

  it('should instanciate with default helper methods - _getNextId()', () => {
    const LL = new LinkedList({
      getId: (node) => node.id,
      getNextId: (node) => (node.next && node.next.id ? node.next.id : null),
      setNextId: (node, nextId) => {
        if (!node.next) {
          node.next = {}
        }
        node.next.id = nextId
      },
    })
    expect(LL._getNextId({ next: { id: '1' } })).toEqual('1')
  })

  it('should instanciate with default helper methods - _setNextId()', () => {
    const LL = new LinkedList({
      getId: (node) => node.id,
      getNextId: (node) => (node.next && node.next.id ? node.next.id : null),
      setNextId: (node, nextId) => {
        if (!node.next) {
          node.next = {}
        }
        node.next.id = nextId
      },
    })
    const item = { id: '1' }
    LL._setNextId(item, '2')
    expect(item.next.id).toEqual('2')
  })
})
