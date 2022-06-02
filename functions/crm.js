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

async function getCustomersList(context, event, callback) {}

async function getCustomerDetailsByCustomerId(context, event, callback) {}
