import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const TasksLists = React.lazy(() => import("./Demo/Tasks/Home"));

const SharedList = React.lazy(() => import("./Demo/Tasks/sharedList"));

const SharedTask = React.lazy(() => import("./Demo/Tasks/sharedTask"));

const routes = [
  {
    path: "/lists/",
    exact: true,
    name: "Tasks",
    component: TasksLists,
  },
  {
    path: "/list/:id",
    exact: true,
    name: "Task List",
    component: SharedList,
  },
  {
    path: "/task/:id",
    exact: true,
    name: "Task",
    component: SharedTask,
  },
];

export default routes;
