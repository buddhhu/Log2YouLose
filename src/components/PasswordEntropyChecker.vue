<script setup lang="ts">
import { usePasswordEntropy } from '../composables/usePasswordEntropy'

const {
  password,
  entropy,
  strength,
  strengthClass,
  crackTimeReadable,
  requirements,
  overallScore,
} = usePasswordEntropy()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-zinc-950 via-gray-950 to-neutral-950 p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8 sm:mb-12">
        <div class="inline-flex items-center gap-3 mb-4">
          <i
            class="far fa-shield-alt text-3xl sm:text-4xl lg:text-5xl text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"></i>
          <h1
            class="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-300 via-slate-300 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Password Entropy Analyzer
          </h1>
        </div>
        <p class="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          <i class="far fa-info-circle mr-2"></i>
          Analyze your password strength, entropy, and security requirements in real-time
        </p>
      </div>

      <!-- Password Input Section -->
      <div class="mb-8 sm:mb-12">
        <div class="max-w-2xl mx-auto">
          <label class="text-gray-400 text-sm sm:text-base font-medium mb-3 flex items-center gap-2">
            <i class="far fa-key text-blue-400"></i>
            Enter Your Password
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i class="far fa-lock text-gray-600"></i>
            </div>
            <input type="password" v-model="password" placeholder="Type your password here..."
              class="w-full pl-12 pr-4 py-4 sm:py-5 bg-gray-900/40 backdrop-blur-sm border-2 border-gray-700/50 rounded-xl text-sm sm:text-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300" />
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
            <i class="far fa-tasks text-blue-400"></i>
            Security Requirements
            <div class="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent"></div>
          </h2>

          <div class="space-y-3">
            <div v-for="req in requirements" :key="req.label" :class="[
              'flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 group relative',
              req.met
                ? 'bg-green-500/5 border-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.1)]'
                : 'bg-red-500/5 border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.1)]',
            ]">
              <div :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0',
                req.met
                  ? 'bg-green-500 text-white shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                  : 'bg-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.4)]',
              ]">
                <i v-if="req.met" class="far fa-check text-xs"></i>
                <span v-else class="text-xs">{{ req.icon }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span :class="[
                    'font-medium text-sm truncate',
                    req.met ? 'text-green-300' : 'text-red-300',
                  ]">
                    {{ req.label }}
                  </span>
                  <div v-if="password && req.met" class="flex items-center gap-1 flex-shrink-0">
                    <i class="far fa-plus text-blue-400 text-xs"></i>
                    <span
                      class="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {{ req.bitsContributed.toFixed(1) }}b
                    </span>
                  </div>
                </div>
                <p class="text-xs text-gray-600 mt-0.5 truncate">
                  {{ req.description }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="mt-6 p-4 bg-gray-900/20 rounded-lg border border-gray-700/20 shadow-[0_0_8px_rgba(59,130,246,0.05)]">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-semibold text-gray-400 flex items-center gap-2">
                <i class="far fa-chart-line text-blue-400 text-sm"></i>
                Progress
              </h3>
              <span class="text-lg font-bold text-blue-400">{{ Math.round(overallScore) }}%</span>
            </div>
            <div class="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                :style="{ width: `${overallScore}%` }"></div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-200 mb-6 flex items-center gap-3">
            <i class="far fa-analytics text-purple-400"></i>
            Security Analysis
            <div class="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
          </h2>

          <div v-if="password" class="space-y-4">
            <div class="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.08)]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="far fa-calculator text-lg text-blue-400"></i>
                  <div>
                    <h3 class="text-sm font-semibold text-blue-300">Entropy</h3>
                    <p class="text-xs text-gray-600">Randomness</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                    {{ entropy.toFixed(1) }}
                  </div>
                  <div class="text-xs text-blue-300">bits</div>
                </div>
              </div>
            </div>

            <div :class="[
              'p-4 rounded-lg border transition-all duration-300',
              strength === 'Strong'
                ? 'bg-green-500/5 border-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.08)]'
                : strength === 'Moderate'
                  ? 'bg-yellow-500/5 border-yellow-500/20 shadow-[0_0_8px_rgba(251,191,36,0.08)]'
                  : 'bg-red-500/5 border-red-500/20 shadow-[0_0_8px_rgba(239,68,68,0.08)]',
            ]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i :class="[
                    'far fa-shield-check text-lg',
                    strength === 'Strong'
                      ? 'text-green-400'
                      : strength === 'Moderate'
                        ? 'text-yellow-400'
                        : 'text-red-400',
                  ]"></i>
                  <div>
                    <h3 :class="[
                      'text-sm font-semibold',
                      strength === 'Strong'
                        ? 'text-green-300'
                        : strength === 'Moderate'
                          ? 'text-yellow-300'
                          : 'text-red-300',
                    ]">
                      Strength
                    </h3>
                    <div class="flex items-center gap-1 mt-0.5">
                      <i v-for="n in 3" :key="n" :class="[
                        'far fa-star text-xs',
                        (strength === 'Strong' && n <= 3) ||
                          (strength === 'Moderate' && n <= 2) ||
                          (strength === 'Weak' && n <= 1)
                          ? 'text-yellow-400'
                          : 'text-gray-700',
                      ]"></i>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div :class="['text-xl font-bold', strengthClass]">
                    {{ strength }}
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 bg-cyan-500/5 rounded-lg border border-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.08)]">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="far fa-clock text-lg text-cyan-400"></i>
                  <div>
                    <h3 class="text-sm font-semibold text-cyan-300">Crack Time</h3>
                    <p class="text-xs text-gray-600">To break</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 max-w-32">
                  <div
                    class="text-sm font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] break-words text-right leading-tight">
                    {{ crackTimeReadable }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20 shadow-[0_0_8px_rgba(147,51,234,0.08)]">
              <h3 class="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <i class="far fa-lightbulb text-purple-400"></i>
                Security Tips
              </h3>
              <ul class="space-y-1.5 text-xs text-gray-500">
                <li class="flex items-start gap-2">
                  <i class="far fa-check-circle text-green-400 mt-0.5 text-xs flex-shrink-0"></i>
                  <span>Mix uppercase, lowercase, numbers & symbols</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="far fa-check-circle text-green-400 mt-0.5 text-xs flex-shrink-0"></i>
                  <span>Use at least 12 characters for better security</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="far fa-check-circle text-green-400 mt-0.5 text-xs flex-shrink-0"></i>
                  <span>Avoid common words or personal info</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="far fa-check-circle text-green-400 mt-0.5 text-xs flex-shrink-0"></i>
                  <span>Consider using a password manager</span>
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="text-center py-16">
            <div
              class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center">
              <i class="far fa-lock-open text-4xl text-gray-600"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-400 mb-2">No Password Entered</h3>
            <p class="text-gray-500">
              Start typing in the input field above to analyze your password security
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
