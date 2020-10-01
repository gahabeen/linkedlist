import localInstance from './../../test/instance'

describe('order(items = [])', () => {
  it('should order a well referrenced list', () => {
    const LL = localInstance()
    LL.order([
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

  it('should order an unwell referrenced list', () => {
    const LL = localInstance()
    LL.order([
      {
        id: '2',
        next: null,
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
        next: null,
      },
    ])
  })
})
