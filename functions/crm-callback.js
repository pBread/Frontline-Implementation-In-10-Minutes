// github.com/pBread/Frontline-Implementation-In-10-Minutes

const jsforce = require("jsforce");
const sfdc = new jsforce.Connection({});

exports.handler = async function (context, event, callback) {
  await sfdc.login(process.env.SF_USER, process.env.SF_PASSWORD);

  switch (event.Location) {
    case "GetCustomersList":
      return getCustomersList(context, event, callback);

    case "GetCustomerDetailsByCustomerId":
      return getCustomerDetailsByCustomerId(context, event, callback);
  }
};

async function getCustomersList(context, event, callback) {
  const contacts = await sfdc.sobject("Contact").find();

  const customers = contacts.map((contact) => ({
    display_name: contact.Name,
    customer_id: contact.Id,
  }));

  callback(null, { objects: { customers } });
}

async function getCustomerDetailsByCustomerId(context, event, callback) {
  const contact = await sfdc
    .sobject("Contact")
    .findOne({ Id: event.CustomerId });

  const customer = {
    display_name: contact.Name,
    customer_id: contact.Id,
    channels: [{ type: "sms", value: contact.Phone }],
  };

  callback(null, { objects: { customer } });
}
