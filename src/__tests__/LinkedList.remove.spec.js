import localInstance from './../../test/instance'

describe('remove(index)', () => {
  it('should remove in a well referrenced list', () => {
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

    LL.remove(1)

    expect(LL.sorted).toEqual([
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

  it('should remove in a well referrenced list', () => {
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

    LL.remove(0)

    expect(LL.sorted).toEqual([
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

  it('should remove in a well referrenced list', () => {
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

    LL.remove(1)

    expect(LL.sorted).toEqual([
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

  it('should remove in a well referrenced list', () => {
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

    LL.remove(2)

    expect(LL.sorted).toEqual([
      {
        id: '1',
        next: { id: '2' },
      },
      {
        id: '2',
        next: { id: null },
      },
    ])
  })
})
