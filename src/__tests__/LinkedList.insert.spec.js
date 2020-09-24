import localInstance from './../../test/instance'

describe('insert(item, index)', () => {
  it('should insert in a well referrenced list', () => {
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

    LL.insert(
      {
        id: '4',
      },
      1
    )

    expect(LL.sorted).toEqual([
      {
        id: '1',
        next: { id: '4' },
      },
      {
        id: '4',
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
})
