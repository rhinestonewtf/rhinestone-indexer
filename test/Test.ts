import assert from "assert";
import { TestHelpers, AutoSavings_AutoSaveExecutedEntity } from "generated";
const { MockDb, AutoSavings } = TestHelpers;

describe("AutoSavings contract AutoSaveExecuted event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for AutoSavings contract AutoSaveExecuted event
  const event = AutoSavings.AutoSaveExecuted.createMockEvent({
    /* It mocks event fields with default values. You can overwrite them if you need */
  });

  // Processing the event
  const mockDbUpdated = AutoSavings.AutoSaveExecuted.processEvent({
    event,
    mockDb,
  });

  it("AutoSavings_AutoSaveExecutedEntity is created correctly", () => {
    // Getting the actual entity from the mock database
    let actualAutoSavingsAutoSaveExecutedEntity =
      mockDbUpdated.entities.AutoSavings_AutoSaveExecuted.get(
        `${event.transactionHash}_${event.logIndex}`
      );

    // Creating the expected entity
    const expectedAutoSavingsAutoSaveExecutedEntity: AutoSavings_AutoSaveExecutedEntity =
      {
        id: `${event.transactionHash}_${event.logIndex}`,
        smartAccount: event.params.smartAccount,
        token: event.params.token,
        amountReceived: event.params.amountReceived,
        chainId: event.chainId,
      };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(
      actualAutoSavingsAutoSaveExecutedEntity,
      expectedAutoSavingsAutoSaveExecutedEntity,
      "Actual AutoSavingsAutoSaveExecutedEntity should be the same as the expectedAutoSavingsAutoSaveExecutedEntity"
    );
  });
});
