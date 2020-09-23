import localInstance from './../../test/instance'

describe('pop()', () => {
  it('should pop (remove last item and returns it) in a well referrenced list', () => {
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

    expect(LL.pop()).toEqual({
      id: '3',
      next: { id: null },
    })
    expect(LL.list.length).toEqual(2)
  })
})
