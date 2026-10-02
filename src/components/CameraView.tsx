import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, FlipHorizontal, Timer, Sparkles, Upload, Volume2, VolumeX, Play, Square } from 'lucide-react';
import { sound } from '../utils/audio';
import { ColorFilter } from '../types/photobooth';
import confetti from 'canvas-confetti';

interface CameraViewProps {
  onPhotoCaptured: (slotIndex: number, dataUrl: string) => void;
  activeSlotIndex: number;
  totalSlots: number;
  onSetActiveSlot: (index: number) => void;
  currentFilter: ColorFilter;
  mirrorCamera: boolean;
  onToggleMirror: () => void;
  countdownSeconds: number;
  onChangeCountdown: (sec: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isCapturingSequence: boolean;
  onSequenceStateChange: (running: boolean) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  onPhotoCaptured,
  activeSlotIndex,
  totalSlots,
  onSetActiveSlot,
  currentFilter,
  mirrorCamera,
  onToggleMirror,
  countdownSeconds,
  onChangeCountdown,
  soundEnabled,
  onToggleSound,
  isCapturingSequence,
  onSequenceStateChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [countdownVal, setCountdownVal] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [poseStatusMessage, setPoseStatusMessage] = useState<string | null>(null);

  // Auto shoot sequence refs for cancelation
  const isSequenceActiveRef = useRef(false);
  const sequenceTimersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllSequenceTimers = () => {
    sequenceTimersRef.current.forEach(t => clearTimeout(t));
    sequenceTimersRef.current = [];
  };

  // Initialize Camera
  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 960 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err) {
      console.warn('Camera error or permission denied:', err);
      setHasPermission(false);
      setCameraError('Camera access unavailable. You can also upload photos from your device!');
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      clearAllSequenceTimers();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  // Flip camera between front/back
  const handleToggleFacing = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Capture single snapshot from current video frame for a specific slot
  const takeSnapshot = useCallback((slotIdx: number) => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    // If mirrored, flip horizontally
    if (mirrorCamera && facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Trigger flash & sound
    setIsFlashing(true);
    sound.playShutter();
    setTimeout(() => setIsFlashing(false), 220);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onPhotoCaptured(slotIdx, dataUrl);
  }, [mirrorCamera, facingMode, onPhotoCaptured]);

  // Helper sleep function tracked by sequenceTimersRef
  const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => {
      const timer = setTimeout(resolve, ms);
      sequenceTimersRef.current.push(timer);
    });
  };

  // Helper countdown runner for sequence
  const runSequenceCountdown = async (seconds: number): Promise<boolean> => {
    for (let c = seconds; c > 0; c--) {
      if (!isSequenceActiveRef.current) return false;
      setCountdownVal(c);
      sound.playBeep(false);
      await sleep(1000);
    }
    if (!isSequenceActiveRef.current) return false;
    setCountdownVal(null);
    return true;
  };

  // AUTO SHOOT SEQUENCE RUNNER
  const handleStartAutoShoot = async () => {
    if (isCapturingSequence || countdownVal !== null) return;

    if (!videoRef.current || !hasPermission) {
      alert('Please enable camera access to use Auto Shoot, or use the Upload Photo button!');
      return;
    }

    clearAllSequenceTimers();
    isSequenceActiveRef.current = true;
    onSequenceStateChange(true);

    // If countdownSeconds is 0, give at least 2 seconds so the couple can change poses!
    const timerSec = countdownSeconds === 0 ? 3 : countdownSeconds;

    try {
      for (let slot = 0; slot < totalSlots; slot++) {
        if (!isSequenceActiveRef.current) break;

        // 1. Highlight the current frame in strip and preview
        onSetActiveSlot(slot);
        setPoseStatusMessage(`Pose ${slot + 1} of ${totalSlots} • Strike a cute pose! 📸`);

        // 2. Run countdown 3.. 2.. 1..
        const completed = await runSequenceCountdown(timerSec);
        if (!completed || !isSequenceActiveRef.current) break;

        // 3. Take photo snapshot directly into this slot!
        takeSnapshot(slot);

        // 4. If more slots remain, pause briefly so they can change pose
        if (slot < totalSlots - 1) {
          setPoseStatusMessage(`Great shot! Next pose in 1.5s... Change pose! 💕`);
          await sleep(1500);
        }
      }

      // Finish sequence celebration
      if (isSequenceActiveRef.current) {
        setPoseStatusMessage('All photos captured! Strip ready! 🎉');
        sound.playCelebration();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fda4af', '#fde047', '#a855f7']
        });
        await sleep(1200);
      }
    } finally {
      isSequenceActiveRef.current = false;
      onSequenceStateChange(false);
      setCountdownVal(null);
      setPoseStatusMessage(null);
      clearAllSequenceTimers();
    }
  };

  // Cancel Auto Shoot
  const handleCancelAutoShoot = () => {
    isSequenceActiveRef.current = false;
    clearAllSequenceTimers();
    setCountdownVal(null);
    setPoseStatusMessage(null);
    onSequenceStateChange(false);
    sound.playPop();
  };

  // Single shot trigger with countdown for activeSlotIndex
  const triggerSingleCapture = () => {
    if (countdownVal !== null || isCapturingSequence) return;

    if (countdownSeconds === 0) {
      takeSnapshot(activeSlotIndex);
      return;
    }

    let current = countdownSeconds;
    setCountdownVal(current);
    sound.playBeep(false);

    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdownVal(current);
        sound.playBeep(false);
      } else {
        clearInterval(interval);
        setCountdownVal(null);
        takeSnapshot(activeSlotIndex);
      }
    }, 1000);
  };

  // Upload existing photo from disk
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onPhotoCaptured(activeSlotIndex, event.target.result as string);
        sound.playPop();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="relative flex flex-col bg-white rounded-3xl shadow-xl shadow-rose-200/50 border-2 border-rose-200/70 overflow-hidden">
      {/* Top Header of Camera */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-rose-100/90 via-pink-50 to-amber-50 border-b border-rose-200/60">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-fredoka font-semibold text-rose-900 text-sm tracking-wide">
            Photo Booth Live Feed
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-200/70 text-rose-800">
            Slot {activeSlotIndex + 1} of {totalSlots}
          </span>
        </div>

        {/* Audio, Mirror & Flip controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            className="p-1.5 rounded-xl text-rose-700 hover:bg-rose-200/60 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={onToggleMirror}
            title="Mirror preview"
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              mirrorCamera ? 'bg-rose-200 text-rose-900' : 'text-rose-700 hover:bg-rose-200/60'
            }`}
          >
            <FlipHorizontal size={18} />
          </button>
          <button
            onClick={handleToggleFacing}
            title="Switch front/back camera"
            className="p-1.5 rounded-xl text-rose-700 hover:bg-rose-200/60 transition-colors cursor-pointer"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] bg-slate-950 flex items-center justify-center overflow-hidden">
        {hasPermission === false && (
          <div className="p-6 text-center text-rose-100 max-w-sm flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-300 mb-3 border border-rose-500/40">
              <Camera size={28} />
            </div>
            <p className="font-fredoka font-medium text-base mb-1">Camera Not Available</p>
            <p className="text-xs text-rose-200/80 mb-4">{cameraError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold rounded-xl shadow-md hover:from-rose-600 hover:to-pink-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload size={15} /> Upload Photo from Device
            </button>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-transform duration-300 ${
            mirrorCamera && facingMode === 'user' ? 'scale-x-[-1]' : ''
          }`}
          style={{
            filter: currentFilter.cssFilter !== 'none' ? currentFilter.cssFilter : undefined
          }}
        />

        {/* Shutter White Flash Animation */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-300 pointer-events-none" />
        )}

        {/* Big Countdown Overlay */}
        {countdownVal !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-30 pointer-events-none">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-fredoka font-bold text-6xl shadow-2xl animate-ping opacity-75 absolute inset-0" />
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-fredoka font-bold text-6xl shadow-2xl border-4 border-white relative z-10">
                {countdownVal}
              </div>
            </div>
          </div>
        )}

        {/* Sequence Shooting In-Progress Notification Pill */}
        {isCapturingSequence && (
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between px-3 py-2 bg-rose-950/85 backdrop-blur-md rounded-2xl border border-rose-400/50 text-rose-100 z-30 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold font-fredoka text-white">
                {poseStatusMessage || `Auto Shooting: Photo ${activeSlotIndex + 1} of ${totalSlots}`}
              </span>
            </div>
            <button
              onClick={handleCancelAutoShoot}
              className="text-xs font-fredoka text-rose-300 hover:text-white px-2.5 py-1 rounded-xl bg-rose-900/60 hover:bg-rose-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Square size={12} fill="currentColor" /> Stop
            </button>
          </div>
        )}

        {/* Live Filter Indicator Badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 z-20">
          <Sparkles size={12} className="text-pink-300" />
          <span>{currentFilter.name}</span>
        </div>
      </div>

      {/* Countdown Selector Bar */}
      <div className="px-4 py-2.5 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-rose-800 font-medium font-fredoka">
          <Timer size={14} className="text-rose-500" />
          <span>Timer per shot:</span>
        </div>
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-rose-200/80 shadow-xs">
          {[0, 3, 5, 10].map(sec => (
            <button
              key={sec}
              onClick={() => onChangeCountdown(sec)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                countdownSeconds === sec
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-rose-50'
              }`}
            >
              {sec === 0 ? 'Off (Manual)' : `${sec}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Capture Action Buttons */}
      <div className="p-4 bg-white flex flex-col sm:flex-row items-center gap-3">
        {/* Auto Shoot Sequence Button (Captures all slots one after another!) */}
        {isCapturingSequence ? (
          <button
            onClick={handleCancelAutoShoot}
            className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-fredoka font-semibold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Square size={16} fill="currentColor" />
            <span>Stop Auto Shoot</span>
          </button>
        ) : (
          <button
            onClick={handleStartAutoShoot}
            disabled={countdownVal !== null}
            className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 hover:from-pink-600 hover:to-rose-600 text-white font-fredoka font-semibold text-sm shadow-md hover:shadow-lg shadow-rose-300/40 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Play size={16} fill="currentColor" />
            <span>Auto Shoot All ({totalSlots} shots)</span>
          </button>
        )}

        {/* Single Shot Button */}
        <button
          onClick={triggerSingleCapture}
          disabled={isCapturingSequence || countdownVal !== null}
          className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-rose-100/80 hover:bg-rose-200/80 text-rose-900 font-fredoka font-semibold text-sm border border-rose-300/80 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Camera size={18} className="text-rose-600" />
          <span>Snap Photo #{activeSlotIndex + 1}</span>
        </button>

        {/* Upload device button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Upload image from device"
          className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
        >
          <Upload size={18} />
        </button>
      </div>
    </div>
  );
};
