
import React from 'react';
import { cn } from '@/lib/utils';

const HuggingFaceLogo = ({ className }: { className?: string }) => (
  <img 
    src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo-pirate.svg" 
    alt="Hugging Face" 
    className={cn("w-6 h-6", className)}
  />
);

export default HuggingFaceLogo;
