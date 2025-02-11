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
      event: "Filled",
      transaction: event.transaction,
      block: event.block,
      fillDataHash: event.params.fillDataHash,
    }),
  });
});
