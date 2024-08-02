const spotifyAPI = {
  logIn: jest.fn(),
  getUser: jest.fn(() => {
    return Promise.resolve({
      display_name: '',
      id: '',
    });
  }),
};

export default spotifyAPI;
