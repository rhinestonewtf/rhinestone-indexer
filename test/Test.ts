import assert from "assert";
import { TestHelpers, AutoSavings_AutoSaveExecuted } from "generated";
const { MockDb, AutoSavings } = TestHelpers;

describe("AutoSavings contract AutoSaveExecuted event tests", async () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for AutoSavings contract AutoSaveExecuted event
  const event = AutoSavings.AutoSaveExecuted.createMockEvent({
    /* It mocks event fields with default values. You can overwrite them if you need */
  });

  // Processing the event
  const mockDbUpdated = await AutoSavings.AutoSaveExecuted.processEvent({
    event,
    mockDb,
  });

  it("AutoSavings_AutoSaveExecutedEntity is created correctly", async () => {
    // Getting the actual entity from the mock database
    let actualAutoSavingsAutoSaveExecutedEntity =
      await mockDbUpdated.entities.AutoSavings_AutoSaveExecuted.get(
        `${event.transaction.hash}_${event.logIndex}`,
      );

    // Creating the expected entity
    const expectedAutoSavingsAutoSaveExecutedEntity: AutoSavings_AutoSaveExecuted =
      {
        id: `${event.transaction.hash}_${event.logIndex}`,
        smartAccount: event.params.smartAccount,
        token: event.params.token,
        amountReceived: event.params.amountReceived,
        chainId: event.chainId,
      };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(
      actualAutoSavingsAutoSaveExecutedEntity,
      expectedAutoSavingsAutoSaveExecutedEntity,
      "Actual AutoSavingsAutoSaveExecutedEntity should be the same as the expectedAutoSavingsAutoSaveExecutedEntity",
    );
  });
});
