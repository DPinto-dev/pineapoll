// Sortable Stuff ---------------------------------
let el = document.getElementById("items");
let sortable = Sortable.create(el, {
  animation: 300
});
// ------------------------------------------------

$("#get-order-btn").click(function() {
  $("ul#items").each(function(el) {
    console.log(el);
  });
});
