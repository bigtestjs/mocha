import * as mocha from './mocha';
import { when, always, isConvergence } from '@bigtest/convergence';

/**
 * Returns the context's original timeout after setting it to `0`.
 *
 * @private
 * @param {Object} ctx - context with a timeout method
 * @returns {Number} the context's timeout
 */
function timeout(ctx) {
  let ms = ctx.timeout();
  ctx.timeout(0);
  return ms;
};

/**
 * Uses the original it as the and the convergence function to create
 * a convergent it function.
 *
 * @private
 * @param {Function} it - original it function
 * @param {Function} converge - convergence function to use
 * @returns {Function} convergent it function
 */
function convergentIt(it, converge) {
  return (title, assertion) => {
    // create a convergent test with the timeout
    let test = it(title, assertion && function() {
      return converge(assertion.bind(this), timeout(this));
    });

    // it.always has a default timeout of 200ms
    return converge === always
      ? test.timeout(200)
      : test;
  };
}

/**
 * Creates a hook function that will use the timeout for any returned
 * convergence instance.
 *
 * @private
 * @param {Function} hook - original hook function
 * @returns {Function} new hook function
 */
function convergentHook(hook) {
  return (fn) => hook(function() {
    // default timeout
    let ms = timeout(this);
    // run the hook and reference any return value
    let results = fn.call(this);
    // update timeout in case it changed
    ms = timeout(this) || ms;

    // reset the hook timeout later
    let reset = () => this.timeout(ms);

    // return a promise so we can always reset the timeout
    return Promise.resolve()
    // if a convergence was returned, run it with the timeout
      .then(() => isConvergence(results) ? results.timeout(ms) : results)
    // reset the timeout on success or error (no finally support)
      .then(reset, err => { reset(); throw err; });
  });
}

/**
 * Simple pause test helper that sets the current timeout to 0 and
 * returns a promise that never resolves or rejects
 *
 * @private
 * @deprecated
 * @param {Function} it - original it function
 * @returns {Function} new it function that will pause the test
 */
function pauseTest(it) {
  return (title) => it(title, function() {
    console.warn(`Using \`it.pause\` is deprecated.
It is a hack that prevents the current event loop from running. Consider moving \
any teardown to run before your setup so you can debug tests using \`it.only\`.`);

    this.timeout(0);
    return new Promise(() => {});
  });
}

// all variations of `it`
const it = convergentIt(mocha.it, when);
it.only = convergentIt(mocha.it.only, when);
it.always = convergentIt(mocha.it, always);
it.always.only = convergentIt(mocha.it.only, always);
it.only.always = it.always.only;
it.pause = pauseTest(mocha.it);
it.pause.only = pauseTest(mocha.it.only);
it.only.pause = it.pause.only;
it.skip = mocha.it.skip;
it.always.skip = mocha.it.skip;

// convergent hooks
const before = convergentHook(mocha.before);
const beforeEach = convergentHook(mocha.beforeEach);
const after = convergentHook(mocha.after);
const afterEach = convergentHook(mocha.afterEach);

// destructure describe for exporting
const { describe } = mocha;

// export our convergent it, wrapped hooks, and their aliases
export {
  it,
  before,
  beforeEach,
  after,
  afterEach,
  describe,
  // TDD interface aliases
  it as test,
  describe as context,
  // BDD interface aliases
  it as specify,
  before as suiteSetup,
  beforeEach as setup,
  after as suiteTeardown,
  afterEach as teardown,
  describe as suite
};
