const get = require("./index");

describe("get value", () => {
  it("should return undefined when first argument is empty", () => {
    expect(get()).toBeUndefined();
    expect(get(null)).toBeUndefined();
    expect(get(undefined)).toBeUndefined();
    expect(get("")).toBeUndefined();
    expect(get(0)).toBeUndefined();
    expect(get(false)).toBeUndefined();
  });

  it("should return undefined when second argument not a string", () => {
    const obj = { a: "b" };
    expect(get(obj, null)).toBeUndefined();
    expect(get(obj, undefined)).toBeUndefined();
    expect(get(obj, 0)).toBeUndefined();
    expect(get(obj, false)).toBeUndefined();
    expect(get(obj, {})).toBeUndefined();
  });

  it("should return undefined when wrong path given", () => {
    expect(get({ a: "b" }, "aa.b")).toBeUndefined();
    expect(get({ a: "b" }, "a.b.c")).toBeUndefined();
  });

  it("should return value when simple object provided", () => {
    expect(get({ a: "b" }, "a")).toBe("b");
    expect(get({ a: { b: "c" } }, "a.b")).toBe("c");
  });

  it("should return value when complex object key given", () => {
    expect(get({ "a.b": "c" }, "['a.b']")).toBe("c");
  });

  it("should return value when object with array given", () => {
    expect(get([{ a: "b" }], "[0]")).toMatchObject({ a: "b" });
    expect(get({ a: [{ b: "c" }] }, "a[0]")).toMatchObject({ b: "c" });
    expect(get({ a: [{ b: "c" }] }, "a[0].b")).toBe("c");
    expect(get({ a: { b: ["c"] } }, "a.b[0]")).toBe("c");
  });

  it("should return value when nested object given", () => {
    const obj = { a: { b: { c: { d: "e" } } } };
    expect(get(obj, "a")).toMatchObject({ b: { c: { d: "e" } } });
    expect(get(obj, "a.b")).toMatchObject({ c: { d: "e" } });
    expect(get(obj, "a.b.c")).toMatchObject({ d: "e" });
  });

  it("should return value when function given", () => {
    const a = () => {};
    a.b = { c: "d" };

    expect(get(a, "")).toBeInstanceOf(Function);
    expect(get(a, "b")).toMatchObject({ c: "d" });
    expect(get(a, "b.c")).toBe("d");
  });
});
