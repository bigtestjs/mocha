# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [Unreleased]

## [0.5.0] - 2018-07-06

### Changed

- upgraded `@bigtest/convergence` to `^0.10.0`

## [0.4.1] - 2018-07-03

### Fixed

- issue with build do to babel built in imports

## [0.4.0] - 2018-07-01

### Changed

- upgraded `@bigtest/convergence` to `^0.9.1`

### Deprecated

- `it.pause` because it was a hack

### Added

- `docs` script to generate documentation
- transpiled es module bundle

## [0.3.3] - 2018-03-16

### Fixed

- each hooks set the timeout back to the original timeout when running
  returned convergences

## [0.3.2] - 2018-03-14

### Changed

- upgraded `@bigtest/convergence` to `^0.5.0`

## [0.3.1] - 2018-03-08

### Fixed

- correctly identify a convergence interface when auto-running from hooks

## [0.3.0] - 2018-03-05

### Changed

- upgraded `@bigtest/convergence` to `^0.4.0`
- tests and hooks will now always set the timeout to zero

## [0.2.2] - 2018-03-03

### Changed

- lock `@bigtest/convergence` at `0.3.0`

## [0.2.1] - 2018-02-20

### Added

- default `it.always` timeout of 100ms

### Changed

- upgraded `@bigtest/convergence` to 0.3.0

## [0.2.0] - 2018-02-05

### Added

- wrapped hooks that allow automatically running returned convergences
  with the current timeout

### Removed

- `rollup-plugin-commonjs` as it is no longer required to import
  @bigtest/convergence. #22

### Fixed

- correctly remove comments from compiled files
- do not directly import mocha in browser environments

## [0.1.1] - 2018-01-09

### Added

- "module" entry point to support native consumption of @bigtest/mocha
  as es module
