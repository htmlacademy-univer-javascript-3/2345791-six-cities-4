import test, {expect} from '@playwright/test';

test.describe('OfferPage', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173');
    await expect(page.locator('.header__login')).toHaveText('Sign in');
    await page.locator('.place-card__name').first().locator('a').click();
  });

  test('OfferPage should successfully load', async ({page}) => {
    await expect(page).toHaveURL(/.*\/offer\/.+/);
    await expect(page.locator('.offer__image')).toHaveCount(6);
    await expect(page.locator('.offer__name')).toBeVisible();
    await expect(page.locator('.offer__stars')).toBeVisible();
    await expect(page.locator('.offer__features')).toBeVisible();
    await expect(page.locator('.offer__price')).toBeVisible();
    await expect(page.locator('.offer__inside')).toBeVisible();
    await expect(page.locator('.offer__host')).toBeVisible();
    await expect(page.locator('.offer__reviews')).toBeVisible();
    await expect(page.locator('.offer__map')).toBeVisible();
    await expect(page.locator('review__form')).not.toBeVisible();
  });

  test('User cannot add offers to favorites without logging in', async ({page}) => {
    await page.locator('.place-card__bookmark-button').first().click();
    await expect(page).toHaveURL(/.*\/login/);
  });
});
