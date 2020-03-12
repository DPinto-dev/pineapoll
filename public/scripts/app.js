//* IMPORTS -----------------------------------------------------------

// const { escapeUnsafeChars } = require("./helpers");
const { getPollByCreator, addNewPoll } = require("../../db/database");

//* FUNCTION DEFINITIONS ----------------------------------------------
// Create a new poll option card
const createPollOption = count => {
  const pollOption = `
    <article class="poll-option row">
    <div class="input-field col s10">
      <input type="text" class="validate" serial-order="${count}" name="options[]"/>
      <label for="poll-option">What should be this option?</label>
    </div>
    </article>
  `;
  return pollOption;
};

const createPollCard = poll => {
  return `        
    <div class="poll-card row">
      <div class="col s12 m6">
        <div class="card sticky-action">
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4"
              >${poll.name}<i class="material-icons right">more_vert</i>
            </span>
          </div>
          <div class="card-action">
            <a href="/polls/edit:${poll.code}"><i class="material-icons">edit</i></a>
            <a href="/polls/delete:${poll.code}"><i class="material-icons">delete</i></a>
            <a href="/polls/results:${poll.code}"><i class="material-icons">insert_chart</i></a>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"
              >${poll.name}<i class="material-icons right">close</i>
            </span>
            <p>${poll.description}</p>
          </div>
        </div>
      </div>
    </div>`;
};

//* ON DOCUMENT READY --------------------------------------------------
$(() => {
  // Handles clicks to add new poll options (in polls_new.ejs)
  $("#add-option-btn").click(() => {
    console.log("button clicked");
    const newPollName = $("input#poll-name");
    const pollOptions = $("section #poll-options");

    if (!newPollName.val()) {
      alert("Please give your new poll a name before adding options.");
      return;
    }
    // Checking if the previous poll option is empty

    // Gets num of current new Poll Options on the DOM to create numbered options
    const numOptions = pollOptions.children().length;
    const newPollOption = createPollOption(numOptions);
    pollOptions.append(newPollOption);
  });

  // Handles the submit new poll action
  $("#submit-btn").click(event => {
    const newPollName = $("input#poll-name");
    const newPollDescription = $("#textarea2");
    // get the poll options

    // Prevents page reload behaviour
    // event.preventDefault();

    //2- Check if one of the options is empty

    //3- Sanitizes all of the text

    //4 - INSERT query
  });

  // Update all the poll cards (in polls_browse.ejs)
  const updatePollCards = (poll, email) => {
    getPollByCreator("lighthouse@gmail.com")
      .then(results => {
        let polls = results.rows;
        for (const pollCard of polls) {
          $("section#poll-browse").append(pollCard);
        }
      })
      .catch(err => console.log(err));

    // id, name, description, code, creation_date,
    // is_active, creator_id,
    // const card = `
    // `
  };

  // Handles the submit vote button
  // $("button#vote-btn").click(event => {
  //   event.preventDefault();
  // });

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done(users => {
  //   for (user of users) {
  //     $("<div>")
  //       .text(user.name)
  //       .appendTo($("body"));
  //   }
  // });
});
