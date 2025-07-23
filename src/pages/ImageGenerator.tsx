import React, { useState } from 'react';
import { Image, Wand2, Download, RefreshCw, Sparkles, Settings } from 'lucide-react';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('square');
  const [quality, setQuality] = useState('standard');

  const styles = [
    { value: 'realistic', label: 'Realistic', description: 'Photorealistic images' },
    { value: 'artistic', label: 'Artistic', description: 'Artistic and creative style' },
    { value: 'cartoon', label: 'Cartoon', description: 'Cartoon-like illustrations' },
    { value: 'abstract', label: 'Abstract', description: 'Abstract and conceptual' },
    { value: 'vintage', label: 'Vintage', description: 'Vintage and retro style' }
  ];

  const sizes = [
    { value: 'square', label: 'Square (1:1)', description: '512x512 pixels' },
    { value: 'landscape', label: 'Landscape (16:9)', description: '768x432 pixels' },
    { value: 'portrait', label: 'Portrait (9:16)', description: '432x768 pixels' }
  ];

  const qualities = [
    { value: 'draft', label: 'Draft', description: 'Fast generation, lower quality' },
    { value: 'standard', label: 'Standard', description: 'Balanced speed and quality' },
    { value: 'high', label: 'High Quality', description: 'Slower generation, best quality' }
  ];

  const samplePrompts = [
    "A futuristic cityscape at sunset with flying cars",
    "A magical forest with glowing mushrooms and fairy lights",
    "A cozy coffee shop on a rainy day",
    "An astronaut riding a horse on Mars",
    "A steampunk robot reading a book in a library",
    "A beautiful ocean sunset with dolphins jumping",
    "A mountain landscape with aurora borealis"
  ];

  // Mock images from Pexels for demonstration
  const mockImages = [
    'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg',
    'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg',
    'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
    'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg'
  ];

  const generateImages = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, this would call an AI image generation API
    const randomImages = [...mockImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    setGeneratedImages(randomImages);
    setIsGenerating(false);
  };

  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <Image className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI Image Generator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create stunning images from text descriptions using advanced AI. 
          Describe what you want to see and watch it come to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Generation Settings</h2>
            </div>
            
            {/* Style */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">Art Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {styles.map((styleOption) => (
                  <option key={styleOption.value} value={styleOption.value}>
                    {styleOption.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                {styles.find(s => s.value === style)?.description}
              </p>
            </div>

            {/* Size */}
            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-700">Image Size</label>
              <div className="space-y-2">
                {sizes.map((sizeOption) => (
                  <label key={sizeOption.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="size"
                      value={sizeOption.value}
                      checked={size === sizeOption.value}
                      onChange={(e) => setSize(e.target.value)}
                      className="text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sizeOption.label}</div>
                      <div className="text-xs text-gray-500">{sizeOption.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quality */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {qualities.map((qualityOption) => (
                  <option key={qualityOption.value} value={qualityOption.value}>
                    {qualityOption.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                {qualities.find(q => q.value === quality)?.description}
              </p>
            </div>
          </div>

          {/* Sample Prompts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Prompts</h3>
            <div className="space-y-2">
              {samplePrompts.map((samplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(samplePrompt)}
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors duration-200 hover:text-orange-700"
                >
                  {samplePrompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Describe Your Image
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create... Be detailed and specific for best results."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              />
              <button
                onClick={generateImages}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Images</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Images */}
          {generatedImages.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-900">Generated Images</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedImages.map((imageUrl, index) => (
                  <div key={index} className="group relative">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => downloadImage(imageUrl, index)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                        title="Download image"
                      >
                        <Download className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-sm font-medium text-gray-900">Image {index + 1}</div>
                      <div className="text-xs text-gray-500">
                        Style: {style} • Quality: {quality}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-600 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Note:</p>
                    <p>These are demonstration images from Pexels. In a real implementation, 
                    images would be generated using AI models like DALL-E, Midjourney, or Stable Diffusion 
                    based on your text description.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;