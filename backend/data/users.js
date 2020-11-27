import bcrypt from 'bcryptjs'

const users = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    firstName: 'Admin',
    lastName: 'Smith',
    birthDate: new Date(),
    residentialAddress: {
      address: '10 rue des pommes',
      city: 'Paris',
      postalCode: '63500',
      country: 'France',
    },
    phoneNumber: '0647399283',
    formations: [],
  },
  {
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date(),
    residentialAddress: {
      address: '8 rue des bananes',
      city: 'Paris',
      postalCode: '77490',
      country: 'Dijon',
    },
    phoneNumber: '0347799283',
    formations: [],
  },
  {
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    firstName: 'Jane',
    lastName: 'Smith',
    birthDate: new Date(),
    residentialAddress: {
      address: '35 rue des cerises',
      city: 'Paris',
      postalCode: '33290',
      country: 'Le Mans',
    },
    phoneNumber: '0647119098',
    formations: [],
  },
]

export default users
