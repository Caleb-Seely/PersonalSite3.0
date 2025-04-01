// reflections/personalSite3.ts

export const personalSite3Reflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4  border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      This website rebuild was a <span class="text-[#10B981]">fantastic learning opportunity,</span> allowing me to deepen my understanding of modern web development and tackle new technical challenges. Leveraging AI tools to significantly accelerate both learning and development.
    </p>
  </div>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Running Times Display</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
      I envisioned a page that emphasizes the significance of running in my life. The stopwatch feature, slider, and distance buttons were initially just concepts in my mind. Each component came with its own set of challenges, but I’m thrilled with the final result.      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">APIs</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Strava</strong> - This API was a great opportunity to strengthen my technical skills while showcasing another part of my life. I ran into problems with server-side map caching, so I had to implement cache-busting headers and add a timestamp to the request.</li>
        <li><strong class="text-[#10B981]">Google Maps</strong> - Strava only provides polyline data, so I used this API to render the actual route.</li>
        <li><strong class="text-[#10B981]">Spotify</strong> - This integration was a step up from my previous API work. I update the "Currently Playing" section every 30 seconds and have gained a deeper understanding of authentication workflows, including how to securely store API keys.</li>
      </ul>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Image Optimization</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Hero Image</strong> - Optimizing image quality and load times was a major focus. Initially, my hero image took seconds to load because it was unnecessarily large. By resizing and compressing it, I significantly improved performance and applied these techniques across the site.</li>
        <li><strong class="text-[#10B981]">Places</strong> - I preload images so the transition between main photos is seamless. Initially, photos were reloading on every click, which was slow and inefficient.</li>
      </ul>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">AI Development Tools</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        I used AI tools like Anthropic and Google Developer AI to debug issues, explore best practices, and discover new possibilities. This experience highlighted the power of AI as a development aid. The time I saved troubleshooting and optimizing code was invaluable.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Final Thoughts</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
         This project showcased my growth as a developer. It reinforced the importance of performance optimization, API integration, and continuous learning. By overcoming challenges like caching, authentication, and image optimization, I created a website that is visually appealing, fast, and user-friendly—something I am super excited to keep building on.</br></br>
         The core functionality of what you see was built in a sleepless five-day span, with details and minor tweaks made in the following weeks.</br></br>

         A special thank you to everyone behind the photos and the words on these pages. I would not be who I am without the wonderful people I have around me.</br></br>
         Almost all the pictures are my own.</br></br>
         Photos of me credited to: Spencer Ferrin & Others.</br></br>
         First published on 2/17/25.
      </p>
    </div>
  </details>
</div>

`;