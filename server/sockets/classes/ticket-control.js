const fs = require("fs");

class Ticket{

    constructor(number,desktop){
        this.number = number;
        this.desktop = desktop;
    }

}
 
class TicketControl {
  constructor() {
    this.last = 0;
    this.currentDay = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    let data = require("../../data/data.json");

    if (data.currentDay === this.currentDay) {
      this.last = data.last;
      this.tickets = data.tickets;
      this.lastFour = data.lastFour;
    } else {
      this.resetCount();
    }
  }

  nextTicket() {
    this.last += 1;

    let ticket = new Ticket(this.last, null);

    this.tickets.push(ticket);

    this.saveFile();

    return {
      msg: `Ticket ${this.last}`,
      last: this.last,
    };
  }

  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.lastFour = [];

    this.saveFile();

    console.log("Se ha reiniciado el sistema");
  }

  getLastTicket() {
    return {
      msg: `Ticket ${this.last}`,
      last: this.last,
    };
  }

  getLastFour() {
    return this.lastFour;
  }

  attendTicket(desktop) {
    if (this.tickets.length === 0) {
      return {
        msg: `No hay tickets pendientes.`,
      };
    }

    var numTicket = this.tickets[0].number;

    this.tickets.shift();

    var attendTicket = new Ticket(numTicket, desktop);

    this.lastFour.unshift(attendTicket);

    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }

    this.saveFile();

    return attendTicket;
  }

  saveFile() {
    let jsonData = JSON.stringify({
      last: this.last,
      currentDay: this.currentDay,
      tickets: this.tickets,
      lastFour: this.lastFour,
    });

    fs.writeFileSync("./server/data/data.json", jsonData);
  }
}

module.exports = {
    TicketControl
}