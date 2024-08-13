import {
  AutoSavingsContract,
  AutoSavings_AutoSaveExecutedEntity,
} from "generated";

AutoSavingsContract.AutoSaveExecuted.handler(({ event, context }) => {
  const entity: AutoSavings_AutoSaveExecutedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    smartAccount: event.params.smartAccount,
    token: event.params.token,
    amountReceived: event.params.amountReceived,
    chainId: event.chainId,
  };

  context.AutoSavings_AutoSaveExecuted.set(entity);
});
