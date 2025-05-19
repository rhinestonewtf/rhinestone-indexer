import { RhinestoneSpokePool } from "generated";
import { ORCHESTRATOR_DEV_URL, ORCHESTRATOR_URL } from "../utils/constants";
import { getIsDev, sendToOrchestrator } from "../utils/orchestrator";

RhinestoneSpokePool.Filled.handler(async ({ event, context }) => {
  const data = {
    eventType: "Filled",
    chainId: event.chainId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    params: {
      txHash: event.transaction.hash,
      nonce: event.params.nonce.toString(),
    },
  };

  const isDev = getIsDev({ tx: event.transaction });

  if (isDev) {
    await sendToOrchestrator({
      data,
      orchestratorUrl: ORCHESTRATOR_DEV_URL,
      orchestratorApiKey: process.env.ENVIO_ORCHESTRATOR_DEV_API_KEY!,
    });
  } else {
    await sendToOrchestrator({
      data,
      orchestratorUrl: ORCHESTRATOR_URL,
      orchestratorApiKey: process.env.ENVIO_ORCHESTRATOR_API_KEY!,
    });
  }

  // fetch(`${ORCHESTRATOR_URL}/chain-events`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": process.env.ENVIO_ORCHESTRATOR_API_KEY!,
  //   },
  //   body,
  // });
  //
  // fetch(`${ORCHESTRATOR_DEV_URL}/chain-events`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": process.env.ENVIO_ORCHESTRATOR_DEV_API_KEY!,
  //   },
  //   body,
  // });
  //
  // context.RhinestoneSpokePool_Filled.set({
  //   id: `${event.transaction.hash}_${event.logIndex}`,
  //   nonce: event.params.nonce,
  //   chainId: event.chainId,
  //   txHash: event.transaction.hash,
  //   sender: event.transaction.from!,
  //   timestamp: BigInt(event.block.timestamp),
  // });
});
