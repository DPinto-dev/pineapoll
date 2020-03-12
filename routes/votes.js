const express = require("express");
const router = express.Router();
const { generateRandomString, escapeUnsafeChars } = require("../public/scripts/helpers");
const { getPollIdByCode, getPollOptionId, addResultsToDb } = require('../db/database');

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
    const optionIdArr = req.body["option-id"].split`,`.map(x=>+x);
    const serialOrderArr = req.body["serial-order"].split`,`.map(x=>+x);
    console.log("When route is triggered optionIdArr", optionIdArr)
    console.log("typeof optionIdArr", typeof optionIdArr)
    
    getPollIdByCode(pollCode)
    .then(results => {
      const pollId = results.rows[0].id;

      // MAKE AN OBJECT TO CALL THE FUNCTION THAT'LL ADD RESULTS TO DB
      const resultObj = { pollId, serialOrderArr, optionIdArr };
      
      console.log("pollId", pollId)
      console.log("serialOrderArr", serialOrderArr)
      console.log("optionIdArr", optionIdArr)
      
      addResultsToDb(resultObj);
      
      res.redirect("/");

        // for (const option of serialOrderArr) {
        //   getPollOptionId(pollId, serialOrder)

        // }
        // .then
        // console.log("pollId", pollId)
        // const params = {pollId, body}
        // res.send(params)
        // return pollId
    //   })
    //   .catch(err => console.log("Error inside getPollIdByCode:", err));
    
    // // res.send(`You voted at the poll: ${pollCode}`);
    
    // // pool.query(``)

  })
})

  router.get("/results/:pollCode", (req, res) => {
    const pollCode = req.params.pollCode
    res.render("results_graph", { pollCode });
  });
  return router;
}

