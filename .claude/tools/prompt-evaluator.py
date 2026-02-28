#!/usr/bin/env python3
"""
Prompt Evaluator for BMAD Meta-Prompting System

Evaluates prompts on 3 dimensions:
1. Coverage: Do outputs address all requirements?
2. Clarity: Are outputs clear and unambiguous?
3. Efficiency: Token-to-value ratio

Usage:
    python prompt-evaluator.py --prompt-v1 path/to/v1.0.md --prompt-v2 path/to/v1.1-beta.md --test-input "test query"
"""

import json
import sys
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Optional
import re

@dataclass
class EvaluationScore:
    """Evaluation result for a single prompt"""
    prompt_name: str
    version: str
    coverage: float      # 0.0-1.0: Does it address all requirements?
    clarity: float       # 0.0-1.0: Is it clear and unambiguous?
    efficiency: float    # 0.0-1.0: Token efficiency (concise yet complete?)
    overall: float       # Average of the 3 scores
    strengths: list[str]
    weaknesses: list[str]
    recommendation: str  # "use_this_version" or "keep_current"

class PromptEvaluator:
    """Evaluates prompts using heuristics"""

    def __init__(self):
        self.word_count_factor = 1.0

    def evaluate(self, prompt_text: str, version: str, prompt_name: str) -> EvaluationScore:
        """Evaluate a single prompt"""

        # Coverage: Check if prompt addresses key aspects
        coverage = self._evaluate_coverage(prompt_text)

        # Clarity: Check readability, structure, vocabulary
        clarity = self._evaluate_clarity(prompt_text)

        # Efficiency: Check token efficiency (word count / info density)
        efficiency = self._evaluate_efficiency(prompt_text)

        # Overall score
        overall = (coverage + clarity + efficiency) / 3.0

        # Strengths and weaknesses
        strengths, weaknesses = self._analyze_strengths_weaknesses(
            prompt_text, coverage, clarity, efficiency
        )

        return EvaluationScore(
            prompt_name=prompt_name,
            version=version,
            coverage=round(coverage, 3),
            clarity=round(clarity, 3),
            efficiency=round(efficiency, 3),
            overall=round(overall, 3),
            strengths=strengths,
            weaknesses=weaknesses,
            recommendation="keep" # Default, will be compared later
        )

    def _evaluate_coverage(self, text: str) -> float:
        """Evaluate if prompt covers all necessary aspects"""
        score = 0.8  # Start at 0.8 (good baseline)

        # Check for key structural elements
        has_intro = bool(re.search(r'objetivo|purpose|goal', text, re.I))
        has_steps = bool(re.search(r'step|passo|phase', text, re.I))
        has_output = bool(re.search(r'output|resposta|expected', text, re.I))
        has_examples = bool(re.search(r'example|exemplo', text, re.I))

        elements = [has_intro, has_steps, has_output, has_examples]
        coverage_bonus = sum(elements) * 0.05  # Each element +0.05

        return min(1.0, score + coverage_bonus)

    def _evaluate_clarity(self, text: str) -> float:
        """Evaluate readability and clarity"""
        score = 0.7  # Start at 0.7

        # Positive indicators
        lines = text.split('\n')

        # Has headers/structure
        has_headers = len([l for l in lines if l.startswith('#')]) > 2

        # Has bullet points (better structure)
        has_bullets = bool(re.search(r'^[\s\t]*[\-\*\+]', text, re.M))

        # Has code blocks
        has_code_blocks = '```' in text

        # Average line length (shorter = clearer)
        avg_line_length = sum(len(l) for l in lines) / max(len(lines), 1)
        line_length_score = min(1.0, max(0.5, 1.0 - (avg_line_length - 80) / 200))

        clarity_bonus = 0.0
        if has_headers:
            clarity_bonus += 0.1
        if has_bullets:
            clarity_bonus += 0.08
        if has_code_blocks:
            clarity_bonus += 0.05

        return round(min(1.0, score + clarity_bonus + (line_length_score - 0.7) * 0.1), 3)

    def _evaluate_efficiency(self, text: str) -> float:
        """Evaluate token-to-value efficiency"""
        # Count words as proxy for tokens
        words = len(text.split())

        # Count "content units" (paragraphs, code blocks, bullet points)
        paragraphs = len([p for p in text.split('\n\n') if p.strip()])
        bullets = len(re.findall(r'^[\s\t]*[\-\*\+]', text, re.M))
        code_blocks = text.count('```') // 2

        content_units = paragraphs + bullets + code_blocks

        if content_units == 0:
            return 0.5

        # Ideal: ~100 words per content unit
        words_per_unit = words / content_units

        if 70 <= words_per_unit <= 150:
            efficiency = 0.85  # Optimal range
        elif 50 <= words_per_unit < 70 or 150 < words_per_unit <= 200:
            efficiency = 0.75  # Acceptable
        else:
            efficiency = 0.60  # Too wordy or too terse

        return efficiency

    def _analyze_strengths_weaknesses(
        self,
        text: str,
        coverage: float,
        clarity: float,
        efficiency: float
    ) -> tuple[list[str], list[str]]:
        """Identify strengths and weaknesses"""
        strengths = []
        weaknesses = []

        if coverage > 0.85:
            strengths.append("Comprehensive coverage of requirements")
        elif coverage < 0.70:
            weaknesses.append("Missing key requirement aspects")

        if clarity > 0.85:
            strengths.append("Very clear and well-structured")
        elif clarity < 0.70:
            weaknesses.append("Could be clearer - improve structure")

        if efficiency > 0.80:
            strengths.append("Efficient use of words")
        elif efficiency < 0.70:
            weaknesses.append("Too verbose - trim unnecessary text")

        if '**' in text or '##' in text or '- ' in text:
            strengths.append("Good formatting with structure")

        if '```' not in text:
            weaknesses.append("No code examples provided")

        return strengths, weaknesses

def compare_prompts(score1: EvaluationScore, score2: EvaluationScore) -> tuple[EvaluationScore, EvaluationScore]:
    """Compare two prompt scores and recommend better one"""
    if score1.overall > score2.overall:
        score1.recommendation = "use_this_version"
        score2.recommendation = "keep_current"
        return score1, score2
    else:
        score2.recommendation = "use_this_version"
        score1.recommendation = "keep_current"
        return score1, score2

def main():
    evaluator = PromptEvaluator()

    # Test: evaluate a sample prompt
    sample_prompt = """
# Spec para {objective}

Você está na fase **Spec** do workflow SDD.

Seu objetivo é transformar o PRD em uma **SPEC técnica clara**.

## Passos

1. **Leia o PRD por completo**
   - Entenda o contexto
   - Registre perguntas em aberto

2. **Defina o escopo**
   - Explicite o que está **dentro** e **fora**
   - Aponte riscos

3. **Liste arquivos**
   - Separe: criar vs modificar
   - Indique caminho exato

## Resposta

A SPEC completa deve ser salva em `.claude/specs/`.
"""

    score = evaluator.evaluate(sample_prompt, "v1.0", "02-spec")

    result = {
        "status": "success",
        "evaluation": asdict(score)
    }

    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0

if __name__ == "__main__":
    sys.exit(main())
