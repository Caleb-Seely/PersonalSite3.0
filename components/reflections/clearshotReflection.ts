export const clearShotReflection=`
<div class="space-y-2">
  <div class="rounded-lg p-4 border-l-4 border-[#10B981]">
    <p class="text-gray-300 leading-relaxed">
      I wanted to use my Garmin watch to <span class="text-[#10B981]">remotely control my phone’s camera</span>. Most Garmin remote camera apps on the store had poor reviews due to either reliability issues or hidden costs. I decided to build my own. What followed was a deep dive into two different development environments, countless roadblocks, and moments of triumph that made it all worth it.
    </p>
  </div>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Lost in the Jungle</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        The first steps were anything but smooth. I spent an entire day <span class="text-[#10B981]">stuck, buried by Garmin’s documentation, scouring forums,</span> and facing moments of self-doubt. It seemed like every effort to establish a connection between my watch and phone led to a dead end. The breakthrough came from an old message board post where a legend by the name of jim_m_58 explained I needed to use Garmin’s Communication API instead of Bluetooth Low Energy.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        Jim, and his goofy Owl profile picture would provide me with a ton of insight throughout this project.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
         Garmin’s own GitHub repository contained a sample app demonstrating a basic<span class="text-[#10B981]"> exchange of messages between a watch and a phone</span>. With that as my guide, I finally had the foundation I needed to build on.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Getting Coding</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Phase 1.5 involved setting up Android Studio, it’s massive, complicated, and overwhelming. I feel much more comfortable with it now, but at the time it felt quite daunting. 
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        I first experimented with the default camera API but realized it wasn’t suited for remote operation. It required physical interaction, missing the whole point of the project. That led me down the rabbit hole of Camera2 and opting to use CameraX, which eventually gave me the control I needed.  The moment I pressed a button on my Garmin and saw my phone snap a photo, it was pure magic—<span class="text-[#10B981]">like watching the first mars rover photos come in</span>. The kind of moment that makes all the struggle feel worth it.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">The Watch App</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Compared to its Android counterpart, the watch app was far simpler—but learning Monkey C, Garmin’s proprietary language, was an adventure in itself. Learning Monkey C was like learning a hybrid of C++, Python, Ruby, and Java—all with sparse documentation. It felt <span class="text-[#10B981]">like trying to assemble a puzzle with pieces from different boxes</span>. Plus developing for a tiny screen with limited controls forced me to rethink UI design entirely.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        At first, all I needed was a way to send a "Capture Photo" command and receive a confirmation message. As I built the app, more features naturally followed: 
      </p>
      <ul class="list-disc pl-5 text-gray-300">
        <li>capture delays (3, 5, and 10 seconds)</li>
        <li>canceling a delay</li>
        <li>video recording</li>
        <li>mode switching</li>
        <li>Real-time video timer.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">The Android App</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed mt-2">
      Getting the watch adnd phone to communicate was the bare minimum. The real challenge came in implementing a camera system that could <span class="text-[#10B981]">match the quality of the native app</span>. Using the Android camera experience as my guide, I worked to recreate the most critical elements. My goal wasn’t to reinvent smartphone photography—just to give users a way to control it remotely without sacrificing quality.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
      <span class="text-[#10B981]">Video recording</span>—an entirely different beast. Unlike taking a photo, stopping a video isn’t as simple as pressing a button. It involves a completely new workflow, with audio and timing needing to be considered.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
      And in between all of this are the small details—the seamless mode switching of capture methods, the indicator showing whether you're in photo or video mode, error messages, and fallbacks. These little touches might not be flashy, but they’re what make an app feel polished.
      </p>

  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Smaller Features</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 text-gray-300">
        <li><strong class="text-[#10B981]">Metadata:</strong> I wanted photos to include location data, which meant requesting extra permissions. Unfortunately, embedding metadata into MP4 videos eluded me despite my best efforts I just could not figure it out.</li>
        <li><strong class="text-[#10B981]">Device Rotation:</strong> While seeming simple at first, took more work than I anticipated—but getting it right made the app feel much more polished and intuitive.</li>
        <li><strong class="text-[#10B981]">Auto-Launch:</strong> Multiple watches mean different connections. This automatically opens the proper camera instance and the device is labeled at the top.</li>
        <li><strong class="text-[#10B981]">Refinement:</strong> Even after everything was functional, there was an entire phase of polish—renaming variables, improving code structure, handling errors more gracefully, and making sure everything worked intuitively.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Publishing</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        I learned that launching an app wasn’t just about having something functional—it was about making it presentable and <span class="text-[#10B981]">user-friendly at every touchpoint</span>, from privacy policies to promotional images.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Lessons Learned</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Looking back, this project was as much about learning how to navigate new ecosystems as it was about writing code. I continued the practice of <span class="text-[#10B981]">breaking problems</span> into small, solvable pieces. I got better at version control, at thinking through UI <span class="text-[#10B981]">design with constraints</span>, and at slowing down to refactor rather than rushing toward the finish line.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        It was frustrating at times, but I wouldn't trade the experience for anything and I am super happy with how its turned out!
      </p>
    </div>
  </details>
</div>
`