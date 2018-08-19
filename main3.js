let cashbox = {
  moneyInCashbox: [ 
    {
      noteNominal: 100,
      noteAmount: 10
    },
    {
      noteNominal: 50,
      noteAmount: 10
    },
    {
      noteNominal: 25,
      noteAmount: 10
    }
  ],

  ticketPrice: 25,
  
  giveChange: function(money, tickets) {

    if (money <= 0 || tickets <= 0) {
      console.log('Are you kidding. Do not delay the turn!');
      return
    }
    
    let change = {
      moneyInCashbox: [
        {
          noteNominal: 100,
          noteAmount: 0
        },
        {
          noteNominal: 50,
          noteAmount: 0
        },
        {
          noteNominal: 25,
          noteAmount: 0
        }
      ],
      total: 0
    }
    
    if(money < this.ticketPrice*tickets ) {
      console.log('To lillte money');
      return
    }
    
    let monyForChange = money - (tickets * this.ticketPrice);
    
    if (monyForChange % 25 !== 0) {
      console.log('I can\'t give a change');
      return
    }
    
    for (let i = 0; i < this.moneyInCashbox.length; i++) {
      let note = Math.floor(monyForChange / this.moneyInCashbox[i].noteNominal);

      if (note > this.moneyInCashbox[i].noteAmount && i !== this.moneyInCashbox.lenght - 1) {
        console.log('I can\'t give a change');
        return
      }

      monyForChange -= note * this.moneyInCashbox[i].noteNominal;
      change.moneyInCashbox[i].noteAmount = note;
      this.moneyInCashbox[i].noteAmount -= note;

      if (monyForChange === 0) {
        break   
      }
    }
    
    for(let i = 0; i < change.moneyInCashbox.length; i++) {
      change.total += change.moneyInCashbox[i].noteNominal * change.moneyInCashbox[i].noteAmount;
    }
    console.log('change ===>', change);
    console.log('cashbox ===>', this);
  }
}

cashbox.giveChange(1000, 1);