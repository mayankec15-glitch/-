/**
 * Web Vibration API Haptic Feedback Utility for mobile devices.
 * Provides tactile confirmation for voice evaluations, quiz completions, and streak milestones.
 */

export const triggerHaptic = (pattern: number | number[] = 20): boolean => {
  try {
    if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
      return navigator.vibrate(pattern);
    }
  } catch (err) {
    // Fail silently on browsers/devices that block or don't support vibration
    console.debug('Haptics not supported or blocked:', err);
  }
  return false;
};

export const haptics = {
  /** Light tap for button clicks or toggle controls */
  tap: () => triggerHaptic(15),

  /** Crisp double pulse for successful voice test or correct answer */
  success: () => triggerHaptic([35, 45, 65]),

  /** Celebratory rhythm for streak milestones and test completions */
  milestone: () => triggerHaptic([40, 40, 40, 40, 80, 50, 120]),

  /** Gentle double buzz for low score or retry prompt */
  warning: () => triggerHaptic([60, 50, 60]),

  /** Recording start feedback */
  startRecording: () => triggerHaptic([30, 30, 30]),

  /** Recording stop feedback */
  stopRecording: () => triggerHaptic(40),
};
