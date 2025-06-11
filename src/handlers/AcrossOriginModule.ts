import { AcrossOriginModule } from "generated";
import { getEnvironment, sendToOrchestrator } from "../utils/orchestrator";

AcrossOriginModule.Deposited.handler(async ({ event, context }) => {
  const data = {
    eventType: "Deposited",
    chainId: event.chainId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    params: {
      txHash: event.transaction.hash,
      depositId: event.params.nonce.toString(),
    },
  };

  const environment = getEnvironment({ nonce: event.params.nonce });

  await sendToOrchestrator({
    data,
    environment,
  });

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
  // context.AcrossOriginModule_Deposited.set({
  //   id: `${event.transaction.hash}_${event.logIndex}`,
  //   nonce: event.params.nonce,
  //   chainId: event.chainId,
  //   txHash: event.transaction.hash,
  //   sender: event.transaction.from!,
  //   timestamp: BigInt(event.block.timestamp),
  // });
});
