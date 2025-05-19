import { DEV_RELAYER } from "./constants";

export const getIsDev = ({ tx }: { tx: any }) => {
  return tx.from == DEV_RELAYER;
};

export const sendToOrchestrator = async ({
  data,
  orchestratorUrl,
  orchestratorApiKey,
}: {
  data: any;
  orchestratorUrl: string;
  orchestratorApiKey: string;
}) => {
  await fetch(`${orchestratorUrl}/chain-events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": orchestratorApiKey,
    },
    body: JSON.stringify(data),
  });
};
