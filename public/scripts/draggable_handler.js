// Sortable Stuff ---------------------------------
let el = document.getElementById("items");
let sortable = Sortable.create(el, {
  animation: 300,
  dragoverBubble: true
});
// ------------------------------------------------

$("#get-order-btn").click(function() {
  $("ul#items li").each(function() {
    const results = [];
    results.push($(this).attr("serial-order"));
    console.log(results);
  });
});

$('.vote-submit:submit').click(e => {
  const serialOrder = $.map( $('ul li'), li => $(li).attr("serial-order"));
  const optionIds = $.map( $('ul li'), li => $(li).attr("option-id"));
  $('form').append(`<input type="hidden" name="serial-order" value="${serialOrder.join(',')}"/>`);
  $('form').append(`<input type="hidden" name="option-id" value="${optionIds.join(',')}"/>`);
});
