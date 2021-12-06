import got from 'got';
import { expect } from "chai";
import cheerio from 'cheerio';

import server from "../src/index.js";

describe('Test: Home', () => {
    beforeEach(() => {
        server.start()
    });
    afterEach(() => {
       server.close();
    });
    describe('GET /', () => {
       it('debe tener la clase container', async () => {
          const response = await got('http://localhost:9000');
          const $ = cheerio.load(response.body)

          expect($('body .container').hasClass('container')).to.be.true
       })
    });
});