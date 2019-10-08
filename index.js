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

  const props = path.split(/('[^'"]+'|[^[\].]+)/g).reduce(function(acc, curr) {
    if (!!curr.match(/[^[\].]/g)) {
      acc.push(curr[0] === "'" || curr[0] === '"' ? curr.slice(1, -1) : curr);
    }

    return acc;
  }, []);

  for (const prop of props) {
    if (!obj.hasOwnProperty(prop)) {
      return undefined;
    }

    obj = obj[prop];
  }

  return obj !== null ? obj : undefined;
}

module.exports = get;
