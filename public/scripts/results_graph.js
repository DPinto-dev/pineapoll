
function makePollChart(pollCode) {
  $.get(`/api/${pollCode}`, response => {
    const results = response;
    console.log('RESULTS:', results)
    // const results = mockResults2;
    let ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: results.map(result => result.name),
            datasets: [{
                label: '# of Votes',
                data: results.map(result => result.borda),
                backgroundColor: generateNColors(results.length),
                borderColor: generateNColors(results.length),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  });
}

function generateNColors(n) {
  const colorSet = [
    'rgba(255, 99, 132, 1.0)',
    'rgba(54, 162, 235, 1.0)',
    'rgba(255, 206, 86, 1.0)',
    'rgba(75, 192, 192, 1.0)',
    'rgba(153, 102, 255, 1.0)',
    'rgba(255, 159, 64, 1.0)'
  ];

  const colors =
  [
    'rgba(255, 99, 132, 1.0)',
    'rgba(54, 162, 235, 1.0)',
    'rgba(255, 201, 86, 1.0)',
    'rgba(75, 192, 192, 1.0)'
  ];
  while (colors.length < n) {
    colors.push(colorSet[Math.floor(Math.random() * colorSet.length)])
  }

  return colors;
}

makePollChart(pollCode);

