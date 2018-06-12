import { describe, beforeEach, afterEach, it } from 'mocha';
import { expect } from 'chai';

import { it as convergentIt } from '../src';

describe('BigTest Mocha: it.pause', () => {
  let originalWarn = console.warn;
  let test, message;

  beforeEach(() => {
    message = null;
    console.warn = msg => message = msg;
    test = convergentIt.pause('test');
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it('returns a promise', () => {
    expect(test.fn()).to.be.a('Promise');
  });

  it('logs a deprecation warning', () => {
    test.fn();
    expect(message).to.match(/\b(deprecated)\b/);
  });

  it('always sets the test timeout to 0', () => {
    test.timeout(2000).fn();
    expect(test.timeout()).to.equal(0);
  });

  it('.only has multiple aliases', () => {
    expect(convergentIt.pause.only).to.equal(convergentIt.only.pause);
  });
});
