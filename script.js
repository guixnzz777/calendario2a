// Configuração da Planilha Google
const SPREADSHEET_ID = '1NoaJ4pcxVdUwY-vjDZ-lnXmQjwIxkfm_LzM89-h3ZhY'; // Substitua pelo ID da sua planilha
const SHEET_NAME = 'Eventos'; // Nome da aba
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

// Variáveis globais
let currentDate = moment();
let events = [];
let lastUpdate = '';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configura botões
    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.subtract(1, 'month');
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.add(1, 'month');
        renderCalendar();
    });
    
    document.getElementById('refresh-btn').addEventListener('click', loadEvents);
    
    // Configura link para a planilha
    document.getElementById('sheet-link').addEventListener('click', () => {
        window.open(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`, '_blank');
    });
    
    // Carrega eventos e renderiza calendário
    loadEvents();
});

// Função para carregar eventos da planilha
async function loadEvents() {
    try {
        // Modificação 1: URL alternativa mais confiável
        const API_URL = `https://opensheet.elk.sh/${SPREADSHEET_ID}/${SHEET_NAME}`;
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        // Modificação 2: Processamento simplificado
        const data = await response.json();
        console.log("Dados recebidos:", data); // Verifique no console
        
        events = data.map(event => ({
            date: event['Data'] || event['data'] || event['DATA'],
            title: event['Título do Evento'] || event['Evento'] || event['Titulo'],
            type: event['Tipo']?.toLowerCase() || 'evento',
            description: event['Descrição'] || '',
            responsible: event['Responsável'] || ''
        })).filter(e => e.date && e.title);
        
        lastUpdate = new Date().toLocaleString('pt-BR');
        renderCalendar();
        
    } catch (error) {
        console.error("Erro detalhado:", error);
        document.getElementById('last-update').textContent = 
            `Erro: ${error.message || 'Verifique o console (F12)'}`;
    }
}

// Processa os dados da planilha
function processSheetData(rows) {
    // Pula o cabeçalho (primeira linha)
    return rows.slice(1).map(row => {
        const cell = row.c;
        return {
            date: cell[0]?.v || '', // Data do evento
            title: cell[1]?.v || '', // Título do evento
            type: cell[2]?.v || 'evento', // Tipo (padrão: evento)
            description: cell[3]?.v || '', // Descrição
            responsible: cell[4]?.v || '' // Responsável
        };
    }).filter(event => event.date && event.title); // Filtra linhas vazias
}

// Renderiza o calendário
function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('current-month');
    
    // Atualiza o título do mês/ano
    monthYearEl.textContent = currentDate.format('MMMM [de] YYYY').toUpperCase();
    
    // Limpa o calendário
    calendarEl.innerHTML = '';
    
    // Adiciona cabeçalhos dos dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarEl.appendChild(dayHeader);
    });
    
    // Calcula os dias a serem exibidos
    const firstDayOfMonth = moment(currentDate).startOf('month');
    const lastDayOfMonth = moment(currentDate).endOf('month');
    const startDay = moment(firstDayOfMonth).startOf('week');
    const endDay = moment(lastDayOfMonth).endOf('week');
    
    // Cria os dias do calendário
    let day = moment(startDay);
    while (day <= endDay) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        
        // Classes condicionais
        if (!day.isSame(currentDate, 'month')) {
            dayEl.classList.add('other-month');
        }
        
        if (day.isSame(moment(), 'day')) {
            dayEl.classList.add('today');
        }
        
        if (day.day() === 0 || day.day() === 6) {
            dayEl.classList.add('weekend');
        }
        
        // Número do dia
        const dayNumberEl = document.createElement('div');
        dayNumberEl.className = 'day-number';
        dayNumberEl.textContent = day.format('D');
        dayEl.appendChild(dayNumberEl);
        
        // Eventos para este dia
        const dayEvents = events.filter(event => {
            const eventDate = moment(event.date, 'DD/MM/YYYY');
            return eventDate.isValid() && eventDate.isSame(day, 'day');
        });
        
        // Ordena eventos por tipo (provas primeiro)
        dayEvents.sort((a, b) => {
            if (a.type === 'test') return -1;
            if (b.type === 'test') return 1;
            return 0;
        });
        
        // Adiciona eventos ao dia
        dayEvents.forEach(event => {
            const eventEl = document.createElement('div');
            eventEl.className = `event color-${event.type}`;
            eventEl.textContent = event.title;
            
            // Tooltip com detalhes
            let tooltip = `Data: ${moment(event.date, 'DD/MM/YYYY').format('DD/MM/YYYY')}`;
            if (event.description) tooltip += `\nDescrição: ${event.description}`;
            if (event.responsible) tooltip += `\nResponsável: ${event.responsible}`;
            
            eventEl.title = tooltip;
            dayEl.appendChild(eventEl);
        });
        
        calendarEl.appendChild(dayEl);
        day.add(1, 'day');
    }
    
    // Salva dados no localStorage como fallback
    localStorage.setItem('calendarData', JSON.stringify({
        events,
        lastUpdate
    }));
}

// Atualiza a cada 1 minuto (opcional)
setInterval(() => {
    const now = new Date();
    if (now.getMinutes() % 1 === 0) {
        loadEvents();
    }
}, 60000);