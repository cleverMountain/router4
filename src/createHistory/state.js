
import { hooks } from "../createRouter";

export function useHistoryStateNavigation(base) {

  // 当前路径
  const currentLocation = {
    value: createCurrentLocation()
  }
  // 状态
  const historyState = { value: window.history.state }


  if (!historyState.value) {
    /**
     * 首次刷新页面，维护一个状态
     * 后退，当前 去哪里 用的是push还是replace，跳转后位置滚动条在哪里
     */
    let state = buildState(null, currentLocation.value, null, true)
    // to state replace?
    changeLocation(currentLocation.value, state, true);
  }
  // 添加路径pushState
  function push(to, data) {
    // to 去哪儿  状态data
    // 跳转前状态，用于路由拦截，router.beforeEach()
    const currentState = Object.assign(
      {},
      historyState.value,
      {
        forward: to,
        replace: false
      }
    )
    // 只是跟新状态但是不跳转路由
    changeLocation(to, currentState, true)
    // 跳转后状态
    const afetrState = Object.assign(
      {},
      {
        ...buildState(currentLocation.value, to, null)
      },
      {
        position: currentState.position + 1
      },
      data
    )
    changeLocation(to, afetrState, false)
    currentLocation.value = to
  }
  // 替换路径replaceState
  function replace(to, data) {
    // to 去哪儿  状态data
    const { back, forward, replace } = historyState.value
    const state = Object.assign(
      {},
      // 只用替换以前的current
      buildState(back, to, forward, replace),
      data
    )
    // 跳转
    changeLocation(to, state, true)
    // 更新路径
    currentLocation.value = to
  }
  function changeLocation(to, state, replaced) {
    const next = () => {
      // replaceState不刷新页面
      history[replaced ? 'replaceState' : 'pushState'](state, '', to);
      // 更新状态
      historyState.value = state;
    }
    const runHooks = (index) => {
      if (index === hooks.length) {
        next()
      } else {
        const hook = hooks[index]
        hook(to, currentLocation.value, () => runHooks(index + 1))
      }
    }
    runHooks(0)
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace,

  }
}


export function createCurrentLocation() {

  const { pathname, search, hash } = window.location

  return pathname + search + hash

}

export function buildState(back, current, forward, replace) {
  return {
    // 回退
    back,
    // 当前路径
    current,
    // 前进
    forward,
    // 位置
    position: window.history.length - 1,
    // 是否使用replace 
    replace,
  }
}