
import React from 'react';

const Diary = ({ currentEntry, setCurrentEntry, addEntry }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Diário do Hábito</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Registre seus gatilhos e experiências. A consciência é o primeiro passo para a mudança.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Onde estou?
            </label>
            <input
              type="text"
              value={currentEntry.location}
              onChange={(e) => setCurrentEntry({...currentEntry, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: Escritório, casa, cafeteria..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              O que estou fazendo?
            </label>
            <input
              type="text"
              value={currentEntry.activity}
              onChange={(e) => setCurrentEntry({...currentEntry, activity: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: Trabalhando, reunião, pausa..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Com quem estou/estive?
            </label>
            <input
              type="text"
              value={currentEntry.people}
              onChange={(e) => setCurrentEntry({...currentEntry, people: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: Sozinho, colegas, cliente..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Como estou me sentindo emocionalmente?
            </label>
            <select
              value={currentEntry.emotion}
              onChange={(e) => setCurrentEntry({...currentEntry, emotion: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Selecione...</option>
              <option value="ansioso">Ansioso</option>
              <option value="estressado">Estressado</option>
              <option value="entediado">Entediado</option>
              <option value="sobrecarregado">Sobrecarregado</option>
              <option value="desconfortável">Desconfortável socialmente</option>
              <option value="calmo">Calmo</option>
              <option value="motivado">Motivado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Como estou fisicamente?
            </label>
            <input
              type="text"
              value={currentEntry.physical}
              onChange={(e) => setCurrentEntry({...currentEntry, physical: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Ex: Cansado, alerta, com dor de cabeça..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gatilho principal *
            </label>
            <select
              value={currentEntry.trigger}
              onChange={(e) => setCurrentEntry({...currentEntry, trigger: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Selecione...</option>
              <option value="Manhã no escritório">Manhã no escritório</option>
              <option value="Monotonia no trabalho">Monotonia no trabalho</option>
              <option value="Sobrecarga de tarefas">Sobrecarga de tarefas</option>
              <option value="Ansiedade pós-interação">Ansiedade pós-interação social</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Alternativa tentada
          </label>
          <input
            type="text"
            value={currentEntry.alternative}
            onChange={(e) => setCurrentEntry({...currentEntry, alternative: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Ex: Chá de hortelã, caminhada, respiração..."
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={currentEntry.success}
              onChange={(e) => setCurrentEntry({...currentEntry, success: e.target.checked})}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-semibold text-gray-700">
              Consegui evitar o café desta vez
            </span>
          </label>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Observações adicionais
          </label>
          <textarea
            value={currentEntry.notes}
            onChange={(e) => setCurrentEntry({...currentEntry, notes: e.target.value})}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Como se sentiu? O que funcionou? O que pode melhorar?"
          />
        </div>

        <button
          onClick={addEntry}
          disabled={!currentEntry.trigger}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg"
        >
          {currentEntry.trigger ? 'Registrar Experiência' : 'Selecione um gatilho para continuar'}
        </button>
      </div>
    </div>
  );
};

export default Diary;
