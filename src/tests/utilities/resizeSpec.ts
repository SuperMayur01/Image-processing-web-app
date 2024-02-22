import resize from '../../utilities/resize';

describe('test resize function', () => {
  it('converts an image file', async function () {
    const filename = JSON.stringify('fish');
    const height = 100;
    const width = 100;
    const ext = '.jpg';

    const response = await resize(filename, width, height, ext);
    return expect(response).toBe(true);
  });

  it('fails to convert an image file', async function () {
    const filename = 'helloworld';
    const height = 100;
    const width = 100;
    const ext = '.jpg';

    const response = await resize(filename, width, height, ext);
    return expect(response).toBe(false);
  });
});
