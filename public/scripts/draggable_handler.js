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
