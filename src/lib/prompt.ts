export const generatePrompt = ({
  userInput,
  noOfSliders,
}: {
  userInput?: string;
  noOfSliders?: string;
}) => {
  const OUTLINE_PROMPT = `
Generate a PowerPoint slide outline for the topic ${userInput}". Create ${noOfSliders} slides in total. Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover.
Include the following structure:
The first slide should be a Welcome screen.
The second slide should be an Agenda screen.
The final slide should be a Thank You screen.
Return the response only in JSON format, following this schema:
[
 {
 "slideNo": "",
 "slidePoint": "",
 "outline": ""
 }
]
`;
  return OUTLINE_PROMPT;
};

export interface sliderPromptLiveProps {
  designGuide: string;
  color: string;
  outline: string;
}

export const SLIDER_PROMPT = `Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons) 
code for a 16:9 ppt slider in Modern Dark style.
{DESIGN_STYLE}. No responsive design; use a fixed 16:9 layout for slides.
Use Flowbite component structure. Use different layouts depending on content and style.
Use TailwindCSS colors like primary, accent, gradients, background, etc., and include colors from {COLORS_CODE}.
MetaData for Slider: {METADATA}

- Ensure images are optimized to fit within their container div and do not overflow.
- Use proper width/height constraints on images so they scale down if needed to remain inside the slide.
- Maintain 16:9 aspect ratio for all slides and all media.
- Use CSS classes like 'object-cover' or 'object-contain' for images to prevent stretching or overflow.
- Use grid or flex layouts to properly divide the slide so elements do not overlap.

Generate Image if needed using:
'https://ik.imagekit.io/ikmedia/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
Replace {imagePrompt} with relevant image prompt and altImageName with a random image name.  

<!-- Slide Content Wrapper (Fixed 16:9 Aspect Ratio) -->
<div class="w-[800px] h-[500px] relative overflow-hidden">
  <!-- Slide content here -->
</div>
Also do not add any overlay : Avoid this :
    <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>


Just provide body content for 1 slider. Make sure all content, including images, stays within the main slide div and preserves the 16:9 ratio.
`;

export const DUMMY_SLIDER = ` <!-- Slide Content Wrapper (Fixed 16:9 Aspect Ratio) -->
    <div class="w-[800px] h-[500px] relative bg-[#0D0D0D] text-white overflow-hidden">
        <!-- Background Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] to-[#1F1F1F] opacity-70"></div>

        <!-- Grid Layout for Content -->
        <div class="grid grid-cols-2 grid-rows-2 h-full relative z-10">

            <!-- Left Top - Title & Outline -->
            <div class="col-span-1 row-span-1 p-8 flex flex-col justify-start items-start">
                <h1 class="text-4xl font-serif font-bold text-accent mb-4">
                    Welcome to Dessover Lab: The Future of Film
                </h1>
                <p class="text-sm text-gray-300 leading-relaxed">
                    Welcome to our investor pitch for Dessover, an innovative AI Short Film Generator.<br>
                    We are revolutionizing content creation, making filmmaking accessible to everyone.
                </p>
            </div>

            <!-- Right Top - Image/Visual -->
            <div class="col-span-1 row-span-1 p-4 flex justify-end items-start">
                <img src="https://ik.imagekit.io/ikmedia/ik-genimg-prompt-futuristic%20film%20studio%20interior%20black%20gold%20accents/filmStudioAesthetic.jpg" alt="filmStudioAesthetic" class="rounded-lg shadow-lg w-full h-auto object-cover max-h-[200px]">
            </div>

            <!-- Left Bottom - Call to Action/Key Benefit -->
            <div class="col-span-1 row-span-1 p-8 flex flex-col justify-end items-start">
                <div class="bg-[#1F1F1F] bg-opacity-60 backdrop-blur-md rounded-lg p-6">
                    <h2 class="text-2xl font-serif font-semibold mb-2">
                        Unleash Your Creative Vision
                    </h2>
                    <p class="text-gray-200 text-sm leading-relaxed">
                        Transform ideas into stunning short films with the power of AI. No experience needed.
                    </p>
                </div>
            </div>

            <!-- Right Bottom - Slide Number & Subtle Element -->
            <div class="col-span-1 row-span-1 p-8 flex justify-end items-end">
                 <div class="flex items-center space-x-2">
                        <span class="text-gray-400 text-xs font-medium">Slide</span>
                        <span class="text-accent font-bold text-xl">1</span>
                    </div>
                
            </div>

            <!-- Subtle Lighting Effect (Optional) -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-10"></div>
                <div class="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-10"></div>
            </div>
        </div>
    </div>`;
