import {
  ColdStorageHookContract,
  ColdStorageHook_TimelockExecutedEntity,
  ColdStorageHook_TimelockRequestedEntity,
} from "generated";

ColdStorageHookContract.TimelockExecuted.handler(({ event, context }) => {
  const entity: ColdStorageHook_TimelockExecutedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    subAccount: event.params.subAccount,
    hash: event.params.hash,
    chainId: event.chainId,
  };

  context.ColdStorageHook_TimelockExecuted.set(entity);
});

ColdStorageHookContract.TimelockRequested.handler(({ event, context }) => {
  const entity: ColdStorageHook_TimelockRequestedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    subAccount: event.params.subAccount,
    hash: event.params.hash,
    executeAfter: event.params.executeAfter,
    chainId: event.chainId,
  };

  context.ColdStorageHook_TimelockRequested.set(entity);
});
