import localInstance from './../../test/instance'

describe('watch()', () => {
  it('should set a watcher', () => {
    const LL = localInstance()
    function watcher() {}
    LL.watch(watcher, { immediate: true })
    expect(LL._watch).toEqual(watcher)
  })
})
