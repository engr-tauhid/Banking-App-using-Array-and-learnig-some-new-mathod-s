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
    
    /////////////////////

function createuserId (){
  accounts.forEach(function(el){
    el.userId = el.owner.toLocaleLowerCase().split(' ').map(el => el[0]).join('')
  })
}
createuserId()
containerMovements.innerHTML = ''
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
function displayMovements (movement , sort = false){
  containerMovements.innerHTML = '';
  const mov = sort ? movement.slice().sort((a,b)=> a - b) : movement
  mov.forEach(function(el , i , arr){
    const type = el > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${el}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
})
}
let short = false;
btnSort.addEventListener('click' , function(e){
  displayMovements(currentUser.movements , !short)
  short = !short
})
/////
function displayLebels (acc){
  let deposit = acc.movements.filter(el => el > 0).reduce((acc , el )=> acc + el ,0)
  let withdrawal = acc.movements.filter(el => el < 0).reduce((acc , el )=> acc + el ,0)
  let interest = acc.movements.filter(el => el > 0 ).map(el => el * acc.interestRate/100).filter(el => el > 1).reduce((acc , el)=> acc  + el);
  labelSumInterest.textContent = `${interest}$`
  labelSumIn.textContent = `${deposit}$`;
  labelSumOut.textContent = `${Math.abs(withdrawal)}$`;
}

function balance (movements){
 let mainBalance = movements.reduce((acc , el ) =>{
  return acc + el
 } , 0);
 labelBalance.textContent = `${mainBalance}$`
 return mainBalance;
}
function UiUpdate(acc){
  containerMovements.innerHTML = '';
  balance(acc.movements);
  displayLebels(acc);
  displayMovements(acc.movements);
}
let currentUser;
function loginAction(){
  let userId = inputLoginUsername.value;
  let userPass = Number(inputLoginPin.value);
  inputLoginUsername.value = inputLoginPin.value =''
  inputLoginPin.blur()
  currentUser = accounts.find(el=> el.userId === userId)
  if (currentUser?.pin === userPass){
    containerApp.style.opacity =1
    UiUpdate(currentUser)
    labelWelcome.textContent = `welcome ${currentUser.owner.split(' ')[0]}` 
  }
  }
btnLogin.addEventListener('click' , function(e){
  e.preventDefault()
  loginAction()
})

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault()
  let transferAccNO = inputTransferTo.value;
  let transferMoney = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur()
  let transferAcc = accounts.find(mov => mov.userId === transferAccNO)
  if(transferAcc && transferAcc.userId !== currentUser.userId){
    if(balance(currentUser.movements) >= transferMoney && transferMoney > 0){
      currentUser.movements.push(-transferMoney);
      transferAcc.movements.push (transferMoney);
      UiUpdate(currentUser)
    }
    else{
      console.log('cant be transfer')
    }
  }
  else{
    alert('Yeo Your Inputed Account is not valid so be carefull when you write one')
  }
  
});
btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  let LoanAmount = Number(inputLoanAmount.value);
  let chackingDeposit = currentUser.movements.some(el=> el >= LoanAmount * 0.1)
  if(chackingDeposit){
    currentUser.movements.push(LoanAmount);
    UiUpdate(currentUser);
  }
  
})
btnClose.addEventListener('click' , function(e){
  e.preventDefault();
  if(currentUser.userId == inputCloseUsername.value && currentUser.pin === Number(inputClosePin.value)){
    let index = accounts.findIndex(acc=> acc.userId === currentUser.userId);
    console.log(index)
    accounts.splice(index , 1)
    console.log(accounts)
    containerApp.style.opacity = 0;
    currentUser ='';
    inputClosePin.value = inputCloseUsername.value ='';
  }
});
// console.log(movements)
// console.log(account4.movements.every(el=> el>0));
// ///flat mathod 
// const arr = [1,[2,3],4,5,[6,7],8,9]
// console.log(arr.flat())
// console.log(arr.flat(1))
// //level 1 
// //and now upper then level 1
// const arrdeep = [1,[3,4],[5,[6,7,[8,9]]],1,[5,4]];
// console.log(arrdeep.flat(3))
// ///over all calculation of all accounts movements
// const overallcalculation = accounts.map(el=>el.movements).flat().reduce((acc ,el)=> acc + el ,0)
// console.log(overallcalculation)

// console.log(movements)
// movements.sort((a ,b)=>{
//   if (a > b) return -1;
//   else if (a < b) return 1;
// })
// console.log(movements)
// movements.sort((a ,b)=>{
//   if (a < b) return -1;
//   else if (a > b) return 1;
// })
// console.log(movements)
// const arr = new Array(8);
// arr.fill(3)
// arr.fill(4 , 5 , 7)
// console.log(arr)
// // const arr2 = Array.from({length : 8} , ()=> 3)
// const arr2 = Array.from({length : 8} , (_ , i)=> i + 1 )
// console.log(arr2)
// // the real world  application of this thing now lets test it 
// labelBalance.addEventListener('click' , function(){
//   const totalbalance = Array.from(document.querySelectorAll('.movements__value') , el => Number(el.textContent.replace('€','')))
//   console.log(totalbalance.reduce((acc , el)=>acc + el ,0))
// })
// let the_100_random_dice = Array.from({length : 100} , ()=> Math.trunc(Math.random()*6)+1 )
// console.log(the_100_random_dice)
// const allDeposit = accounts.map(el => el.movements).flat().filter(el=> el > 0).reduce((acc , el )=> acc + el , 0)
// const allDeposit = accounts.flatMap(el => el.movements).filter(el=> el > 0).reduce((acc , el )=> acc + el , 0);
// console.log(allDeposit);
// const allDepositupto1000 = accounts.flatMap(el=> el.movements).reduce((acc , el)=> el >= 1000 ? acc + el : acc , 0);
// console.log(allDepositupto1000);
// const acc = accounts.flatMap(acc=> acc.movements).reduce((acc , el) =>{ 
//   el > 0 ? (acc.deposit += el) :( acc.withdrawal += el);
//   return acc;
// } ,{deposit : 0 , withdrawal : 0});
// console.log(acc);  
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log('hasid')
// console.log(sums);
// function capatilizationTitle (title){
//   const exsecption = ['a' , 'an' , 'and' , 'if' , 'but','at'];
//   const finalExport = title.toLowerCase().split(' ').map(el => exsecption.includes(el) ? el : el.slice(0,1).toUpperCase() + el.slice(1)).join(' ')
//   return finalExport;
// }
// console.log(capatilizationTitle('Hi this is me and i am a developer AT Samsung'));
// console.log(capatilizationTitle('Hi this is me and i am kf sdfuiRf iuasdyhfAfg  an a developer AT Samsung'));
// console.log(capatilizationTitle('Hi this is me and i am a  and or developer AT Samsung'));
// console.log(capatilizationTitle('Hi this is me and i am a developer AT Samsung'));
// function solution(str){
//   let shorted = str.split('')
//   let final =[];
//   let v = 1;
//   for (let x = 0 ; x < shorted.length ; x = x + 2){
//      final.push(`${shorted[x]}${shorted[v] ? shorted[v] : '_'}`)
//      v = v + 2
//   }
//   return final;
  
// }
// console.log(solution('abcde'))
// function arrayDiff(a, b) {
//   let z =[];
//   a.forEach(el => {
//     if(!b.includes(el)){
//     z.push(el);
//   }})
//   let final =  z.sort((a ,b)=> a-b);
//   return final
// }
// function arrayDiff(a, b) {
//   let result =[];
//   a.forEach(el => !b.includes(el) ? result.push(el) : '')
//   return result.sort((a ,b)=> a-b)
// }
// console.log(arrayDiff([1,2,2,2,3],[2]))
// console.log(arrayDiff([-11,-14,-8,-7,11,0,6,0,1,12,-10,-5,-2,-11,-12],[-11,-14,-8,-7]))
// console.log(arrayDiff([-19,-19,-9,-20,-10,15,-1,13,6,-17,5,-15,-19,-1,1,17,19,16,7],[-19,-19]))
// console.log([8,4,2,5,2,1,5,7,8,3].sort((a ,b)=> b-a).includes(3))
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];
dogs.forEach(el=> el['recommendedFood'] = (Math.trunc((el.weight ** 0.75 )* 28)))
console.log(dogs)
const sarahdog = dogs.find(el => el.owners.includes('Sarah'))
console.log(`sarahdog is currently eting ${sarahdog.curFood} and the recomedation food is ${sarahdog.recommendedFood} so sarah dog is eting too ${sarahdog.recommendedFood < sarahdog.curFood ? 'Much' : 'little'}`);
const ownerListEtingMuch = dogs.filter(el=> el.recommendedFood < el.curFood).map(el=> el.owners).flat().sort();
const ownerListEtingLittle = dogs.filter(el=> el.recommendedFood > el.curFood).map(el=> el.owners).flat().sort();
console.log(`${ownerListEtingMuch.join(' and ')} their dogs is eating too much`)
console.log(`${ownerListEtingLittle.join(' and ')} their dogs is eating too little`)
console.log(`There is ${dogs.some(el => el.curFood === el.recommendedFood) ? 'yet some' : 'no'} dogs eating the recomanded food.`)
const chackDogEatigOkey = el => el.curFood > el.recommendedFood * .9 && el.curFood < el.recommendedFood * 1.1
console.log(dogs.some (chackDogEatigOkey))
let chackownerokey = dogs.filter(chackDogEatigOkey).map(el => el.owners).flat()
console.log(`There is ${chackownerokey ? chackownerokey.join(' ') : 'no'} dog${chackownerokey.length > 1 ? 's' : ''} is eating okey`)
let dogSorted = dogs.slice().sort((a , b) => a.recommendedFood - b.recommendedFood);
console.log(dogSorted)
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
