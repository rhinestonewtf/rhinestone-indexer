import {
  Registry,
  Registry_ModuleRegistration,
  Registry_Attested,
  Registry_Revoked,
} from "generated";

Registry.Attested.handler(async ({ event, context }) => {
  const entity: Registry_Attested = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    moduleAddress: event.params.moduleAddress,
    attester: event.params.attester,
    schemaUID: event.params.schemaUID,
    chainId: event.chainId,
  };

  context.Registry_Attested.set(entity);
});

Registry.Revoked.handler(async ({ event, context }) => {
  const entity: Registry_Revoked = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    moduleAddress: event.params.moduleAddress,
    revoker: event.params.revoker,
    schema: event.params.schema,
    chainId: event.chainId,
  };

  context.Registry_Revoked.set(entity);
});

Registry.ModuleRegistration.handler(async ({ event, context }) => {
  const entity: Registry_ModuleRegistration = {
    id: `${event.transaction.hash}_${event.logIndex}`,
    implementation: event.params.implementation,
    chainId: event.chainId,
  };

  context.Registry_ModuleRegistration.set(entity);
});
