# Safejs - Running user supplied code safely in the browser

Sometimes we want the user to write their own code for whatever reason, however it is difficult to do so in a way that is safe, doesn't break their experience or become a security vulnerability.

This rules out a few things, we cannot run user supplied code on the main thread of the browser. By default the main thread has access to `window`, `document` and `parent` object.

## Web Workers

[MDN Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) states that web workers are a way to run background jobs away from the main thread. The web worker can also communicate with the main thread that created it. By default you cannot do DOM manipulations using web workers (one of our concerns), but you can access some of the `window` object (Such as IndexedDB).

To view what a web worker has access so, we can `console.log(self)`:
