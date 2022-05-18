module.exports = class Tickets {
  constructor() {
    this.tickets = [];

    this.tickets.push(
      {
        id: 1,
        name: 'Диагностика видеокарты',
        description: 'Посмотреть видеокарту и определить неисправность,  фризит картинка ',
        status: 'true',
        created: '18.05.2022',
      },
      {
        id: 2,
        name: 'Замена термопасты видеокарты',
        description: 'После диагностики видеокарты выяснилось, что высохла термопаста',
        status: 'false',
        created: '18.05.2022',
      },
      {
        id: 3,
        name: 'Установить новые драйвера на видеокарту',
        description: 'После диагностики и замены термопасты видеокарты, желательно  поставить новые дрова',
        status: 'false',
        created: '18.05.2022',
      },
    );
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
        created: new Date(),
      },
    );
  }
}
