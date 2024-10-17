import { AutoSavings, AutoSavings_AutoSaveExecuted } from "generated";

AutoSavings.AutoSaveExecuted.handler(
  async ({ event, context }: { event: any; context: any }) => {
    const entity: AutoSavings_AutoSaveExecuted = {
      id: `${event.transaction.hash}_${event.logIndex}`,
      smartAccount: event.params.smartAccount,
      token: event.params.token,
      amountReceived: event.params.amountReceived,
      chainId: event.chainId,
    };

    context.AutoSavings_AutoSaveExecuted.set(entity);
  },
);
