"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { colors } from '@/app/styles/colors';

interface ForestFireSectionProps {
  className?: string;
}

const ForestFireSection: React.FC<ForestFireSectionProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="forest-fires" className={`py-8 bg-gray-900 ${className}`}>
      <div className="container mx-auto px-2 max-w-7xl">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h2 className={`text-3xl font-bold ${colors.accent2}`}>Let the Forest Burn</h2>
          {isExpanded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
        </button>
        
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Historical Context', 'Pacific Northwest Legacy', 'Modern Challenges'].map((title, index) => (
              <Card key={title} className={`bg-gray-800`}>
                <CardContent className="p-4">
                  <h3 className={`text-xl font-semibold mb-4 ${colors.accent2}`}>{title}</h3>
                  <p className={colors.text}>
                    {index === 0 && 
                      <>
                        Forest fires are a critical component of many ecosystems, helping regenerate soil, recycle nutrients, and maintain biodiversity. Many plant species, like lodgepole pine, depend on fire for regeneration. Fires also reduce fuel loads and disease, promoting forest health when they occur under natural regimes. However, decades of fire suppression have disrupted these natural cycles, leading to denser forests with higher fuel loads. As a result, today&apos;s wildfires tend to be larger, hotter, and more destructive than those of the past. 
                       (<a href="https://www.researchgate.net/publication/287243259_Fire_in_Mediterranean_Ecosystems_Ecology_Evolution_and_Management" target="_blank" rel="noopener noreferrer" className={colors.accent}>Keeley et al., 2011</a>).
                      </>
                    }
                    {index === 1 && 
                      <>
                        In the Pacific Northwest, fire has deep cultural and ecological roots. Indigenous peoples—including the Karuk, Yurok, and other tribes—have long used intentional burning to manage the land, promote plant growth, and reduce the risk of catastrophic wildfire. These practices reflect a sophisticated understanding of fire as a sacred and ecological tool. Colonization and federal policies, however, suppressed these traditions, leading to fuel buildup and less resilient forests                
                        (<a href="https://doi.org/10.1016/j.foreco.2005.01.018" target="_blank" rel="noopener noreferrer" className={colors.accent}>Indigenous Fire Management Practices</a>).
                      </>
                    }
                    {index === 2 && 
                      <>
                        Climate change is driving longer, more intense fire seasons due to higher temperatures, earlier snowmelt, and prolonged drought. Combined with a century of fire suppression, this has led to more severe wildfires. Modern forest management increasingly focuses on &quot;living with fire&quot; through prescribed burns, thinning, and community resilience. Scientists have found that climate change caused by humans has nearly doubled the amount of forest burned in the western U.S. since the 1980s by drying out forests and making them more flammable. 
                        (<a href="https://doi.org/10.1073/pnas.1607171113" target="_blank" rel="noopener noreferrer" className={colors.accent}>Abatzoglou & Williams, 2016</a>).
                      </>
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ForestFireSection; 