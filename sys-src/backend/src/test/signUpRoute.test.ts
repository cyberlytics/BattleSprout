import request from 'supertest';

describe('/api/signup', () => {
    let server: any;
    beforeAll(async () => {
      const mod = await import('../index');
      server = (mod as any).default;
    }); 
    
    it('should return 409 if email is already in use', async () => {
      const res = await request(server)
        .post('/api/signup')
        .send({
          email: 'test@test.de',
          password: 'test',
          username: (Math.random() + 1).toString(36).substring(7)
  
        });
      expect(res.status).toBe(409);    
    });
  
    it('should return 200 if new email is provided', async () => {
      const res = await request(server)
        .post('/api/signup')
        .send({
          email: (Math.random() + 1).toString(36).substring(7)+ '@test.de',
          password: 'test2',
          username: (Math.random() + 1).toString(36).substring(7)
        });
      expect(res.status).toBe(200);    
    });
  
    it('should return 409 if username is already in use', async() => {
      const res = await request(server)
      .post('/api/signup')
      .send({
        email: (Math.random() + 1).toString(36).substring(7)+ '@test.de',
        password: 'test',
        username: 'testuser'
      });
      expect(res.status).toBe(409);
    })
  })