const spotifyAPI = {
  logIn: jest.fn(),
  getUser: jest.fn(() => {
    Promise.resolve({
      display_name: '',
      id: '',
    });
  }),
  getSearchEndpoint: jest.fn(() => ''),
  getTracks: jest.fn(() => {
    Promise.resolve({
      trackList: [],
      total: 2,
      next: null,
      previous: null,
    });
  }),
};

export default spotifyAPI;
