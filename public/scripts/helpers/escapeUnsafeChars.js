// Escapes unsafe characters before adding text to poll option
const escapeUnsafeChars = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

module.exports = escapeUnsafeChars;
