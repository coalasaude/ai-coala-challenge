import request from 'supertest';

const SERVER_URL = `http://localhost:${APP_PORT}`;

const client = request(SERVER_URL);

const auth = {
  email: 'vinicius.possato@coalasaude.com.br',
  password: 'Applecar2025',
};

describe('AuthResolve (integration)', () => {
  let loginToken: string;

  it('should getLoginTokenFromCredentials with email and password', () => {
    const queryData = {
      query: `
        mutation GetLoginTokenFromCredentials {
          getLoginTokenFromCredentials(email: "${auth.email}", password: "${auth.password}") {
            loginToken {
              token
              expiresAt
            }
          }
        }
      `,
    };

    return client
      .post('/graphql')
      .set('Origin', SERVER_URL)
      .send(queryData)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.errors).toBeUndefined();
      })
      .expect((res) => {
        const data = res.body.data.getLoginTokenFromCredentials;

        expect(data).toBeDefined();
        expect(data.loginToken).toBeDefined();

        loginToken = data.loginToken.token;
      });
  });

  it('should getAuthTokensFromLoginToken with login token', () => {
    const queryData = {
      query: `
        mutation GetAuthTokensFromLoginToken {
          getAuthTokensFromLoginToken(loginToken: "${loginToken}") {
            tokens {
              accessToken {
                token
              }
            }
          }
        }
      `,
    };

    return client
      .post('/graphql')
      .set('Origin', SERVER_URL)
      .send(queryData)
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.errors).toBeUndefined();
      })
      .expect((res) => {
        const data = res.body.data.getAuthTokensFromLoginToken;

        expect(data).toBeDefined();
        expect(data.tokens).toBeDefined();

        const accessToken = data.tokens.accessToken;

        expect(accessToken).toBeDefined();
        expect(accessToken.token).toBeDefined();
      });
  });
});
