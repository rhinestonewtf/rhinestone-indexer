import { AcrossTargetModule } from "generated";

AcrossTargetModule.Filled.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    fillDataHash: event.params.fillDataHash,
    chainId: event.chainId,
  };

  context.AcrossTargetModule_Filled.set(entity);
});
