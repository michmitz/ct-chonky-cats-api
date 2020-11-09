const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Chonk = require('../lib/models/chonk');

describe('chonky-cat-api-backend routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('creates a chonk', () => {
    return request(app)
      .post('/chonks') 
      .send({
        name: 'Cinderblock',
        weight: 10,
        description: 'Insta-famous cat that is in much better shape these days.',
        imageUrl: 'https://cinderblock.com/cinderblock.png'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Cinderblock',
          weight: '10',
          description: 'Insta-famous cat that is in much better shape these days.',
          imageUrl: 'https://cinderblock.com/cinderblock.png'
        });
      });
  });

  it('gets all chonks', async() => {
    const chonks = await Promise.all([
      {
        name: 'Cinderblock',
        weight: '10',
        description: 'Insta-famous cat that is in much better shape these days.',
        imageUrl: 'https://cinderblock.com/cinderblock.png'
      },
      {
        name: 'Momo',
        weight: '50',
        description: 'Momo is an overweight cat with a love of treats.',
        imageUrl: 'https://momo.com/momo.png'
      },
      {
        name: 'Turnip',
        weight: '35',
        description: 'Turnip knows how to party!',
        imageUrl: 'https://turnip.com/turnip.png'
      }
    ].map(chonk => Chonk.insert(chonk)));

    return request(app)
      .get('/chonks')
      .then(res => {
        chonks.forEach(chonk => {
          expect(res.body).toContainEqual(chonk);
        });
      });
  });
});



