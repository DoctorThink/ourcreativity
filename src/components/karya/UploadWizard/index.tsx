
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronRight, ChevronLeft, Image, Video, FileText, User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Categories definition — follows the design system (circle icon, color, label)
const categories = [
  {
    key: 'design',
    label: 'Design',
    color: 'bg-cyan-500',
    icon: <Image className="w-6 h-6 text-white" />,
    description: 'Karya grafis, ilustrasi, poster, dsb.',
  },
  {
    key: 'video',
    label: 'Video',
    color: 'bg-purple-400',
    icon: <Video className="w-6 h-6 text-white" />,
    description: 'Video pendek, animasi, dsb.',
  },
  {
    key: 'writing',
    label: 'Karya Tulis',
    color: 'bg-pink-400',
    icon: <FileText className="w-6 h-6 text-white" />,
    description: 'Puisi, cerpen, artikel, dsb.',
  },
  {
    key: 'meme',
    label: 'Meme',
    color: 'bg-orange-400',
    icon: <User2 className="w-6 h-6 text-white" />,
    description: 'Meme dan karya lucu.',
  },
];

// Step components
function StepSelectCategory({ selected, setSelected, onNext }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-foreground">Pilih Kategori Karya</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`w-full flex items-center gap-4 p-6 rounded-2xl bg-secondary/70 hover:bg-secondary/90 transition border border-border/20 focus:outline-none focus:ring-2 focus:ring-accent ${selected === cat.key ? 'ring-2 ring-accent' : ''}`}
            onClick={() => setSelected(cat.key)}
          >
            <span className={`flex-shrink-0 flex items-center justify-center rounded-full ${cat.color} w-12 h-12`}>{cat.icon}</span>
            <span className="flex-1 text-left">
              <span className="block font-serif text-lg font-semibold">{cat.label}</span>
              <span className="text-sm text-muted-foreground">{cat.description}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className="gap-2 bg-accent text-white rounded-full"
        >
          Selanjutnya <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Placeholder for Step 2 — upload area (different per category)
function StepMediaUpload({ category, file, setFile, onNext, onBack }: any) {
  // For demo: only accept images/videos. You can expand per category.
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-foreground">Upload Karya {category ? categories.find(c=>c.key===category)?.label : ''}</h2>
      <div className="flex flex-col items-center justify-center">
        {file ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            {file.type.startsWith('image') && (
              <img src={URL.createObjectURL(file)} alt="preview" className="w-56 h-56 object-contain rounded-xl border border-border/20" />
            )}
            {file.type.startsWith('video') && (
              <video src={URL.createObjectURL(file)} controls className="w-56 rounded-xl" />
            )}
            <Button type="button" variant="outline" onClick={() => setFile(null)}>Ganti File</Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-square max-w-[300px] rounded-xl border-2 border-dashed border-grayMid/40 hover:border-accent bg-secondary-dark/50 cursor-pointer transition-all duration-200 hover:bg-accent/10 group min-h-[160px]">
            <input
              type="file"
              accept={category === 'video' ? 'video/*' : category === 'writing' ? '.txt,.pdf,.docx' : 'image/*'}
              className="hidden"
              onChange={(e) =>
                e.target.files && setFile(e.target.files[0])
              }
            />
            <span className="block">{ categories.find(c=>c.key===category)?.icon }</span>
            <span className="font-medium text-muted-foreground mt-2">Klik untuk upload {category === 'video' ? 'video' : category === 'writing' ? 'file' : 'gambar'}</span>
          </label>
        )}
      </div>
      
      <div className="flex justify-between gap-2">
        <Button type="button" variant="outline" onClick={onBack} className="rounded-full gap-2"><ChevronLeft className="w-4 h-4" /> Kembali</Button>
        <Button type="button" onClick={onNext} disabled={!file} className="rounded-full gap-2">Selanjutnya <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

function StepMetadata({ category, details, setDetails, onNext, onBack }: any) {
  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-serif font-bold text-center mb-8 text-foreground">Detail Karya</h2>
      <label className="block font-medium text-foreground">Judul Karya
        <input
          type="text"
          value={details.title}
          onChange={e => setDetails({ ...details, title: e.target.value })}
          className="block w-full mt-2 bg-secondary/70 border border-border/20 rounded-lg px-4 py-2 text-foreground"
          required
        />
      </label>
      <label className="block font-medium text-foreground">Deskripsi
        <textarea
          value={details.desc}
          onChange={e => setDetails({ ...details, desc: e.target.value })}
          className="block w-full mt-2 bg-secondary/70 border border-border/20 rounded-lg px-4 py-2 text-foreground"
          required
        />
      </label>
      <label className="block font-medium text-foreground">Tag (opsional)
        <input
          type="text"
          value={details.tags}
          onChange={e => setDetails({ ...details, tags: e.target.value })}
          className="block w-full mt-2 bg-secondary/70 border border-border/20 rounded-lg px-4 py-2 text-foreground"
          placeholder="Pisahkan dengan koma: poster,ilustrasi,puisi"
        />
      </label>
      <div className="flex justify-between gap-2 mt-8">
        <Button type="button" variant="outline" onClick={onBack} className="rounded-full gap-2"><ChevronLeft className="w-4 h-4" /> Kembali</Button>
        <Button type="button" onClick={onNext} className="rounded-full gap-2">Review <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </form>
  );
}

function StepReview({ category, file, details, onBack, onSubmit, submitting }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-center mb-6 text-foreground">Review Pengajuan Karya</h2>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex items-center justify-center sm:w-1/2">
          {file && (
            <>
              {file.type.startsWith('image') && (
                <img src={URL.createObjectURL(file)} alt="preview" className="w-56 h-56 object-contain rounded-xl border border-border/20" />
              )}
              {file.type.startsWith('video') && (
                <video src={URL.createObjectURL(file)} controls className="w-56 rounded-xl" />
              )}
            </>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div><b>Kategori:</b> {categories.find(c=>c.key===category)?.label ?? '-'}</div>
          <div><b>Judul:</b> {details.title}</div>
          <div><b>Deskripsi:</b> <div className="whitespace-pre-wrap">{details.desc}</div></div>
          <div><b>Tag:</b> {details.tags}</div>
        </div>
      </div>
      <div className="flex justify-between gap-2 pt-8">
        <Button type="button" variant="outline" onClick={onBack} className="rounded-full gap-2"><ChevronLeft className="w-4 h-4" /> Kembali</Button>
        <Button type="button" onClick={onSubmit} className="rounded-full gap-2 bg-accent text-white" disabled={submitting}>
          {submitting ? 'Mengunggah...' : 'Kirim Karya'}
        </Button>
      </div>
    </div>
  );
}

const steps = [
  { label: 'Kategori', Component: StepSelectCategory },
  { label: 'Upload', Component: StepMediaUpload },
  { label: 'Detail', Component: StepMetadata },
  { label: 'Review & Submit', Component: StepReview },
];

const UploadWizard = () => {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState({ title: '', desc: '', tags: '' });
  const [submitting, setSubmitting] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const doSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setStep(0);
      setCategory('');
      setFile(null);
      setDetails({ title: '', desc: '', tags: '' });
      setSubmitting(false);
      alert('Karya berhasil diunggah! (simulasi)');
    }, 1400);
  };

  // Step props
  const stepProps = {
    0: {
      selected: category,
      setSelected: setCategory,
      onNext: () => category && next(),
    },
    1: {
      category,
      file,
      setFile,
      onNext: () => file && next(),
      onBack: back,
    },
    2: {
      category,
      details,
      setDetails,
      onNext: next,
      onBack: back,
    },
    3: {
      category,
      file,
      details,
      onBack: back,
      onSubmit: doSubmit,
      submitting,
    },
  }[step];

  const CurrentStep = steps[step].Component;

  return (
    <div className="max-w-2xl mx-auto my-12 bg-background/80 shadow-2xl rounded-3xl border border-border/20 px-8 py-10">
      <div className="flex items-center gap-3 mb-10">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white shadow-lg"><Plus /></span>
        <span className="font-serif font-bold text-xl text-foreground">Unggah Karya Baru</span>
      </div>
      <CurrentStep {...stepProps} />
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((s, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === step ? 'bg-accent' : 'bg-border'} transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadWizard;
