import { PhotoboothConfig } from '../types/photobooth';
import { COLOR_FILTERS, LAYOUT_OPTIONS } from '../data/presets';
import { STICKERS } from '../data/stickers';

// Helper to load an image from dataUrl or SVG string
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

export function svgToDataUri(svgContent: string): string {
  const cleanSvg = svgContent.trim();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleanSvg)}`;
}

export async function renderPhotoboothCanvas(
  photos: (string | null)[],
  config: PhotoboothConfig
): Promise<string> {
  const layoutOpt = LAYOUT_OPTIONS.find(l => l.id === config.layout) || LAYOUT_OPTIONS[0];
  const photoCount = layoutOpt.photoCount;
  const cols = layoutOpt.cols;
  const rows = Math.ceil(photoCount / cols);

  // Setup high-resolution canvas dimensions
  const baseWidth = cols === 1 ? 800 : 1100;
  const paddingX = cols === 1 ? 55 : 50;
  const paddingY = 65;
  const bottomFooterHeight = cols === 1 && photoCount === 1 ? 260 : 190;
  const gap = 30;

  // Photo slot dimension calculation
  const availableWidth = baseWidth - (paddingX * 2) - ((cols - 1) * gap);
  const slotWidth = availableWidth / cols;
  // Aspect ratio for individual photo (4:3 or 1:1 or 3:2)
  const slotAspectRatio = photoCount === 1 ? 1 : 0.75; // height / width: 4:3 landscape ratio or portrait
  const slotHeight = slotWidth * slotAspectRatio;

  const totalHeight = paddingY + (rows * slotHeight) + ((rows - 1) * gap) + bottomFooterHeight;

  const canvas = document.createElement('canvas');
  canvas.width = baseWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2d canvas context');

  // Wait for Google web fonts to be ready
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Gracefully continue
    }
  }

  // 1. Draw Background
  ctx.fillStyle = config.bgColor || '#FFF7ED';
  ctx.fillRect(0, 0, baseWidth, totalHeight);

  // 2. Draw Background Pattern
  if (config.pattern === 'dots') {
    ctx.fillStyle = config.patternColor || 'rgba(0,0,0,0.06)';
    const spacing = 28;
    for (let x = 14; x < baseWidth; x += spacing) {
      for (let y = 14; y < totalHeight; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (config.pattern === 'gingham') {
    ctx.fillStyle = config.patternColor || 'rgba(255,255,255,0.4)';
    const step = 32;
    for (let x = 0; x < baseWidth; x += step) {
      ctx.fillRect(x, 0, step / 2, totalHeight);
    }
    for (let y = 0; y < totalHeight; y += step) {
      ctx.fillRect(0, y, baseWidth, step / 2);
    }
  } else if (config.pattern === 'hearts') {
    ctx.fillStyle = config.patternColor || 'rgba(244,63,94,0.12)';
    const stepX = 48;
    const stepY = 48;
    for (let x = 24; x < baseWidth; x += stepX) {
      for (let y = 24; y < totalHeight; y += stepY) {
        drawMiniHeart(ctx, x, y, 6);
      }
    }
  } else if (config.pattern === 'grid') {
    ctx.strokeStyle = config.patternColor || 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    const step = 28;
    ctx.beginPath();
    for (let x = 0; x < baseWidth; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, totalHeight);
    }
    for (let y = 0; y < totalHeight; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(baseWidth, y);
    }
    ctx.stroke();
  }

  // 3. Draw Outer Border
  if (config.borderWidth > 0 && config.borderStyle !== 'none') {
    ctx.strokeStyle = config.borderColor || '#FDBA74';
    ctx.lineWidth = config.borderWidth;

    if (config.borderStyle === 'dashed') {
      ctx.setLineDash([16, 12]);
    } else if (config.borderStyle === 'dotted') {
      ctx.setLineDash([6, 8]);
    } else {
      ctx.setLineDash([]);
    }

    const inset = config.borderWidth / 2 + 10;
    const radius = config.borderRadius || 16;
    drawRoundedRect(ctx, inset, inset, baseWidth - inset * 2, totalHeight - inset * 2, radius);
    ctx.stroke();

    if (config.borderStyle === 'double') {
      const doubleInset = inset + config.borderWidth + 6;
      drawRoundedRect(ctx, doubleInset, doubleInset, baseWidth - doubleInset * 2, totalHeight - doubleInset * 2, Math.max(4, radius - 6));
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // 4. Get active filter
  const activeFilter = COLOR_FILTERS.find(f => f.id === config.currentFilterId);

  // 5. Draw Photo Slots
  for (let i = 0; i < photoCount; i++) {
    const colIndex = i % cols;
    const rowIndex = Math.floor(i / cols);

    const slotX = paddingX + (colIndex * (slotWidth + gap));
    const slotY = paddingY + (rowIndex * (slotHeight + gap));
    const photoData = photos[i];

    // Background card of photo slot
    ctx.save();
    const photoRadius = 12;

    // Draw slot shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, slotX, slotY, slotWidth, slotHeight, photoRadius);
    ctx.fill();
    ctx.restore();

    // Clip to rounded slot
    ctx.save();
    drawRoundedRect(ctx, slotX, slotY, slotWidth, slotHeight, photoRadius);
    ctx.clip();

    if (photoData) {
      try {
        const img = await loadImage(photoData);

        // Apply filter to context
        if (activeFilter && activeFilter.cssFilter !== 'none') {
          ctx.filter = activeFilter.cssFilter;
        }

        // Object-fit: cover into slot
        const imgRatio = img.width / img.height;
        const slotRatio = slotWidth / slotHeight;
        let drawW = slotWidth;
        let drawH = slotHeight;
        let drawX = slotX;
        let drawY = slotY;

        if (imgRatio > slotRatio) {
          drawW = slotHeight * imgRatio;
          drawX = slotX - (drawW - slotWidth) / 2;
        } else {
          drawH = slotWidth / imgRatio;
          drawY = slotY - (drawH - slotHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } catch (err) {
        console.error('Failed to draw photo on canvas', err);
      }
    } else {
      // Empty placeholder
      ctx.fillStyle = '#F3F4F6';
      ctx.fillRect(slotX, slotY, slotWidth, slotHeight);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '600 24px Quicksand, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Photo #${i + 1}`, slotX + slotWidth / 2, slotY + slotHeight / 2 - 12);
      ctx.font = '400 16px Quicksand, sans-serif';
      ctx.fillText('Tap to capture', slotX + slotWidth / 2, slotY + slotHeight / 2 + 18);
    }
    ctx.restore();

    // Subtle slot border line
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, slotX, slotY, slotWidth, slotHeight, photoRadius);
    ctx.stroke();
  }

  // 6. Draw Footer Text & Date
  ctx.save();
  ctx.fillStyle = config.textColor || '#334155';
  ctx.textAlign = 'center';

  const footerCenterY = totalHeight - (bottomFooterHeight / 2) + 10;

  // Title Font
  let fontName = 'Caveat';
  if (config.font === 'fredoka') fontName = 'Fredoka';
  else if (config.font === 'pacifico') fontName = 'Pacifico';
  else if (config.font === 'quicksand') fontName = 'Quicksand';
  else if (config.font === 'gaegu') fontName = 'Gaegu';
  else if (config.font === 'indie') fontName = 'Indie Flower';
  else if (config.font === 'playfair') fontName = 'Playfair Display';

  ctx.font = `bold 38px '${fontName}', cursive, sans-serif`;
  ctx.fillText(config.title || 'Forever & Always', baseWidth / 2, footerCenterY - 24);

  // Subtitle
  if (config.subtitle) {
    ctx.font = `500 22px '${fontName}', cursive, sans-serif`;
    ctx.fillStyle = config.textColor || '#475569';
    ctx.fillText(config.subtitle, baseWidth / 2, footerCenterY + 12);
  }

  // Date Tag
  if (config.showDate && config.dateText) {
    ctx.font = `600 16px 'Quicksand', monospace, sans-serif`;
    ctx.fillStyle = config.textColor || '#64748B';
    ctx.fillText(config.dateText, baseWidth / 2, footerCenterY + 44);
  }
  ctx.restore();

  // 7. Draw Placed Stickers
  if (config.placedStickers && config.placedStickers.length > 0) {
    for (const placed of config.placedStickers) {
      const stickerDef = STICKERS.find(s => s.id === placed.stickerId);
      if (!stickerDef) continue;

      const stickerX = (placed.x / 100) * baseWidth;
      const stickerY = (placed.y / 100) * totalHeight;
      const stickerBaseSize = 100 * (placed.scale || 1);

      if (stickerDef.svgContent) {
        try {
          const svgUri = svgToDataUri(stickerDef.svgContent);
          const stickerImg = await loadImage(svgUri);

          ctx.save();
          ctx.translate(stickerX, stickerY);
          ctx.rotate((placed.rotation * Math.PI) / 180);
          if (placed.flipped) {
            ctx.scale(-1, 1);
          }

          // Draw drop shadow for stickers to look tactile
          ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetY = 3;

          ctx.drawImage(
            stickerImg,
            -stickerBaseSize / 2,
            -stickerBaseSize / 2,
            stickerBaseSize,
            stickerBaseSize
          );
          ctx.restore();
        } catch (err) {
          console.error('Failed to draw sticker', placed.stickerId, err);
        }
      } else if (stickerDef.emoji) {
        ctx.save();
        ctx.translate(stickerX, stickerY);
        ctx.rotate((placed.rotation * Math.PI) / 180);
        if (placed.flipped) {
          ctx.scale(-1, 1);
        }
        ctx.font = `${stickerBaseSize * 0.7}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(stickerDef.emoji, 0, 0);
        ctx.restore();
      }
    }
  }

  return canvas.toDataURL('image/png', 0.98);
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawMiniHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
  ctx.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, 0);
  ctx.fill();
  ctx.restore();
}
