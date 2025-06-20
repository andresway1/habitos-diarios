
import React from 'react';
import { Star, Heart } from 'lucide-react';

const Progress = ({ entries, alternatives }) => {
  const recentEntries = entries.slice(-14); // Últimas 2 semanas
  const successByDay = {};
  
  recentEntries.forEach(entry => {
    const date = entry.date;
    if (!successByDay[date]) {
      successByDay[date] = { total: 0, success: 0 };
    }
    successByDay[date].total++;
    if (entry.success) successByDay[date].success++;
  });

  const triggerCount = {};
  entries.forEach(entry => {
    triggerCount[entry.trigger] = (triggerCount[entry.trigger] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Seu Progresso</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Gatilhos Mais Frequentes</h3>
            <div className="space-y-3">
              {Object.entries(triggerCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([trigger, count]) => (
                  <div key={trigger} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border">
                    <span className="text-sm font-medium text-gray-700">{trigger}</span>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              {Object.keys(triggerCount).length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Nenhum gatilho registrado ainda.
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Alternativas Mais Eficazes</h3>
            <div className="space-y-3">
              {alternatives
                .filter(alt => alt.effectiveness > 0)
                .sort((a, b) => b.effectiveness - a.effectiveness)
                .slice(0, 5)
                .map(alt => (
                  <div key={alt.id} className="flex justify-between items-center py-3 px-4 bg-white rounded-lg border">
                    <span className="text-sm font-medium text-gray-700">{alt.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(alt.effectiveness)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              {alternatives.filter(alt => alt.effectiveness > 0).length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Avalie suas alternativas para ver as mais eficazes aqui.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Últimas 2 Semanas</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-7 gap-3 mb-4">
              {Array.from({length: 14}, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (13 - i));
                const dateStr = date.toISOString().split('T')[0];
                const dayData = successByDay[dateStr] || { total: 0, success: 0 };
                const successRate = dayData.total > 0 ? (dayData.success / dayData.total) : 0;
                
                return (
                  <div key={i} className="text-center">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      {date.getDate()}/{date.getMonth() + 1}
                    </div>
                    <div 
                      className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-sm font-semibold transition-all hover:scale-110 ${
                        dayData.total === 0 
                          ? 'bg-gray-200 text-gray-500' 
                          : successRate === 1 
                            ? 'bg-green-500 text-white shadow-lg'
                            : successRate > 0.5
                              ? 'bg-yellow-400 text-white shadow-md'
                              : 'bg-red-400 text-white shadow-md'
                      }`}
                      title={`${dayData.success}/${dayData.total} sucessos`}
                    >
                      {dayData.total > 0 ? dayData.success : '-'}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center space-x-6 text-xs text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                100% sucesso
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
                50%+ sucesso
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
                &lt;50% sucesso
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm">
        <div className="flex">
          <Heart className="h-6 w-6 text-green-500 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">Motivação Diária</h3>
            <p className="text-green-700 text-lg">
              "Se você não veio de uma família inteligente (em termos de hábitos), uma família inteligente pode vir de você."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
