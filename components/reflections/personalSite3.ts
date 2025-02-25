// reflections/personalSite3.ts

export const personalSiteReflection = `
<div class="space-y-2">
  <!-- Introduction - Always visible -->
  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
    <p class="text-gray-300 leading-relaxed">
      This website rebuild was a fantastic learning opportunity, allowing me to deepen my understanding of modern web development and tackle new technical challenges. Here are the key takeaways:
    </p>
  </div>

  <!-- Working with APIs -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Working with APIs</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <div class="space-y-4">
        <div>
          <h4 class="text-[#10B981] font-medium">Strava and Spotify Integration</h4>
          <p class="text-gray-300 leading-relaxed mt-1">
            I integrated APIs from Strava and Spotify, each presenting unique challenges. With Strava, I learned about caching issues—older maps were being cached online, even though they loaded fine locally. This taught me the importance of cache-busting techniques and real-time data accuracy.
          </p>
        </div>

        <div>
          <h4 class="text-[#10B981] font-medium">Authentication Workflows</h4>
          <p class="text-gray-300 leading-relaxed mt-1">
            For Spotify, I explored authentication workflows, including refresh tokens and secure storage. This deepened my understanding of OAuth 2.0 and token-based authentication.
          </p>
        </div>
      </div>
    </div>
  </details>

  <!-- Performance Optimization -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Performance Optimization</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">Image Optimization</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        Optimizing image quality and load times was a major focus. Initially, my hero image took seconds to load because it was unnecessarily large. By resizing and compressing it, I significantly improved performance and applied these techniques across the site.
      </p>
    </div>
  </details>

  <!-- AI Integration -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Leveraging AI for Problem-Solving</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">AI Development Tools</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        I used AI tools like Anthropic and Google Developer AI to debug issues, explore best practices, and discover new possibilities. This experience highlighted the power of AI as a development aid.
      </p>
    </div>
  </details>

  <!-- Outcome -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Outcome</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">Developer Growth</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        This project showcased my growth as a developer. It reinforced the importance of performance optimization, API integration, and continuous learning. By overcoming challenges like caching, authentication, and image optimization, I created a website that's visually appealing, fast, and user-friendly.
      </p>
    </div>
  </details>
</div>
`;