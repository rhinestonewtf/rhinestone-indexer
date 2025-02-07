// import {
//   ScheduledTransfers,
//   ScheduledTransfers_ExecutionAdded,
//   ScheduledTransfers_ExecutionTriggered,
//   ScheduledTransfers_ExecutionsCancelled,
//   eventLog,
//   scheduledTransfers_ExecutionQuery,
// } from "generated";
// import { getExecutionDetails } from "./ScheduledOrders";
//
// ScheduledTransfers.ExecutionAdded.handler(async ({ event, context }) => {
//   const entity: ScheduledTransfers_ExecutionAdded = {
//     id: `${event.transaction.hash}_${event.logIndex}`,
//     smartAccount: event.params.smartAccount,
//     jobId: event.params.jobId,
//     chainId: event.chainId,
//   };
//
//   context.ScheduledTransfers_ExecutionAdded.set(entity);
//   await addExecutionQuery({ event, context });
// });
//
// ScheduledTransfers.ExecutionTriggered.handler(async ({ event, context }) => {
//   const entity: ScheduledTransfers_ExecutionTriggered = {
//     id: `${event.transaction.hash}_${event.logIndex}`,
//     smartAccount: event.params.smartAccount,
//     jobId: event.params.jobId,
//     chainId: event.chainId,
//   };
//
//   context.ScheduledTransfers_ExecutionTriggered.set(entity);
//   await incrementExecutionQuery({ event, context });
// });
//
// ScheduledTransfers.ExecutionsCancelled.handler(async ({ event, context }) => {
//   const entity: ScheduledTransfers_ExecutionsCancelled = {
//     id: `${event.transaction.hash}_${event.logIndex}`,
//     smartAccount: event.params.smartAccount,
//     chainId: event.chainId,
//   };
//
//   context.ScheduledTransfers_ExecutionsCancelled.set(entity);
// });
//
// const addExecutionQuery = async ({ event, context }) => {
//   const [
//     executeInterval,
//     numberOfExecutions,
//     numberOfExecutionsCompleted,
//     startDate,
//     isEnabled,
//     lastExecutionTime,
//     executionData,
//   ] = await getExecutionDetails({ event });
//
//   const entity: scheduledTransfers_ExecutionQuery = {
//     id: `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`,
//     smartAccount: event.srcAddress,
//     jobId: event.params.jobId,
//     chainId: event.chainId,
//     executeInterval,
//     numberOfExecutions,
//     numberOfExecutionsCompleted,
//     startDate,
//     isEnabled,
//     lastExecutionTime,
//     executionData,
//   };
//
//   context.ScheduledTransfers_ExecutionQuery.set(entity);
// };
//
// const incrementExecutionQuery = async ({ event, context }) => {
//   const entity = await context.ScheduledTransfers_ExecutionQuery.get(
//     `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`,
//   );
//
//   if (entity) {
//     context.ScheduledTransfers_ExecutionQuery.set({
//       ...entity,
//       numberOfExecutionsCompleted: BigInt(
//         Number(entity.numberOfExecutionsCompleted) + Number(1n),
//       ),
//     });
//   }
// };
