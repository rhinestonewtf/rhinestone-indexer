import {
  SmartAccountContract,
  SmartAccount_ModuleInstalledEntity,
  SmartAccount_ModuleUninstalledEntity,
} from "generated";

SmartAccountContract.ModuleInstalled.handler(({ event, context }) => {
  const entity: SmartAccount_ModuleInstalledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleTypeId: event.params.moduleTypeId,
    moduleAddress: event.params.moduleAddress,
    chainId: event.chainId,
  };

  context.SmartAccount_ModuleInstalled.set(entity);
});

SmartAccountContract.ModuleUninstalled.handler(({ event, context }) => {
  const entity: SmartAccount_ModuleUninstalledEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleTypeId: event.params.moduleTypeId,
    moduleAddress: event.params.moduleAddress,
    chainId: event.chainId,
  };

  context.SmartAccount_ModuleUninstalled.set(entity);
});
