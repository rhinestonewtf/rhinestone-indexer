import {
  OmniAccount,
  OmniAccount_Across_Deposit,
  OmniAccount_Across_Fill,
} from "generated";

OmniAccount.Deposited.handler(async ({ event, context }) => {
  const entity: OmniAccount_Across_Deposit = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    nonce: event.params.nonce,
    chainId: event.chainId,
  };

  context.OmniAccount_Across_Deposit.set(entity);
});

OmniAccount.Filled.handler(async ({ event, context }) => {
  const entity: OmniAccount_Across_Fill = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    fillDataHash: event.params.fillDataHash,
    chainId: event.chainId,
  };

  context.OmniAccount_Across_Fill.set(entity);
});
