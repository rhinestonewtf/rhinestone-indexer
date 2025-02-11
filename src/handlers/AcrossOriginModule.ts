import { AcrossOriginModule } from "generated";
import { ORCHESTRATOR_URL } from "../utils/constants";

AcrossOriginModule.Deposited.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    nonce: event.params.nonce,
    chainId: event.chainId,
  };

  context.AcrossOriginModule_Deposited.set(entity);

  await fetch(`${ORCHESTRATOR_URL}/chain-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ORCHESTRATOR_API_KEY,
    },
    body: JSON.stringify({
      event: "Deposited",
      transaction: event.transaction,
      block: event.block,
      nonce: event.params.nonce,
    }),
  });
});
