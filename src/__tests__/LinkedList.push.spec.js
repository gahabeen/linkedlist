import localInstance from './../../test/instance'

describe('push(item)', () => {
  it('should push in a well referrenced list', () => {
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

    LL.push({
      id: '4',
    })

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
        next: { id: '4' },
      },
      {
        id: '4',
        next: { id: null },
      },
    ])
  })
})
