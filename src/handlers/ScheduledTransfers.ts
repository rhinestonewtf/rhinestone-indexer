import {
  ScheduledTransfersContract,
  ScheduledTransfers_ExecutionAddedEntity,
  ScheduledTransfers_ExecutionTriggeredEntity,
  ScheduledTransfers_ExecutionsCancelledEntity,
} from "generated";

ScheduledTransfersContract.ExecutionAdded.handler(({ event, context }) => {
  const entity: ScheduledTransfers_ExecutionAddedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledTransfers_ExecutionAdded.set(entity);
});

ScheduledTransfersContract.ExecutionTriggered.handler(({ event, context }) => {
  const entity: ScheduledTransfers_ExecutionTriggeredEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledTransfers_ExecutionTriggered.set(entity);
});

ScheduledTransfersContract.ExecutionsCancelled.handler(({ event, context }) => {
  const entity: ScheduledTransfers_ExecutionsCancelledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    chainId: event.chainId,
  };

  context.ScheduledTransfers_ExecutionsCancelled.set(entity);
});
