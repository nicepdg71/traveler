import React, { useState } from 'react';
import { Volume2, ChevronDown, MessageSquare } from 'lucide-react';

interface PhraseItem {
  kr: string;
  jp: string;
  reading: string;
}

export const JapanesePhrases: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phrases: PhraseItem[] = [
    {
      kr: '길을 잃었습니다. 도와주세요.',
      jp: '道に迷いました。助けてください。',
      reading: '미치니 마요이마시타. 타스케테 쿠다사이.',
    },
    {
      kr: '몸이 많이 아픕니다. 병원에 가고 싶습니다.',
      jp: '具合が悪いです。病院に行きたいです。',
      reading: '구아이가 와루이데스. 뵤-인니 이키타이데스.',
    },
    {
      kr: '한국어를 할 수 있는 분이 계신가요?',
      jp: '韓国語ができる方はいらっしゃいますか？',
      reading: '칸코쿠고가 데키루 카타와 이랏샤이마스카?',
    },
    {
      kr: '여권을 분실했습니다.',
      jp: 'パスポートを紛失しました。',
      reading: '파스포-토오 훈시츠 시마시타.',
    },
    {
      kr: '시부야 엑셀 호텔 도큐는 어느 쪽인가요?',
      jp: '渋谷エクセルホテル東急はどちらですか？',
      reading: '시부야 에쿠세루 호테루 토-큐-와 도치라데스카?',
    },
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-brand-indigo">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">현지 긴급 일본어 회화 카드</h4>
            <p className="text-[11px] text-slate-500">당황했을 때 보여주거나 들려주는 문장</p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 pt-0 divide-y divide-slate-100">
          {phrases.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-2 last:pb-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-snug">
                    {item.jp}
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                    {item.reading}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    ({item.kr})
                  </p>
                </div>
                <button
                  onClick={() => speak(item.jp)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-blue hover:bg-blue-50 shrink-0"
                  title="발음 듣기"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
