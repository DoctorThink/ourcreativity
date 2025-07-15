// src/components/KaryaDetailDialog.tsx
// Updated to use the new stable implementation

import { KaryaDetailDialogV2 } from './KaryaDetailDialogV2';

interface KaryaDetailDialogProps {
  karyaList: any[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const KaryaDetailDialog = (props: KaryaDetailDialogProps) => {
  return <KaryaDetailDialogV2 {...props} />;
};

export default KaryaDetailDialog;
