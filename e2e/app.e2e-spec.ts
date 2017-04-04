import { BookmarkPage } from './app.po';

describe('bookmark App', function() {
  let page: BookmarkPage;

  beforeEach(() => {
    page = new BookmarkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
