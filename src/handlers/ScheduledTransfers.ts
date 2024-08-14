import {
  ScheduledTransfersContract,
  ScheduledTransfersContract_ExecutionAddedEvent_eventArgs,
  ScheduledTransfersContract_ExecutionAddedEvent_handlerContextAsync,
  ScheduledTransfersContract_ExecutionTriggeredEvent_eventArgs,
  ScheduledTransfersContract_ExecutionTriggeredEvent_handlerContextAsync,
  ScheduledTransfers_ExecutionAddedEntity,
  ScheduledTransfers_ExecutionTriggeredEntity,
  ScheduledTransfers_ExecutionsCancelledEntity,
  eventLog,
  scheduledTransfers_ExecutionQueryEntity,
} from "generated";
import { getExecutionDetails } from "./ScheduledOrders";

ScheduledTransfersContract.ExecutionAdded.handlerAsync(
  async ({ event, context }) => {
    const entity: ScheduledTransfers_ExecutionAddedEntity = {
      id: `${event.transactionHash}_${event.logIndex}`,
      smartAccount: event.params.smartAccount,
      jobId: event.params.jobId,
      chainId: event.chainId,
    };

    context.ScheduledTransfers_ExecutionAdded.set(entity);
    await addExecutionQuery({ event, context });
  }
);

ScheduledTransfersContract.ExecutionTriggered.handlerAsync(
  async ({ event, context }) => {
    const entity: ScheduledTransfers_ExecutionTriggeredEntity = {
      id: `${event.transactionHash}_${event.logIndex}`,
      smartAccount: event.params.smartAccount,
      jobId: event.params.jobId,
      chainId: event.chainId,
    };

    context.ScheduledTransfers_ExecutionTriggered.set(entity);
    await incrementExecutionQuery({ event, context });
  }
);

ScheduledTransfersContract.ExecutionsCancelled.handler(({ event, context }) => {
  const entity: ScheduledTransfers_ExecutionsCancelledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    chainId: event.chainId,
  };

  context.ScheduledTransfers_ExecutionsCancelled.set(entity);
});

const addExecutionQuery = async ({
  event,
  context,
}: {
  event: eventLog<ScheduledTransfersContract_ExecutionAddedEvent_eventArgs>;
  context: ScheduledTransfersContract_ExecutionAddedEvent_handlerContextAsync;
}) => {
  const [
    executeInterval,
    numberOfExecutions,
    numberOfExecutionsCompleted,
    startDate,
    isEnabled,
    lastExecutionTime,
    executionData,
  ] = await getExecutionDetails({ event });

  const entity: scheduledTransfers_ExecutionQueryEntity = {
    id: `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`,
    smartAccount: event.srcAddress,
    jobId: event.params.jobId,
    chainId: event.chainId,
    executeInterval,
    numberOfExecutions,
    numberOfExecutionsCompleted,
    startDate,
    isEnabled,
    lastExecutionTime,
    executionData,
  };

  context.ScheduledTransfers_ExecutionQuery.set(entity);
};

const incrementExecutionQuery = async ({
  event,
  context,
}: {
  event: eventLog<ScheduledTransfersContract_ExecutionTriggeredEvent_eventArgs>;
  context: ScheduledTransfersContract_ExecutionTriggeredEvent_handlerContextAsync;
}) => {
  const entity = await context.ScheduledTransfers_ExecutionQuery.get(
    `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`
  );

  if (entity) {
    context.ScheduledTransfers_ExecutionQuery.set({
      ...entity,
      numberOfExecutionsCompleted: BigInt(
        Number(entity.numberOfExecutionsCompleted) + Number(1n)
      ),
    });
  }
};
