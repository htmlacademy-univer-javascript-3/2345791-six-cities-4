import test, {expect} from '@playwright/test';

test.describe('Logged in actions', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/login');
    const email = page.getByPlaceholder('Email');
    const password = page.getByPlaceholder('Password');
    const signIn = page.locator('.login__submit');
    await password.fill('pass34');
    await email.fill('someMail@mail.ru');
    await signIn.click();
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('.header__favorite-count')).toBeVisible();
  });

  test('favorites button should work on main and offer pages and increase favorite count', async ({page}) => {
    page.waitForTimeout(1000);
    const favoriteCount = page.locator('.header__favorite-count');
    const textInitialCount = await favoriteCount.textContent();
    const initialCount = parseInt(textInitialCount as unknown as string, 10);
    const mainBookmarkButton = page.locator('.place-card__bookmark-button').first();
    await expect(mainBookmarkButton).toBeVisible();
    let expectedCount;
    if (await mainBookmarkButton.getAttribute('class') === 'place-card__bookmark-button button place-card__bookmark-button--active') {
      expectedCount = initialCount - 1;
      await expect(mainBookmarkButton).toHaveAttribute('class', 'place-card__bookmark-button button place-card__bookmark-button--active');
    } else if (await mainBookmarkButton.getAttribute('class') === 'place-card__bookmark-button button '){
      expectedCount = initialCount + 1;
      await expect(mainBookmarkButton).toHaveAttribute('class', 'place-card__bookmark-button button ');
    } else {
      fail();
    }
    await expect(favoriteCount).toHaveText(initialCount.toString());
    await mainBookmarkButton.click();
    await expect(favoriteCount).toHaveText(expectedCount.toString());
    await mainBookmarkButton.click();
    await expect(favoriteCount).toHaveText(initialCount.toString());
    await page.locator('.place-card__name').first().locator('a').click();
    await expect(page).toHaveURL(/.*\/offer.*/);
    const offerBookmarkButton = page.locator('.place-card__bookmark-button').first();
    await expect(favoriteCount).toHaveText(initialCount.toString());
    await offerBookmarkButton.click();
    await expect(favoriteCount).toHaveText(expectedCount.toString());
    await offerBookmarkButton.click();
    await expect(favoriteCount).toHaveText(initialCount.toString());
  });

  test('Favorites should load', async ({page}) => {
    const counter = page.locator('.header__favorite-count');
    await counter.click();
    await expect(page).toHaveURL(/.*\/favorites/);
    const count = await counter.textContent();
    if (count !== '0') {
      await expect(page.locator('.place-card__image').first()).toHaveAttribute('src', /https:[/][/].+[.]jpg/);
      await expect(page.locator('.place-card__price-value').first()).toHaveText(/€[0-9]+/);
      await expect(page.locator('.place-card__bookmark-button').first()).toBeVisible();
      await expect(page.locator('.place-card__rating').first()).toBeVisible();
      await expect(page.locator('.place-card__info').first()).toBeVisible();
    }
  });

  test('Review submit should only work when you are logged in and the review has enough rating and words', async ({page}) => {
    const initialReviewCount = await page.locator('.reviews__amount').allTextContents();
    const reviewText = 'This is a review text that has over 50 symbols and yet less than 300.';
    await page.locator('.place-card__name').first().click();
    await expect(page).toHaveURL(/.*\/offer\/.*/);
    const lastReview = page.locator('.reviews__text').first();
    const reviewForm = page.locator('.reviews__textarea');
    const ratingButton = page.getByTitle('good');
    const submitButton = page.locator('.reviews__submit');
    expect(await submitButton.isEnabled()).toBe(false);
    await ratingButton.click();
    expect(await submitButton.isEnabled()).toBe(false);
    await reviewForm.fill(reviewText);
    expect(await submitButton.isEnabled()).toBe(true);
    await submitButton.click();
    await expect(lastReview).toHaveText(reviewText);
    await expect(page.locator('.reviews__amount')).not.toHaveText(initialReviewCount);
  });

});
