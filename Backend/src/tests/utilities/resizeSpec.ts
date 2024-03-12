import resize from '../../utilities/resize';

describe('test resize function', () => {
  it('converts an image file', async function () {
    const filename = JSON.stringify('fish.jpg');
    const height = 100;
    const width = 100;
    const newFilePath = '100_100_fish.jpg';

    const response = await resize(filename, width, height, newFilePath);
    return expect(response).toBe(true);
  });

  it('fails to convert an image file', async function () {
    const filename = 'helloworld';
    const height = 100;
    const width = 100;
    const newFilePath = '100_100_helloworld.jpg';

    const response = await resize(filename, width, height, newFilePath);
    return expect(response).toBe(false);
  });
});
