export default {
  // deployProcess: "flow/deploy" flowable
  deployProcess: "act/deploy", // activiti
  processList: "process/list",
  processBuffer: "process/buffer",
  processRemove: "process/${id}/remove",
  processDeploy: "process/${id}/deploy",
  processInstQuery: "process/inst/list",
  leaveApply: "leave/apply",
  leaveImage: "leave/procimage",
  leaveGrapInfo: "leave/grapinfo",
  leavePageQuery: "leave/${userId}/list",
  taskTodoQuery: "task/${userId}/todo",
  taskDoneQuery: "task/${userId}/done",
}
