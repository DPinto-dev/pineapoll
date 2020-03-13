const express = require("express");
const router = express.Router();
const { generateRandomString, escapeUnsafeChars } = require("../public/scripts/helpers");
const { getPollIdByCode, getPollOptionId, addResultsToDb } = require('../db/database');
const sendMailGun = require("../public/scripts/mailgun-module");

module.exports = pool => {
  router.post('/', (req, res) => {
    const pollCode = req.body['poll-code'];
    res.redirect(`/votes/${pollCode}`);
  })
  //populates the poll options
  router.get('/:pollCode', (req, res) => {
    const pollCode = req.params["pollCode"].trim();
    console.log('this is the pollcode entered: ', pollCode);
    pool.query(`
      SELECT id
      FROM polls
      WHERE code = $1
    `, [pollCode])
    .then(results => {
      const id = results.rows[0].id;
      console.log('this should be the id:', id)
      pool.query(`
      SELECT polls.name AS question, poll_options.name AS options, poll_options.id AS optionid
      FROM polls
      JOIN poll_options ON polls.id = poll_options.poll_id
      WHERE poll_id = $1
      `, [id])
      .then(results => {
        console.log(results.rows);
        const question = results.rows[0].question;
        const optionsArray = [];
        const optionIdArr = [];
        for (let i = 0; i < results.rows.length; i++) {
          optionsArray.push(results.rows[i].options);
          optionIdArr.push(results.rows[i].optionid);
        }
        let templateVars =  { pollCode, question, pollOptions: optionsArray, optionIdArr }
      res.render('vote_screen.ejs', templateVars);
      })
    })
  });

  /*
   * Triggers when user votes
   */
  router.post('/:pollCode', (req, res) => {
    const pollCode = req.params["pollCode"];
    const nickName = req.body.nickname;
    const optionIdArr = req.body["option-id"].split(',').map(Number); 

    console.log("When route is triggered optionIdArr", optionIdArr)
    console.log("typeof optionIdArr", typeof optionIdArr)

    getPollIdByCode(pollCode)
    .then(results => {
      const pollId = results.rows[0].id;

      // MAKE AN OBJECT TO CALL THE FUNCTION THAT'LL ADD RESULTS TO DB
      const resultObj = { pollId, optionIdArr, nickName };

      console.log("pollId", pollId)
      console.log("optionIdArr", optionIdArr)

      addResultsToDb(resultObj);

      //Send email saying nickName voted
      const email = {
        from: "PineaPOLL <aidanemiddleton@gmail.com>",
        to: "diogosp4m@gmail.com",
        subject: "Someone just voted on your pineapPoll!",
        text: `Good news! ${nickName} just voted on your pineapPoll. 
        Do you want to see your poll results?
        http://localhost:8080/votes/results/${pollCode}
        Thanks for using pineapPoll.`
      };
      sendMailGun(email);

      res.render("voted", {nickName});
  })
})

  router.get("/results/:pollCode", (req, res) => {
    const pollCode = req.params.pollCode
    res.render("results_graph", { pollCode });
  });
  return router;
}
