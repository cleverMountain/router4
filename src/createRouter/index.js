import { createRouterMatcher } from "./createMatcher";

const hooks = []


export function generateRouter(options) {
  const { routes, history } = options
  const matcher = createRouterMatcher(routes, options);

  const router = {
    ...history,
    ...matcher,
    beforeEach(handler) {
      hooks.push(handler)
    },
    useRouter() {
      return router
    }
  }

  return router
}

export { hooks }