/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Iphone 12',
          brand: 'apple',
          description: '8GB-RAM 64GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone 11',
          brand: 'apple',
          description: '4GB-RAM 128GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Samsung A01',
          brand: 'SAMSUNG',
          description: '4GB-RAM 64GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'MARA X',
          brand: 'MARA',
          description: '8GB-RAM 64GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone XR',
          brand: 'apple',
          description: '8GB-RAM 64GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Iphone 12',
          brand: 'apple',
          description: '8GB-RAM 64GB-MEMORY',
          category: 'phones',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
