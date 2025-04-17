<script lang="ts">
  import { darkMode } from '$lib/stores';
  import { onMount, onDestroy } from 'svelte';
  import { type Unsubscriber } from 'svelte/store';
  import { convert, OKLCH, sRGB } from '@texel/color';
  import clsx from 'clsx';

  type Props = {
    src: string;
    className?: string;
  };

  let { src, className }: Props = $props();

  let canvas: HTMLCanvasElement | null = null;
  let imageUrl: string | null = src;
  let unsubscribe: Unsubscriber;

  onMount(() => {
    unsubscribe = darkMode.subscribe((value) => {
      console.log('Store value updated:', value);
      processImage();
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  function processImage() {
    if (!imageUrl || !canvas) return;
    const img = new window.Image();
    img.onload = () => {
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const col = getCssVariableRgbOklch('--color-primary');
      console.log('col: ' + col);
      if (!col) throw new Error('Invalid color value');

      for (let i = 0; i < data.length; i += 4) {
        // Detect black pixels (tolerance for anti-aliasing)
        // Threshold for detecting black pixels
        const blackThreshold = 150;

        // RGB values for blue color
        const blueRed = 0;
        const blueGreen = 0;
        const blueBlue = 255;

        const whiteThreshold = 200;
        const whiteValue = 255;

        if (
          data[i] < blackThreshold &&
          data[i + 1] < blackThreshold &&
          data[i + 2] < blackThreshold
        ) {
          // Set pixel to col
          data[i] = col[0]; // Red
          data[i + 1] = col[1]; // Green
          data[i + 2] = col[2]; // Blue

          // Set pixel to blue
          // data[i] = blueRed; // Red
          // data[i + 1] = blueGreen; // Green
          // data[i + 2] = blueBlue; // Blue

          // Set pixel to white
          // data[i] = data[i + 1] = data[i + 2] = whiteValue;
        }
        // Optional: force white background
        else if (
          data[i] > whiteThreshold &&
          data[i + 1] > whiteThreshold &&
          data[i + 2] > whiteThreshold
        ) {
          // Set pixel to white
          data[i] = data[i + 1] = data[i + 2] = whiteValue;

          // Set pixel to transparent
          data[i + 3] = 0;
        } else {
          // Set pixel to white
          data[i] = data[i + 1] = data[i + 2] = whiteValue;

          // Set pixel to transparent
          data[i + 3] = 0;

          // Set pixel to blue
          // data[i] = blueRed; // Red
          // data[i + 1] = blueGreen; // Green
          // data[i + 2] = blueBlue; // Blue
        }
      }
      ctx.reset();
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = imageUrl;
  }

  function getCssVariableRgb(variableName: string): [number, number, number] | null {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    console.log(value); // e.g. [52, 152, 219]

    if (!value) return null;

    // Create a temporary element to leverage browser's color parsing
    const tempDiv = document.createElement('div');
    tempDiv.style.color = value;
    document.body.appendChild(tempDiv);

    // Get the computed color in rgb format
    const computedColor = getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    // Parse rgb(a) string: "rgb(52, 152, 219)" or "rgba(52, 152, 219, 1)"
    const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;

    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);

    return [r, g, b];
  }

  function getCssVariableRgbOklch(variableName: string): number[] | null {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    console.log(value);

    if (!value) return null;

    const oklchString = value;
    const match = oklchString.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/);

    if (!match) throw new Error('Invalid OKLCH format');

    const L = parseFloat(match[1]) / 100; // Convert percent to 0..1
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]);

    const rgb = convert([L, C, H], OKLCH, sRGB);
    // rgb is [r, g, b] in 0–1 range, so multiply by 255 for standard RGB
    const rgb255 = rgb.map((x) => Math.round(x * 255));
    console.log(rgb255); // e.g., [200, 180, 120]

    return rgb255;
  }
</script>

<canvas class={clsx(className, 'w-full', 'object-contain')} bind:this={canvas}></canvas>
