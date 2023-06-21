import request from 'supertest';

describe('/api/login', () => {
  let server: any;
  beforeAll(async () => {
    const mod = await import('../index');
    server = (mod as any).default;
  });  

  it('should return 401 if email is invalid', async () => {
    const res = await request(server)
      .post('/api/login')
      .send({
        email: 'nomail',
        password: 'validpassword123',        
      });
    expect(res.status).toBe(401);    
  });

  it('should return 401 if email is valid and password invalid', async () => {
    const res = await request(server)
      .post('/api/login')
      .send({
        email: 'test@test.de',
        password: 'invalidpassword123',        
      });
    expect(res.status).toBe(401);    
  });

  it('should return 200 if email and password is valid', async () => {
    const res = await request(server)
      .post('/api/login')
      .send({
        email: 'test@test.de',
        password: 'test',        
      });
    expect(res.status).toBe(200);    
  });
});


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
      });
    expect(res.status).toBe(409);    
  });

  it('should return 200 if new email is provided', async () => {
    const res = await request(server)
      .post('/api/signup')
      .send({
        email: 'test2@test.de',
        password: 'test2',
      });
    expect(res.status).toBe(200);    
  });
})

describe('/api/ranks', () => {
  let server: any;
  beforeAll(async () => {
    const mod = await import('../index');
    server = (mod as any).default;
  }); 
  
  it('should get ranklist and return 200', async () => {
    const res = await request(server)
      .get('/api/ranks')

    expect(res.status).toBe(200);  
  });

  it('should return 201 if new rank was added', async () => {
    const res = await request(server)
      .post('/api/ranks')
      .send({
        Name: 'Hans Müller',
        Points: '210',
      });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ success: true });
  });
})