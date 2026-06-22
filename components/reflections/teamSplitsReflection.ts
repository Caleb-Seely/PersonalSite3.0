export const teamSplitsReflection = `
<div class="space-y-2">
  <div class="rounded-lg p-4 border-l-4 border-[#10B981]">
    <p class="text-gray-300 leading-relaxed">
      <span class="text-[#10B981]">TeamSplits</span> started out as clunky spreadsheets in an attempt to use technology to simplify a hectic 30 hours of racing. Tracking 12 runners across 200 miles is never going to be precise—hills and heat will always be a factor. But I wanted to use technology to make this as simple and predictable as conditions would allow. I wanted something built specifically for <span class="text-[#10B981]">race day</span>. Real-time, zero-friction, and reliable even when cell service drops entirely.
    </p>
  </div>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">The Origin & The V1 Disaster</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        I built V1 in a sleepless two weeks leading up to the <span class="text-[#10B981]">2025 Hood to Coast</span>. I hyped it up in running communities, got dozens of teams to sign up, and shipped it using Supabase. Then the race started, and a "clever" automation feature backfired.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        I had built an auto-start feature intended to trigger the first leg based on the team's official start time. Instead, a bug caused subsequent legs to auto-start at their <em>projected</em> times, completely ignoring whether the physical runner had actually crossed the exchange. The app was essentially running its own imaginary race and it was <span class="text-[#10B981]">utterly useless</span>. That is why V2 was entirely re-architected from scratch.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Zero Friction: No Auth, Just a Link</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Nobody wants to deal with passwords or password reset emails, especially on race day. I intentionally skipped authentication. Teams are <span class="text-[#10B981]">managed entirely via unique URLs</span>. Anyone with the link can participate and a special viewer link locks the UI down to read-only for friends and family tracking from home.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">The Core Projection Engine</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        The core of TeamSplits is a deterministic engine that calculates the entire race schedule on the fly. When a runner logs a real handoff time, that <span class="text-[#10B981]">single data point ripples forward</span>, instantly recalculating the estimated arrival times for all remaining legs.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        To make it accurate, I implemented a pace priority fallback: the engine checks for a specific leg override first (great for brutal hills), then falls back to the runner's personal average. To ensure this math never breaks on race day, the library layer is backed by a robust suite of unit tests.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">3 AM Escape Hatches: Jump-to-Leg & God Mode</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        These races are chaotic. If a team forgets to log an exchange or needs to skip a leg entirely, the app can't just lock up. I built two crucial overrides: <span class="text-[#10B981]">Jump-to-Leg</span> allows you to skip to any point in the race via an undoable history stack, and <span class="text-[#10B981]">God Mode</span> provides an explicit panel to backdate or fix typos in past legs.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Real-time Leaderboards & Community Presets</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        To add a community aspect, I built a live leaderboard comparing teams on the same course. Because Firestore doesn't support server-side computed aggregation queries, I solved this by snapshotting the calculated finish times directly onto the team documents whenever they changed, allowing fast, cheap indexing and sorting.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        Finally, I <span class="text-[#10B981]">decoupled the race configurations</span>. Instead of hardcoding Hood to Coast details, races live as Firestore documents. Anyone can submit a new race preset allowing <span class="text-[#10B981]">TeamSplits to scale</span> to new events instantly without requiring code deployments.
      </p>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Lessons Learned So Far</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed mb-4">
        A few important takeaways from this project:
      </p>
      <ul class="list-disc pl-5 text-gray-300 space-y-3 leading-relaxed">
        <li>
          <span class="text-[#10B981] font-medium">There is no substitute for real-world testing:</span> All the unit tests and developer testing will never expose all the problems users are going to find themselves in. Good design can limit the damage, but there will always be something.
        </li>
        <li>
          <span class="text-[#10B981] font-medium">Good design is HARD:</span> A system that is technically functional is only half the battle; it actually has to be intuitive to a range of people.
        </li>
        <li>
          <span class="text-[#10B981] font-medium">Users don't read directions</span> And they shouldn't have to, the design should guide the user, and more information should be available at inflection points where they may want it.
        </li>
        <li>
          <span class="text-[#10B981] font-medium">Iteration:</span> True product quality comes from a feedback loop of constantly tearing down what doesn't work, refining micro-interactions, and polishing the details until the system feels seamless.
        </li>
      </ul>
    </div>
  </details>

</div>
`;