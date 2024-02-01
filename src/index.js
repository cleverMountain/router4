import { createWebHistory } from "./createHistory/index";
import { generateRouter } from "./createRouter";

export const createWebHashHistory = createWebHistory
export const createRouter = generateRouter

/**
 * 
 * 前端路由的实现原理，两种模式 一种是hesh模式 一种history模式 
 * hapiwindow.location.hash= '/'  hashChange 
 * history.pushState(state,null,url) history.replaceState()// 目前浏览器 都支持7history.pushstate -history.pushstate(state,null,url)
 * history.pushState(state.ntll.'#)
// 两种路由的区别:
/ hash hash模式的好处就是点，刷新页面的时候不会像服务器发送请求，同时他不支持服务端染(不能做seo优化)。 不会产生404 忒丑
// hstory 特点就是路径漂亮 没有# 和正常页面切换一样，如果刷新页面会像服务器发送请求，如果资源不存在会出现404，解决方案 ， 染首页，首页会根据路径重新跳转
 */