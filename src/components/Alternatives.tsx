
import React from 'react';
import { Plus, Star } from 'lucide-react';

const Alternatives = ({ predefinedAlternatives, alternatives, addAlternative, updateAlternativeStats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Suas Alternativas Saudáveis</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Experimente diferentes alternativas e descubra o que funciona melhor para você.
        </p>

        {predefinedAlternatives.map((category, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              {category.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.options.map((option, optIdx) => (
                <div key={optIdx} className="bg-gray-50 p-4 rounded-lg border-2 border-transparent hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                      {option}
                    </span>
                    <button
                      onClick={() => addAlternative(option)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-all"
                      title="Adicionar às suas alternativas"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {alternatives.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Suas Alternativas Testadas</h3>
            <div className="space-y-4">
              {alternatives.map(alt => (
                <div key={alt.id} className="bg-white p-6 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{alt.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Usado {alt.timesUsed} {alt.timesUsed === 1 ? 'vez' : 'vezes'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600 mr-2">Eficácia:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => updateAlternativeStats(alt.id, star)}
                          className={`transition-colors hover:scale-110 transform ${
                            star <= alt.effectiveness ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                          }`}
                          title={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alternatives.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              Comece adicionando algumas alternativas para monitorar sua eficácia!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alternatives;
