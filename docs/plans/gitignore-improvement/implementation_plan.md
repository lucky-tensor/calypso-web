# Improve .gitignore for Binary and Test Artifacts

I will update the root `.gitignore` file to include comprehensive rules for binary files, test artifacts, and common development tool outputs.

## Proposed Changes

### Root .gitignore

#### [MODIFY] [.gitignore](file:///Users/lucas/code/ts/calypso-web/.gitignore)

Add the following patterns:
- SQLite databases and journals
- Archives and compressed files
- Coverage reports
- Binary executables and libraries
- Cache and build artifacts for common tools (Turbo, Next.js)
- Python bytecode (as a safety measure)

## Verification Plan

### Automated Tests
1. Verify that the updated `.gitignore` does not ignore essential files by running `git check-ignore -v <important-file>`.
2. Verify that undesirable files are indeed ignored by running `git check-ignore -v <undesirable-file>`.

### Manual Verification
1. I will check for any currently tracked files that match the new ignore patterns using `git ls-files -i --exclude-standard`.
2. I will summarize the changes made to the user.
