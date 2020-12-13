const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}`;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
});


app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  const c = Number(a) + Number(b);
  console.log(req.query);
  res.send(`The sum of ${a} and ${b} is ${c}.`);
});

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;
  const textArr = text.split('');
  const shifted = textArr.map((l) => {
    const code = l.charCodeAt(0)
    let cipherCode = code + Number(shift);
    if (((code <= 90) && (cipherCode > 90)) || ((code <= 122) && (cipherCode > 122))) {
      cipherCode -= 26;
    } else if (code === 32) {
    cipherCode = 32;
    }
    return String.fromCharCode(cipherCode);
  }) 
  res.send(shifted.join(''))
});

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;
  const lottoNumbers = [];
  let matchedNumbers = 0;

  for (let i = numbers.length; i > 0 ; i--) {
    lottoNumbers.push(Math.ceil(Math.random() * 20));
  }
  console.log(lottoNumbers);


  numbers.forEach((num, index)=> {
    console.log(`Matching ${num} to ${lottoNumbers[index]}`);

    if(Number(num) === lottoNumbers[index]) {
      matchedNumbers++;
    }
  })

  console.log(matchedNumbers);
  if (matchedNumbers < 4) {
    res.send("Sorry, you lose");
  } else if (matchedNumbers === 4) {
    res.send("Congratulations, you win a free ticket");
  } else if (matchedNumbers === 5) {
    res.send("Congratulations! You win $100!");
  } else if (matchedNumbers === 6) {
    res.send("Wow! Unbelievable! You could have won the mega millions!");
  }
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});