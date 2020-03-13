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

//* ON DOCUMENT READY --------------------------------------------------
$(() => {
  // Handles clicks to add new poll options (in polls_new.ejs)
  $("#add-option-btn").click(() => {
    const newPollName = $("input#poll-name");
    const pollOptions = $("section #poll-options");

    if (!newPollName.val()) {
      alert("Please give your new poll a name before adding options.");
      return;
    }
    // Checking if the previous poll option is empty
    let $childInput = $("section #poll-options").find("input");
    for (let child of $childInput) {
      if (!child.value) {
        alert("Please fill your poll option, before adding a new one.");
        return;
      }
    }

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
  //TODO: Move this function to the backend
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

  // Handles click on user-icon, redirects to Browse
  // const

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
