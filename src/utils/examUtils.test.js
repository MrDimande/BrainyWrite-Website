/**
 * Testes para funções de dificuldade em examUtils.js
 * Execute com: npm test ou npx vitest (se usar Vitest)
 */

import { describe, expect, it } from 'vitest';
import {
    DIFFICULTY_LEVELS,
    getDifficultyColor,
    getDifficultyLabel,
    getRecommendedDifficultyForSubject
} from './examUtils';

describe('DIFFICULTY_LEVELS', () => {
  it('deve conter os três níveis de dificuldade', () => {
    expect(DIFFICULTY_LEVELS).toEqual(['easy', 'medium', 'hard']);
  });
});

describe('getDifficultyColor', () => {
  it('retorna gradiente verde para easy', () => {
    expect(getDifficultyColor('easy')).toBe('from-green-500 to-emerald-500');
  });

  it('retorna gradiente amarelo/laranja para medium', () => {
    expect(getDifficultyColor('medium')).toBe('from-yellow-500 to-orange-500');
  });

  it('retorna gradiente vermelho para hard', () => {
    expect(getDifficultyColor('hard')).toBe('from-red-500 to-pink-500');
  });

  it('retorna gradiente cinza para valor desconhecido', () => {
    expect(getDifficultyColor('unknown')).toBe('from-gray-500 to-gray-600');
  });

  it('é case-insensitive', () => {
    expect(getDifficultyColor('EASY')).toBe('from-green-500 to-emerald-500');
    expect(getDifficultyColor('Medium')).toBe('from-yellow-500 to-orange-500');
  });
});

describe('getDifficultyLabel', () => {
  it('retorna "Fácil" para easy', () => {
    expect(getDifficultyLabel('easy')).toBe('Fácil');
  });

  it('retorna "Médio" para medium', () => {
    expect(getDifficultyLabel('medium')).toBe('Médio');
  });

  it('retorna "Difícil" para hard', () => {
    expect(getDifficultyLabel('hard')).toBe('Difícil');
  });

  it('retorna o próprio valor para desconhecido', () => {
    expect(getDifficultyLabel('expert')).toBe('expert');
  });

  it('é case-insensitive', () => {
    expect(getDifficultyLabel('HARD')).toBe('Difícil');
  });
});

describe('getRecommendedDifficultyForSubject', () => {
  it('recomenda "easy" quando não há progresso', () => {
    expect(getRecommendedDifficultyForSubject(null)).toBe('easy');
    expect(getRecommendedDifficultyForSubject(undefined)).toBe('easy');
    expect(getRecommendedDifficultyForSubject({})).toBe('easy');
  });

  it('recomenda "easy" para média < 60', () => {
    expect(getRecommendedDifficultyForSubject({ averageScore: 0 })).toBe('easy');
    expect(getRecommendedDifficultyForSubject({ averageScore: 30 })).toBe('easy');
    expect(getRecommendedDifficultyForSubject({ averageScore: 59.9 })).toBe('easy');
  });

  it('recomenda "medium" para média >= 60 e < 80', () => {
    expect(getRecommendedDifficultyForSubject({ averageScore: 60 })).toBe('medium');
    expect(getRecommendedDifficultyForSubject({ averageScore: 70 })).toBe('medium');
    expect(getRecommendedDifficultyForSubject({ averageScore: 79.9 })).toBe('medium');
  });

  it('recomenda "hard" para média >= 80', () => {
    expect(getRecommendedDifficultyForSubject({ averageScore: 80 })).toBe('hard');
    expect(getRecommendedDifficultyForSubject({ averageScore: 90 })).toBe('hard');
    expect(getRecommendedDifficultyForSubject({ averageScore: 100 })).toBe('hard');
  });
});
