import assert from "assert";
import { 
  TestHelpers,
  Registry_ModuleRegistrationEntity
} from "generated";
const { MockDb, Registry } = TestHelpers;

describe("Registry contract ModuleRegistration event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Registry contract ModuleRegistration event
  const event = Registry.ModuleRegistration.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  // Processing the event
  const mockDbUpdated = Registry.ModuleRegistration.processEvent({
    event,
    mockDb,
  });

  it("Registry_ModuleRegistrationEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualRegistryModuleRegistrationEntity = mockDbUpdated.entities.Registry_ModuleRegistration.get(
      `${event.transactionHash}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedRegistryModuleRegistrationEntity: Registry_ModuleRegistrationEntity = {
      id: `${event.transactionHash}_${event.logIndex}`,
      implementation: event.params.implementation,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualRegistryModuleRegistrationEntity, expectedRegistryModuleRegistrationEntity, "Actual RegistryModuleRegistrationEntity should be the same as the expectedRegistryModuleRegistrationEntity");
  });
});
