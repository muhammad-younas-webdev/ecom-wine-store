// State
let state = {
  selectedTemplate: 1,
  uploadedImage: null,
  imageScale: 100,
  imageOpacity: 100,
  imagePosX: 50,
  imagePosY: 50,
  vignette: 0,
  darkOverlay: 0,
  customMessage: "",
  textSize: 14,
  textColor: "#482817",
  fontFamily: "serif",
  fontWeight: "normal",
  fontStyle: "italic",
  textBg: "solid",
  textAlign: "center",
  textPosX: 50,
  textPosY: 50,
  textShadow: false,
  shadowIntensity: 50,
  textStroke: false,
  strokeWidth: 1,
  strokeColor: "#FFFFFF",
  showGuides: true,
};

const templates = [
  {
    bg: "linear-gradient(180deg, #D4AF37 0%, #C9A961 50%, #D4AF37 100%)",
    light: true,
  },
  {
    bg: "linear-gradient(180deg, #722F37 0%, #8B3A3A 50%, #722F37 100%)",
    light: false,
  },
  {
    bg: "linear-gradient(180deg, #2D5016 0%, #3D6B1F 50%, #2D5016 100%)",
    light: true,
  },
  {
    bg: "linear-gradient(180deg, #4A235A 0%, #6C3483 50%, #4A235A 100%)",
    light: false,
  },
];

// Accordion
function toggleAccordion(num) {
  const content = document.getElementById(`content${num}`);
  content.classList.toggle("open");
}

// Template Selection
function selectTemplate(num) {
  state.selectedTemplate = num;
  for (let i = 1; i <= 4; i++) {
    document
      .getElementById(`template${i}`)
      .classList.toggle("selected", i === num);
  }
  updateProgress();
  updatePreview();
}

// Image Upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      state.uploadedImage = e.target.result;
      document.getElementById("uploadPlaceholder").style.display = "none";
      document.getElementById("uploadPreview").style.display = "block";
      document.getElementById("previewImg").src = e.target.result;
      document.getElementById("removeImageBtn").style.display = "block";
      document.getElementById("imageControls").style.display = "block";
      updateProgress();
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
}

function clearImage() {
  state.uploadedImage = null;
  state.imageScale = 100;
  state.imageOpacity = 100;
  state.imagePosX = 50;
  state.imagePosY = 50;

  document.getElementById("fileInput").value = "";
  document.getElementById("uploadPlaceholder").style.display = "block";
  document.getElementById("uploadPreview").style.display = "none";
  document.getElementById("removeImageBtn").style.display = "none";
  document.getElementById("imageControls").style.display = "none";

  document.getElementById("imageScale").value = 100;
  document.getElementById("imageOpacity").value = 100;
  document.getElementById("imagePosX").value = 50;
  document.getElementById("imagePosY").value = 50;

  updateProgress();
  updatePreview();
}

// Text
document
  .getElementById("customMessage")
  .addEventListener("input", function (e) {
    state.customMessage = e.target.value;
    const length = e.target.value.length;
    document.getElementById("charCount").textContent = length;
    document.getElementById("charWarning").style.display =
      length > 80 ? "block" : "none";
    document.getElementById("textControls").style.display =
      length > 0 ? "block" : "none";
    updateProgress();
    updatePreview();
  });

function setFontFamily(family) {
  state.fontFamily = family;
  ["fontSerif", "fontSans", "fontScript"].forEach((id) => {
    document.getElementById(id).classList.remove("active");
  });
  document
    .getElementById(`font${family.charAt(0).toUpperCase() + family.slice(1)}`)
    .classList.add("active");
  updatePreview();
}

function setTextColor(color) {
  state.textColor = color;
  ["color1", "color2", "color3", "color4", "color5", "color6"].forEach((id) => {
    document.getElementById(id).classList.remove("selected");
  });
  event.target.classList.add("selected");
  updatePreview();
}

function toggleBold() {
  state.fontWeight = state.fontWeight === "normal" ? "bold" : "normal";
  document.getElementById("boldBtn").classList.toggle("active");
  updatePreview();
}

function toggleItalic() {
  state.fontStyle = state.fontStyle === "normal" ? "italic" : "normal";
  document.getElementById("italicBtn").classList.toggle("active");
  updatePreview();
}

function setTextBg(bg) {
  state.textBg = bg;
  ["bgSolid", "bgSemi", "bgNone"].forEach((id) => {
    document.getElementById(id).classList.remove("active");
  });
  event.target.closest("button").classList.add("active");
  updatePreview();
}

function setAlignment(align) {
  state.textAlign = align;
  ["alignLeft", "alignCenter", "alignRight"].forEach((id) => {
    document.getElementById(id).classList.remove("active");
  });
  document
    .getElementById(`align${align.charAt(0).toUpperCase() + align.slice(1)}`)
    .classList.add("active");
  updatePreview();
}

function toggleShadow() {
  state.textShadow = !state.textShadow;
  const toggle = document.getElementById("shadowToggle");
  toggle.textContent = state.textShadow ? "On" : "Off";
  toggle.classList.toggle("active");
  document.getElementById("shadowControls").style.display = state.textShadow
    ? "block"
    : "none";
  updatePreview();
}

function toggleStroke() {
  state.textStroke = !state.textStroke;
  const toggle = document.getElementById("strokeToggle");
  toggle.textContent = state.textStroke ? "On" : "Off";
  toggle.classList.toggle("active");
  document.getElementById("strokeControls").style.display = state.textStroke
    ? "block"
    : "none";
  updatePreview();
}

function setStrokeColor(color) {
  state.strokeColor = color;
  ["stroke1", "stroke2", "stroke3", "stroke4"].forEach((id) => {
    document.getElementById(id).classList.remove("selected");
  });
  event.target.classList.add("selected");
  updatePreview();
}

function toggleGuides() {
  state.showGuides = !state.showGuides;
  const toggle = document.getElementById("guidesToggle");
  document.getElementById("guides").style.display = state.showGuides
    ? "block"
    : "none";
  document.getElementById("guidesLegend").style.display = state.showGuides
    ? "flex"
    : "none";
  toggle.innerHTML = state.showGuides
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> Hide Guides'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> Show Guides';
}

// Update Preview
function updatePreview() {
  // Update slider values
  document.getElementById("scaleValue").textContent = state.imageScale + "%";
  document.getElementById("opacityValue").textContent =
    state.imageOpacity + "%";
  document.getElementById("posXValue").textContent = state.imagePosX + "%";
  document.getElementById("posYValue").textContent = state.imagePosY + "%";
  document.getElementById("vignetteValue").textContent = state.vignette + "%";
  document.getElementById("overlayValue").textContent = state.darkOverlay + "%";
  document.getElementById("textSizeValue").textContent = state.textSize + "px";
  document.getElementById("shadowIntensityValue").textContent =
    state.shadowIntensity + "%";
  document.getElementById("strokeWidthValue").textContent =
    state.strokeWidth + "px";
  document.getElementById("textPosXValue").textContent = state.textPosX + "%";
  document.getElementById("textPosYValue").textContent = state.textPosY + "%";

  // Read slider values
  state.imageScale = parseInt(document.getElementById("imageScale").value);
  state.imageOpacity = parseInt(document.getElementById("imageOpacity").value);
  state.imagePosX = parseInt(document.getElementById("imagePosX").value);
  state.imagePosY = parseInt(document.getElementById("imagePosY").value);
  state.vignette = parseInt(document.getElementById("vignette").value);
  state.darkOverlay = parseInt(document.getElementById("darkOverlay").value);
  state.textSize = parseInt(document.getElementById("textSize").value);
  state.shadowIntensity = parseInt(
    document.getElementById("shadowIntensity").value
  );
  state.strokeWidth = parseFloat(document.getElementById("strokeWidth").value);
  state.textPosX = parseInt(document.getElementById("textPosX").value);
  state.textPosY = parseInt(document.getElementById("textPosY").value);

  // Background
  const template = templates[state.selectedTemplate - 1];
  document.getElementById("backgroundLayer").style.background = template.bg;

  // SVG text color
  const svgColor = template.light ? "#2C1810" : "white";
  ["svgText1", "svgText2", "svgText3", "svgText4"].forEach((id) => {
    document.getElementById(id).setAttribute("fill", svgColor);
  });

  // Image
  if (state.uploadedImage) {
    const imageLayer = document.getElementById("imageLayer");
    const imageTransform = document.getElementById("imageTransform");
    const labelImage = document.getElementById("labelImage");

    imageLayer.style.display = "block";
    imageLayer.style.opacity = state.imageOpacity / 100;
    imageTransform.style.transform = `scale(${state.imageScale / 100})`;
    labelImage.src = state.uploadedImage;
    labelImage.style.objectPosition = `${state.imagePosX}% ${state.imagePosY}%`;
  } else {
    document.getElementById("imageLayer").style.display = "none";
  }

  // Vignette
  if (state.vignette > 0) {
    const vignetteLayer = document.getElementById("vignetteLayer");
    vignetteLayer.style.display = "block";
    vignetteLayer.style.background = `radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, ${
      state.vignette / 100
    }) 100%)`;
  } else {
    document.getElementById("vignetteLayer").style.display = "none";
  }

  // Dark Overlay
  if (state.darkOverlay > 0) {
    const overlayLayer = document.getElementById("overlayLayer");
    overlayLayer.style.display = "block";
    overlayLayer.style.opacity = state.darkOverlay / 100;
  } else {
    document.getElementById("overlayLayer").style.display = "none";
  }

  // Custom Message
  if (state.customMessage) {
    const textOverlay = document.getElementById("textOverlay");
    const labelText = document.getElementById("labelText");

    textOverlay.style.display = "flex";
    labelText.textContent = state.customMessage;

    // Font family
    const fontMap = {
      serif: "Libre Baskerville, serif",
      sans: "Nunito Sans, sans-serif",
      script: "Brush Script MT, cursive",
    };
    labelText.style.fontFamily = fontMap[state.fontFamily];
    labelText.style.fontSize = state.textSize + "px";
    labelText.style.color = state.textColor;
    labelText.style.fontWeight = state.fontWeight;
    labelText.style.fontStyle = state.fontStyle;
    labelText.style.textAlign = state.textAlign;

    // Background
    if (state.textBg === "solid") {
      labelText.style.background = "rgba(255, 255, 255, 0.95)";
      labelText.style.padding = "0.5rem 1rem";
      labelText.style.borderRadius = "8px";
      labelText.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    } else if (state.textBg === "semi") {
      labelText.style.background = "rgba(0, 0, 0, 0.3)";
      labelText.style.padding = "0.5rem 1rem";
      labelText.style.borderRadius = "8px";
      labelText.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
    } else {
      labelText.style.background = "none";
      labelText.style.padding = "0";
      labelText.style.borderRadius = "0";
      labelText.style.boxShadow = "none";
    }

    // Text shadow
    if (state.textShadow) {
      const intensity = state.shadowIntensity / 100;
      labelText.style.textShadow = `0 ${2 + state.shadowIntensity / 50}px ${
        4 + state.shadowIntensity / 25
      }px rgba(0,0,0,${intensity})`;
    } else {
      labelText.style.textShadow = "none";
    }

    // Text stroke
    if (state.textStroke) {
      labelText.style.webkitTextStroke = `${state.strokeWidth}px ${state.strokeColor}`;
      labelText.style.paintOrder = "stroke fill";
    } else {
      labelText.style.webkitTextStroke = "none";
      labelText.style.paintOrder = "normal";
    }

    // Position
    textOverlay.style.justifyContent =
      state.textAlign === "left"
        ? "flex-start"
        : state.textAlign === "right"
        ? "flex-end"
        : "center";

    textOverlay.style.alignItems =
      state.textPosY <= 30
        ? "flex-start"
        : state.textPosY >= 70
        ? "flex-end"
        : "center";

    textOverlay.style.paddingTop = state.textPosY <= 30 ? "12%" : "0";
    textOverlay.style.paddingBottom = state.textPosY >= 70 ? "12%" : "0";
  } else {
    document.getElementById("textOverlay").style.display = "none";
  }

  updateProgress();
}

// Progress
function updateProgress() {
  let completed = 0;
  if (state.selectedTemplate) completed++;
  if (state.uploadedImage) completed++;
  if (state.vignette > 0 || state.darkOverlay > 0) completed++;
  if (state.customMessage) completed++;

  document.getElementById(
    "progressText"
  ).textContent = `${completed} of 4 steps`;
  document.getElementById("progressFill").style.width =
    (completed / 4) * 100 + "%";

  // Update step icons
  document
    .getElementById("icon1")
    .classList.toggle("complete", !!state.selectedTemplate);
  document
    .getElementById("icon2")
    .classList.toggle("complete", !!state.uploadedImage);
  document
    .getElementById("icon3")
    .classList.toggle("complete", state.vignette > 0 || state.darkOverlay > 0);
  document
    .getElementById("icon4")
    .classList.toggle("complete", !!state.customMessage);
}

// Actions
function goBack() {
  if (confirm("Are you sure you want to leave? Your changes will be lost.")) {
    window.history.back();
  }
}

function addToCart() {
  alert(
    "Label saved! In a real app, this would add the custom label to your cart."
  );
}

function resetAll() {
  if (confirm("Reset all customizations?")) {
    state = {
      selectedTemplate: 1,
      uploadedImage: null,
      imageScale: 100,
      imageOpacity: 100,
      imagePosX: 50,
      imagePosY: 50,
      vignette: 0,
      darkOverlay: 0,
      customMessage: "",
      textSize: 14,
      textColor: "#482817",
      fontFamily: "serif",
      fontWeight: "normal",
      fontStyle: "italic",
      textBg: "solid",
      textAlign: "center",
      textPosX: 50,
      textPosY: 50,
      textShadow: false,
      shadowIntensity: 50,
      textStroke: false,
      strokeWidth: 1,
      strokeColor: "#FFFFFF",
      showGuides: true,
    };

    // Reset all controls
    selectTemplate(1);
    clearImage();
    document.getElementById("customMessage").value = "";
    document.getElementById("vignette").value = 0;
    document.getElementById("darkOverlay").value = 0;
    document.getElementById("textSize").value = 14;
    document.getElementById("textPosX").value = 50;
    document.getElementById("textPosY").value = 50;
    document.getElementById("charCount").textContent = "0";
    document.getElementById("textControls").style.display = "none";

    setFontFamily("serif");
    setTextColor("#482817");
    setTextBg("solid");
    setAlignment("center");

    if (state.textShadow) toggleShadow();
    if (state.textStroke) toggleStroke();
    if (
      !document.getElementById("boldBtn").classList.contains("active") ===
      (state.fontWeight === "bold")
    )
      toggleBold();
    if (!document.getElementById("italicBtn").classList.contains("active"))
      toggleItalic();

    updatePreview();
  }
}

// Initialize
updatePreview();
