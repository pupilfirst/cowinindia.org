function capitalize(input) {
  var words = input.split(" ");
  var capitalizedWords = [];
  words.forEach((element) => {
    capitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return capitalizedWords.join(" ");
}

export const humanize = (str) => {
  return capitalize(
    str.replace(/^[\s_]+|[\s_]+$/g, "").replace(/[_\s]+/g, " ")
  );
};
