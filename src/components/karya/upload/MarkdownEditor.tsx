
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bold, Italic, Quote, Link as LinkIcon, List, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  error?: string;
}

const writingTemplates = [
  { id: 'blank', name: 'Mulai dari Kosong', content: '' },
  { 
    id: 'story', 
    name: 'Template Cerita Pendek', 
    content: `# Judul Cerita

## Bab 1

Tulis cerita kamu di sini...

---

**Karakter Utama:**
- 

**Setting:**
- 

**Plot:**
- ` 
  },
  { 
    id: 'poem', 
    name: 'Template Puisi', 
    content: `# Judul Puisi

Bait pertama...

Bait kedua...

Bait ketiga...

---
~ Penulis` 
  },
  { 
    id: 'review', 
    name: 'Template Review', 
    content: `# Review: [Nama Produk/Film/Buku]

## Yang Saya Review
Jelaskan apa yang kamu review...

## Yang Bagus
- 
- 
- 

## Yang Kurang
- 
- 

## Kesimpulan
Rating: ⭐⭐⭐⭐⭐

Rekomendasi saya:` 
  }
];

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onContentChange, error }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (syntax: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'teks tebal'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'teks miring'}*`;
        break;
      case 'quote':
        newText = `> ${selectedText || 'kutipan'}`;
        break;
      case 'link':
        newText = `[${selectedText || 'teks link'}](url)`;
        break;
      case 'list':
        newText = `- ${selectedText || 'item list'}`;
        break;
    }
    
    const newContent = content.substring(0, start) + newText + content.substring(end);
    onContentChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const renderMarkdownPreview = () => {
    return content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n/g, '<br/>');
  };
  
  return (
    <motion.div
        key="editor"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
    >
      <div className="space-y-2">
        <Label className="text-white font-medium text-sm">Template</Label>
        <div className="grid grid-cols-2 gap-2">
          {writingTemplates.map((template) => (
            <Button
              key={template.id}
              type="button"
              variant={selectedTemplate === template.id ? "default" : "outline"}
              onClick={() => {
                setSelectedTemplate(template.id);
                onContentChange(template.content);
              }}
              className={`rounded-xl p-2 text-xs ${
                selectedTemplate === template.id 
                  ? 'bg-gradient-to-r from-[#E5DEFF] via-[#98F5E1] to-[#FEC6A1] text-black' 
                  : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {template.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content" className="text-white font-medium text-sm">
            Konten Karya Tulis
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="border-white/30 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs"
          >
            {showPreview ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 p-2 bg-white/5 border border-white/20 rounded-xl">
          <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown('bold')} className="text-white hover:bg-white/20 rounded-lg p-1 h-8 w-8"><Bold className="w-3 h-3" /></Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown('italic')} className="text-white hover:bg-white/20 rounded-lg p-1 h-8 w-8"><Italic className="w-3 h-3" /></Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown('quote')} className="text-white hover:bg-white/20 rounded-lg p-1 h-8 w-8"><Quote className="w-3 h-3" /></Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown('link')} className="text-white hover:bg-white/20 rounded-lg p-1 h-8 w-8"><LinkIcon className="w-3 h-3" /></Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertMarkdown('list')} className="text-white hover:bg-white/20 rounded-lg p-1 h-8 w-8"><List className="w-3 h-3" /></Button>
        </div>

        <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {!showPreview || window.innerWidth < 1024 ? (
            <Textarea
              ref={textareaRef}
              id="content"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="min-h-[200px] bg-white/10 border-white/30 backdrop-blur-lg text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none text-sm"
              placeholder="Tulis karya kamu di sini... Gunakan Markdown untuk formatting!"
            />
          ) : null}
          
          {showPreview && (
            <div className="min-h-[200px] p-3 bg-white/5 border border-white/20 rounded-xl overflow-y-auto">
              <div 
                className="text-white prose prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: renderMarkdownPreview() }}
              />
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400">
          Tips: Gunakan **bold**, *italic*, # heading, {'>'}quote, dan - list untuk formatting
        </p>
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
      </div>
    </motion.div>
  );
};
export default MarkdownEditor;
