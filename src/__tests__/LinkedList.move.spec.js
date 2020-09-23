import localInstance from './../../test/instance'

describe('move(oldIndex, newIndex)', () => {
  it('should move an item in a well referrenced list', () => {
    const LL = localInstance()
    LL.init([
      {
        id: '2',
        next: { id: '3' },
      },
      {
        id: '1',
        next: { id: '2' },
      },
      {
        id: '3',
      },
    ])

    LL.move(1, 0)

    expect(LL.list).toEqual([
      {
        id: '2',
        next: { id: '1' },
      },
      {
        id: '1',
        next: { id: '3' },
      },
      {
        id: '3',
        next: { id: null },
      },
    ])
  })

  it('should move an item from then end, in a well referrenced list', () => {
    const LL = localInstance()
    LL.init([
      {
        id: '2',
        next: { id: '3' },
      },
      {
        id: '1',
        next: { id: '2' },
      },
      {
        id: '3', 
      },
    ])

    LL.move(2, 1)

    expect(LL.list).toEqual([

      {
        id: '1',
        next: { id: '3' },
      },
      {
        id: '3',
        next: { id: '2' },
      },
      {
        id: '2',
        next: { id: null },
      },
    ])
  })

  
  it('should move an item to then end, in a well referrenced list', () => {
    const LL = localInstance()
    LL.init([
      {
        id: '2',
        next: { id: '3' },
      },
      {
        id: '1',
        next: { id: '2' },
      },
      {
        id: '3', 
      },
    ])

    LL.move(1, 2)

    expect(LL.list).toEqual([

      {
        id: '1',
        next: { id: '3' },
      },
      {
        id: '3',
        next: { id: '2' },
      },
      {
        id: '2',
        next: { id: null },
      },
    ])
  })
})
