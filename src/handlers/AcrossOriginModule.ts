import { AcrossOriginModule } from "generated";
import { ORCHESTRATOR_URL } from "../utils/constants";

AcrossOriginModule.Deposited.handler(async ({ event, context }) => {
  fetch(`${ORCHESTRATOR_URL}/chain-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ENVIO_ORCHESTRATOR_API_KEY!,
    },
    body: JSON.stringify({
      eventType: "Deposited",
      chainId: event.chainId,
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      params: {
        txHash: event.transaction.hash,
        depositId: event.params.nonce.toString(),
      },
    }),
  });

  context.AcrossOriginModule_Deposited.set({
    id: `${event.transaction.hash}_${event.logIndex}`,
    nonce: event.params.nonce,
    chainId: event.chainId,
    txHash: event.transaction.hash,
    sender: event.transaction.from!,
    timestamp: BigInt(event.block.timestamp),
  });
});
