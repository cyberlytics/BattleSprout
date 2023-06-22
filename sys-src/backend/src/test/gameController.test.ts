import request from 'supertest';

describe('GameController tests', () => {
    let server: any;
    beforeAll(async () => {
      const mod = await import('../index');
      server = (mod as any).default;
    }); 

  it('should retrun 200', async () => {
    const res = await request(server)
      .post('/newgame')
      .send({});
    expect(res.status).toBe(200);    
  });
});