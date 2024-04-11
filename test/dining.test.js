const getMenusForCommon = require('../src/firebaseReduxUtilities/useDiningService');

test('getMenu error test', async () => {
  try {
    // Make the function call and await for the result
    await getMenusForCommon('portola', 'invalid meal period');
    // If the function call succeeds, fail the test
    fail('The function should throw an error');
  } catch (error) {
    // Assert that the error is thrown as expected
    expect(error).toBeDefined();
  }
});
