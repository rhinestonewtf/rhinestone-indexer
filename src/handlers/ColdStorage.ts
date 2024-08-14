import {
  ColdStorageHookContract,
  ColdStorageHook_TimelockExecutedEntity,
  ColdStorageHook_TimelockRequestedEntity,
  ColdStorageHook_TimelockQueryEntity,
  ColdStorageHookContract_TimelockRequestedEvent_eventArgs,
  ColdStorageHookContract_TimelockRequestedEvent_handlerContext,
  eventLog,
  ColdStorageHookContract_TimelockExecutedEvent_eventArgs,
} from "generated";

ColdStorageHookContract.TimelockRequested.handler(({ event, context }) => {
  const entity: ColdStorageHook_TimelockRequestedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    subAccount: event.params.subAccount,
    hash: event.params.hash,
    executeAfter: event.params.executeAfter,
    chainId: event.chainId,
  };

  context.ColdStorageHook_TimelockRequested.set(entity);
  createTimelockQuery({ event, context });
});

ColdStorageHookContract.TimelockExecuted.handler(({ event, context }) => {
  const entity: ColdStorageHook_TimelockExecutedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    subAccount: event.params.subAccount,
    hash: event.params.hash,
    chainId: event.chainId,
  };

  context.ColdStorageHook_TimelockExecuted.set(entity);
  updateTimelockQuery({ event, context });
});

const createTimelockQuery = ({
  event,
  context,
}: {
  event: eventLog<ColdStorageHookContract_TimelockRequestedEvent_eventArgs>;
  context: ColdStorageHookContract_TimelockRequestedEvent_handlerContext;
}) => {
  const entity: ColdStorageHook_TimelockQueryEntity = {
    id: `${event.params.subAccount}_${event.params.hash}`,
    subAccount: event.params.subAccount,
    hash: event.params.hash,
    executeAfter: event.params.executeAfter,
    chainId: event.chainId,
    isExecuted: false,
  };

  context.ColdStorageHook_TimelockQuery.set(entity);
};

const updateTimelockQuery = ({
  event,
  context,
}: {
  event: eventLog<ColdStorageHookContract_TimelockExecutedEvent_eventArgs>;
  context: ColdStorageHookContract_TimelockRequestedEvent_handlerContext;
}) => {
  const entity = context.ColdStorageHook_TimelockQuery.get(
    `${event.params.subAccount}_${event.params.hash}`
  );

  if (entity) {
    context.ColdStorageHook_TimelockQuery.set({ ...entity, isExecuted: true });
  }
};
