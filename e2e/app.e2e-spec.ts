import { RxJSPage } from './app.po';

describe('rx-js App', () => {
  let page: RxJSPage;

  beforeEach(() => {
    page = new RxJSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
