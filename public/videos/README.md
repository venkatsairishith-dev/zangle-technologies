# Hero Background Videos

Place your two MP4 video files here:

| Filename            | Slide | Recommended content                                  |
|---------------------|-------|------------------------------------------------------|
| `hero-video-1.mp4`  | 1     | Tech workspace / engineers coding / data center glow |
| `hero-video-2.mp4`  | 2     | Circuit boards / server racks / futuristic UI        |

## Requirements
- Format: H.264 MP4 (best browser support)
- Resolution: 1920×1080 or 1280×720
- Duration: 10–30 seconds (looping)
- File size: under 15 MB each for fast first-load
- Audio: muted / no audio track needed (videos autoplay muted)

## Encoding tips (ffmpeg)
```
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an -movflags +faststart hero-video-1.mp4
```

Until the files are added the hero shows an animated dark gradient fallback automatically.
