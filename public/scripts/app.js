//* FUNCTION DEFINITIONS ----------------------------------------------

// Escapes unsafe characters before adding text to poll option
const escapeUnsafeChars = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create a new poll option card
const createPollOption = () => {
  const pollOption = `
    <article class="poll-option row">
    <div class="input-field col s10">
      <input type="text" class="validate" />
      <label for="poll-option">What's this option?</label>
    </div>
    </article>
  `;

  return pollOption;
};

//* ON DOCUMENT READY --------------------------------------------------
$(() => {
  $("#add-option-btn").click(() => {
    const newPollOption = createPollOption();
    console.log("Clicked #add-option-btn", newPollOption);
    $("section#poll-option").append(newPollOption);
  });

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
