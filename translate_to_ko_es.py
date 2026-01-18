import json
import os
from openai import OpenAI

client = OpenAI()

def translate_json(source_file, target_lang, target_file):
    """Translate JSON file to target language"""
    with open(source_file, 'r', encoding='utf-8') as f:
        source_data = json.load(f)
    
    source_json_str = json.dumps(source_data, ensure_ascii=False, indent=2)
    
    lang_names = {
        'ko': 'Korean',
        'es': 'Spanish'
    }
    
    prompt = f"""Translate the following JSON content from Japanese to {lang_names[target_lang]}.

IMPORTANT INSTRUCTIONS:
1. Maintain the exact same JSON structure
2. Only translate the VALUES, keep all KEYS in English
3. Preserve all HTML tags like <br /> exactly as they are
4. Keep technical terms like "NFT", "Web3", "DX", "Ethereum", "Solana" unchanged
5. Maintain professional and formal tone
6. For adult entertainment industry terms, use appropriate and respectful language
7. Return ONLY the translated JSON, no explanations

Source JSON:
{source_json_str}"""

    print(f"Translating to {lang_names[target_lang]}...")
    
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a professional translator specializing in Japanese to Korean and Spanish translations. You maintain JSON structure perfectly and translate content accurately while preserving technical terms."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    
    translated_text = response.choices[0].message.content.strip()
    
    # Remove markdown code blocks if present
    if translated_text.startswith('```'):
        lines = translated_text.split('\n')
        translated_text = '\n'.join(lines[1:-1])
    
    translated_data = json.loads(translated_text)
    
    with open(target_file, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Saved to {target_file}")

# Translate to Korean
translate_json(
    'client/src/locales/ja.json',
    'ko',
    'client/src/locales/ko.json'
)

# Translate to Spanish
translate_json(
    'client/src/locales/ja.json',
    'es',
    'client/src/locales/es.json'
)

print("\n✓ All translations completed!")
