var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;

const bankInfo = dataset.bankBalances;

let bigBank = bankInfo.filter(item => {
  return item.amount > 100000;
});
// console.log("Bigs: ", bigBank);
hundredThousandairs = bigBank;

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;

let rounds = bankInfo.map(elem => {
  return {
    amount: elem.amount,
    state: elem.state,
    rounded: Math.round(elem.amount)
  };
});
// console.log(rounded);
datasetWithRoundedDollar = rounds;

// console.log(datasetWithRoundedDollar);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

let roundedDimes = bankInfo.map(elem => {
  return {
    amount: elem.amount,
    state: elem.state,
    roundedDime: Math.round(10 * elem.amount) / 10
  };
});
datasetWithRoundedDime = roundedDimes;
// console.log(datasetWithRoundedDime);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

const summarize = bankInfo.reduce((previous, next) => {
  return Math.round((previous + Number(next.amount)) * 100) / 100;
}, 0);

sumOfBankBalances = summarize;

// console.log(sumOfBankBalances);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;

let targetedstates = ["WI", "IL", "WY", "OH", "GA", "DE"];

let selectStates = bankInfo
  .filter(item => {
    if (targetedstates.includes(item.state)) {
      return Math.round(item.amount * 0.189 * 100) / 100;
    }
  })
  .reduce((acc, add) => {
    // console.log(reduce);
    return Math.round((acc + Number(add.amount * 0.189)) * 100) / 100;
  }, 0);

sumOfInterests = selectStates;

// console.log(sumOfInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = null;

addStateAmounts = (acc, elem) => {
  if (!acc[elem.state]) {
    acc[elem.state] = Math.round(100 * Number(elem.amount)) / 100;
  } else {
    acc[elem.state] += Math.round(100 * Number(elem.amount)) / 100;
    acc[elem.state] = Math.round(acc[elem.state] * 100) / 100;
  }

  return acc;
};

let summation = bankInfo.reduce(addStateAmounts, {});

stateSums = summation;

// console.log(stateSums);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

// let filterStates = bankInfo.filter(item => {
//   if (item.state !== targetedstates) {
//     return item;
//   }
// });

filtered = elem => {
  return !targetedstates.includes(elem.state);
};

// console.log(filterStates);

let valuesOfFilteredStates = statesFilter => {
  return Object.values(
    bankInfo.filter(statesFilter).reduce(addStateAmounts, {})
  );
};

console.log(valuesOfFilteredStates(filtered));

let getHighRates = valuesOfFilteredStates(filtered)
  .map(elem => Math.round(100 * (Number(elem) * 0.189)) / 100)
  .filter(elem => elem > 50000)
  .reduce((acc, currentElem) => Number(acc.toFixed(2)) + currentElem);

sumOfHighInterests = getHighRates;

// console.log(sumOfHighInterests);

// sumOfHighInterests = filterSum;

// console.log(sumOfHighInterests);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;

module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
