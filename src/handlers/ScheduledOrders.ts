import {
  ScheduledOrders,
  ScheduledOrders_ExecutionAdded,
  scheduledOrders_ExecutionQuery,
  ScheduledOrders_ExecutionTriggered,
  ScheduledOrders_ExecutionsCancelled,
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
  Hex,
];

ScheduledOrders.ExecutionAdded.handler(async ({ event, context }) => {
  const entity: ScheduledOrders_ExecutionAdded = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionAdded.set(entity);
  await addExecutionQuery({ event, context });
});

ScheduledOrders.ExecutionTriggered.handler(async ({ event, context }) => {
  const entity: ScheduledOrders_ExecutionTriggered = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    jobId: event.params.jobId,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionTriggered.set(entity);
  await incrementExecutionQuery({ event, context });
});

ScheduledOrders.ExecutionsCancelled.handler(async ({ event, context }) => {
  const entity: ScheduledOrders_ExecutionsCancelled = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    chainId: event.chainId,
  };

  context.ScheduledOrders_ExecutionsCancelled.set(entity);
});

const addExecutionQuery = async ({ event, context }) => {
  const [
    executeInterval,
    numberOfExecutions,
    numberOfExecutionsCompleted,
    startDate,
    isEnabled,
    lastExecutionTime,
    executionData,
  ] = await getExecutionDetails({ event });

  const entity: scheduledOrders_ExecutionQuery = {
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

const incrementExecutionQuery = async ({ event, context }) => {
  const entity = await context.ScheduledOrders_ExecutionQuery.get(
    `${event.chainId}-${event.params.smartAccount}-${event.params.jobId}`,
  );

  if (entity) {
    context.ScheduledOrders_ExecutionQuery.set({
      ...entity,
      numberOfExecutionsCompleted: BigInt(
        Number(entity.numberOfExecutionsCompleted) + Number(1n),
      ),
    });
  }
};

export const getExecutionDetails = async ({ event }) => {
  const client = getClient(event.chainId);

  return (await client.readContract({
    address: event.srcAddress as Address,
    abi,
    functionName: "executionLog",
    args: [event.params.smartAccount, event.params.jobId],
  })) as ExecutionType;
};
