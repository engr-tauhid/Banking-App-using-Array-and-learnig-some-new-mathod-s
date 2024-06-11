'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// console.log(account1 ,account3)
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ]);
  /////////////////////////////////
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
    accounts.forEach(function(el){
      el.userId = el.owner.toLowerCase().split(' ').map(element => element[0]).join('');
    })
    /////////////////////
containerMovements.innerHTML= '';
function display (movements){
   movements.forEach(function(el,i){
    const type = el >= 0 ? 'deposit' : 'withdrawal';
  const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${el}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',html)
   })
}
display(account1.movements);
/////balance
// const calcBalance = function(movement){
//   let balacnce = movement.reduce((acc , mov)=> acc + mov , 0)
//   labelBalance.textContent=`${balacnce}$`;
// }
// calcBalance(account1.movements)
///lable
function dislplayLable(movement){
let deposit = movement.filter(mov => mov > 0).reduce((acc , balance)=> acc + balance , 0)
labelSumIn.textContent = `${deposit}€`
let withdraw = movement.filter(mov => mov < 0).reduce((acc , balance)=> acc + balance , 0)
labelSumOut.textContent = `${Math.abs(withdraw)}€`
let interest = movement.map(el => Math.trunc(Math.abs((el * 1.1) / 100))).filter(el => el > 1).reduce((acc , mov)=> acc + mov , 0)
labelSumInterest.textContent = `${interest}€`
let balacnce = movement.reduce((acc , mov)=> acc + mov , 0)
labelBalance.textContent=`${balacnce - interest}€`;


}
dislplayLable(account1.movements)
// labelSumIn
//from me if i click the short button;
// let ShortonlydepositwithERO = function (){
//   containerMovements.innerHTML= '';
//   let usdToEuro = 1.1
//     account1.movements.filter(mov => mov > 0).map(mov => Math.trunc(mov * usdToEuro)).forEach(function(mov , i){
//       let html = `<div class="movements__row">
//           <div class="movements__type movements__type--deposit">${i+1} deposit</div>
//           <div class="movements__value">${mov} €</div>
//         </div`
//         containerMovements.insertAdjacentHTML('afterbegin' , html)
//     });
// }
// btnSort.addEventListener('click',ShortonlydepositwithERO)

///////////////
// let alldeposit = movements.filter(function(el){
//   return el > 0
// })
// console.log(alldeposit)
//////////////The reduse mathod 
// accounts.forEach(function(el){
//   el.userId = el.owner.toLowerCase().split(' ').map(el=>el[0]).join('');
//   console.log(el.userId)
// })
// LECTURES
// impleminting usler name for each of those account here 
// fast see how the code look like for simplyfy the function work
// let demoName = 'Tauhid Islam Rafi';
// let DemoUserName = demoName.toLowerCase().split(' ').map(name=>name[0]).join('');
// console.log(DemoUserName)
//you see like that instruction we are gonna create a function for all of our user that define there user name ;
// accounts.forEach(function(el){
//   el.userId = el.owner.toLowerCase().split(' ').map(fastPartofName => fastPartofName[0]).join('')
// })
// function display(element){
//   element.forEach(function(el , i){
//     const type = el >= 0? 'deposit' : 'withdrawal';
//     const html = ` <div class="movements__row">
//           <div class="movements__type movements__type--${type}">
//             ${i+1} ${type}
//           </div>
//           <div class="movements__value">${el}</div>
//         </div>`
//         containerMovements.insertAdjacentHTML('afterbegin' , html)
//   })
// }
// display(account1.movements)
// // containerMovements.innerHTML='';
// function dummyeliments (el , i , type){
//   const html = `
//   <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
//           <div class="movements__value">${el}</div>
//         </div>`;
//         containerMovements.insertAdjacentHTML('afterbegin',html);
// }
// dummyeliments(32432,1,'deposit')
//now i am gonna see about the map mathod. The map mathod don't change the main array but it create a new array for that the map mathod is somthing like the forEach mathod but it return value from his call back function
// const movementsUsd = movements.map(mov=>Math.trunc(mov * 1.1))
// console.log(movementsUsd)
// containerMovements.innerHTML = '';
// function displayDataInUsd (movementsArr){
// movementsArr.map(function(mov , i ){
//   const type = mov >= 0 ? 'deposit' : "withdrawal"; 
//   const html = `
//    <div class="movements__row ${movements.join(' ')}">
//           <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//           <div class="movements__value">${mov}$</div>
//         </div>
//   `;
//   containerMovements.insertAdjacentHTML('afterbegin',html)
// })
// }
// displayDataInUsd(movementsUsd)
/**
 * Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets

 */
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// function chackDogs (dogsJulia , dogsKate){
//   const shallow = dogsJulia.slice(1,-2);
//   const correct = shallow.concat(dogsKate);
//   correct.forEach(function(el , i ){
//     const chack = el>=3 ? `Dog number ${i+1} is an adult , and is ${el} years old` : `Dog number ${i+1} is a puppy , and is ${el} years old`;
//     console.log(chack) 

//   })
// }
// chackDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4])
/// 3rd part all basice array mathod like slice splice and reverse
///slice
// const arr = ['a','b','c','d','e'];
// console.log(arr.slice(1,-2))
// console.log(arr.slice(-3,-1))
// console.log(arr.slice(-3,3))
// console.log(arr)
// ///slice mathod dosn't meutead the array object
// ///splice mathod 
// // console.log(arr.splice(3))
// console.log(arr)
// arr.splice(4,0,'Hi i get it')
// console.log(arr)
// console.log(arr.splice(-3,2))
// console.log(arr)
// /// see that splice mathod dose change the main array there for we can use it like slice mathod
// // and it's batter to always chack the proper documentation like mdn
// //reverse
// arr.reverse()
// console.log(arr)
// ///arr join 
// console.log(arr.join('-----join-----'));
// ///es6 new arr mathod both work in array and string
// console.log(arr[0])
// console.log(arr[arr.length-1])
// console.log(arr.at(-1))
///for each mathod
// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];
// mov.forEach(function(element , index , wholearr){
//    if (element>=0){
//     console.log(`Movement ${index + 1} : ${element} deposited ${wholearr}`)
//    }
//   else if (element<=0){
//     console.log(`Movement ${index + 1} : ${Math.abs(element)} withdraw `)
//    }
// })
// in here we can see that our forEach loop has his won callback function and like that we get what we need from that for removing your confuction here is the same work with for of function 
// console.log('-----------------forOf and for each---------------')
// for(const [index , element] of mov.entries()){
//   if (element>=0){
//     console.log(`Movement ${index + 1} : ${element} deposited `)
//    }
//   else if (element<=0){
//     console.log(`Movement ${index + 1} : ${Math.abs(element)} withdraw `)
//    }
// }
// currencies.forEach(function(value , keys){
//  console.log(` ${keys} : ${value}`)
// })
// console.log('--')
// for(const [keys , value] of currencies){
//   console.log(` ${keys} : ${value}`)
// }
// let setarr = new Set(['usd','bdt','inr'])
// for(const [keys , value] of setarr.entries()){
//   console.log(` ${keys} : ${value}`)
// }
// setarr.forEach(function(el,i){
//   console.log(`${el} ${i}`)
// })

///again try fast all of those 
// const arr = [1,2,3,4,5,6,7,8,9,10];
// // console.log(arr)
// // console.log(arr.slice(1,-1))
// // console.log(arr.slice(-5,-2))
// // console.log(arr.slice(2,-7))
// console.log(arr)
// console.log(arr.splice(3,0,'added1'))
// console.log(arr)
// console.log(arr.splice(3,1,'removed that one and add two ' , 'added 3'))
// console.log(arr.splice(3 , 2))
// console.log(arr)
// console.log('in this point we see slice mathod dont change the value of the array but the splice mathod dose that and as also we will see the reverse mathod also change the value of the array ')
// console.log(arr.reverse())
// console.log(arr)
// console.log(arr.join('--joined--'))
// console.log(arr)
// let cont = arr.concat(arr)
// console.log(cont)
// //sprad operator fit the job much batter
// console.log(arr.at(1))
// console.log(arr.slice(1,6).at(1))
// arr.forEach(function(el , i , arry){
//   console.log(`${i+1} : ${el} from ${arry}`)
// })
// currencies.forEach(function(vlaue , keys){
//   console.log( `${keys} : ${vlaue}`)
// })

/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 
*/
///reduse 
// let maximum = movements.reduce((max , el)=> max < el ? max =el : max , movements.at(0))
// console.log(maximum)
// let test = movements.reduce(function(acc , mov){
//   if(acc > mov) return acc;
//   else return mov
// } , movements[0])
// console.log(test)
// console.log(movements)
// const calcAverageHumanAge = function(ages){
//     let humanage = ages.map(function(el){
//       if (el<=2) return el *2;
//       else if (el > 2) return 16 + el * 4;
//     });
//     let adult = humanage.filter(el => el > 18);
//     let avarage = adult.reduce((acc , el) => acc + el ,0) /adult.length
//     return avarage
    
// }
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]))
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))

/// all thing i just learn until now
// fast one is some array mathod like
// const valuereturn = movements.map((mov , i , arr) =>{
//   let type = mov < 0 ? 'withdraw' : 'deposit';
//   return `Iteration ${i+1} total ${type} is ${mov}`
// }) 
// console.log(...valuereturn)
// const valuefilter = movements.filter(map => map > 0)
// console.log(valuefilter)
// const valueReduse = movements.reduce((acc , el)=> acc + el ,0)
// console.log(valueReduse)
// let sum = 0;
// for(let x of movements)sum+=x;
// console.log(sum)
// // movements.forEach((mov , i , arr) => console.log(mov , i ,arr)) 
// console.log (movements.lastIndexOf(450))
// console.log (movements.slice(1 , -1))
// console.log (movements)
// console.log(movements.splice(0 /**the position where the operation will work */, 0 /**the number of element that you want to remove from the array */, /*if you want to add some element from the position then that will be write here*/'hu' , 'la'))
// console.log (movements)
// console.log (movements.includes(4000))
// console.log (movements.includes(3000))
// console.log (movements.lastIndexOf(450))
// console.log (movements.lastIndexOf(450))
// console.log (movements.at(0))
// console.log (movements.indexOf(400))
// console.log (movements.indexOf(-400))
