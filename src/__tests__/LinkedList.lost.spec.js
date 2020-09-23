import localInstance from './../../test/instance'

describe('get lost()', () => {
  it('should get lost items in a well referrenced list', () => {
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
        next: { id: null },
      },
    ])

    expect(LL.lost).toEqual([])
  })

  it('should get lost items in a list with 1 unreferenced item', () => {
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
        next: { id: null },
      },
      {
        id: '4',
      },
    ])

    expect(LL.lost).toEqual([
      {
        id: '4',
        next: { id: null },
      },
    ])
  })
})
