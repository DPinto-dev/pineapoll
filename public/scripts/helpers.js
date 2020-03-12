/**
 *  This file aids importing these helper functions where needed
 */

const generateRandomString = require("./helpers/generateRandomString");
const escapeUnsafeChars = require("./helpers/escapeUnsafeChars");
const createPollCard = require("./helpers/createPollCard");
module.exports = { generateRandomString, escapeUnsafeChars, createPollCard };
