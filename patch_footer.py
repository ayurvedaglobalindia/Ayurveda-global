import re

with open("src/components/layout/Footer.tsx", "r") as f:
    content = f.read()

# Replace Twitter import with Youtube
content = content.replace("Twitter,", "Youtube,")

whatsapp_icon = """<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>"""

twitter_block = """<a
                href="#"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#2D4A3E] hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>"""

new_socials = f"""<a
                href="https://youtube.com/@ayurvedaglobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919123485451"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                {whatsapp_icon}
              </a>"""

content = content.replace(twitter_block, new_socials)

# Also update Facebook and Instagram hrefs so they are "clickable"
content = content.replace('href="#"\n                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#2D4A3E] hover:text-white transition-colors"\n                aria-label="Instagram"', 'href="https://instagram.com"\n                target="_blank"\n                rel="noopener noreferrer"\n                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors"\n                aria-label="Instagram"')

content = content.replace('href="#"\n                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#2D4A3E] hover:text-white transition-colors"\n                aria-label="Facebook"', 'href="https://facebook.com"\n                target="_blank"\n                rel="noopener noreferrer"\n                className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"\n                aria-label="Facebook"')


with open("src/components/layout/Footer.tsx", "w") as f:
    f.write(content)
