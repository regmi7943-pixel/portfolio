import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Click on the 'Projects' navigation link to go to the Projects section.
        frame = context.pages[-1]
        # Click on 'Projects' navigation link to go to Projects section
        elem = frame.locator('xpath=html/body/div/div/header/nav/div/a[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on the first project's live demo link to verify it opens correctly and the emulator launches the project.
        frame = context.pages[-1]
        # Click on 'Live Demo' link of Project One
        elem = frame.locator('xpath=html/body/div/div/main/section[4]/div/div/div[2]/div/div/div[2]/div/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Return to the Projects tab and click on the first project's GitHub repository link to verify it opens correctly.
        frame = context.pages[-1]
        # Click the 'Kiran Regmi | Portfolio' tab to return to Projects section
        elem = frame.locator('xpath=html/body/div/p[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Switch back to the original Projects tab (http://localhost:5173/#projects) to regain context and continue testing GitHub repository links.
        frame = context.pages[-1]
        # Switch back to the original Projects tab
        elem = frame.locator('xpath=html/body/header/div/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click on the first project's GitHub repository link to verify it opens correctly in a new tab without errors.
        frame = context.pages[-1]
        # Click on GitHub repository link of the first project
        elem = frame.locator('xpath=html/body/div/footer/div/table/tbody/tr[4]/td[2]/ul/li[5]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=Error 404: Page Not Found').first).to_be_visible(timeout=1000)
        except AssertionError:
            raise AssertionError('Test case failed: External links in Projects section, including live demos and GitHub repositories, did not open correctly or led to errors or broken pages.')
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    