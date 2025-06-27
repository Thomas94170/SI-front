declare module "@material-tailwind/react" {
    import { ReactNode } from "react";
  
    export interface TypographyProps {
      children?: ReactNode;
      variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "lead" | "paragraph" | "small";
      className?: string;
      color?: string;
      [key: string]: any; // Permet toutes les autres props
    }
    
    export interface CardProps {
      children?: ReactNode;
      className?: string;
      color?: string;
      shadow?: boolean;
      [key: string]: any;
    }

    export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      children?: ReactNode;
      className?: string;
      color?: string;
      shadow?: boolean;
      [key: string]: any;
    }
    
    export const Typography: React.FC<TypographyProps>;
    export const Card: React.FC<CardProps>;
    export const Button: React.FC<ButtonProps>
    
    // Ajoutez d'autres composants au besoin
  }