import {
  RegistryContract,
  Registry_ModuleRegistrationEntity,
  Registry_AttestedEntity,
  Registry_RevokedEntity,
} from "generated";

RegistryContract.Attested.handler(({ event, context }) => {
  const entity: Registry_AttestedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleAddress: event.params.moduleAddress,
    attester: event.params.attester,
    schemaUID: event.params.schemaUID,
    chainId: event.chainId,
  };

  context.Registry_Attested.set(entity);
});

RegistryContract.Revoked.handler(({ event, context }) => {
  const entity: Registry_RevokedEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    moduleAddress: event.params.moduleAddress,
    revoker: event.params.revoker,
    schema: event.params.schema,
    chainId: event.chainId,
  };

  context.Registry_Revoked.set(entity);
});

RegistryContract.ModuleRegistration.handler(({ event, context }) => {
  const entity: Registry_ModuleRegistrationEntity = {
    id: `${event.transactionHash}_${event.logIndex}`,
    implementation: event.params.implementation,
    chainId: event.chainId,
  };

  context.Registry_ModuleRegistration.set(entity);
});
