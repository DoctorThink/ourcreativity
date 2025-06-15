
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getInputTypeDetails, SubmissionType } from '@/lib/karyaCategories';

interface SubmissionTypeSelectorProps {
  currentType: SubmissionType;
  onTypeChange: (type: SubmissionType) => void;
}

const SubmissionTypeSelector: React.FC<SubmissionTypeSelectorProps> = ({ currentType, onTypeChange }) => {
  const availableTypes: SubmissionType[] = ['image', 'video', 'text'];
  
  return (
    <div className="space-y-2 text-center">
      <Label className="text-white/70 font-medium text-sm">
        Atau, gunakan format lain:
      </Label>
      <div className="flex justify-center gap-2">
        {availableTypes.filter(type => type !== currentType).map(type => {
          const details = getInputTypeDetails(type);
          return (
            <Button
              key={type}
              type="button"
              variant="outline"
              onClick={() => onTypeChange(type)}
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs"
            >
              <details.icon className="w-3 h-3 mr-1.5" />
              Unggah {details.label}
            </Button>
          )
        })}
      </div>
    </div>
  );
};

export default SubmissionTypeSelector;
