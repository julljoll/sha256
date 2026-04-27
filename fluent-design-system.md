# Microsoft Fluent Design System Parameters

This project uses Microsoft's Fluent Design System principles. The UI components, typography, colors, and motion have been specifically tailored to match the latest Windows 11 aesthetics within the application environment.

## 1. Typography
- **Primary Font**: `Segoe UI Variable`, `Segoe UI`, `sans-serif`
- **Characteristics**: Highly legible, system-integrated font scaling, optimized for digital interfaces.

## 2. Colors & Material (Dark Theme)
- **Background (Mica)**: `#202020`
- **Surface (Cards/Acrylic)**: `rgba(255, 255, 255, 0.05)`
- **Surface Hover**: `rgba(255, 255, 255, 0.08)`
- **Surface Active**: `rgba(255, 255, 255, 0.03)`
- **Border**: `rgba(255, 255, 255, 0.08)`
- **Primary Accent**: `#0078D4` (Classic Fluent) / `#60CDFF` (Windows 11 Dark Accent)
- **Text Primary**: `#ffffff`
- **Text Secondary**: `rgba(255, 255, 255, 0.7)`

## 3. Geometry (Border Radius)
- **Buttons / Inputs**: `4px`
- **Cards / Dialogs**: `12px` to `16px` (implemented as Tailwind `xl` / `12px` rounded corners)

## 4. Elevation (Shadows & Borders)
- **Cards**: Subtle borders combined with `0 4px 8px rgba(0,0,0,0.2)` shadow to simulate elevation.
- **Buttons**: Very light shadow `0 1px 2px rgba(0,0,0,0.14)` and a transparent border.

## 5. Motion (Animations & Transitions)
- **Timing Function**: `cubic-bezier(0.1, 0.9, 0.2, 1)` for snappy, yet fluid responsiveness.
- **Duration**: `167ms` (approximate 10 frames at 60fps)

## Implementation Details
The configuration relies heavily on `tailwind.config.js` to map these tokens to standard utility classes, and `src/index.css` to define higher-level components like `.forensic-card`, `.forensic-btn`, and `.forensic-input`.
