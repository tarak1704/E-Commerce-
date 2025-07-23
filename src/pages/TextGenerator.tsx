import React, { useState } from 'react';
import { FileText, Wand2, Copy, Download, RefreshCw, Sparkles } from 'lucide-react';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [textType, setTextType] = useState('creative');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');

  const textTypes = [
    { value: 'creative', label: 'Creative Writing', description: 'Stories, poems, creative content' },
    { value: 'business', label: 'Business Content', description: 'Emails, proposals, reports' },
    { value: 'technical', label: 'Technical Writing', description: 'Documentation, tutorials' },
    { value: 'marketing', label: 'Marketing Copy', description: 'Ads, social media, campaigns' },
    { value: 'academic', label: 'Academic', description: 'Essays, research summaries' }
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' }
  ];

  const lengths = [
    { value: 'short', label: 'Short', description: '~100 words' },
    { value: 'medium', label: 'Medium', description: '~300 words' },
    { value: 'long', label: 'Long', description: '~500 words' }
  ];

  const samplePrompts = [
    "Write a short story about AI helping humans in the future",
    "Create a professional email for a job application follow-up",
    "Explain quantum computing in simple terms",
    "Write marketing copy for a new eco-friendly product",
    "Create a tutorial on React hooks for beginners"
  ];

  const generateText = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI text generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockGeneratedText = `# Generated Content

Based on your prompt: "${prompt}"

**Content Type:** ${textTypes.find(t => t.value === textType)?.label}
**Tone:** ${tone}
**Length:** ${length}

## Generated Text

This is a simulated AI-generated response based on your prompt. In a real implementation, this would be generated using a language model like GPT-3/4, Claude, or similar AI service.

The generated content would be relevant to your prompt and follow the specified tone and length parameters. This demonstration shows how the interface would work with actual AI text generation capabilities.

### Key Features Demonstrated:
- Customizable content types and tones
- Adjustable length parameters
- Real-time generation simulation
- Copy and download functionality
- Professional UI/UX design

This text generation feature showcases modern AI capabilities for content creation across various domains including creative writing, business communications, technical documentation, and marketing materials.`;

    setGeneratedText(mockGeneratedText);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI Text Generator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Generate high-quality content using advanced AI. Customize the type, tone, and length 
          to match your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>
            
            {/* Content Type */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Content Type</label>
              <select
                value={textType}
                onChange={(e) => setTextType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {textTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                {textTypes.find(t => t.value === textType)?.description}
              </p>
            </div>

            {/* Tone */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {tones.map((toneOption) => (
                  <option key={toneOption.value} value={toneOption.value}>
                    {toneOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Length */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Length</label>
              <div className="space-y-2">
                {lengths.map((lengthOption) => (
                  <label key={lengthOption.value} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="length"
                      value={lengthOption.value}
                      checked={length === lengthOption.value}
                      onChange={(e) => setLength(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lengthOption.label}</div>
                      <div className="text-xs text-gray-500">{lengthOption.description}</div>
                    </div>
                  </label>
                ))}
              </div>
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
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-200"
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
                Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here... Be specific about what you want to generate."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <button
                onClick={generateText}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          {generatedText && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Generated Content</span>
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={downloadText}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                    title="Download as text file"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="prose max-w-none bg-gray-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {generatedText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;