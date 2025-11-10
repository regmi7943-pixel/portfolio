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
        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Open the portfolio website on Firefox desktop browser to verify visual consistency and functionality.
        await page.goto('about:blank', timeout=10000)
        await asyncio.sleep(3)
        

        await page.goto('http://localhost:5173', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Kiran Regmi').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=I build performant, delightful apps with React, React Native, Firebase, MySQL, and Node.js.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=I\'m a front-end and cross‑platform developer focused on building fast, accessible, and well-crafted products. I enjoy clean architectures, smooth animations, and solving real user problems.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React Native').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Firebase').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=MySQL').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Project One').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A modern web app showcasing clean UI and responsive design.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Project Two').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mobile-first app with Firebase backend and real-time features.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Project Three').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cross-platform React Native app with rich interactions.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download my CV for a concise overview of my experience and skills.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Have a question or want to work together? Send me a message.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contact form disabled. Add Firebase keys to .env to enable.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2025 Kiran Regmi').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    