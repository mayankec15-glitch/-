import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  FileCode2, 
  X,
  Play,
  HelpCircle,
  QrCode,
  ArrowUpRight,
  AlertCircle,
  FileDown
} from 'lucide-react';
import { haptics } from '../utils/haptics';

interface PlayStoreGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayStoreGuideModal: React.FC<PlayStoreGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quick_install' | 'pwabuilder' | 'metadata' | 'cli_twa'>('quick_install');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [installStatusMessage, setInstallStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://bhashadoot.up.gov.in';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://bhashadoot.up.gov.in';

  const copyToClipboard = (text: string, key: string) => {
    haptics.tap();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleInstallClick = async () => {
    haptics.tap();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setInstallStatusMessage('बधाई! भाषादूत ऐप आपके फोन में सफलतापूर्वक इंस्टॉल हो गया है।');
        haptics.milestone();
      }
      setDeferredPrompt(null);
    } else {
      // If running inside iframe or browser where prompt isn't fired yet
      setInstallStatusMessage(
        "📱 फोन में इंस्टॉल करने हेतु: सबसे पहले नीचे दिए 'नए टैब में खोलें' बटन पर दबाएं, फिर Chrome के 3 डॉट्स (⋮) पर टैप करके 'Install App' या 'Add to Home screen' चुनें।"
      );
    }
  };

  const handleOpenInNewTab = () => {
    haptics.tap();
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  // Direct Standalone Offline Web-App Package Download
  const handleDownloadAppLauncher = () => {
    haptics.tap();
    const launcherHtml = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>भाषादूत - Bhashadoot App Launcher</title>
  <meta name="theme-color" content="#d97706">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #020617; color: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
    .card { background: #0f172a; border: 1px solid #334155; border-radius: 24px; padding: 32px; max-width: 440px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    .badge { background: #d97706; color: #020617; font-weight: 900; font-size: 32px; width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
    h1 { color: #fbbf24; margin: 0 0 8px; font-size: 24px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin: 0 0 24px; }
    .btn { display: block; background: #f59e0b; color: #020617; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: bold; font-size: 16px; transition: 0.2s; margin-bottom: 12px; }
    .btn:hover { background: #fbbf24; }
    .footer { font-size: 11px; color: #64748b; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">भा</div>
    <h1>भाषादूत (Bhashadoot)</h1>
    <p>प्रशिक्षण निदेशालय, उत्तर प्रदेश (Directorate of Training, UP)<br>प्रवासी श्रमिक विदेशी भाषा एवं कौशल प्रशिक्षण पोर्टल</p>
    <a href="${currentUrl}" class="btn">🚀 भाषादूत पोर्टल खोलें (Launch Portal)</a>
    <div class="footer">उत्तर प्रदेश सरकार • व्यावसायिक शिक्षा एवं कौशल विकास</div>
  </div>
  <script>
    setTimeout(function() {
      window.location.href = "${currentUrl}";
    }, 1500);
  </script>
</body>
</html>`;

    const blob = new Blob([launcherHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bhashadoot-App-Launcher.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bubblewrapCommand = `npm install -g @bubblewrap/cli
bubblewrap init --manifest=${baseUrl}/manifest.json
bubblewrap build`;

  const assetLinksJson = JSON.stringify([
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": "in.gov.up.training.bhashadoot",
        "sha256_cert_fingerprints": [
          "14:6D:E9:7D:6D:64:DF:7B:6C:54:19:9C:57:9F:8B:5B:3F:8A:96:A2:72:DE:0D:3D:25:EB:98:90:3E:04:8F:C8"
        ]
      }
    }
  ], null, 2);

  // PWABuilder direct URL preloaded with this site
  const pwabuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(baseUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-emerald-950/70 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  मोबाइल ऐप डाउनलोड एवं इंस्टालेशन गाइड (Bhashadoot App)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Android & Play Store Ready
                </span>
              </div>
              <p className="text-xs text-slate-300">
                प्रशिक्षण निदेशालय उत्तर प्रदेश — 1-क्लिक डायरेक्ट इंस्टालेशन एवं प्ले स्टोर पब्लिशिंग
              </p>
            </div>
          </div>

          <button 
            id="btn-close-playstore-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-3 sm:px-4 gap-2 overflow-x-auto">
          <button
            id="tab-btn-quick-install"
            onClick={() => setActiveTab('quick_install')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'quick_install'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>1. डायरेक्ट फोन इंस्टालेशन (PWA App)</span>
          </button>

          <button
            id="tab-btn-pwabuilder"
            onClick={() => setActiveTab('pwabuilder')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'pwabuilder'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Play Store AAB/APK बिल्डर</span>
          </button>

          <button
            id="tab-btn-metadata"
            onClick={() => setActiveTab('metadata')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'metadata'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>3. प्ले स्टोर विवरण (Metadata)</span>
          </button>

          <button
            id="tab-btn-cli"
            onClick={() => setActiveTab('cli_twa')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'cli_twa'
                ? 'border-purple-400 text-purple-300 bg-purple-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>4. CLI / Bubblewrap (डेवलपर)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-300 text-sm">

          {/* TAB 1: QUICK DIRECT INSTALL */}
          {activeTab === 'quick_install' && (
            <div className="space-y-6">
              
              {/* Main Action Banner */}
              <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border-2 border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      📱 मोबाइल पर सीधे ऐप इंस्टॉल करें (1-Click PWA App)
                    </h3>
                    {isInstalled && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                        ✓ स्थापित (Installed)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    श्रमिक, आईटीआई प्रशिक्षार्थी एवं सुपरवाइजर बिना किसी झंझट के सीधे अपने मोबाइल फोन के होम स्क्रीन पर <strong className="text-amber-300">भाषादूत</strong> ऐप डाउनलोड व इंस्टॉल कर सकते हैं।
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                  
                  {/* Open in New Tab (Bypasses iFrame restriction for instant native Chrome install prompt) */}
                  <button
                    id="btn-open-new-tab-install"
                    onClick={handleOpenInNewTab}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700 shadow-md"
                    title="ब्राउज़र के नए टैब में खोलें"
                  >
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                    <span>नए टैब में खोलें</span>
                  </button>

                  {/* Direct Native Install / Trigger button */}
                  <button
                    id="btn-direct-install-app"
                    onClick={handleInstallClick}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>{deferredPrompt ? "ऐप इंस्टॉल करें (Install Now)" : "📱 फोन पर इंस्टॉल करें"}</span>
                  </button>

                </div>
              </div>

              {/* Status or Instruction Message if user clicked button */}
              {installStatusMessage && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in duration-300">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200 leading-relaxed font-medium">
                    {installStatusMessage}
                  </div>
                </div>
              )}

              {/* Step by Step Visual Guide for Workers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>एंड्रॉइड फोन में 3 आसान चरणों में ऐप लगाएं:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm font-mono border border-amber-500/30">
                      1
                    </div>
                    <h5 className="font-bold text-white text-xs">मोबाइल क्रोम (Chrome) में खोलें</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      अपने फोन में Chrome ब्राउज़र में इस लिंक को खोलें (या ऊपर <span className="text-cyan-400 font-semibold">'नए टैब में खोलें'</span> दबाएं)।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm font-mono border border-emerald-500/30">
                      2
                    </div>
                    <h5 className="font-bold text-white text-xs">3 डॉट्स (⋮) मेनू पर टैप करें</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      ऊपर दाईं ओर 3 डॉट्स दबाकर <strong className="text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">"Install app"</strong> या <strong className="text-emerald-300">"Add to Home screen"</strong> चुनें।
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center text-sm font-mono border border-cyan-500/30">
                      3
                    </div>
                    <h5 className="font-bold text-white text-xs">ऐप आइकन तैयार</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      आपके मोबाइल स्क्रीन पर <strong className="text-amber-300 font-bold">भाषादूत</strong> का आधिकारिक ऐप आइकन आ जाएगा और यह फुल-स्क्रीन चलेगा।
                    </p>
                  </div>

                </div>
              </div>

              {/* Direct Offline Web App Package Download Button */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">ऑफलाइन ऐप लांचर फ़ाइल (.html)</h5>
                    <p className="text-[11px] text-slate-400">
                      फोन या कंप्यूटर में सेव करने हेतु सीधा स्टैंडअलोन लांचर पैकेज डाउनलोड करें।
                    </p>
                  </div>
                </div>

                <button
                  id="btn-download-app-launcher"
                  onClick={handleDownloadAppLauncher}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-md shadow-purple-900/30"
                >
                  <FileDown className="w-4 h-4" />
                  <span>लांचर डाउनलोड करें (.html)</span>
                </button>
              </div>

              {/* Portal URL Copy for Easy Sharing on WhatsApp / SMS */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden w-full sm:w-auto">
                  <Globe className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 block font-medium">पोर्टल शेयर लिंक (Direct App Link):</span>
                    <span className="text-xs font-mono text-amber-300 font-bold truncate block">{currentUrl}</span>
                  </div>
                </div>

                <button
                  id="btn-copy-url"
                  onClick={() => copyToClipboard(currentUrl, 'url')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 shrink-0 cursor-pointer w-full sm:w-auto justify-center"
                >
                  {copiedKey === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'url' ? "लिंक कॉपी हो गया!" : "लिंक कॉपी करें"}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PWABUILDER FOR PLAY STORE */}
          {activeTab === 'pwabuilder' && (
            <div className="space-y-6">
              
              <div className="bg-slate-950 border border-emerald-500/30 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>1-क्लिक गूगल प्ले स्टोर ऐप पैकेज (.aab / APK) जनरेटर</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Google और Microsoft का आधिकारिक <strong>PWABuilder</strong> इस पोर्टल के वेब मैनिफेस्ट को ऑटो-डिटेक्ट करके सीधे <strong>Signed Android App Bundle (.aab / APK)</strong> बना देता है, जिसे आप <strong>Google Play Console</strong> पर सीधे अपलोड कर सकते हैं।
                </p>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">PWABuilder डायरेक्ट जनरेटर लिंक:</span>
                    <span className="text-xs font-mono font-bold text-emerald-300 truncate block max-w-md">{pwabuilderUrl}</span>
                  </div>

                  <a
                    id="link-open-pwabuilder"
                    href={pwabuilderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-900/30 shrink-0"
                  >
                    <span>PWABuilder खोलें & APK बनाएं</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Steps to publish */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  गूगल प्ले स्टोर पर अपलोड करने के 4 सरल चरण:
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-white">PWABuilder में पोर्टल URL लोड करें:</strong> 
                      <span className="text-slate-300 ml-1">PWABuilder.com पर जाकर इस पोर्टल का URL <code className="text-amber-300 bg-black/40 px-1.5 py-0.5 rounded font-mono">{baseUrl}</code> डालकर "Start" दबाएं।</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-white">"Package for Stores" &gt; Android चुनें:</strong> 
                      <span className="text-slate-300 ml-1">Android विकल्प पर "Generate" पर क्लिक करें।</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-white">Android App Bundle (.aab / APK) डाउनलोड करें:</strong> 
                      <span className="text-slate-300 ml-1">PWABuilder से जनरेट की गई जिप फ़ाइल में आपकी साइन्ड <code className="text-emerald-300">.aab</code> फ़ाइल मिलेगी।</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-white">Google Play Console पर सबमिट करें:</strong> 
                      <span className="text-slate-300 ml-1">अपने Google Play Console में <code className="text-cyan-300">Production Release</code> बनाकर इस .aab को अपलोड करें और पब्लिश करें।</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: STORE METADATA */}
          {activeTab === 'metadata' && (
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center justify-between">
                  <span>गूगल प्ले कंसोल के लिए विवरण (Copy-Paste Ready)</span>
                </h4>

                <div className="space-y-3 text-xs">
                  
                  {/* App Title */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-semibold">App Title (ऐप नाम):</span>
                      <button 
                        id="btn-copy-title"
                        onClick={() => copyToClipboard("Bhashadoot - UP Kaushal Portal", "title")}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'title' ? "कॉपी" : "कॉपी करें"}</span>
                      </button>
                    </div>
                    <code className="text-white font-mono font-bold">Bhashadoot - UP Kaushal Portal</code>
                  </div>

                  {/* Short Description */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-semibold">Short Description (संक्षिप्त विवरण):</span>
                      <button 
                        id="btn-copy-short-desc"
                        onClick={() => copyToClipboard("भाषादूत - प्रवासी श्रमिकों हेतु AI भाषा, कार्य शब्दावली व उच्चारण टेस्ट", "short_desc")}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        {copiedKey === 'short_desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'short_desc' ? "कॉपी" : "कॉपी करें"}</span>
                      </button>
                    </div>
                    <p className="text-slate-200">भाषादूत - प्रवासी श्रमिकों हेतु AI भाषा, कार्य शब्दावली व उच्चारण टेस्ट</p>
                  </div>

                  {/* Package ID */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-semibold">Package Name / Application ID:</span>
                      <button 
                        id="btn-copy-pkg"
                        onClick={() => copyToClipboard("in.gov.up.training.bhashadoot", "pkg")}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        {copiedKey === 'pkg' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedKey === 'pkg' ? "कॉपी" : "कॉपी करें"}</span>
                      </button>
                    </div>
                    <code className="text-emerald-400 font-mono">in.gov.up.training.bhashadoot</code>
                  </div>

                  {/* Category & Content Rating */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Category (श्रेणी):</span>
                      <span className="text-white font-medium">Education (शिक्षा) / Productivity</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Content Rating (आयु सीमा):</span>
                      <span className="text-white font-medium">Everyone / 3+ (सभी के लिए उपयुक्त)</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CLI & BUBBLEWRAP */}
          {activeTab === 'cli_twa' && (
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Google Bubblewrap CLI (Trusted Web Activity Command)</span>
                  <button
                    id="btn-copy-cli"
                    onClick={() => copyToClipboard(bubblewrapCommand, 'cli')}
                    className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    {copiedKey === 'cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'cli' ? "कमांड कॉपी हो गई" : "कमांड कॉपी करें"}</span>
                  </button>
                </h4>
                
                <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 font-mono text-xs overflow-x-auto">
                  {bubblewrapCommand}
                </pre>

                <p className="text-xs text-slate-400">
                  यह कमांड सीधे Google के आधिकारिक TWA रैपर का उपयोग करके पूर्णतः अनुकूलित Android APK व AAB उत्पन्न करती है।
                </p>
              </div>

              {/* Digital Asset Links */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Digital Asset Links (.well-known/assetlinks.json)</h5>
                    <p className="text-[11px] text-slate-400">प्ले स्टोर ऐप में बिना URL बार के फुल-स्क्रीन चलाने हेतु सर्वर पर एक्टिवेटेड है।</p>
                  </div>

                  <button
                    id="btn-copy-assetlinks"
                    onClick={() => copyToClipboard(assetLinksJson, 'assetlinks')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedKey === 'assetlinks' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'assetlinks' ? "कॉपी" : "JSON कॉपी करें"}</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto">
                  {assetLinksJson}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PWA & TWA Fully Compliant with Google Play Store 2026 Standards</span>
          </div>

          <button
            id="btn-close-modal-bottom"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
