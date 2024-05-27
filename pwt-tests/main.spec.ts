import test, { expect } from '@playwright/test';

test.describe('mainPage', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
  });

  test('Cards should load', async ({page}) => {
    await expect(page.locator('.place-card__image').first()).toHaveAttribute('src', /https:[/][/].+[.]jpg/);
    await expect(page.locator('.place-card__price-value').first()).toHaveText(/€[0-9]+/);
    await expect(page.locator('.place-card__bookmark-button').first()).toBeVisible();
    await expect(page.locator('.place-card__rating').first()).toBeVisible();
    await expect(page.locator('.place-card__info').first()).toBeVisible();
  });

  test('Filters by city should work', async({page}) => {
    await expect(page.locator('.places__found')).toContainText('Paris');
    const offers = [];
    for (const offer of await page.locator('.cities__card').all()) {
      const text = await offer.textContent();
      offers.push(text);
    }
    expect(offers).toBeDefined();
    await expect(page.locator('.locations__list')).toBeVisible();
    await page.getByRole('listitem').filter({has: page.getByText('Cologne')}).click();
    await expect(page.locator('.places__found')).toContainText('Cologne');
    let containsSameOffers = false;
    for (const offer of await page.locator('.cities__card').all()) {
      const text = await offer.textContent();
      if (offers.includes(text)) {
        containsSameOffers = true;
      }
    }
    expect(containsSameOffers).toBe(false);
  });

  test('Chosing sorting option from low to high should correctly display offers in ascending price order', async({page}) => {
    await page.locator('.places__sorting-type').click();
    await page.getByText('Price: low to high').click();
    const prices = [];
    let maxPrice = 0;
    let isPriceSorted = true;
    for (const element of await page.locator('.place-card__price-value').all()) {
      const text = await element.textContent();
      const price = parseInt((text)!.substring(1), 10);
      prices.push(price);
      if (price >= maxPrice) {
        maxPrice = price;
      } else {
        isPriceSorted = false;
      }
    }
    expect(isPriceSorted).toBe(true);
  });

  test('Chosing sorting option from high to low should correctly display offers in descending price order', async({page}) => {
    await page.locator('.places__sorting-type').click();
    await page.getByText('Price: high to low').click();
    const prices = [];
    let minPrice = 0;
    let isPriceSorted = true;
    for (const element of await page.locator('.place-card__price-value').all()) {
      const text = await element.textContent();
      const price = parseInt((text)!.substring(1), 10);
      prices.push(price);
      if (price <= minPrice || minPrice === 0) {
        minPrice = price;
      } else {
        isPriceSorted = false;
      }
    }
    expect(isPriceSorted).toBe(true);
  });

  test('User cannot add offers to favorites without logging in', async ({page}) => {
    await page.locator('.place-card__bookmark-button').first().click();
    await expect(page).toHaveURL(/.*\/login/);
  });
});
