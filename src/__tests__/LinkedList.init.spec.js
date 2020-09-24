import localInstance from './../../test/instance'

describe('init(items = [])', () => {
  it('should init a well referrenced list', () => {
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

    expect(LL.sorted).toEqual([
      {
        id: '1',
        next: { id: '2' },
      },
      {
        id: '2',
        next: { id: '3' },
      },
      {
        id: '3',
        next: { id: null },
      },
    ])
  })

  it('should init a well with only one item', () => {
    const LL = localInstance()
    LL.init([
      {
        id: '2',
      },
    ])

    expect(LL.sorted).toEqual([
      {
        id: '2',
        next: { id: null },
      },
    ])

    expect(LL.unsorted).toEqual([])
  })
})
