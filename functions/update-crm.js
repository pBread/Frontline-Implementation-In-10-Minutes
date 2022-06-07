// github.com/pBread/Frontline-Implementation-In-10-Minutes

const jsforce = require("jsforce");
const sfdc = new jsforce.Connection({});

const { Twilio } = require("twilio");
const client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

exports.handler = async function (context, event, callback) {
  await sfdc.login(process.env.SF_USER, process.env.SF_PASSWORD);

  const participants = await client.conversations
    .conversations(event.ConversationSid)
    .participants.list();

  const customer_id = participants
    .map((p) => JSON.parse(p.attributes))
    .find((attr) => attr.customer_id).customer_id;

  await sfdc.sobject("Task").create({
    ActivityDate: new Date(),
    Description: event.Body,
    Status: "Completed",
    Subject: "SMS Message",
    WhoId: customer_id,
  });
};
