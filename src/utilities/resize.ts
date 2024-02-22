import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const resize = async (
  filename: string,
  width: number | null,
  height: number | null,
  ext: string
): Promise<boolean> => {
  try {
    if (!fs.existsSync(path.join(__dirname + '../../../assets/converted/'))) {
      // create folder if not exists
      fs.mkdirSync(path.join(__dirname + '../../../assets/converted/'));
    }

    const assetname: string = path.join(
      __dirname + '../../../assets/' + JSON.parse(filename) + ext
    );

    //sharp to perform image processing
    await sharp(assetname)
      .resize(width, height)
      .toFile(
        path.join(
          __dirname + '../../../assets/converted/' + JSON.parse(filename) + ext
        )
      );
    return true;
  } catch (error) {
    return false;
  }
};

export default resize;
