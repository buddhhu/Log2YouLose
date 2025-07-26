import { ref, computed } from 'vue'
import type { PasswordRequirement } from '../types/passwordChecker'

export const usePasswordEntropy = () => {
  const password = ref<string>('')

  const getCharsetContributions = (pwd: string) => {
    const contributions = {
      lowercase: /[a-z]/.test(pwd) ? 26 : 0,
      uppercase: /[A-Z]/.test(pwd) ? 26 : 0,
      numbers: /[0-9]/.test(pwd) ? 10 : 0,
      special: /[^a-zA-Z0-9]/.test(pwd) ? 32 : 0
    }

    const length = pwd.length
    const totalCharset = contributions.lowercase + contributions.uppercase + contributions.numbers + contributions.special

    return {
      lowercase: contributions.lowercase > 0 ? Math.log2(contributions.lowercase) * (length > 0 ? length * (contributions.lowercase / Math.max(totalCharset, 1)) : 0) : 0,
      uppercase: contributions.uppercase > 0 ? Math.log2(contributions.uppercase) * (length > 0 ? length * (contributions.uppercase / Math.max(totalCharset, 1)) : 0) : 0,
      numbers: contributions.numbers > 0 ? Math.log2(contributions.numbers) * (length > 0 ? length * (contributions.numbers / Math.max(totalCharset, 1)) : 0) : 0,
      special: contributions.special > 0 ? Math.log2(contributions.special) * (length > 0 ? length * (contributions.special / Math.max(totalCharset, 1)) : 0) : 0,
      lengthBonus8: length >= 8 ? Math.log2(Math.pow(2, Math.min(length - 7, 5))) : 0,
      lengthBonus12: length >= 12 ? Math.log2(Math.pow(2, Math.min(length - 11, 8))) : 0
    }
  }

  const entropy = computed(() => {
    const pwd = password.value
    if (!pwd) return 0

    let charsetSize = 0
    if (/[a-z]/.test(pwd)) charsetSize += 26
    if (/[A-Z]/.test(pwd)) charsetSize += 26
    if (/[0-9]/.test(pwd)) charsetSize += 10
    if (/[^a-zA-Z0-9]/.test(pwd)) charsetSize += 32

    return charsetSize && pwd.length
      ? Math.log2(Math.pow(charsetSize, pwd.length))
      : 0
  })

  const strength = computed(() => {
    const bits = entropy.value
    if (bits < 40) return 'Weak'
    if (bits < 60) return 'Moderate'
    return 'Strong'
  })

  const strengthClass = computed(() => {
    return {
      'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]': strength.value === 'Weak',
      'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]': strength.value === 'Moderate',
      'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]': strength.value === 'Strong',
    }
  })

  const crackTimeReadable = computed(() => {
    const guessesPerSecond = 1e10
    const seconds = Math.pow(2, entropy.value) / guessesPerSecond

    if (seconds < 1) return '< 1 second'
    if (seconds < 60) return `${seconds.toFixed(2)} seconds`
    if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`
    if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`
    if (seconds < 3153600000) return `${(seconds / 31536000).toFixed(2)} years`

    const centuries = seconds / 3153600000
    if (centuries < 1000) return `${centuries.toFixed(2)} centuries`
    if (centuries < 1000000) return `${(centuries / 1000).toFixed(2)}K centuries`
    if (centuries < 1000000000) return `${(centuries / 1000000).toFixed(2)}M centuries`
    if (centuries < 1000000000000) return `${(centuries / 1000000000).toFixed(2)}B centuries`

    return '∞ (practically unbreakable)'
  })

  const requirements = computed((): PasswordRequirement[] => {
    const pwd = password.value
    const contributions = getCharsetContributions(pwd)

    return [
      {
        label: 'Lowercase (a-z)',
        met: /[a-z]/.test(pwd),
        icon: 'a',
        bitsContributed: contributions.lowercase,
        description: 'Adds 26 possible characters per position'
      },
      {
        label: 'Uppercase (A-Z)',
        met: /[A-Z]/.test(pwd),
        icon: 'A',
        bitsContributed: contributions.uppercase,
        description: 'Adds 26 possible characters per position'
      },
      {
        label: 'Numbers (0-9)',
        met: /[0-9]/.test(pwd),
        icon: '1',
        bitsContributed: contributions.numbers,
        description: 'Adds 10 possible characters per position'
      },
      {
        label: 'Special chars (!@#)',
        met: /[^a-zA-Z0-9]/.test(pwd),
        icon: '@',
        bitsContributed: contributions.special,
        description: 'Adds ~32 possible characters per position'
      },
      {
        label: 'Min 8 characters',
        met: pwd.length >= 8,
        icon: '8',
        bitsContributed: contributions.lengthBonus8,
        description: 'Exponentially increases search space'
      },
      {
        label: 'Min 12 characters',
        met: pwd.length >= 12,
        icon: '12',
        bitsContributed: contributions.lengthBonus12,
        description: 'Further exponential security increase'
      }
    ]
  })

  const overallScore = computed(() => {
    const metCount = requirements.value.filter(req => req.met).length
    return (metCount / requirements.value.length) * 100
  })

  return {
    password,
    entropy,
    strength,
    strengthClass,
    crackTimeReadable,
    requirements,
    overallScore
  }
}