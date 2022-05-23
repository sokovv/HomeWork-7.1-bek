module.exports = class Tickets {
  constructor() {
    this.tickets = [];

    this.tickets.push(
      {
        id: 1,
        name: 'Диагностика видеокарты',
        description: 'Посмотреть видеокарту и определить неисправность,  фризит картинка ',
        status: 'true',
        created: '17 мая 2022 г.',
      },
      {
        id: 2,
        name: 'Замена термопасты видеокарты',
        description: 'После диагностики видеокарты выяснилось, что высохла термопаста',
        status: 'false',
        created: '18 мая 2022 г.',
      },
      {
        id: 3,
        name: 'Установить новые драйвера на видеокарту',
        description: 'После диагностики и замены термопасты видеокарты, желательно  поставить новые дрова',
        status: 'false',
        created: '23 мая 2022 г.',
      },
    );
  }

  formatDate() {
    let newDate = new Date()
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
    };
    return newDate.toLocaleString("ru", options);
  }

  allTickets() {
    const ticketList = this.tickets.map(({
      id, name, status, created,
    }) => ({
      id, name, status, created,
    }));
    return ticketList
  }

  ticketById(id) {
    return this.tickets.find((item) => item.id === id);
  }

  createTicket(name, description) {
    let endId = 0;
    this.tickets.map((item) => {
      if (item.id > endId)
        endId = item.id;
    });
    this.tickets.push(
      {
        id: endId + 1,
        name,
        description,
        status: 'false',
        created: this.formatDate()
      },
    );
  }

  deleteTicket(id) {
    const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);
    this.tickets.splice(ticketIndex, 1);
  }

  changeStatus(id) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    if (ticket.status === 'false') {
      ticket.status = 'true'
    } else {
      ticket.status = 'false'
    }

  }

  editTicket(id, name, description) {
    const ticket = this.tickets.find((ticket) => ticket.id === id);
    ticket.name = name;
    ticket.description = description;
  }
}
