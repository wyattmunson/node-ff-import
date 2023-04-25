// const { Client, Event } = require("@harnessio/ff-nodejs-server-sdk");
import { Client, Event } from "@harnessio/ff-nodejs-server-sdk";

const client = () => {
  (async () => {
    // set apiKey to your SDK API Key
    const apiKey = "9aadf541-67fd-4dca-8d46-849e173001e3";

    // set flagName to your flag identifier from the UI
    const flagName = "harnessappdemodarkmode";

    console.log("Harness SDK Getting Started");

    // Create Client
    const client = new Client(apiKey);

    // Create a target (different targets can receive different results based on rules.
    // Here we are including "location" as a custom attribute)
    const target = {
      identifier: "nodeserversdk",
      name: "NodeServerSDK",
      attributes: {
        location: "emea",
      },
    };

    await client.waitForInitialization();
    console.log("CLIENT STOOD UP");

    try {
      // Log the state of the flag every 10 seconds
      setInterval(async () => {
        const value = await client.boolVariation(flagName, target, false);
        console.log("Flag variation:", value);
      }, 10000);

      // We can also watch for the event when a flag changes
      client.on(Event.CHANGED, async (flagIdentifier) => {
        const value = await client.boolVariation(flagIdentifier, target, false);
        console.log(`${flagIdentifier} changed: ${value}`);
      });
    } catch (e) {
      console.error("Error:", e);
    }
  })();
};

export default client;
