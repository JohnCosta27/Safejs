const whitelist = {
  self: 1,
  postMessage: 1,
  global: 1,
  whiteList: 1,
  eval: 1,
  Array: 1,
  Boolean: 1,
  Date: 1,
  Function: 1,
  Promise: 1,
  Number: 1,
  Object: 1,
  RegExp: 1,
  String: 1,
  Error: 1,
  EvalError: 1,
  RangeError: 1,
  ReferenceError: 1,
  SyntaxError: 1,
  TypeError: 1,
  URIError: 1,
  decodeURI: 1,
  decodeURIComponent: 1,
  encodeURI: 1,
  encodeURIComponent: 1,
  isFinite: 1,
  isNaN: 1,
  parseFloat: 1,
  parseInt: 1,
  Infinity: 1,
  JSON: 1,
  Math: 1,
  NaN: 1,
  undefined: 1,

  Intl: 1,
  console: 1,
  setTimeout: 1,
  constructor: 1,
};

Object.getOwnPropertyNames(self).forEach((prop) => {
  if (prop in whitelist) return;

  Object.defineProperty(self, prop, {
    get: () => {
      port.postMessage("stop using " + prop);
      throw new Error("Security Exception - cannot access: " + prop);
    },
    configurable: false,
  });
});

function removeProto(currentProto: any) {
  Object.getOwnPropertyNames(currentProto).forEach((prop) => {
    // Just for testing
    if (prop === "self") return;

    try {
      Object.defineProperty(currentProto, prop, {
        get: () => {
          port.postMessage("stop using " + prop);
          throw new Error("Security Exception - cannot access: " + prop);
        },
        configurable: false,
      });
    } catch (e) {
      // console.log(e);
    }
  });
}

// @ts-ignore
removeProto(self.__proto__);
// @ts-ignore
removeProto(self.__proto__.__proto__);

let port: MessagePort;

self.onmessage = (msg) => {
  if (msg.ports.length > 0 && port == null) {
    console.log("Setting up the port");
    port = msg.ports[0];
    port.postMessage("yooo from worker");
    return;
  }

  const s = eval(msg.data);
  port.postMessage(s);
};
