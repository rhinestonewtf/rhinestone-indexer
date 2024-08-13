import {
  ScheduledOrdersContract,
  ScheduledOrders_ExecutionAddedEntity,
  ScheduledOrders_ExecutionTriggeredEntity,
  ScheduledOrders_ExecutionsCancelledEntity,
} from "generated";

ScheduledOrdersContract.ExecutionAdded.handler(({ event, context }) => {
  const entity: ScheduledOrders_ExecutionAddedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionAdded.set(entity);
});

ScheduledOrdersContract.ExecutionTriggered.handler(({ event, context }) => {
  const entity: ScheduledOrders_ExecutionTriggeredEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionTriggered.set(entity);
});

ScheduledOrdersContract.ExecutionsCancelled.handler(({ event, context }) => {
  const entity: ScheduledOrders_ExecutionsCancelledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionsCancelled.set(entity);
});
