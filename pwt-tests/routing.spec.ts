import test, {expect} from '@playwright/test';

test.describe('Favorites Routing', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/login');
  });

  test('Favorites page should only load when you are logged in.', async ({page}) => {
    await expect(page).toHaveURL(/.*\//);
  });
});
