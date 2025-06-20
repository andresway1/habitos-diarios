
import React, { useState, useEffect } from 'react';
import { Coffee, BookOpen, TrendingUp, Heart, Clock, CheckCircle, AlertCircle, Star, Calendar, Plus, Minus } from 'lucide-react';
import Dashboard from './Dashboard';
import Diary from './Diary';
import Alternatives from './Alternatives';
import Progress from './Progress';

const CoffeeHabitBreakerApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [entries, setEntries] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [goals, setGoals] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    location: '',
    activity: '',
    people: '',
    emotion: '',
    physical: '',
    trigger: '',
    alternative: '',
    success: false,
    notes: ''
  });

  // Alternativas pré-definidas do guia
  const predefinedAlternatives = [
    {
      category: 'Manhãs/Monotonia/Sobrecarga',
      options: [
        'Chá de hortelã',
        'Chá de gengibre',
        'Água com limão',
        'Pausa ativa (caminhada)',
        'Alongamentos (2-5 min)',
        'Técnica Pomodoro'
      ]
    },
    {
      category: 'Pós-interações/Ansiedade',
      options: [
        'Chá de camomila',
        'Exercícios de respiração',
        'Mindfulness breve',
        'Chocolate amargo 70%',
        'Ouvir música relaxante',
        'Meditação de 5 min'
      ]
    }
  ];

  // Carregar dados do estado local (simulando persistência)
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('coffeeEntries') || '[]');
    const savedAlternatives = JSON.parse(localStorage.getItem('coffeeAlternatives') || '[]');
    const savedGoals = JSON.parse(localStorage.getItem('coffeeGoals') || '[]');
    
    setEntries(savedEntries);
    setAlternatives(savedAlternatives);
    setGoals(savedGoals);
  }, []);

  // Salvar dados no estado local
  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addEntry = () => {
    if (!currentEntry.trigger) return;
    
    const newEntry = {
      ...currentEntry,
      id: Date.now(),
      timestamp: new Date().toLocaleString('pt-BR'),
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveData('coffeeEntries', updatedEntries);
    
    // Reset form
    setCurrentEntry({
      location: '',
      activity: '',
      people: '',
      emotion: '',
      physical: '',
      trigger: '',
      alternative: '',
      success: false,
      notes: ''
    });
  };

  const addAlternative = (alternative) => {
    const newAlternative = {
      id: Date.now(),
      name: alternative,
      timesUsed: 0,
      effectiveness: 0,
      category: 'Personalizada'
    };
    
    const updatedAlternatives = [...alternatives, newAlternative];
    setAlternatives(updatedAlternatives);
    saveData('coffeeAlternatives', updatedAlternatives);
  };

  const updateAlternativeStats = (id, effectiveness) => {
    const updatedAlternatives = alternatives.map(alt => 
      alt.id === id 
        ? { ...alt, timesUsed: alt.timesUsed + 1, effectiveness }
        : alt
    );
    setAlternatives(updatedAlternatives);
    saveData('coffeeAlternatives', updatedAlternatives);
  };

  const getStats = () => {
    const totalEntries = entries.length;
    const successfulEntries = entries.filter(e => e.success).length;
    const successRate = totalEntries > 0 ? (successfulEntries / totalEntries * 100).toFixed(1) : 0;
    
    const last7Days = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    
    return { totalEntries, successfulEntries, successRate, last7Days: last7Days.length };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg mr-4">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quebrador de Hábito do Café</h1>
                <p className="text-sm text-gray-600">Sua jornada para uma vida mais saudável</p>
              </div>
            </div>
          </div>
          
          <nav className="flex space-x-1 pb-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'diary', label: 'Diário', icon: BookOpen },
              { id: 'alternatives', label: 'Alternativas', icon: Heart },
              { id: 'progress', label: 'Progresso', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            entries={entries} 
            getStats={getStats}
          />
        )}
        {activeTab === 'diary' && (
          <Diary 
            currentEntry={currentEntry}
            setCurrentEntry={setCurrentEntry}
            addEntry={addEntry}
          />
        )}
        {activeTab === 'alternatives' && (
          <Alternatives 
            predefinedAlternatives={predefinedAlternatives}
            alternatives={alternatives}
            addAlternative={addAlternative}
            updateAlternativeStats={updateAlternativeStats}
          />
        )}
        {activeTab === 'progress' && (
          <Progress 
            entries={entries}
            alternatives={alternatives}
          />
        )}
      </div>
    </div>
  );
};

export default CoffeeHabitBreakerApp;
