import { useHistoryStateNavigation } from "./state"
import { useHistoryListeners } from "./listener"


export function createWebHistory(base) {
  /**
   * 1.创建自己的路由系统，需要包含当前的路径，当前路径下的状态，需要提两个方法用来切换路由pushState replaceState
   * 2.路由监听，如果路径变化需要通知用户
   */

  // 创建路由系统
  const historyNavigation = useHistoryStateNavigation(base || '')
  const { location, state } = historyNavigation

  // 监听变化
  const historyListeners = useHistoryListeners(state, location)
  function go() {

  }
  const routerHistory = Object.assign({
    location: '',
    base,
    go,
  }, historyNavigation, historyListeners)
  Object.defineProperty(routerHistory, 'location', {
    enumerable: true,
    get: () => historyNavigation.location.value,
  });
  Object.defineProperty(routerHistory, 'state', {
    enumerable: true,
    get: () => historyNavigation.state.value,
  });
  return routerHistory
}