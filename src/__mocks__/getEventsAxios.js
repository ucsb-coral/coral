// Mocking Axios module for Jest

const mockAxios = jest.createMockFromModule('axios');

// Implement any custom behavior you need for your tests
mockAxios.get = jest.fn(() => Promise.resolve({ data: 
    {
        id: 1111111,
        title: "Mock Event",
        description: "This is the mock for an event",
        photo: "https://www.highpointscientific.com/media/magefan_blog/AstroHub-PhotographRocketLaunch.jpg"
    } 
}));

export default mockAxios;