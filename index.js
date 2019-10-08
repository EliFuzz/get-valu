function get(obj, path) {
  if (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    return undefined;
  }

  if (typeof path !== "string") {
    return undefined;
  }

  const props = path
    .split(/('[^'"]+'|[^[\].]+)/g)
    .filter(function(data) {
      return data.match(/[^[\].]/g);
    })
    .map(function(el) {
      return el[0] === "'" || el[0] === '"' ? el.slice(1, -1) : el;
    });

  for (const prop of props) {
    if (!obj.hasOwnProperty(prop)) {
      return undefined;
    }

    obj = obj[prop];
  }

  return obj !== null ? obj : undefined;
}

module.exports = get;
