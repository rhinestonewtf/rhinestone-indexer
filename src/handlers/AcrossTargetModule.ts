import { AcrossTargetModule } from "generated";
import { ORCHESTRATOR_URL } from "../utils/constants";

AcrossTargetModule.Filled.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    fillDataHash: event.params.fillDataHash,
    chainId: event.chainId,
  };

  context.AcrossTargetModule_Filled.set(entity);

  await fetch(`${ORCHESTRATOR_URL}/chain-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ORCHESTRATOR_API_KEY!,
    },
    body: JSON.stringify({
      eventType: "Filled",
      chainId: event.chainId,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      params: {
        txHash: event.transaction.hash,
        depositId: event.params.fillDataHash,
      }
    }),
  });
});
