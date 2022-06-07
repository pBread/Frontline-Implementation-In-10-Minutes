// github.com/pBread/Frontline-Implementation-In-10-Minutes

const jsforce = require("jsforce");
const sfdc = new jsforce.Connection({});

exports.handler = async function (context, event, callback) {
  await sfdc.login(process.env.SF_USER, process.env.SF_PASSWORD);

  switch (event.Location) {
    case "GetCustomersList":
      await getCustomersList(context, event, callback);

    case "GetCustomerDetailsByCustomerId":
      await getCustomerDetailsByCustomerId(context, event, callback);
  }
};

async function getCustomersList(context, event, callback) {
  const contacts = await sfdc.sobject("Contact").find();

  const customers = contacts.map((contact) => ({
    customer_id: contact.Id,
    display_name: contact.Name,
  }));

  callback(null, { objects: { customers } });
}

async function getCustomerDetailsByCustomerId(context, event, callback) {
  const contact = await sfdc
    .sobject("Contact")
    .findOne({ Id: event.CustomerId });

  const customer = {
    customer_id: contact.Id,
    display_name: contact.Name,
    channels: [{ type: "sms", value: contact.Phone }],
    details: {
      title: "Location",
      content: `${contact.MailingAddress.city}, ${contact.MailingAddress.state}`,
    },
  };

  callback(null, { objects: { customer } });
}
