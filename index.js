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

  while (path.length !== 0) {
    let prop;
    const startArrIndex = path.indexOf("[");
    if (startArrIndex === 0) {
      const endArrIndex = path.indexOf("]");
      prop = path.slice(1, endArrIndex).replace(/(^["']|["']$)/g, "");
      path = path.slice(endArrIndex + 1).replace(/^\./, "");

      if (!obj.hasOwnProperty(prop)) {
        return undefined;
      }

      obj = obj[prop];
      continue;
    }

    const startPropIndex = path.indexOf(".");
    const isArrFirst = startPropIndex === -1 || startArrIndex < startPropIndex;
    if (startArrIndex !== -1 && isArrFirst) {
      prop = path.slice(0, startArrIndex);
      path = path.slice(startArrIndex);

      if (!obj.hasOwnProperty(prop)) {
        return undefined;
      }

      obj = obj[prop];
      continue;
    }

    if (!prop && startPropIndex !== -1) {
      prop = path.slice(0, startPropIndex);
      path = path.slice(startPropIndex + 1);

      if (!obj.hasOwnProperty(prop)) {
        return undefined;
      }

      obj = obj[prop];
      continue;
    }

    if (!prop) {
      obj = obj[path];
      break;
    }
  }

  return obj !== null ? obj : undefined;
}

module.exports = get;
