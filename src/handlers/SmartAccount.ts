import {
  SmartAccountContract,
  SmartAccountContract_ModuleInstalledEvent_eventArgs,
  SmartAccountContract_ModuleInstalledEvent_handlerContext,
  SmartAccount_ModuleInstalledEntity,
  SmartAccount_ModuleUninstalledEntity,
  SmartAccount_ModuleQueryEntity,
  eventLog,
  SmartAccountContract_ModuleUninstalledEvent_eventArgs,
  SmartAccountContract_ModuleUninstalledEvent_handlerContext,
} from "generated";

SmartAccountContract.ModuleInstalled.handler(({ event, context }) => {
  const entity: SmartAccount_ModuleInstalledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleTypeId: event.params.moduleTypeId,
    moduleAddress: event.params.moduleAddress,
    chainId: event.chainId,
  };

  context.SmartAccount_ModuleInstalled.set(entity);
  addModuleToQuery({ event, context });
});

SmartAccountContract.ModuleUninstalled.handler(({ event, context }) => {
  const entity: SmartAccount_ModuleUninstalledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleTypeId: event.params.moduleTypeId,
    moduleAddress: event.params.moduleAddress,
    chainId: event.chainId,
  };

  context.SmartAccount_ModuleUninstalled.set(entity);
  removeModuleFromQuery({ event, context });
});

const addModuleToQuery = ({
  event,
  context,
}: {
  event: eventLog<SmartAccountContract_ModuleInstalledEvent_eventArgs>;
  context: SmartAccountContract_ModuleInstalledEvent_handlerContext;
}): void => {
  const module = context.SmartAccount_ModuleQuery.get(
    `${event.chainId}-${event.srcAddress}-${event.params.moduleAddress}`
  );

  if (!module) {
    const entity: SmartAccount_ModuleQueryEntity = {
      id: `${event.srcAddress}-${event.params.moduleAddress}`,
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

const removeModuleFromQuery = ({
  event,
  context,
}: {
  event: eventLog<SmartAccountContract_ModuleUninstalledEvent_eventArgs>;
  context: SmartAccountContract_ModuleUninstalledEvent_handlerContext;
}): void => {
  const module = context.SmartAccount_ModuleQuery.get(
    `${event.chainId}-${event.srcAddress}-${event.params.moduleAddress}`
  );

  if (module) {
    context.SmartAccount_ModuleQuery.set({ ...module, isInstalled: false });
  }
};
