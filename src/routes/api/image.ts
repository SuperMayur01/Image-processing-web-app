import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import resize from '../../utilities/resize';

//implemented NodeCache for caching response
const myCache = new NodeCache();

//interface for object type created to store query string
interface imageVar {
  filename: string;
  width: number | null;
  height: number | null;
}

//middleware to process the image and send response
const handleRequest = async function (
  req: Request,
  res: Response
): Promise<void> {
  try {
    const ext = '.jpg';
    const imageInput: imageVar = res.locals.imageInput;
    const { filename, width, height } = imageInput;
    const convertedPathImage = path.join(
      __dirname + '../../../../assets/converted/' + JSON.parse(filename) + ext
    );

    //Check if the same request has been made,serve previous response
    // Caching has been implemented this way to reduce processing time as well as storage space
    if (
      JSON.stringify(myCache.get('imageInput')) ===
        JSON.stringify(imageInput) &&
      Boolean(myCache.get('file'))
    ) {
      res.status(200).write(myCache.get('file'));
      res.end();
      return;
    }

    await resize(filename, width, height, ext);

    const file = fs.readFileSync(convertedPathImage);

    if (file) {
      myCache.set('imageInput', imageInput);
      myCache.set('file', file);

      res.status(200).write(file);
      res.end();
    } else {
      res.status(500).send('Unable to convert file');
      return;
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
        Number(JSON.parse(JSON.stringify(req.query.width))) < 0
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

export { validateQuery, handleRequest };
