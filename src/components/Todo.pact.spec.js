import { Pact } from '@pact-foundation/pact';
import { API } from '../api';
import { like, regex } from '@pact-foundation/pact/src/dsl/matchers';

const mockProvider = new Pact({
  consumer: 'react-consumer',
  provider: process.env.PACT_PROVIDER ? process.env.PACT_PROVIDER : 'go-provider',
});

describe('API Pact test', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

    test('get jobs', async () => {
      // Arrange
      const expectedJobs = [{ id: 0, body: 'Test'},{ id: 1, body: 'Test'}]

      await mockProvider.addInteraction({
        state: 'a request to get jobs',
        uponReceiving: 'a request to get jobs',
        withRequest: {
          method: 'GET',
          path: '/api/v1/jobs',
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': regex({generate: 'application/json; charset=utf-8', matcher: 'application/json;?.*'}),
          },
          body: like(expectedJobs),
        },
      });

      // Act
      
      const api = new API(mockProvider.mockService.baseUrl);
      const jobs = await api.getJobs()

      // Assert - did we get the expected response
      expect(jobs).toStrictEqual(expectedJobs);
    });

    test('post a jobs', async () => {
      // Arrange
      const expectedJobs = { id: 3,body:""}

      await mockProvider.addInteraction({
        state: 'a request to post a jobs',
        uponReceiving: 'a request to post a jobs',
        withRequest: {
          method: 'POST',
          path: '/api/v1/jobs',
          body: {body:"Test for post job"}
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': regex({generate: 'application/json; charset=utf-8', matcher: 'application/json;?.*'}),
          },
          body: like(expectedJobs),
        },
      });

      // Act
      const api = new API(mockProvider.mockService.baseUrl);
      const jobs = await api.storeJob({body:"Test for post job"})

      // Assert - did we get the expected response
      expect(jobs.id).toBeGreaterThan(0)
    });
  
});