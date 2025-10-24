import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Download, RotateCcw, ZoomIn, ZoomOut, Eye, EyeOff, Check, Palette, ImageIcon, Sparkles, Type, AlignLeft, AlignCenter, AlignRight, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import CasalargaTemp1 from '../imports/CasalargaTemp1-30-302';

interface LabelCustomizerProps {
  onBack: () => void;
}

interface Template {
  id: string;
  name: string;
  background: string;
}

export function LabelCustomizer({ onBack }: LabelCustomizerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('1');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGuides, setShowGuides] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image controls
  const [imageScale, setImageScale] = useState(100);
  const [imageOpacity, setImageOpacity] = useState(100);
  const [imagePositionX, setImagePositionX] = useState(50);
  const [imagePositionY, setImagePositionY] = useState(50);

  // Overlay controls
  const [vignetteStrength, setVignetteStrength] = useState(0);
  const [darkOverlay, setDarkOverlay] = useState(0);

  // Editable text fields
  const [customMessage, setCustomMessage] = useState('');
  
  // Text customization controls
  const [textSize, setTextSize] = useState(14);
  const [textColor, setTextColor] = useState('#482817');
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [textBgStyle, setTextBgStyle] = useState<'solid' | 'semi' | 'none'>('solid');
  const [textPositionX, setTextPositionX] = useState(50);
  const [textPositionY, setTextPositionY] = useState(50);
  
  // Typography controls
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'script'>('serif');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('italic');
  
  // Text effects
  const [textShadow, setTextShadow] = useState(false);
  const [shadowIntensity, setShadowIntensity] = useState(50);
  const [textStroke, setTextStroke] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');

  // Templates with different backgrounds
  const templates: Template[] = [
    { id: '1', name: 'Classic Gold', background: 'linear-gradient(180deg, #D4AF37 0%, #C9A961 50%, #D4AF37 100%)' },
    { id: '2', name: 'Deep Burgundy', background: 'linear-gradient(180deg, #722F37 0%, #8B3A3A 50%, #722F37 100%)' },
    { id: '3', name: 'Forest Green', background: 'linear-gradient(180deg, #2D5016 0%, #3D6B1F 50%, #2D5016 100%)' },
    { id: '4', name: 'Royal Purple', background: 'linear-gradient(180deg, #4A235A 0%, #6C3483 50%, #4A235A 100%)' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setImageScale(100);
    setImageOpacity(100);
    setImagePositionX(50);
    setImagePositionY(50);
  };

  const handleReset = () => {
    setCustomMessage('');
    setUploadedImage(null);
    setSelectedTemplate('1');
    setZoom(100);
    setImageScale(100);
    setImageOpacity(100);
    setImagePositionX(50);
    setImagePositionY(50);
    setVignetteStrength(0);
    setDarkOverlay(0);
    setTextSize(14);
    setTextColor('#482817');
    setTextAlignment('center');
    setTextBgStyle('solid');
    setTextPositionX(50);
    setTextPositionY(50);
    setFontFamily('serif');
    setFontWeight('normal');
    setFontStyle('italic');
    setTextShadow(false);
    setShadowIntensity(50);
    setTextStroke(false);
    setStrokeWidth(1);
    setStrokeColor('#FFFFFF');
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-cream pt-40 md:pt-44">
      {/* Header */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-brown-dark hover:text-brown-primary hover:bg-brown-primary/5"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Shop
            </Button>
          </div>
          <div>
            <h1 className="text-4xl mb-2 text-brown-dark">Custom Label Designer</h1>
            <p className="text-gray-medium text-lg">
              Follow the steps below to create your personalized wine label
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Step-by-Step Controls */}
          <div className="lg:col-span-1">
            
            {/* Progress Indicator */}
            <div className="bg-white rounded-2xl p-4 mb-6 border border-brown-light/20">
              <div className="flex items-center justify-between text-xs text-gray-medium">
                <span>Progress</span>
                <span>{[selectedTemplate, uploadedImage, vignetteStrength > 0 || darkOverlay > 0, customMessage].filter(Boolean).length} of 4 steps</span>
              </div>
              <div className="mt-2 h-2 bg-brown-light/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brown-primary transition-all duration-300"
                  style={{ width: `${([selectedTemplate, uploadedImage, vignetteStrength > 0 || darkOverlay > 0, customMessage].filter(Boolean).length / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step-by-Step Accordion */}
            <Accordion type="multiple" defaultValue={["step1"]} className="space-y-4">
              
              {/* Step 1: Select Background */}
              <AccordionItem value="step1" className="bg-white rounded-2xl border border-brown-light/20 overflow-hidden shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-brown-primary/5 transition-colors">
                  <div className="flex items-center gap-3 text-left w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      selectedTemplate ? 'bg-brown-primary text-white' : 'bg-brown-light/20 text-gray-medium'
                    }`}>
                      {selectedTemplate ? <Check className="h-5 w-5" /> : <Palette className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg text-brown-dark">Step 1: Select Background</h2>
                      <p className="text-xs text-gray-medium mt-0.5">Choose a color template</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`relative h-28 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedTemplate === template.id
                            ? 'border-brown-primary shadow-lg scale-105'
                            : 'border-brown-light/30 hover:border-brown-primary/50 hover:scale-102'
                        }`}
                      >
                        <div 
                          className="w-full h-full"
                          style={{ background: template.background }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <p className="text-xs text-white text-center">{template.name}</p>
                        </div>
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2 w-7 h-7 bg-brown-primary rounded-full flex items-center justify-center shadow-lg">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Step 2: Upload Image */}
              <AccordionItem value="step2" className="bg-white rounded-2xl border border-brown-light/20 overflow-hidden shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-brown-primary/5 transition-colors">
                  <div className="flex items-center gap-3 text-left w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      uploadedImage ? 'bg-brown-primary text-white' : 'bg-brown-light/20 text-gray-medium'
                    }`}>
                      {uploadedImage ? <Check className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg text-brown-dark">Step 2: Upload Image</h2>
                      <p className="text-xs text-gray-medium mt-0.5">Add custom artwork (optional)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  {/* Upload Area */}
                  <div className="space-y-3">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-brown-light/40 rounded-xl p-8 text-center cursor-pointer hover:border-brown-primary/50 hover:bg-brown-primary/5 transition-all"
                    >
                      {uploadedImage ? (
                        <div className="space-y-3">
                          <img src={uploadedImage} alt="Uploaded" className="max-h-32 mx-auto rounded shadow" />
                          <p className="text-sm text-gray-medium">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-10 w-10 text-brown-primary mx-auto" />
                          <div>
                            <p className="text-brown-dark mb-1">Drop your image here</p>
                            <p className="text-sm text-gray-medium">or click to browse</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {uploadedImage && (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearImage();
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full border-brown-light/40 text-brown-dark hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Remove Image
                      </Button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <strong>Tip:</strong> 900×1350 pixels (300 DPI) recommended. Image covers the full label.
                    </p>
                  </div>

                  {/* Image Controls - Only show when image is uploaded */}
                  {uploadedImage && (
                    <div className="space-y-4 pt-4 border-t border-brown-light/20">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="h-4 w-4 text-brown-primary" />
                        <h3 className="text-sm text-brown-dark">Adjust Image</h3>
                      </div>
                      
                      {/* Image Scale */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs text-gray-medium">Scale</Label>
                          <span className="text-xs text-brown-primary">{imageScale}%</span>
                        </div>
                        <Slider
                          value={[imageScale]}
                          onValueChange={(value) => setImageScale(value[0])}
                          min={50}
                          max={200}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Image Opacity */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs text-gray-medium">Opacity</Label>
                          <span className="text-xs text-brown-primary">{imageOpacity}%</span>
                        </div>
                        <Slider
                          value={[imageOpacity]}
                          onValueChange={(value) => setImageOpacity(value[0])}
                          min={10}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Image Position X */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs text-gray-medium">Horizontal Position</Label>
                          <span className="text-xs text-brown-primary">{imagePositionX}%</span>
                        </div>
                        <Slider
                          value={[imagePositionX]}
                          onValueChange={(value) => setImagePositionX(value[0])}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Image Position Y */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-xs text-gray-medium">Vertical Position</Label>
                          <span className="text-xs text-brown-primary">{imagePositionY}%</span>
                        </div>
                        <Slider
                          value={[imagePositionY]}
                          onValueChange={(value) => setImagePositionY(value[0])}
                          min={0}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Step 3: Enhance Visibility */}
              <AccordionItem value="step3" className="bg-white rounded-2xl border border-brown-light/20 overflow-hidden shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-brown-primary/5 transition-colors">
                  <div className="flex items-center gap-3 text-left w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      (vignetteStrength > 0 || darkOverlay > 0) ? 'bg-brown-primary text-white' : 'bg-brown-light/20 text-gray-medium'
                    }`}>
                      {(vignetteStrength > 0 || darkOverlay > 0) ? <Check className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg text-brown-dark">Step 3: Enhance Visibility</h2>
                      <p className="text-xs text-gray-medium mt-0.5">Add overlays for text contrast (optional)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  <p className="text-sm text-gray-medium">
                    Improve text readability on busy backgrounds
                  </p>

                  {/* Vignette */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs text-gray-medium">Vignette (Edge Darkening)</Label>
                      <span className="text-xs text-brown-primary">{vignetteStrength}%</span>
                    </div>
                    <Slider
                      value={[vignetteStrength]}
                      onValueChange={(value) => setVignetteStrength(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Dark Overlay */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs text-gray-medium">Dark Overlay</Label>
                      <span className="text-xs text-brown-primary">{darkOverlay}%</span>
                    </div>
                    <Slider
                      value={[darkOverlay]}
                      onValueChange={(value) => setDarkOverlay(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs text-amber-900">
                      <strong>Tip:</strong> Use these when your image has bright areas or complex details.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Step 4: Add Personal Message */}
              <AccordionItem value="step4" className="bg-white rounded-2xl border border-brown-light/20 overflow-hidden shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-brown-primary/5 transition-colors">
                  <div className="flex items-center gap-3 text-left w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      customMessage ? 'bg-brown-primary text-white' : 'bg-brown-light/20 text-gray-medium'
                    }`}>
                      {customMessage ? <Check className="h-5 w-5" /> : <Type className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg text-brown-dark">Step 4: Add Message</h2>
                      <p className="text-xs text-gray-medium mt-0.5">Include a special note (optional)</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 space-y-4">
                  {/* Custom Message */}
                  <div>
                    <Label htmlFor="custom" className="text-sm text-gray-medium mb-2 block">
                      Personal Message (max 100 characters)
                    </Label>
                    <Textarea
                      id="custom"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value.slice(0, 100))}
                      placeholder="Happy Anniversary! Love, John & Jane"
                      className="min-h-[100px] resize-none border-brown-light/40 focus:border-brown-primary"
                      maxLength={100}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-medium">
                        {customMessage.length}/100 characters
                      </p>
                      {customMessage.length > 80 && (
                        <p className="text-xs text-amber-600">Almost at limit</p>
                      )}
                    </div>
                  </div>

                  {/* Text Customization - Only show when message exists */}
                  {customMessage && (
                    <div className="space-y-5 pt-4 border-t border-brown-light/20">
                      
                      {/* Section: Basic Styling */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Type className="h-4 w-4 text-brown-primary" />
                          <h3 className="text-sm text-brown-dark">Basic Styling</h3>
                        </div>

                        {/* Font Size & Text Color in one row */}
                        <div className="grid grid-cols-2 gap-3">
                          {/* Font Size */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-xs text-gray-medium">Size</Label>
                              <span className="text-xs text-brown-primary">{textSize}px</span>
                            </div>
                            <Slider
                              value={[textSize]}
                              onValueChange={(value) => setTextSize(value[0])}
                              min={10}
                              max={32}
                              step={2}
                              className="w-full"
                            />
                          </div>

                          {/* Font Family */}
                          <div>
                            <Label className="text-xs text-gray-medium mb-2 block">Font</Label>
                            <div className="grid grid-cols-3 gap-1">
                              {[
                                { value: 'serif' as const, label: 'Serif' },
                                { value: 'sans' as const, label: 'Sans' },
                                { value: 'script' as const, label: 'Script' },
                              ].map(({ value, label }) => (
                                <button
                                  key={value}
                                  onClick={() => setFontFamily(value)}
                                  className={`py-1.5 px-2 rounded border text-xs transition-all ${
                                    fontFamily === value
                                      ? 'border-brown-primary bg-brown-primary text-white'
                                      : 'border-brown-light/30 text-brown-dark hover:border-brown-primary/50'
                                  }`}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Text Color Palette */}
                        <div>
                          <Label className="text-xs text-gray-medium mb-2 block">Text Color</Label>
                          <div className="grid grid-cols-6 gap-2">
                            {[
                              { color: '#482817', name: 'Brown' },
                              { color: '#AF6900', name: 'Orange' },
                              { color: '#FFFFFF', name: 'White' },
                              { color: '#000000', name: 'Black' },
                              { color: '#D4AF37', name: 'Gold' },
                              { color: '#722F37', name: 'Wine' },
                            ].map((colorOption) => (
                              <button
                                key={colorOption.color}
                                onClick={() => setTextColor(colorOption.color)}
                                className={`w-full aspect-square rounded-lg border-2 transition-all ${
                                  textColor === colorOption.color
                                    ? 'border-brown-primary scale-110 ring-2 ring-brown-primary/20'
                                    : 'border-brown-light/30 hover:border-brown-primary/50'
                                }`}
                                style={{ backgroundColor: colorOption.color }}
                                title={colorOption.name}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Font Style Toggles */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal')}
                            variant="outline"
                            size="sm"
                            className={`flex-1 ${
                              fontWeight === 'bold'
                                ? 'bg-brown-primary/10 border-brown-primary text-brown-primary'
                                : 'border-brown-light/40 text-brown-dark'
                            }`}
                          >
                            <span className="font-bold mr-1.5">B</span>
                            Bold
                          </Button>
                          <Button
                            onClick={() => setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal')}
                            variant="outline"
                            size="sm"
                            className={`flex-1 ${
                              fontStyle === 'italic'
                                ? 'bg-brown-primary/10 border-brown-primary text-brown-primary'
                                : 'border-brown-light/40 text-brown-dark'
                            }`}
                          >
                            <span className="italic mr-1.5">I</span>
                            Italic
                          </Button>
                        </div>
                      </div>

                      {/* Section: Text Visibility */}
                      <div className="space-y-4 pt-2 border-t border-brown-light/20">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-brown-primary" />
                          <h3 className="text-sm text-brown-dark">Visibility & Effects</h3>
                        </div>

                        {/* Background Style */}
                        <div>
                          <Label className="text-xs text-gray-medium mb-2 block">Background</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: 'solid' as const, label: 'Solid', desc: 'White' },
                              { value: 'semi' as const, label: 'Semi', desc: 'Dark' },
                              { value: 'none' as const, label: 'None', desc: 'Clear' },
                            ].map(({ value, label, desc }) => (
                              <button
                                key={value}
                                onClick={() => setTextBgStyle(value)}
                                className={`p-2.5 rounded-lg border-2 text-center transition-all ${
                                  textBgStyle === value
                                    ? 'border-brown-primary bg-brown-primary/5'
                                    : 'border-brown-light/30 hover:border-brown-primary/50'
                                }`}
                              >
                                <p className="text-xs text-brown-dark">{label}</p>
                                <p className="text-[10px] text-gray-medium mt-0.5">{desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Text Shadow Toggle */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-gray-medium">Text Shadow</Label>
                            <Button
                              onClick={() => setTextShadow(!textShadow)}
                              variant="outline"
                              size="sm"
                              className={`h-7 px-3 ${
                                textShadow
                                  ? 'bg-brown-primary/10 border-brown-primary text-brown-primary'
                                  : 'border-brown-light/40 text-gray-medium'
                              }`}
                            >
                              {textShadow ? 'On' : 'Off'}
                            </Button>
                          </div>
                          {textShadow && (
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-gray-medium">Intensity</span>
                                <span className="text-xs text-brown-primary">{shadowIntensity}%</span>
                              </div>
                              <Slider
                                value={[shadowIntensity]}
                                onValueChange={(value) => setShadowIntensity(value[0])}
                                min={0}
                                max={100}
                                step={10}
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>

                        {/* Text Stroke Toggle */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-gray-medium">Text Outline</Label>
                            <Button
                              onClick={() => setTextStroke(!textStroke)}
                              variant="outline"
                              size="sm"
                              className={`h-7 px-3 ${
                                textStroke
                                  ? 'bg-brown-primary/10 border-brown-primary text-brown-primary'
                                  : 'border-brown-light/40 text-gray-medium'
                              }`}
                            >
                              {textStroke ? 'On' : 'Off'}
                            </Button>
                          </div>
                          {textStroke && (
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xs text-gray-medium">Width</span>
                                  <span className="text-xs text-brown-primary">{strokeWidth}px</span>
                                </div>
                                <Slider
                                  value={[strokeWidth]}
                                  onValueChange={(value) => setStrokeWidth(value[0])}
                                  min={1}
                                  max={4}
                                  step={0.5}
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-medium mb-2 block">Outline Color</Label>
                                <div className="grid grid-cols-4 gap-2">
                                  {[
                                    { color: '#FFFFFF', name: 'White' },
                                    { color: '#000000', name: 'Black' },
                                    { color: '#D4AF37', name: 'Gold' },
                                    { color: '#482817', name: 'Brown' },
                                  ].map((colorOption) => (
                                    <button
                                      key={colorOption.color}
                                      onClick={() => setStrokeColor(colorOption.color)}
                                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                                        strokeColor === colorOption.color
                                          ? 'border-brown-primary scale-110'
                                          : 'border-brown-light/30 hover:border-brown-primary/50'
                                      }`}
                                      style={{ backgroundColor: colorOption.color }}
                                      title={colorOption.name}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section: Position & Alignment */}
                      <div className="space-y-4 pt-2 border-t border-brown-light/20">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4 text-brown-primary" />
                          <h3 className="text-sm text-brown-dark">Layout</h3>
                        </div>

                        {/* Text Alignment */}
                        <div>
                          <Label className="text-xs text-gray-medium mb-2 block">Alignment</Label>
                          <div className="flex gap-2">
                            {[
                              { value: 'left' as const, icon: AlignLeft },
                              { value: 'center' as const, icon: AlignCenter },
                              { value: 'right' as const, icon: AlignRight },
                            ].map(({ value, icon: Icon }) => (
                              <Button
                                key={value}
                                onClick={() => setTextAlignment(value)}
                                variant="outline"
                                size="sm"
                                className={`flex-1 ${
                                  textAlignment === value
                                    ? 'bg-brown-primary hover:bg-brown-primary/90 text-white border-brown-primary'
                                    : 'border-brown-light/40 text-brown-dark hover:bg-brown-primary/5'
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Position Sliders */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <Label className="text-xs text-gray-medium">Horizontal</Label>
                              <span className="text-xs text-brown-primary">{textPositionX}%</span>
                            </div>
                            <Slider
                              value={[textPositionX]}
                              onValueChange={(value) => setTextPositionX(value[0])}
                              min={0}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <Label className="text-xs text-gray-medium">Vertical</Label>
                              <span className="text-xs text-brown-primary">{textPositionY}%</span>
                            </div>
                            <Slider
                              value={[textPositionY]}
                              onValueChange={(value) => setTextPositionY(value[0])}
                              min={0}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-900">
                      <strong>Tip:</strong> The safe zone (green guides) keeps text from being cut during production.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>

            {/* Action Buttons - Always Visible */}
            <div className="bg-white rounded-2xl p-6 border-2 border-brown-primary/20 shadow-lg space-y-3 mt-6 sticky top-4">
              <Button 
                className="w-full bg-brown-primary hover:bg-brown-primary/90 text-white h-12"
                onClick={() => alert('Label saved! In a real app, this would save to cart/account')}
              >
                <Download className="h-5 w-5 mr-2" />
                Add to Cart ($49.99)
              </Button>
              <Button 
                variant="outline"
                className="w-full border-brown-light/40 text-brown-dark hover:bg-brown-primary/5 h-10"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All
              </Button>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-brown-light/20 sticky top-4 shadow-lg">
              
              {/* Preview Header */}
              <div className="mb-6 pb-4 border-b border-brown-light/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brown-primary" />
                    <h2 className="text-2xl text-brown-dark">Live Preview</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowGuides(!showGuides)}
                    className="text-gray-medium hover:text-brown-primary"
                  >
                    {showGuides ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                    {showGuides ? 'Hide' : 'Show'} Guides
                  </Button>
                </div>
                <p className="text-sm text-gray-medium mt-2">
                  Updates in real-time as you customize your label
                </p>
              </div>

              {/* Canvas Container */}
              <div className="relative bg-gray-50 rounded-xl p-8 overflow-auto flex items-center justify-center min-h-[600px]">
                
                {/* Canvas with SVG - Maintains native aspect ratio */}
                <div 
                  className="relative mx-auto"
                  style={{ 
                    width: zoom >= 100 ? `${(387 * zoom) / 100}px` : '387px',
                    maxWidth: '100%',
                  }}
                >
                  {/* Wrapper to maintain exact 387x306 aspect ratio */}
                  <div 
                    className="relative w-full shadow-2xl"
                    style={{ 
                      height: zoom >= 100 ? `${(306 * zoom) / 100}px` : '306px',
                    }}
                  >
                    {/* Background Layer */}
                    <div 
                      className="absolute inset-0"
                      style={{ background: selectedTemplateData?.background }}
                    />

                    {/* Image Upload Layer - covers full label area */}
                    {uploadedImage && (
                      <div 
                        className="absolute inset-0 overflow-hidden"
                        style={{ opacity: imageOpacity / 100 }}
                      >
                        <div 
                          className="relative w-full h-full"
                          style={{
                            transform: `scale(${imageScale / 100})`,
                            transformOrigin: 'center'
                          }}
                        >
                          <img 
                            src={uploadedImage} 
                            alt="Custom artwork" 
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                              objectPosition: `${imagePositionX}% ${imagePositionY}%`
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Vignette Effect Layer */}
                    {vignetteStrength > 0 && (
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, ${vignetteStrength / 100}) 100%)`
                        }}
                      />
                    )}

                    {/* Dark Overlay Layer */}
                    {darkOverlay > 0 && (
                      <div 
                        className="absolute inset-0 pointer-events-none bg-black"
                        style={{
                          opacity: darkOverlay / 100
                        }}
                      />
                    )}

                    {/* SVG Template Layer - sized exactly to fill container */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        // Use dark text for light backgrounds
                        '--fill-0': selectedTemplate === '1' || selectedTemplate === '3' ? '#2C1810' : 'white',
                        color: selectedTemplate === '1' || selectedTemplate === '3' ? '#2C1810' : 'white'
                      } as React.CSSProperties}
                    >
                      <CasalargaTemp1 />
                    </div>

                    {/* Custom Message Overlay - Positioned dynamically */}
                    {customMessage && (
                      <div 
                        className="absolute inset-0 flex items-center pointer-events-none px-4"
                        style={{
                          justifyContent: textAlignment === 'left' ? 'flex-start' : textAlignment === 'right' ? 'flex-end' : 'center',
                          alignItems: textPositionY <= 30 ? 'flex-start' : textPositionY >= 70 ? 'flex-end' : 'center',
                          paddingTop: textPositionY <= 30 ? '12%' : undefined,
                          paddingBottom: textPositionY >= 70 ? '12%' : undefined,
                        }}
                      >
                        <p 
                          className={`max-w-[80%] ${
                            textBgStyle === 'solid' ? 'bg-white/95 px-4 py-2 rounded-lg shadow-sm' : 
                            textBgStyle === 'semi' ? 'bg-black/30 px-4 py-2 rounded-lg shadow-sm' : 
                            ''
                          }`}
                          style={{ 
                            color: textColor,
                            fontSize: `${textSize}px`,
                            textAlign: textAlignment,
                            fontFamily: fontFamily === 'serif' ? 'Libre Baskerville, serif' : 
                                       fontFamily === 'sans' ? 'Nunito Sans, sans-serif' : 
                                       'Brush Script MT, cursive',
                            fontWeight: fontWeight,
                            fontStyle: fontStyle,
                            lineHeight: '1.4',
                            wordBreak: 'break-word',
                            textShadow: textShadow ? `0 ${2 + (shadowIntensity / 50)}px ${4 + (shadowIntensity / 25)}px rgba(0,0,0,${shadowIntensity / 100})` : 'none',
                            WebkitTextStroke: textStroke ? `${strokeWidth}px ${strokeColor}` : 'none',
                            paintOrder: textStroke ? 'stroke fill' : 'normal',
                          }}
                        >
                          {customMessage}
                        </p>
                      </div>
                    )}

                    {/* Guides Overlay */}
                    {showGuides && (
                      <>
                        {/* Die Cut Outline - Full label perimeter */}
                        <div className="absolute inset-0 border-2 border-dashed border-red-500 pointer-events-none" />
                        
                        {/* Bleed Area - Inside die cut */}
                        <div className="absolute inset-[3%] border border-dashed border-yellow-500 pointer-events-none" />
                        
                        {/* Safe Zone - Text and important elements should stay within this */}
                        <div className="absolute inset-[8%_12%] border border-dashed border-green-500 pointer-events-none" />
                      </>
                    )}
                  </div>
                </div>

                {/* Guide Legend */}
                {showGuides && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 text-xs bg-white px-4 py-2 rounded-full shadow-lg border border-brown-light/20">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 border-t-2 border-dashed border-red-500" />
                      <span className="text-gray-medium">Die Cut</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 border-t border-dashed border-yellow-500" />
                      <span className="text-gray-medium">Bleed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 border-t border-dashed border-green-500" />
                      <span className="text-gray-medium">Safe Zone</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Canvas Controls */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  disabled={zoom <= 50}
                  className="border-brown-light/40"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-medium min-w-[60px] text-center">{zoom}%</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  disabled={zoom >= 200}
                  className="border-brown-light/40"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
