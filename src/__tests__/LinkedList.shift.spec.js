import localInstance from './../../test/instance'

describe('shift()', () => {
  it('should shift (remove first item and returns it) in a well referrenced list', () => {
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

    expect(LL.shift()).toEqual({ id: '1', next: { id: '2' } })
    expect(LL.sorted.length).toEqual(2)
  })
})
