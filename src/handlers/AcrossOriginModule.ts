import { AcrossOriginModule } from "generated";

AcrossOriginModule.Deposited.handler(async ({ event, context }) => {
  const entity = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    nonce: event.params.nonce,
    chainId: event.chainId,
  };

  context.AcrossOriginModule_Deposited.set(entity);
});
