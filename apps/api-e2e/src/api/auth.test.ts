import axios from 'axios';

const testUser = {
  email: 'testemail@gmail.com',
  username: 'testusername',
  password: 'testpassword',
};

describe('auth/register', () => {
  let testToken: string;

  afterAll(async () => {
    if (testToken) {
      await axios.delete(`/api/v1/auth/delete`, {
        headers: { Authorization: `Bearer ${testToken}` },
      });
    }
  });

  it('should return 201 and a jwt token', async () => {
    const res = await axios.post(`/api/v1/auth/register`, testUser);
    expect(res.status).toBe(201);
    expect(res.data.token).toBeDefined();
    testToken = res.data.token;
  });

  it('should return 400 when email is already taken', async () => {
    const res = await axios.post(`/api/v1/auth/register`, testUser);
    expect(res.status).toBe(400);
    expect(res.data.message).toBe('Email already taken');
  });
});

describe('auth/login', () => {
  let testToken: string;

  beforeAll(async () => {
    const res = await axios.post(`/api/v1/auth/register`, testUser);
    testToken = res.data.token;
  });

  afterAll(async () => {
    if (testToken) {
      await axios.delete(`/api/v1/auth/delete`, {
        headers: { Authorization: `Bearer ${testToken}` },
      });
    }
  });

  it('should return 200 and a jwt token', async () => {
    const res = await axios.post(`/api/v1/auth/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
  });

  it('should return 401 on wrong password', async () => {
    const res = await axios.post(`/api/v1/auth/login`, {
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
    expect(res.data.message).toBe('Invalid credentials');
  });

  it('should return 401 when user not found', async () => {
    const res = await axios.post(`/api/v1/auth/login`, {
      email: 'wrongemail@gmail.com',
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
    expect(res.data.message).toBe('User not found');
  });
});