
import React from 'react';
import { BookOpen, CheckCircle, TrendingUp, Calendar, AlertCircle, Coffee } from 'lucide-react';

const Dashboard = ({ entries, getStats }) => {
  const stats = getStats();
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl shadow-sm border border-green-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Sua Jornada de Transformação</h2>
        <p className="text-gray-600 text-lg">Acompanhe seu progresso na superação do hábito do café</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total de Registros</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalEntries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Sucessos</p>
              <p className="text-3xl font-bold text-gray-800">{stats.successfulEntries}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Taxa de Sucesso</p>
              <p className="text-3xl font-bold text-gray-800">{stats.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg mr-4">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Últimos 7 dias</p>
              <p className="text-3xl font-bold text-gray-800">{stats.last7Days}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
        <div className="flex">
          <AlertCircle className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lembre-se</h3>
            <p className="text-yellow-700">
              A mudança é um processo. Cada pequeno passo é uma vitória. Seja paciente e gentil consigo mesmo.
            </p>
          </div>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Últimos Registros</h3>
          <div className="space-y-4">
            {entries.slice(-5).reverse().map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{entry.trigger}</p>
                  <p className="text-sm text-gray-600 mt-1">{entry.timestamp}</p>
                  {entry.alternative && (
                    <p className="text-sm text-blue-600 mt-1">Alternativa: {entry.alternative}</p>
                  )}
                </div>
                <div className="ml-4">
                  {entry.success ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-6 w-6 mr-1" />
                      <span className="text-sm font-medium">Sucesso!</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600">
                      <Coffee className="h-6 w-6 mr-1" />
                      <span className="text-sm font-medium">Café</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <Coffee className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Comece sua jornada!</h3>
          <p className="text-gray-500 mb-4">
            Registre sua primeira experiência no Diário para começar a monitorar seus hábitos.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
