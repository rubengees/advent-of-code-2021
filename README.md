# Advent of Code 2021

These are my solutions for the advent of code in 2021.

The language of choice is Typescript and no external libraries are used expect in the infrastructure to run solutions
and tests.

All solutions are self-contained in a folder each, even if days or parts build on each other.

### Running

This is a Node.js project and you need to install dependencies with `yarn install` before running.

All solutions have at least one test with the puzzle input and can be run via jest.

To run tests for day 1:

```bash
yarn test day1/
```

There is also a simple cli to run specific days. To run part 2 of day 1:

```bash
yarn start 1.2 input.txt
```

> An input.txt file needs to exist with the input.

Alternatively:

```bash
cat input.txt | yarn start 1.2
```

> Input can also come from stdin.

### Building

If you want to compile the code to JavaScript and run it as such, the `yarn build` script can be used.

The resulting code can then be run from the `dist` directory: `node dist/index.js`
