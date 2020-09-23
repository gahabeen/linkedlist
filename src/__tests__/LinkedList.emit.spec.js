import localInstance from './../../test/instance'

describe('emit()', () => {
  it('should fire the watcher', () => {
    const LL = localInstance()
    let hit = 0
    function watcher() {
      hit += 1
    }
    LL.watch(watcher)
    LL.push({ id: '1' })
    expect(hit).toEqual(2) // because it fires once when defined and then on push
  })
})
