# math-stirng

math-stirng is a JavaScript library that solve phrase mathematics without use eval() function.
it solves The Four Basic Mathematical Operations in this time but in future will add more actions to it.

## Installation

```bash
npm install math-string
```

or

```bash
yarn add math-string
```

## Usage

```JavaScript
import mathString from 'math-string';
const result = mathString('1+2'); //3
const res = mathString('1+4+9+('); // throw an error that are not equal number of opening and closing parentheses
const res = mathString('1+4+9..+8'); // throw an error that use . more than onec in same place
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
