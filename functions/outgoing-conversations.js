// github.com/pBread/Frontline-Implementation-In-10-Minutes

const jsforce = require("jsforce");
const sfdc = new jsforce.Connection({});

exports.handler = async function (context, event, callback) {
  await sfdc.login(process.env.SF_USER, process.env.SF_PASSWORD);
};
