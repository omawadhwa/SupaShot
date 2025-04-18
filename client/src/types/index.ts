// Frame template types
export interface FrameTemplate {
  id: string;
  name: string;
  component: React.FC<FrameProps>;
}

export interface FrameProps {
  children: React.ReactNode;
  rotation?: number;
  shadow?: boolean;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
}

// Editor settings types
export interface EditorState {
  image: string | null;
  frameTemplate: string;
  background: Background;
  border: Border;
  shadow: Shadow;
  effects: Effect[];
}

export type BackgroundType = 'transparent' | 'solid' | 'gradient' | 'image';

export interface Background {
  type: BackgroundType;
  value: string;
}

export interface Border {
  width: number;
  color: string;
  radius: number;
}

export interface Shadow {
  enabled: boolean;
  color: string;
  intensity: number;
  position: {
    x: number;
    y: number;
    blur: number;
    spread: number;
  };
}

export interface Effect {
  type: string;
  value: any;
}

// Gradient backgrounds
export interface GradientBackground {
  id: string;
  name: string;
  value: string;
}

// Color palette
export interface ColorSwatch {
  id: string;
  color: string;
}
