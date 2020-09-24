import localInstance from './../../test/instance'

describe('push(item)', () => {
  it('should unshift in a well referrenced list', () => {
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

    LL.unshift({
      id: '4',
    })

    expect(LL.sorted).toEqual([
      {
        id: '4',
        next: { id: '1' },
      },
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
})
