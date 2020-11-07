const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

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
});

