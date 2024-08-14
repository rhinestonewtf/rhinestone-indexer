import {
  ScheduledOrdersContract,
  ScheduledOrdersContract_ExecutionAddedEvent_eventArgs,
  ScheduledOrdersContract_ExecutionTriggeredEvent_eventArgs,
  ScheduledOrders_ExecutionAddedEntity,
  scheduledOrders_ExecutionQueryEntity,
  ScheduledOrders_ExecutionTriggeredEntity,
  ScheduledOrders_ExecutionsCancelledEntity,
  eventLog,
  ScheduledOrdersContract_ExecutionAddedEvent_handlerContextAsync,
  ScheduledOrdersContract_ExecutionTriggeredEvent_handlerContextAsync,
} from "generated";
import { getClient } from "../utils";
import { Address, Hex } from "viem";
import { abi } from "../utils/abis/scheduledOrdersAbi";

export type ExecutionType = [
  bigint,
  bigint,
  bigint,
  bigint,
  boolean,
  bigint,
  Hex
];

ScheduledOrdersContract.ExecutionAdded.handlerAsync(
  async ({ event, context }) => {
    const entity: ScheduledOrders_ExecutionAddedEntity = {
      id: `${event.transactionHash}_${event.logIndex}`,
      smartAccount: event.params.smartAccount,
      jobId: event.params.jobId,
      chainId: event.chainId,
    };

    context.ScheduledOrders_ExecutionAdded.set(entity);
    await addExecutionQuery({ event, context });
  }
);

ScheduledOrdersContract.ExecutionTriggered.handlerAsync(
  async ({ event, context }) => {
    const entity: ScheduledOrders_ExecutionTriggeredEntity = {
      id: `${event.transactionHash}_${event.logIndex}`,
      smartAccount: event.params.smartAccount,
      jobId: event.params.jobId,
      chainId: event.chainId,
    };

    context.ScheduledOrders_ExecutionTriggered.set(entity);
    await incrementExecutionQuery({ event, context });
  }
);

ScheduledOrdersContract.ExecutionsCancelled.handler(({ event, context }) => {
  const entity: ScheduledOrders_ExecutionsCancelledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionsCancelled.set(entity);
});

const addExecutionQuery = async ({
  event,
  context,
}: {
  event: eventLog<ScheduledOrdersContract_ExecutionAddedEvent_eventArgs>;
  context: ScheduledOrdersContract_ExecutionAddedEvent_handlerContextAsync;
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

  const entity: scheduledOrders_ExecutionQueryEntity = {
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

  context.ScheduledOrders_ExecutionQuery.set(entity);
};

const incrementExecutionQuery = async ({
  event,
  context,
}: {
  event: eventLog<ScheduledOrdersContract_ExecutionTriggeredEvent_eventArgs>;
  context: ScheduledOrdersContract_ExecutionTriggeredEvent_handlerContextAsync;
}) => {
  const entity = await context.ScheduledOrders_ExecutionQuery.get(
    `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`
  );

  if (entity) {
    context.ScheduledOrders_ExecutionQuery.set({
      ...entity,
      numberOfExecutionsCompleted: BigInt(
        Number(entity.numberOfExecutionsCompleted) + Number(1n)
      ),
    });
  }
};

export const getExecutionDetails = async ({
  event,
}: {
  event: eventLog<ScheduledOrdersContract_ExecutionAddedEvent_eventArgs>;
}) => {
  const client = getClient(event.chainId);

  return (await client.readContract({
    address: event.srcAddress as Address,
    abi,
    functionName: "executionLog",
    args: [event.params.smartAccount, event.params.jobId],
  })) as ExecutionType;
};
