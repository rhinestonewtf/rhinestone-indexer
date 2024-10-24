import {
  SmartAccount,
  SmartAccount_ModuleInstalled,
  SmartAccount_ModuleUninstalled,
  SmartAccount_ModuleQuery,
  eventLog,
} from "generated";

SmartAccount.ModuleInstalled.handler(
  async ({ event, context }) => {
    const entity: SmartAccount_ModuleInstalled = {
      id: `${event.transaction.hash}_${event.logIndex}`,
      smartAccount: event.srcAddress,
      moduleTypeId: event.params.moduleTypeId,
      moduleAddress: event.params.moduleAddress,
      chainId: event.chainId,
    };

    context.SmartAccount_ModuleInstalled.set(entity);
    addModuleToQuery({ event, context });
  },
  {
    wildcard: true,
  },
);

SmartAccount.ModuleUninstalled.handler(
  async ({ event, context }) => {
    const entity: SmartAccount_ModuleUninstalled = {
      id: `${event.transaction.hash}_${event.logIndex}`,
      smartAccount: event.srcAddress,
      moduleTypeId: event.params.moduleTypeId,
      moduleAddress: event.params.moduleAddress,
      chainId: event.chainId,
    };

    context.SmartAccount_ModuleUninstalled.set(entity);
    removeModuleFromQuery({ event, context });
  },
  {
    wildcard: true,
  },
);

const addModuleToQuery = async ({ event, context }): Promise<void> => {
  const module = await context.SmartAccount_ModuleQuery.get(
    `${event.chainId}-${event.srcAddress}-${event.params.moduleAddress}`,
  );

  if (!module) {
    const entity: SmartAccount_ModuleQuery = {
      id: `${event.srcAddress}-${event.params.moduleAddress}`,
      smartAccount: event.srcAddress,
      moduleTypeId: event.params.moduleTypeId,
      moduleAddress: event.params.moduleAddress,
      isInstalled: true,
      chainId: event.chainId,
    };

    context.SmartAccount_ModuleQuery.set(entity);
  } else {
    context.SmartAccount_ModuleQuery.set({ ...module, isInstalled: true });
  }
};

const removeModuleFromQuery = async ({ event, context }) => {
  const module = await context.SmartAccount_ModuleQuery.get(
    `${event.chainId}-${event.srcAddress}-${event.params.moduleAddress}`,
  );

  if (module) {
    context.SmartAccount_ModuleQuery.set({ ...module, isInstalled: false });
  }
};
