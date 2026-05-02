import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#0D0D0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#E8FF47',
          borderRadius: '4px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        Y
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
