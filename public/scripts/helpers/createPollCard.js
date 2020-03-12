module.exports = poll => {
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
