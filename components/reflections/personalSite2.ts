
export const personalSite2Reflection =`
<div class="space-y-2">
  <div class=" rounded-lg p-4  border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      This personal website was built during my college years as a <span class="text-[#10B981]">portfolio to showcase my skills</span> and became a playground for experimenting with new technologies and building interactive features.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Technologies Used</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Frontend:</strong> HTML, CSS, Bootstrap 4</li>
        <li><strong class="text-[#10B981]">JavaScript Libraries:</strong> jQuery, Axios, Slick.js (for carousels)</li>
        <li><strong class="text-[#10B981]">Backend & APIs:</strong> Google Analytics, Spotify API, AWS Lambda</li>
        <li><strong class="text-[#10B981]">Database & Authentication:</strong> Google Firebase</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Responsive Design</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        While design was important to me, my time and experience were limited. I was satisfied with how the site took shape, but I recognized it would never be fully polished. My focus was on <span class="text-[#10B981]">learning and experimenting</span> rather than perfecting every detail.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        The site was designed to be mobile-friendly using Bootstrap, significantly improving its usability and structure compared to my early web development attempts. I used this project as a foundation to experiment with more complex ideas, including my Spotify project.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Project Highlights</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li>Set up <strong class="text-[#10B981]">CI/CD pipelines</strong> with GitHub to streamline builds and deployments.</li>
        <li>Showcased projects dynamically using a JavaScript feature that allowed for an <strong class="text-[#10B981]">unlimited project rotation</strong>, overcoming an original design limitation.</li>
        <li>Integrated a GET request to <strong class="text-[#10B981]">AWS Lambda</strong>, allowing users to input a song and interact with an external API.</li>
        <li>Implemented a <strong class="text-[#10B981]">countdown timer</strong> for events and milestones.</li>
        <li>Developed a private <strong class="text-[#10B981]">note-keeping system</strong> using Google Firebase authentication and database storage.</li>
        <li>Integrated <strong class="text-[#10B981]">Google Analytics</strong> to track visitor engagement and site performance.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Challenges</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Design & Responsiveness</strong> - My first exposure to web design consisted of an unstructured mess of &lt;div&gt; tags and class names I barely understood. This project marked a significant step up as I leveraged Bootstrap to create a more refined, structured, and mobile-friendly experience.</li>
        <li><strong class="text-[#10B981]">JavaScript Integration</strong> - Used Axios to make API calls and fetch dynamic content, such as my Spotify playlist feature.</li>
        <li><strong class="text-[#10B981]">API Implementation</strong> - Explored how to integrate third-party APIs, particularly using Spotify's API to pull and display music data dynamically.</li>
        <li><strong class="text-[#10B981]">Hosting & Performance</strong> - Learned the importance of hosting considerations and site speed when deploying a live project.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Final Thoughts</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        This personal website was a <span class="text-[#10B981]">pivotal learning experience</span>, improving my front-end development skills while also serving as a professional platform to showcase my work. It laid the foundation for my continued exploration of web technologies and hands-on experimentation with new development tools.
      </p>
    </div>
  </details>
</div>
`