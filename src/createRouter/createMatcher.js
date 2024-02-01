export function createRouterMatcher(routes, history) {
  /**
   * {
   *   children: [],
   *   record: {
   *     path: '',
   *     component: '',
   *     children: []
   *   }
   * }
   */
  const matchers = [];
  const matcherMap = new Map();
  function getRoutes() {
    return matchers;
  }
  function addRoute(record, parent, originalRecord) {
  
    const matcher = {
      children: record.children || [],
      record
    }
    matchers.push(matcher)
  }
  function removeRoute() {

  }
  routes.forEach(route => addRoute(route));
  return { addRoute, removeRoute, getRoutes };
}