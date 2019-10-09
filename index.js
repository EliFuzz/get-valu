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

  var props = path.match(/(?<=["']).+(?=['"])|[\w]+/g) || [];

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (!obj.hasOwnProperty(prop)) {
      return undefined;
    }

    obj = obj[prop];
  }

  return obj !== null ? obj : undefined;
}

module.exports = get;
