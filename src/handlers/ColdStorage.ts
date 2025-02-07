// import {
//   ColdStorageHook,
//   ColdStorageHook_TimelockExecuted,
//   ColdStorageHook_TimelockRequested,
//   ColdStorageHook_TimelockQuery,
//   ColdStorageHook_TimelockRequested_eventArgs,
//   eventLog,
//   ColdStorageHook_TimelockExecuted_eventArgs,
// } from "generated";
//
// ColdStorageHook.TimelockRequested.handler(async ({ event, context }) => {
//   const entity: ColdStorageHook_TimelockRequested = {
//     id: `${event.transaction.hash}_${event.logIndex}`,
//     subAccount: event.params.subAccount,
//     hash: event.params.hash,
//     executeAfter: event.params.executeAfter,
//     chainId: event.chainId,
//   };
//
//   context.ColdStorageHook_TimelockRequested.set(entity);
//   createTimelockQuery({ event, context });
// });
//
// ColdStorageHook.TimelockExecuted.handler(async ({ event, context }) => {
//   const entity: ColdStorageHook_TimelockExecuted = {
//     id: `${event.transaction.hash}_${event.logIndex}`,
//     subAccount: event.params.subAccount,
//     hash: event.params.hash,
//     chainId: event.chainId,
//   };
//
//   context.ColdStorageHook_TimelockExecuted.set(entity);
//   updateTimelockQuery({ event, context });
// });
//
// const createTimelockQuery = ({
//   event,
//   context,
// }: {
//   event: eventLog<ColdStorageHook_TimelockRequested_eventArgs>;
//   context: any;
// }) => {
//   const entity: ColdStorageHook_TimelockQuery = {
//     id: `${event.chainId}_${event.params.subAccount}_${event.params.hash}`,
//     subAccount: event.params.subAccount,
//     hash: event.params.hash,
//     executeAfter: event.params.executeAfter,
//     chainId: event.chainId,
//     isExecuted: false,
//   };
//
//   context.ColdStorageHook_TimelockQuery.set(entity);
// };
//
// const updateTimelockQuery = async ({
//   event,
//   context,
// }: {
//   event: eventLog<ColdStorageHook_TimelockExecuted_eventArgs>;
//   context: any;
// }) => {
//   const entity = await context.ColdStorageHook_TimelockQuery.get(
//     `${event.chainId}_${event.params.subAccount}_${event.params.hash}`,
//   );
//
//   if (entity) {
//     context.ColdStorageHook_TimelockQuery.set({ ...entity, isExecuted: true });
//   }
// };
