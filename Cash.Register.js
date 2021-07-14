function checkCashRegister(price, cash, cid) {

//arrays and variables
  let coinVal = [ ["PENNY", .01],
                  ["NICKEL", .05], 
                  ["DIME", .10], 
                  ["QUARTER", .25],
                  ["ONE", 1], 
                  ["FIVE", 5], 
                  ["TEN", 10], 
                  ["TWENTY", 20],
                  ["ONE HUNDRED", 100] ];

  let changeArr = [ ["PENNY", 0],
                  ["NICKEL", 0], 
                  ["DIME", 0], 
                  ["QUARTER", 0],
                  ["ONE", 0], 
                  ["FIVE", 0], 
                  ["TEN", 0], 
                  ["TWENTY", 0],
                  ["ONE HUNDRED", 0] ];               

  let finalChangeArr = [];
  let change = cash - price;

  /*preparing to return cid as change value if cid === change
  by separating floats from integers for addition to get
 total cid value*/
  let cidFloat = [];
  let cidWhole = [];
  
  for(let i = 0; i < 4; i++){ 
    cidFloat.push(cid[i][1]);
  }
  for(let i = 4; i < cid.length; i++){ 
    cidWhole.push(cid[i][1]);
  }

  let cidFloatTotal = cidFloat.reduce((a,b)=>{return a + b});
  
  let cidWholeTotal = cidWhole.reduce((a,b)=>{return a + b});
  
  // cid total value
  let cidTotal = cidWholeTotal + cidFloatTotal;

// return statement if change === cid
  if(cidTotal === change){
    
    return {status: "CLOSED", change: [...cid]};
  }



  // this section populates the arr with change to be returned to customer, checks for insufficient funds

  let i = cid.length - 1;
  while(i > 0){
    if(change > 0 && coinVal[i][1] > change || change > 0 &&cid[i][1] === 0){
     
         i--;
    } 
  
    while(change > 0 && coinVal[i][1] <= change && cid[i][1] >= coinVal[i][1]){

        change -= coinVal[i][1];
        cid[i][1] -= coinVal[i][1];
        changeArr[i][1] += coinVal[i][1];
        
        //fix JS floating point irregularities
        change = change.toFixed(2)
        //prevent infinite loop
        if(change === 0){
          i = 0;
        }
             
      } 
    } 

    //return statement for insufficient funds   
     if(change > 0){
        
        return {status: "INSUFFICIENT_FUNDS", change: []};

      }
 /* getting the arr of change in order from greatest to smallest per FCC specifications and returning it */
for(let i = 0; i < changeArr.length; i++){ 
  if(changeArr[i][1] != 0){ 
  finalChangeArr.unshift(changeArr[i])
  }
}
  
return {status: "OPEN", change: [...finalChangeArr]}; 

}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

