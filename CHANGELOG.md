# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0]

### Added

- web: minimize/maximize modal clicking the header instead of only button icon

### Fixed

- Run in dev mode using Docker Compose

### Changed

- web: move upload related functionaly to its own module

## [0.3.0] - 2022-05-11

### Added

- web: Modal show list of uploaded/uploading files
- web: Modal minimezable
- web: clear processed files
- web: current file upload progress ux friendly showing if is done, is uploading of there's an error

## [0.2.0] - 2022-05-11

### Added

- Docker compose files
- server: /upload endpoint to upload single files to server disk storage
- server: Dockerfile
- web: Dockerfile
- web: dropzone component to receive array of files
- web: Button component
- web: Progress component
- web: upload file queue to server showing the progress for current process

## [0.1.0] - 2022-05-11

### Added

- Prettier
- CHANGELOG.md
- editorconfig
- turborepo
- lint-staged
- husky

[unreleased]: https://github.com/pherval/fullcycle-teste/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/pherval/fullcycle-teste/compare/v0.3.0...1.0.0
[0.3.0]: https://github.com/pherval/fullcycle-teste/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pherval/fullcycle-teste/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pherval/fullcycle-teste/releases/tag/v0.1.0
