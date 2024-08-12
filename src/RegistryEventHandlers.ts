/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { RegistryContract, Registry_ModuleRegistrationEntity } from "generated";

RegistryContract.ModuleRegistration.handler(({ event, context }) => {
  const entity: Registry_ModuleRegistrationEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    implementation: event.params.implementation,
    chainId: event.chainId,
  };

  context.Registry_ModuleRegistration.set(entity);
});
