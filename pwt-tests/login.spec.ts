import test, {expect} from '@playwright/test';

test.describe('LoginPage', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/login');
  });

  test('login form should work only with appropriate email and password', async ({page}) => {
    const email = page.getByPlaceholder('Email');
    await email.fill('incorrectEmail');
    const password = page.getByPlaceholder('Password');
    await password.fill('pass34');
    const signIn = page.locator('.login__submit');
    await signIn.click();
    await expect(page).toHaveURL(/.*\/login/);
    await password.fill('123');
    await signIn.click();
    await expect(page).toHaveURL(/.*\/login/);
    await password.fill('fsdfsfse');
    await signIn.click();
    await expect(page).toHaveURL(/.*\/login/);
    await password.fill('pass34');
    await email.fill('someMail@mail.ru');
    await signIn.click();
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('.header__favorite-count')).toBeVisible();
  });
});
