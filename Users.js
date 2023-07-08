const uuid = require('uuid');

const users = [
  {
    id: uuid.v4(),
    name: 'John',
    email: 'test@gmail.com'
  },
  {
    id: uuid.v4(),
    name: 'John2',
    email: 'test2@gmail.com'
  },
  {
    id: uuid.v4(),
    name: 'John3',
    email: 'test3@gmail.com'
  },
  {
    id: uuid.v4(),
    name: 'John4',
    email: 'test4@gmail.com'
  },
]

module.exports = users; 