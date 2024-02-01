import { createCurrentLocation } from "./state"

export function useHistoryListeners(historyState, currentLocation) {

  const listens = []
  const popStateHandler = ({state}) => {
   
    const to  = createCurrentLocation()
    const from = currentLocation.value
    const fromState = historyState.value
    currentLocation.value = to
    historyState.value = state

    let isBack = state.position - fromState.position > 0
    listens.forEach(cb => cb(currentLocation.value, from, isBack))
  }
  window.addEventListener('popstate', popStateHandler)
  function listener (cb) {
    listens.push(cb)
  }
  return {
    listener
  }
}