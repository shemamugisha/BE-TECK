/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Shema Mugisha',
          lastName: 'Christian',
          email: 'azertshema@gmail.com',
          password:
            '$2a$10$u1ImH1atOUEF.YFMH0/jy.Qe0f4Hr9VnngwDV.MFOsifoPItZ/JBy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'issa',
          lastName: 'nsabimana',
          email: 'issa@gmail.com',
          password:
            '$2a$10$4cg5.WU6e3MuX9cdkxRip.m/8SqqbLIDeqI8KG8skh4MQm50HdySW',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
