import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/content/projects";
import { chapters, profile } from "../src/content/profile";

/** Skip the opening loader so tests start on the settled page. */
async function settle(page: Page, opts: { motion?: "on" | "off" } = {}) {
  await page.addInitScript((motion) => {
    sessionStorage.setItem("dk-seen", "1");
    if (motion) localStorage.setItem("dk-motion", motion);
  }, opts.motion);
}

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return errors;
}

test.describe("home", () => {
  test("renders identity, every chapter and no console errors", async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await settle(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      profile.first,
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      profile.last,
    );
    for (const c of chapters)
      await expect(page.locator(`#${c.id}`)).toHaveCount(1);
    await expect(
      page.locator(`a[href="mailto:${profile.email}"]`).first(),
    ).toBeAttached();
    await page.evaluate(() =>
      window.scrollTo(0, document.documentElement.scrollHeight),
    );
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
  });

  test("is fully readable with JavaScript disabled", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".loader")).toBeHidden();
    for (const p of projects) {
      await expect(
        page.locator(`a[href="/work/${p.slug}"]`).first(),
      ).toBeVisible();
    }
    await expect(page.locator("#contact .contact__email")).toBeVisible();
    await ctx.close();
  });

  test("opening loader plays once per session, then gets out of the way", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-loading", "");
    await expect(page.locator("html")).not.toHaveAttribute("data-loading", "", {
      timeout: 8000,
    });
    await page.reload();
    await expect(page.locator(".loader")).toBeHidden();
  });

  test("every external link opens safely in a new tab", async ({ page }) => {
    await settle(page);
    await page.goto("/");
    const links = page.locator('a[href^="http"]');
    const n = await links.count();
    expect(n).toBeGreaterThan(3);
    for (let i = 0; i < n; i++) {
      await expect(links.nth(i)).toHaveAttribute("target", "_blank");
      await expect(links.nth(i)).toHaveAttribute("rel", /noreferrer/);
    }
  });

  test("theme choice applies and survives a reload", async ({
    page,
    isMobile,
  }) => {
    await settle(page);
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("button", { name: "Indigo theme" }).first().click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "indigo");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "indigo");
  });

  test("motion can be switched off and reveals everything at once", async ({
    page,
    isMobile,
  }) => {
    await settle(page);
    await page.goto("/");
    if (isMobile) await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("button", { name: /Motion on/ })
      .first()
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
    if (isMobile) await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator("#services .svc__row").first()).toBeVisible();
    await expect(page.locator("#contact .contact__lede")).toBeVisible();
  });
});

test.describe("navigation", () => {
  test("skip link moves focus to the main content", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard flow is checked on desktop");
    await settle(page);
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.locator(".skip-link")).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("a work panel opens its case study and the back link returns", async ({
    page,
  }) => {
    await settle(page);
    await page.goto("/");
    await page.locator(`a[href="/work/${projects[2].slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/work/${projects[2].slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      projects[2].title,
    );
    await page.getByRole("link", { name: /All work/ }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work")).toBeInViewport();
  });

  test("phone menu opens, lists every chapter, and navigates", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "the chapter menu only exists on small screens");
    await settle(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("dialog", { name: "Chapters" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link")).toHaveCount(chapters.length);
    await menu.getByRole("link", { name: /Contact/ }).click();
    await expect(menu).toBeHidden();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("unknown addresses return a real 404 page", async ({ page }) => {
    const res = await page.goto("/work/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /torn out/i,
    );
  });
});

test.describe("case studies", () => {
  for (const p of projects) {
    test(`${p.slug} renders its facts and links`, async ({ page }) => {
      const errors = collectErrors(page);
      await settle(page, { motion: "off" });
      const res = await page.goto(`/work/${p.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        p.title,
      );
      await expect(page.locator(".case__outcome")).toContainText(
        p.result.slice(0, 24),
      );
      for (const href of [p.links.live, p.links.repo]) {
        if (href)
          await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
      }
      for (const img of await page.locator("main img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
            ),
          )
          .toBe(true);
        // Decoration inside an aria-hidden block correctly has an empty alt.
        const decorative = await img.evaluate((el) =>
          Boolean(el.closest('[aria-hidden="true"]')),
        );
        if (!decorative) expect(await img.getAttribute("alt")).toBeTruthy();
      }
      expect(errors).toEqual([]);
    });
  }
});

test.describe("accessibility (axe)", () => {
  for (const path of ["/", "/work/aawaz", "/work/gravity"]) {
    test(`no WCAG A/AA violations on ${path}`, async ({ page }) => {
      await settle(page, { motion: "off" });
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.nodes.length} — ${v.nodes[0]?.target}`,
      );
      expect(summary).toEqual([]);
    });
  }

  for (const theme of ["aged", "indigo", "moss"]) {
    test(`colour contrast holds in the ${theme} theme`, async ({ page }) => {
      await page.addInitScript((t) => {
        sessionStorage.setItem("dk-seen", "1");
        localStorage.setItem("dk-motion", "off");
        localStorage.setItem("dk-theme", t);
      }, theme);
      await page.goto("/");
      const results = await new AxeBuilder({ page })
        .withRules(["color-contrast"])
        .analyze();
      const summary = results.violations.flatMap((v) =>
        v.nodes.map((n) => `${n.target} ${n.any[0]?.message ?? ""}`),
      );
      expect(summary).toEqual([]);
    });
  }
});
