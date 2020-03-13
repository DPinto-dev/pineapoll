/*
 * All database queries will be exported as functions and called from
 * within the route handler in polls.js (...)
 */
const pool = require("./db-index");
const { generateRandomString, escapeUnsafeChars } = require("../public/scripts/helpers");
/**
 * Get a single poll from the database given the creator's email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getPollByCreator = email => {
  return pool.query(
    `
    SELECT * FROM polls
    JOIN creators on polls.creator_id = creators.id
    WHERE creator_email = $1;`,
    [email]
  );
  // .then(result => result.rows[0] || null)
  // .catch(err => console.log(err));
};
exports.getPollByCreator = getPollByCreator;

/**
 * Adds a new poll to the database
 * @param {Object} body Req.body sent whe a new poll is submitted
 * @param {Array} body.option Is an array of options POSTed by the HTML form
 * @return {Promise<{}>} A promise sent back to the route handler
 */
const addNewPoll = body => {
  let options = [];
  const { pollName, pollDescription } = body;
  if (body.options) {
    options = [...body.options];
  }
  const newPollCode = generateRandomString();

  //! Currently we are hardcoding the creator_id for demo purposes
  // 1st - We create a new poll:
  return pool.query(
     `INSERT INTO polls (name, description, code, creator_id) VALUES ($1, $2, $3, $4) RETURNING *`,
     [pollName, pollDescription, newPollCode, 10002]
   )
   .then(results => {
    const { id, code } = results.rows[0];
     
    // 2nd - Add options to the poll that was just created
    

    // Add all the options to the queryString for insertion into DB
    const optionsStr = options.map((option, idx) => {
      return `(${id}, '${option}', ${idx + 1})`
    }).join(',');
     
    const queryString = `INSERT INTO poll_options (poll_id, name, serial_order)
       VALUES ${optionsStr} RETURNING *;`

    console.log("TCL: queryString", queryString)
    
    return pool.query(queryString)
      .then(() => {
        return code;
      })
      .catch(err => {
        console.log("Error inside the pool.query from database.js", err)
        return code;
      })
   });
}
exports.addNewPoll = addNewPoll;

const getPollIdByCode = pollCode => {
  return pool.query(`SELECT id FROM polls WHERE code = '${pollCode}'`)
}
exports.getPollIdByCode = getPollIdByCode;


const getPollOptionId = (pollId, serialOrder) => {
  pool.query(`SELECT  poll_options.id as optionid
  FROM poll_options 
  JOIN polls ON polls.id = poll_id
  WHERE polls.id = $1 AND serial_order = $2`, [pollId, serialOrder])
    .then(results => {
      const pollOptionId = results.rows[0].optionid;
      return pollOptionId;
    })
    return pollOptionId;
}
exports.getPollOptionId = getPollOptionId;

/**
 * Receives an object with pollId and optionsId and inserts the vote into the db 
 * @param {Object} result 
 */
const addResultsToDb = result => {

  const { pollId, optionIdArr, nickName } = result;
  console.log(`optionIdArr - inside addResultsToDb ${optionIdArr} end of array`);
  console.log("typeof optionIdArr", typeof optionIdArr);
  console.log("optionIdArr.length", optionIdArr.length);

   let queryString = `INSERT INTO poll_results (poll_id, poll_option_id, user_id, rank) VALUES `;


   // Add all the options to the queryString for insertion into DB
   for (let i = 0; i < optionIdArr.length; i++) {
     if (i === optionIdArr.length - 1) {
       queryString += ` (${pollId}, '${optionIdArr[i]}', '${nickName}', ${optionIdArr.length - i}) RETURNING *;`
     } else {
       queryString += ` (${pollId}, '${optionIdArr[i]}', '${nickName}', ${optionIdArr.length - i}), `
     }
   }
   console.log("TCL: queryString", queryString)
   
   return pool.query(queryString)
   .then(res => res.rows)
   .catch(err => console.log("Error inside the pool.query from database.js", err))

}
exports.addResultsToDb = addResultsToDb;
  




// poll_options.id, poll_options.poll_id, poll_options.name, poll_options.serial_order

// poll_results.id, poll_results.poll_id, poll_results.poll_option_id, poll_results.user_id, poll_results.rank


// creators
// id	creator_email

// polls
// id	name	description	code	creation_date	is_active	creator_id

// poll_options
// id	poll_id	name	serial_order

// poll_results:
// id	poll_id	poll_option_id	user_id	rank