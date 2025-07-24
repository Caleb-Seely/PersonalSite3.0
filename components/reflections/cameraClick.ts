export const cameraClickReflection = `
<div class="space-y-2">
  <div class="rounded-lg p-4 border-l-4 border-[#10B981]">
    <p class="text-gray-300 leading-relaxed">
      CameraClick is the natural evolution of my earlier project, ClearShot. With ClearShot, I built a custom camera system for Android that could be triggered remotely from a Garmin watch. But the more I used it, the more I realized something important: no matter how much I refined my own camera, it was never going to match the quality, features, and reliability of the <span class="text-[#10B981]">native camera</span> apps people already know and trust.
    </p>
  </div>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">The Pivot</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Instead of trying to reinvent the camera, I focused on what users—myself included—actually wanted: a simple way to <span class="text-[#10B981]">trigger the phone’s native camera</span> using a Garmin watch. The result is CameraClick—a lightweight bridge between Garmin’s Connect IQ platform and Android’s accessibility system. Any button on the watch sends a signal to the phone, and CameraClick taps the shutter button for you.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">From ClearShot to CameraClick</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        I took everything I learned from ClearShot and funneled it into this new version. My goals were clear: keep it simple, make it reliable, and <span class="text-[#10B981]">make it feel native</span>. But achieving that kind of simplicity was hard-earned. It meant thinking carefully about how to interact with any camera app in a universal way—without relying on brittle, hardcoded logic that could break with the next update.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Smart Shutter Detection</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
         CameraClick uses Android’s AccessibilityService to identify and tap the shutter button inside whatever camera app is currently open. Initially, I assumed most apps would use the same structure—same button location, same identifiers. That was mostly true, but not consistent enough.      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        So <span class="text-[#10B981]">I built something smarter.</span> CameraClick uses a scoring heuristic to find the most likely shutter button based on view size, content description, visibility, screen position, and more. If the app ever guesses wrong, users can manually select the correct button and CameraClick will remember it for next time.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        The Garmin watch and phone communicate over Bluetooth using a simple custom protocol. Every button sends the same signal, and the phone knows it means: tap the shutter.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Why I Built It</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
         I built CameraClick because I needed it. As a runner, I’d spent years wishing for a simple, reliable way to trigger my phone’s camera remotely. The options out there either didn’t work well or forced you to abandon the native camera app altogether.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
         I didn’t want to compromise on quality or simplicity, so I built the remote I’d been looking for.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        CameraClick is the tool I always wanted and now I’m happy to share it with others.
      </p>
      <p class="text-gray-300 leading-relaxed" mt-2>
        Today, CameraClick is working across all kinds of Android devices, in places I’ll probably never visit—and that’s something I’m truly proud of. 
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
      <span class="text-[#10B981]">Native camera control, wirelessly triggered from your wrist</span>.
      </p>
    </div>
  </details>
</div>
`;