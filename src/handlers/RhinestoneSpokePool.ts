import { RhinestoneSpokePool } from "generated";
import { ORCHESTRATOR_URL } from "../utils/constants";

RhinestoneSpokePool.Filled.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    nonce: event.params.nonce,
    chainId: event.chainId,
  };

  context.RhinestoneSpokePool_Filled.set(entity);

  await fetch(`${ORCHESTRATOR_URL}/chain-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ENVIO_ORCHESTRATOR_API_KEY!,
    },
    body: JSON.stringify({
      eventType: "Filled",
      chainId: event.chainId,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      params: {
        txHash: event.transaction.hash,
        nonce: event.params.nonce,
      },
    }),
  });
});
