
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight, ChevronLeft, Image, Video, FileText, User2, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Enhanced categories with more metadata
const categories = [
  {
    key: 'design',
    label: 'Design Grafis',
    color: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
    icon: <Image className="w-6 h-6 text-white" />,
    description: 'Poster, ilustrasi, logo, dan karya visual',
    acceptedTypes: 'image/*',
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  {
    key: 'video',
    label: 'Video & Animasi',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    icon: <Video className="w-6 h-6 text-white" />,
    description: 'Video pendek, animasi, motion graphics',
    acceptedTypes: 'video/*',
    maxSize: 100 * 1024 * 1024, // 100MB
  },
  {
    key: 'writing',
    label: 'Karya Tulis',
    color: 'bg-gradient-to-br from-pink-400 to-pink-600',
    icon: <FileText className="w-6 h-6 text-white" />,
    description: 'Puisi, cerpen, artikel, dan tulisan kreatif',
    acceptedTypes: '.txt,.pdf,.docx,.md',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  {
    key: 'meme',
    label: 'Meme & Humor',
    color: 'bg-gradient-to-br from-orange-400 to-orange-600',
    icon: <User2 className="w-6 h-6 text-white" />,
    description: 'Meme, komik strip, konten humor',
    acceptedTypes: 'image/*',
    maxSize: 10 * 1024 * 1024, // 10MB
  },
];

// Enhanced step components
function StepSelectCategory({ selected, setSelected, onNext }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white">Pilih Kategori Karya</h2>
        <p className="text-gray-300">Pilih jenis karya yang ingin kamu bagikan</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <motion.button
            key={cat.key}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative w-full flex items-center gap-4 p-6 rounded-2xl backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
              selected === cat.key ? 'ring-2 ring-cyan-400 bg-white/10' : ''
            }`}
            onClick={() => setSelected(cat.key)}
          >
            <div className={`flex-shrink-0 flex items-center justify-center rounded-full ${cat.color} w-14 h-14 shadow-lg`}>
              {cat.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-serif text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {cat.label}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{cat.description}</p>
            </div>
            {selected === cat.key && (
              <CheckCircle className="w-6 h-6 text-cyan-400" />
            )}
          </motion.button>
        ))}
      </div>
      
      <div className="flex justify-end mt-8">
        <Button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full px-8 py-3 font-medium shadow-lg disabled:opacity-50"
        >
          Lanjutkan <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepMediaUpload({ category, file, setFile, onNext, onBack, uploadProgress }: any) {
  const categoryData = categories.find(c => c.key === category);
  
  const handleFileSelect = (selectedFile: File) => {
    if (categoryData && selectedFile.size > categoryData.maxSize) {
      alert(`File terlalu besar. Maksimal ${Math.round(categoryData.maxSize / (1024 * 1024))}MB`);
      return;
    }
    setFile(selectedFile);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white">Upload {categoryData?.label}</h2>
        <p className="text-gray-300">Pilih file yang ingin kamu bagikan</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {file ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center space-y-6 w-full max-w-md"
          >
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10 p-4">
              {file.type.startsWith('image') && (
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="preview" 
                  className="w-full h-64 object-cover rounded-xl" 
                />
              )}
              {file.type.startsWith('video') && (
                <video 
                  src={URL.createObjectURL(file)} 
                  controls 
                  className="w-full h-64 rounded-xl" 
                />
              )}
              {!file.type.startsWith('image') && !file.type.startsWith('video') && (
                <div className="w-full h-64 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-800">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-300 font-medium">{file.name}</p>
                    <p className="text-gray-400 text-sm">{Math.round(file.size / 1024)}KB</p>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setFile(null)}
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Ganti File
            </Button>
          </motion.div>
        ) : (
          <label className="group cursor-pointer">
            <input
              type="file"
              accept={categoryData?.acceptedTypes || '*'}
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center w-80 h-80 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-400/50 backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/10"
            >
              <div className={`w-16 h-16 rounded-full ${categoryData?.color} flex items-center justify-center mb-4 shadow-lg`}>
                {categoryData?.icon || <Upload className="w-8 h-8 text-white" />}
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                Pilih File
              </h3>
              <p className="text-gray-400 text-center px-6">
                Klik untuk memilih {category === 'video' ? 'video' : category === 'writing' ? 'dokumen' : 'gambar'}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Maks. {Math.round((categoryData?.maxSize || 0) / (1024 * 1024))}MB
              </p>
            </motion.div>
          </label>
        )}
      </div>
      
      <div className="flex justify-between gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="rounded-full gap-2 border-white/20 bg-white/5 hover:bg-white/10 text-white"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Button>
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={!file} 
          className="rounded-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 disabled:opacity-50"
        >
          Lanjutkan <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepMetadata({ category, details, setDetails, onNext, onBack }: any) {
  const categoryData = categories.find(c => c.key === category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white">Detail Karya</h2>
        <p className="text-gray-300">Tambahkan informasi tentang karya kamu</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white font-medium">Judul Karya *</Label>
          <Input
            type="text"
            value={details.title}
            onChange={e => setDetails({ ...details, title: e.target.value })}
            className="bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
            placeholder="Berikan judul yang menarik untuk karya kamu"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white font-medium">Deskripsi *</Label>
          <textarea
            value={details.desc}
            onChange={e => setDetails({ ...details, desc: e.target.value })}
            className="w-full h-32 bg-white/5 border border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none"
            placeholder="Ceritakan tentang karya kamu, proses pembuatan, atau inspirasi di baliknya"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white font-medium">Tag</Label>
          <Input
            type="text"
            value={details.tags}
            onChange={e => setDetails({ ...details, tags: e.target.value })}
            className="bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
            placeholder="poster, ilustrasi, minimalis (pisahkan dengan koma)"
          />
          <p className="text-xs text-gray-400">Tag membantu orang lain menemukan karya kamu</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white font-medium">Nama Kreator</Label>
          <Input
            type="text"
            value={details.creator}
            onChange={e => setDetails({ ...details, creator: e.target.value })}
            className="bg-white/5 border-white/20 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50"
            placeholder="Nama atau username kamu"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="rounded-full gap-2 border-white/20 bg-white/5 hover:bg-white/10 text-white"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Button>
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={!details.title || !details.desc}
          className="rounded-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 disabled:opacity-50"
        >
          Review <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

function StepReview({ category, file, details, onBack, onSubmit, submitting }: any) {
  const categoryData = categories.find(c => c.key === category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-white">Review & Submit</h2>
        <p className="text-gray-300">Pastikan semua informasi sudah benar</p>
      </div>

      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0 lg:w-80">
            {file && (
              <div className="rounded-xl overflow-hidden">
                {file.type.startsWith('image') && (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className="w-full h-64 object-cover" 
                  />
                )}
                {file.type.startsWith('video') && (
                  <video 
                    src={URL.createObjectURL(file)} 
                    controls 
                    className="w-full h-64" 
                  />
                )}
                {!file.type.startsWith('image') && !file.type.startsWith('video') && (
                  <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-300 font-medium">{file.name}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Kategori</h3>
              <p className="text-white font-medium text-lg">{categoryData?.label}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Judul</h3>
              <p className="text-white font-medium text-lg">{details.title}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Deskripsi</h3>
              <p className="text-gray-300 leading-relaxed">{details.desc}</p>
            </div>
            
            {details.tags && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Tag</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {details.tags.split(',').map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {details.creator && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Kreator</h3>
                <p className="text-gray-300">{details.creator}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          className="rounded-full gap-2 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          disabled={submitting}
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Button>
        <Button 
          type="button" 
          onClick={onSubmit} 
          className="rounded-full gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 shadow-lg" 
          disabled={submitting}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Mengunggah...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Kirim Karya
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

const steps = [
  { label: 'Kategori', Component: StepSelectCategory },
  { label: 'Upload', Component: StepMediaUpload },
  { label: 'Detail', Component: StepMetadata },
  { label: 'Review', Component: StepReview },
];

const UploadWizard = () => {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState({ 
    title: '', 
    desc: '', 
    tags: '', 
    creator: '' 
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => {
    setStep(0);
    setCategory('');
    setFile(null);
    setDetails({ title: '', desc: '', tags: '', creator: '' });
    setSubmitting(false);
  };

  const uploadToSupabase = async () => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const bucketName = category === 'video' ? 'karya-videos' : 
                      category === 'writing' ? 'karya-documents' : 'karya-images';

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  };

  const saveToDatabase = async (filePath: string) => {
    const { data, error } = await supabase
      .from('karya')
      .insert({
        title: details.title,
        description: details.desc,
        category: category,
        creator_name: details.creator || 'Anonymous',
        image_url: filePath,
        content_url: filePath,
        status: 'pending'
      });

    if (error) throw error;
    return data;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Upload file to Supabase storage
      const filePath = await uploadToSupabase();
      if (!filePath) throw new Error('Upload failed');

      // Save metadata to database
      await saveToDatabase(filePath);

      toast({
        title: "Karya berhasil diunggah! 🎉",
        description: "Karya kamu sedang dalam review dan akan segera dipublikasikan.",
      });

      reset();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload gagal",
        description: "Terjadi kesalahan saat mengunggah karya. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
      onSubmit: handleSubmit,
      submitting,
    },
  }[step];

  const CurrentStep = steps[step].Component;

  return (
    <div className="max-w-4xl mx-auto my-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-white">Unggah Karya Baru</h1>
            <p className="text-gray-400">Bagikan kreativitas kamu dengan komunitas</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    i <= step 
                      ? 'border-cyan-400 bg-cyan-400 text-white' 
                      : 'border-white/20 text-white/40'
                  }`}>
                    {i < step ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{i + 1}</span>
                    )}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    i <= step ? 'text-cyan-400' : 'text-white/40'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 transition-all ${
                    i < step ? 'bg-cyan-400' : 'bg-white/20'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <CurrentStep key={step} {...stepProps} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadWizard;
