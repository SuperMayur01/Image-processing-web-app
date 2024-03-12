import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import resize from '../../utilities/resize';

const PORT = process.env.PORT || 3000;

//interface for object type created to store query string
interface imageVar {
  filename: string;
  width: number | null;
  height: number | null;
}

interface fileResponse {
  url: string;
  name: string;
}

//middleware to process the image and send response
const handleRequest = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const imageInput: imageVar = res.locals.imageInput;
    const { filename, width, height } = imageInput;
    const convertedFileName = width + '_' + height + '_' + JSON.parse(filename);
    const convertedPathImage = path.join(
      __dirname + '../../../../assets/converted/' + convertedFileName
    );

    try {
      const file = fs.readFileSync(convertedPathImage);

      if (file) {
        const fileObject = {
          url: `http://localhost:${PORT}/${convertedFileName}`,
          name: convertedFileName,
        };
        res.status(200).json(fileObject);
        res.end();
      }
    } catch (err) {
      const resized = await resize(filename, width, height, convertedFileName);
      if (resized) {
        const fileObject = {
          url: `http://localhost:${PORT}/${convertedFileName}`,
          name: convertedFileName,
        };
        res.status(200).json(fileObject);
        res.end();
      } else {
        res.send(
          'Image does not exist.'
        );
      }
    }
  } catch (error) {
    res.send(
      'Failed to resize image. Check for valid file names in assets folder.'
    );
  }
};

//middleware to validate query string
const validateQuery = function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    let filename: string;
    let width: number | null;
    let height: number | null;
    if (req.query.filename) {
      filename = JSON.stringify(req.query.filename);
    } else {
      res
        .status(400)
        .send(
          'Enter a valid file name, check assets folder for available names'
        );
      return;
    }
    if (req.query.width) {
      if (
        isNaN(Number(JSON.parse(JSON.stringify(req.query.width)))) ||
        Number(JSON.parse(JSON.stringify(req.query.width))) === 0 ||
        Number(JSON.parse(JSON.stringify(req.query.width))) < 0
      ) {
        res.status(400).send('Enter a valid positive integer for width');
        return;
      } else {
        width = parseInt(JSON.parse(JSON.stringify(req.query.width)));
      }
    } else {
      width = null;
    }
    if (req.query.height) {
      if (
        isNaN(Number(JSON.parse(JSON.stringify(req.query.height)))) ||
        Number(JSON.parse(JSON.stringify(req.query.height))) === 0 ||
        Number(JSON.parse(JSON.stringify(req.query.height))) < 0
      ) {
        res.status(400).send('Enter a valid positive integer for height');
        return;
      } else {
        height = parseInt(JSON.parse(JSON.stringify(req.query.height)));
      }
    } else {
      height = null;
    }
    res.locals.imageInput = { filename, width, height };
    //save data to res.locals for next middleware to access
    next();
  } catch (error) {
    console.log(error);
  }
};

const sendAllImages = (req: Request, res: Response): void => {
  const fileNameArray = fs
    .readdirSync(path.join(__dirname + '../../../../assets/'))
    .filter((e: string) => e !== 'converted');
  const fileUrl: fileResponse[] = [];
  fileNameArray.forEach((e: string) => {
    fileUrl.push({
      url: `http://localhost:${PORT}/${e}`,
      name: e,
    });
  });
  res.json({ files: fileUrl });
};

export { validateQuery, handleRequest, sendAllImages };
